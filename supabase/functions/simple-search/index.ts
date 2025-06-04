
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.9';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 5 } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    console.log(`Performing simple search for: ${query}`);

    // Buscar productos usando búsqueda textual simple
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url')
      .or(`name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
      .limit(maxResults);

    if (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }

    console.log(`Found ${products?.length || 0} products`);

    // Crear respuesta contextual simple
    const context = products || [];
    
    let assistantReply = '';
    if (context.length === 0) {
      assistantReply = `No encontré productos relacionados con "${query}". ¿Podrías ser más específico o buscar algo diferente?`;
    } else {
      const productNames = context.slice(0, 3).map(p => p.name).join(', ');
      assistantReply = `Encontré ${context.length} productos relacionados con "${query}". Te recomiendo especialmente: ${productNames}. ${
        context.length > 1 ? 'Estos productos podrían interesarte.' : 'Este producto podría interesarte.'
      }`;
    }

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
    console.error('Error in simple-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
