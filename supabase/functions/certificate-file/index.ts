// Public, read-only access to the portfolio's certificate files.
// The "certificate" bucket stays private with no client read policy; this
// function looks up the requested file and redirects to a short-lived signed URL.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUCKET = "certificate";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const file = new URL(req.url).searchParams.get("file") ?? "";
  // Only plain top-level file names: no folders, no traversal, sane length.
  if (!file || file.length > 200 || file.includes("/") || file.includes("\\") || file.includes("..")) {
    return new Response("Invalid file", { status: 400, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(file, 60 * 10);

  if (error || !data?.signedUrl) {
    return new Response("Not found", { status: 404, headers: corsHeaders });
  }

  return new Response(null, {
    status: 302,
    headers: { ...corsHeaders, Location: data.signedUrl, "Cache-Control": "no-store" },
  });
});
