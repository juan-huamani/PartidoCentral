/* ════════════════════════════════════════════════════════════════════════
   CONFIGURACIÓN DE SUPABASE — Partido Central
   ────────────────────────────────────────────────────────────────────────
   Estas credenciales son PÚBLICAS y es seguro exponerlas en el navegador,
   SIEMPRE que tengas activado Row Level Security (RLS) en Supabase con una
   política que permita solo INSERT (ver el SQL en el chat / README).

   Reemplaza los dos valores de abajo con los de tu proyecto:
   Supabase → Project Settings → API → "Project URL" y "anon public" key.
   ════════════════════════════════════════════════════════════════════════ */

const SUPABASE_URL      = 'https://trqmhubhslntbipqlacv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_PawzE0f2jGWHd6sa-ShUAg_DWZBVFyj';

// Crea el cliente global. Requiere que el script CDN de @supabase/supabase-js
// se haya cargado ANTES de este archivo.
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
