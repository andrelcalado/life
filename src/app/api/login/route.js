export async function POST(req) {
  const { username, email, password } = await req.json();

  const response = await fetch('http://ws.lifeonline.com.br:7060/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return new Response(JSON.stringify({
      message: 'Login bem-sucedido!',
      data,
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: 'Usuário ou senha incorretos', data }), {
      status: 401,
    });
  }
}
