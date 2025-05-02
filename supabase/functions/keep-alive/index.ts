import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Use caching to prevent unnecessary database calls
let lastCheckTime = 0;
let checkInterval = 30000; // 30 seconds

// Create a single supabase client for interacting with your database
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const now = Date.now();
    let skipDbQuery = false;
    
    // Only perform actual query if enough time has passed since last check
    if (now - lastCheckTime < checkInterval) {
      skipDbQuery = true;
    }
    
    let data;
    if (!skipDbQuery) {
      // Simple query to keep the connection alive
      const result = await supabase
        .from('products')
        .select('id')
        .limit(1);
        
      data = result.data;
      lastCheckTime = now;
      
      console.log('Keep-alive check performed at:', new Date().toISOString());
      
      if (result.error) {
        throw result.error;
      }
    }

    return new Response(
      JSON.stringify({ 
        status: 'success', 
        message: skipDbQuery ? 'Using cached connection' : 'Database connection checked successfully',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in keep-alive function:', error);
    
    return new Response(
      JSON.stringify({ 
        status: 'error',
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
