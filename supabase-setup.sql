-- ════════════════════════════════════════════════════════════════════════
-- SUPABASE — Esquema y seguridad para Partido Central
-- Ejecuta TODO este script en: Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════════════

-- ── Tabla: voluntarios (formulario "Únete" del index.html) ──────────────────
create table if not exists public.voluntarios (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  nombre     text not null check (char_length(nombre)   <= 100),
  email      text not null check (char_length(email)    <= 150),
  telefono   text          check (char_length(telefono) <= 20),
  region     text          check (char_length(region)   <= 50),
  area       text          check (char_length(area)     <= 80)
);

-- ── Tabla: mensajes_contacto (formulario de contacto.html) ──────────────────
create table if not exists public.mensajes_contacto (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  nombre     text not null check (char_length(nombre)   <= 100),
  email      text not null check (char_length(email)    <= 150),
  telefono   text          check (char_length(telefono) <= 20),
  region     text          check (char_length(region)   <= 50),
  perfil     text          check (char_length(perfil)   <= 100),
  asunto     text          check (char_length(asunto)   <= 200),
  mensaje    text not null check (char_length(mensaje)  <= 2000)
);

-- ── Seguridad: activar Row Level Security ───────────────────────────────────
-- Con RLS activo, la "anon key" pública NO puede leer, editar ni borrar.
alter table public.voluntarios       enable row level security;
alter table public.mensajes_contacto enable row level security;

-- ── Políticas: permitir SOLO insertar (enviar el formulario) ────────────────
create policy "anon puede insertar voluntarios"
  on public.voluntarios
  for insert to anon
  with check (true);

create policy "anon puede insertar mensajes"
  on public.mensajes_contacto
  for insert to anon
  with check (true);

-- Nota: NO creamos políticas de SELECT/UPDATE/DELETE para 'anon'.
-- Así, para LEER los registros usa el panel de Supabase (Table Editor) o un
-- usuario autenticado/service_role. El público solo puede enviar datos.


-- ════════════════════════════════════════════════════════════════════════
-- SOLO SI TUS TABLAS YA EXISTÍAN (como en este proyecto):
-- el "create table if not exists" de arriba NO vuelve a aplicar los límites,
-- así que corre este bloque UNA vez para agregar los CHECK a las tablas vivas.
-- (Si alguna constraint ya existe, ignora el error "already exists".)
-- ════════════════════════════════════════════════════════════════════════

alter table public.voluntarios
  add constraint voluntarios_nombre_len   check (char_length(nombre)   <= 100),
  add constraint voluntarios_email_len    check (char_length(email)    <= 150),
  add constraint voluntarios_telefono_len check (char_length(telefono) <= 20),
  add constraint voluntarios_region_len   check (char_length(region)   <= 50),
  add constraint voluntarios_area_len     check (char_length(area)     <= 80);

alter table public.mensajes_contacto
  add constraint mensajes_nombre_len   check (char_length(nombre)   <= 100),
  add constraint mensajes_email_len    check (char_length(email)    <= 150),
  add constraint mensajes_telefono_len check (char_length(telefono) <= 20),
  add constraint mensajes_region_len   check (char_length(region)   <= 50),
  add constraint mensajes_perfil_len   check (char_length(perfil)   <= 100),
  add constraint mensajes_asunto_len   check (char_length(asunto)   <= 200),
  add constraint mensajes_mensaje_len  check (char_length(mensaje)  <= 2000);


-- ════════════════════════════════════════════════════════════════════════
-- PANEL ADMIN (panel.html): permitir que usuarios AUTENTICADOS lean los datos.
-- El público 'anon' sigue SIN poder leer (solo insertar). Solo quien inicie
-- sesión con el usuario creado en Authentication podrá ver los registros.
-- ════════════════════════════════════════════════════════════════════════
create policy "auth puede leer voluntarios"
  on public.voluntarios for select to authenticated using (true);

create policy "auth puede leer mensajes"
  on public.mensajes_contacto for select to authenticated using (true);
