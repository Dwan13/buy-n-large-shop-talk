
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.9';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateEmbedding(text: string) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 5 } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    console.log(`Performing RAG search for: ${query}`);

    // Generar embedding de la consulta
    const queryEmbedding = await generateEmbedding(query);

    // Buscar productos similares usando la función de búsqueda semántica
    const { data: similarProducts, error } = await supabase.rpc('search_similar_products', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7, // Ajusta este valor según necesites
      match_count: maxResults
    });

    if (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }

    console.log(`Found ${similarProducts?.length || 0} similar products`);

    // Crear contexto para el asistente IA
    const context = similarProducts?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      similarity: product.similarity
    })) || [];

    // Generar respuesta usando GPT
    const contextText = context.map(p => 
      `Producto: ${p.name}\nDescripción: ${p.description}\nPrecio: $${p.price}\nCategoría: ${p.category}`
    ).join('\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente de compras experto de Buy n Large. Ayudas a los usuarios a encontrar productos basándote en su consulta y en los productos disponibles. Siempre responde en español de manera amigable y útil. 

Contexto de productos relevantes:
${contextText}

Instrucciones:
- Recomienda productos específicos basándote en la consulta del usuario
- Menciona precios y características relevantes
- Si no hay productos perfectamente adecuados, sugiere alternativas
- Sé conversacional y útil`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const assistantReply = aiResponse.choices[0].message.content;

    return new Response(
      JSON.stringify({
        query,
        response: assistantReply,
        products: context,
        total_found: context.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in rag-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
