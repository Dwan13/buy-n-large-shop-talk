
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
    console.log('Starting embedding generation process');

    // Obtener todos los productos que no tienen embeddings
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, description, category')
      .is('embedding', null);

    if (fetchError) {
      throw new Error(`Error fetching products: ${fetchError.message}`);
    }

    console.log(`Found ${products?.length || 0} products without embeddings`);

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No products need embedding generation' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let processed = 0;
    let errors = 0;

    for (const product of products) {
      try {
        // Combinar información del producto para el embedding
        const combinedText = `${product.name}\n${product.description || ''}\nCategoría: ${product.category || ''}`.trim();
        
        console.log(`Generating embedding for product: ${product.name}`);
        
        // Generar embedding
        const embedding = await generateEmbedding(combinedText);
        
        // Actualizar producto con embedding
        const { error: updateError } = await supabase
          .from('products')
          .update({ embedding })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Error updating product ${product.id}:`, updateError);
          errors++;
        } else {
          processed++;
          console.log(`Successfully processed product: ${product.name}`);
        }

        // Pequeña pausa para evitar rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Embedding generation complete`,
        processed,
        errors,
        total: products.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-embeddings function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
