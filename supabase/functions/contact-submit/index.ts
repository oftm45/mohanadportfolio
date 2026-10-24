// Receives the portfolio contact form, validates it, rate-limits by IP and
// stores it in contact_submissions (no client access to the table).
// If a FORMSPREE_FORM_ID secret is set, the message is also forwarded to
// Formspree so it lands in the owner's inbox.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const BodySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  message: z.string().trim().min(1, "Please write a message").max(2000, "Message is too long (2000 characters max)"),
  // Honeypot: real visitors never fill this hidden field.
  website: z.string().max(200).optional(),
});

const MAX_PER_WINDOW = 3;
const WINDOW_MINUTES = 10;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: "Please check the form", fields: parsed.error.flatten().fieldErrors }, 400);
  }
  const { name, email, message, website } = parsed.data;

  // Bots that fill the honeypot get a fake success and nothing is stored.
  if (website) return json({ ok: true });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = await sha256(`contact:${ip}`);

  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const { count, error: countError } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (countError) {
    console.error("Rate-limit check failed:", countError.message);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
  if ((count ?? 0) >= MAX_PER_WINDOW) {
    return json({ error: "Too many messages. Please wait a few minutes and try again." }, 429);
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message, ip_hash: ipHash })
    .select("id")
    .single();

  if (error) {
    console.error("Insert failed:", error.message);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }

  const formId = Deno.env.get("FORMSPREE_FORM_ID");
  if (formId && /^[a-zA-Z0-9]+$/.test(formId)) {
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _replyto: email, _subject: `Portfolio message from ${name}` }),
      });
      if (!res.ok) console.error(`Formspree failed [${res.status}]: ${await res.text()}`);
    } catch (e) {
      console.error("Formspree request error:", e);
    }
  }

  return json({ ok: true, id: data.id });
});
