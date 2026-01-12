#!/usr/bin/env node

/**
 * Script de teste para validar autenticação Supabase
 */

const SUPABASE_URL = 'https://tkcnefujgwgjvwlrlxdc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Etgjg96PYmfci8NpkNYPIQ_iwXfgATH';

async function supabaseCall(endpoint, method = 'POST', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${SUPABASE_URL}${endpoint}`, options);
  const data = await response.json();

  return { data, status: response.status };
}

async function runTests() {
  console.log('🧪 Iniciando testes de autenticação...\n');

  const randomId = Math.floor(Math.random() * 100000);
  const testEmail = `lucas${randomId}@gmail.com`;
  const testPassword = 'senha123';
  const testName = `Usuário Teste ${randomId}`;

  try {
    // Test 1: Sign Up
    console.log('📝 Teste 1: Criar conta via Supabase Auth');
    console.log(`Email: ${testEmail}`);
    console.log(`Senha: ${testPassword}`);
    console.log(`Nome: ${testName}\n`);

    const { data: signUpData, status: signUpStatus } = await supabaseCall(
      '/auth/v1/signup',
      'POST',
      {
        email: testEmail,
        password: testPassword,
        data: {
          name: testName,
          role: 'ORGANIZER'
        }
      }
    );

    console.log('   Status HTTP:', signUpStatus);

    if (signUpStatus !== 200) {
      console.error('❌ Erro ao criar conta:', signUpData.error_description || signUpData.message || JSON.stringify(signUpData));
      return;
    }

    // Extrair user ID da resposta
    const userId = signUpData.user?.id || signUpData.id;
    const userEmail = signUpData.user?.email || signUpData.email;

    console.log('✅ Conta criada com sucesso!');
    console.log(`   User ID: ${userId}`);
    console.log(`   Email: ${userEmail}\n`);

    // Test 2: Sign In
    console.log('📝 Teste 2: Fazer login');

    const { data: signInData, status: signInStatus } = await supabaseCall(
      '/auth/v1/token?grant_type=password',
      'POST',
      {
        email: testEmail,
        password: testPassword
      }
    );

    if (signInStatus !== 200) {
      console.error('❌ Erro ao fazer login:', signInData.error_description || signInData.message || JSON.stringify(signInData));
      return;
    }

    console.log('✅ Login bem-sucedido!');
    console.log(`   Access Token: ${signInData.access_token?.substring(0, 40)}...` || 'N/A');
    console.log(`   Tipo: ${signInData.token_type}\n`);

    // Test 3: Insert into public.users via REST API
    console.log('📝 Teste 3: Inserir dados em public.users');

    const { data: insertData, status: insertStatus } = await supabaseCall(
      '/rest/v1/users',
      'POST',
      {
        id: userId,
        name: testName,
        email: testEmail,
        role: 'ORGANIZER',
        subscriptionStatus: 'INACTIVE'
      }
    );

    if (insertStatus !== 201) {
      console.error('❌ Erro ao inserir em public.users:', insertData.message);
      return;
    }

    console.log('✅ Dados inseridos em public.users com sucesso!\n');

    // Test 4: Get user from public.users
    console.log('📝 Teste 4: Buscar usuário em public.users');

    const { data: userData, status: userStatus } = await supabaseCall(
      `/rest/v1/users?id=eq.${userId}`,
      'GET'
    );

    if (userStatus !== 200 || !userData.length) {
      console.error('❌ Erro ao buscar usuário');
      return;
    }

    const user = userData[0];
    console.log('✅ Usuário encontrado em public.users!');
    console.log(`   ID: ${user.id}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Status: ${user.subscriptionStatus}\n`);

    console.log('🎉 Todos os testes passaram com sucesso!');
    console.log('\n✅ Fluxo completo funcionando:');
    console.log('   1. ✓ Cadastro via Supabase Auth');
    console.log('   2. ✓ Login funcionando');
    console.log('   3. ✓ Inserção em public.users');
    console.log('   4. ✓ Dados persistidos no banco');

  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
  }
}

runTests();
