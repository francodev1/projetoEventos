-- Habilitar Row Level Security (RLS) em todas as tabelas
-- Execute este SQL no Supabase SQL Editor

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela USERS
-- Usuários podem ler seu próprio perfil
CREATE POLICY "Usuários podem ver próprio perfil" ON users
    FOR SELECT USING (auth.uid()::text = id);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar próprio perfil" ON users
    FOR UPDATE USING (auth.uid()::text = id);

-- Permitir inserção durante registro (via service_role)
CREATE POLICY "Permitir inserção de novos usuários" ON users
    FOR INSERT WITH CHECK (true);

-- Políticas para a tabela EVENTS
-- Todos podem ver eventos publicados
CREATE POLICY "Todos podem ver eventos publicados" ON events
    FOR SELECT USING (published = true OR "createdBy" = auth.uid()::text);

-- Criadores podem criar eventos
CREATE POLICY "Organizadores podem criar eventos" ON events
    FOR INSERT WITH CHECK (auth.uid()::text = "createdBy");

-- Criadores podem atualizar seus eventos
CREATE POLICY "Organizadores podem atualizar seus eventos" ON events
    FOR UPDATE USING (auth.uid()::text = "createdBy");

-- Criadores podem deletar seus eventos
CREATE POLICY "Organizadores podem deletar seus eventos" ON events
    FOR DELETE USING (auth.uid()::text = "createdBy");

-- Políticas para a tabela TICKETS
-- Usuários podem ver seus próprios tickets
CREATE POLICY "Usuários podem ver próprios tickets" ON tickets
    FOR SELECT USING (auth.uid()::text = "ownerId");

-- Sistema pode criar tickets
CREATE POLICY "Sistema pode criar tickets" ON tickets
    FOR INSERT WITH CHECK (true);

-- Usuários podem atualizar seus tickets
CREATE POLICY "Usuários podem atualizar próprios tickets" ON tickets
    FOR UPDATE USING (auth.uid()::text = "ownerId");

-- Políticas para a tabela SUBSCRIPTIONS
-- Usuários podem ver suas assinaturas
CREATE POLICY "Usuários podem ver próprias assinaturas" ON subscriptions
    FOR SELECT USING (auth.uid()::text = "userId");

-- Sistema pode criar assinaturas
CREATE POLICY "Sistema pode criar assinaturas" ON subscriptions
    FOR INSERT WITH CHECK (true);

-- Usuários podem atualizar suas assinaturas
CREATE POLICY "Usuários podem atualizar próprias assinaturas" ON subscriptions
    FOR UPDATE USING (auth.uid()::text = "userId");
