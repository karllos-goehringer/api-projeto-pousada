// Exemplo de como usar o refresh token no frontend

// 1. Guardar o token no localStorage após login
function salvarToken(token) {
  localStorage.setItem('token', token);
}

// 2. Função para fazer requisições com refresh automático
async function fetchComRefresh(url, options = {}) {
  let token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  let response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Se receber um novo token no header, atualiza
  const novoToken = response.headers.get('X-New-Token');
  if (novoToken) {
    salvarToken(novoToken);
    headers.Authorization = `Bearer ${novoToken}`;
  }
  
  // Se token expirou, tenta renovar
  if (response.status === 401) {
    const tokenRenovado = await renovarToken(token);
    if (tokenRenovado) {
      salvarToken(tokenRenovado);
      headers.Authorization = `Bearer ${tokenRenovado}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      // Se não conseguir renovar, redireciona para login
      window.location.href = '/login';
    }
  }
  
  return response;
}

// 3. Função para renovar o token manualmente
async function renovarToken(token) {
  try {
    const response = await fetch('http://localhost:3000/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
  } catch (error) {
    console.error('Erro ao renovar token:', error);
  }
  
  return null;
}

// 4. Usar em suas requisições
// Exemplo: buscar dados protegidos
async function buscarDadosProtegidos() {
  const response = await fetchComRefresh('http://localhost:3000/api/dados', {
    method: 'GET',
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log('Dados:', data);
  }
}

// 5. No seu componente de login
async function handleLogin(email, senha) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (response.ok) {
    const data = await response.json();
    salvarToken(data.token);
    // Redirecionar para dashboard
    window.location.href = '/dashboard';
  }
}
