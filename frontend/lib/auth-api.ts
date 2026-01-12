/**
 * API de autenticação - Comunica com o backend Node.js/Express
 * Salva JWT no localStorage com expiração de 30 minutos
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    subscriptionStatus: string;
    createdAt: string;
    updatedAt?: string;
  };
  token: string;
  expiresIn: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

// Salvar token no localStorage
export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Obter token do localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Remover token do localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Fazer requisição com token automaticamente
const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

/**
 * Registrar novo usuário
 */
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await apiCall('/auth/register', 'POST', {
    name,
    email,
    password,
  });

  // Salvar token
  saveToken(data.token);

  return data;
};

/**
 * Fazer login
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await apiCall('/auth/login', 'POST', {
    email,
    password,
  });

  // Salvar token
  saveToken(data.token);

  return data;
};

/**
 * Obter dados do usuário logado
 */
export const getCurrentUser = async () => {
  return await apiCall('/auth/me', 'GET');
};

/**
 * Fazer logout (apenas remove token local)
 */
export const logout = () => {
  removeToken();
};

/**
 * Renovar token antes de expirar
 */
export const refreshToken = async (token: string) => {
  const data = await apiCall('/auth/refresh', 'POST', {
    token,
  });

  // Salvar novo token
  saveToken(data.token);

  return data;
};

/**
 * Verificar se usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decodificar JWT sem validar assinatura
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    // Verificar se não expirou
    if (payload.exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Decodificar token JWT (apenas leitura, sem validação)
 */
export const decodeToken = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    return payload;
  } catch (error) {
    return null;
  }
};

/**
 * Obter tempo restante do token (em segundos)
 */
export const getTokenTimeRemaining = (): number => {
  const token = getToken();
  if (!token) return 0;

  const payload = decodeToken(token);
  if (!payload || !payload.exp) return 0;

  const secondsRemaining = payload.exp - Math.floor(Date.now() / 1000);
  return Math.max(0, secondsRemaining);
};

/**
 * Hook para renovar token automaticamente antes de expirar
 * Renova 5 minutos antes da expiração
 */
export const setupTokenRefresh = (onTokenRefreshed?: () => void) => {
  const checkAndRefreshToken = async () => {
    const token = getToken();
    if (!token) return;

    const timeRemaining = getTokenTimeRemaining();

    // Se faltam menos de 5 minutos, renova
    if (timeRemaining > 0 && timeRemaining < 300) {
      try {
        await refreshToken(token);
        onTokenRefreshed?.();
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        removeToken();
      }
    }
  };

  // Verificar a cada 1 minuto
  const interval = setInterval(checkAndRefreshToken, 60000);

  // Retornar função para limpar o intervalo
  return () => clearInterval(interval);
};
