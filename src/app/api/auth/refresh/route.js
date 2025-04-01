export async function POST(req) {
  const { refresh } = await req.json();

  const response = await fetch('http://ws.lifeonline.com.br:7060/api/auth/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  const data = await response.json();

  if (response.ok) {
    return new Response(JSON.stringify({
      message: 'Token atualizado com sucesso!',
      data,
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar o token', data }), {
      status: 401,
    });
  }
}
