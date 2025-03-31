export async function GET(req) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Token de acesso ausente' }), {
      status: 401,
    });
  }

  const response = await fetch('http://ws.lifeonline.com.br:7060/api/vehicles/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return new Response(JSON.stringify({
      message: 'Veículos carregados!',
      data,
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: 'Erro ao carregar veículos' }), {
      status: 401,
    });
  }
}

export async function POST(req) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Token de acesso ausente' }), {
      status: 401,
    });
  }

  const {
    codigo,
    user,
    placa,
    ultimo_rastreamento,
    ultima_data,
    ultima_latitude,
    ultima_longitude,
    is_active,
    is_online,
   } = await req.json();

  const response = await fetch('http://ws.lifeonline.com.br:7060/api/vehicles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      codigo,
      user,
      placa,
      ultimo_rastreamento,
      ultima_data,
      ultima_latitude,
      ultima_longitude,
      is_active,
      is_online
    }),
  });
  
  const data = await response.json();
  
  if (response.ok) {
    return new Response(JSON.stringify({
      message: 'Veículo adicionado com sucesso!',
      data,
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: 'Erro ao adicionar veículo', data }), {
      status: 401,
    });
  }
}

export async function PUT(req) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Token de acesso ausente' }), {
      status: 401,
    });
  }

  const {
    id,
    codigo,
    user,
    placa,
    ultimo_rastreamento,
    ultima_data,
    ultima_latitude,
    ultima_longitude,
    is_active,
    is_online,
   } = await req.json();

  const response = await fetch(`http://ws.lifeonline.com.br:7060/api/vehicles/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      codigo,
      user,
      placa,
      ultimo_rastreamento,
      ultima_data,
      ultima_latitude,
      ultima_longitude,
      is_active,
      is_online
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    return new Response(JSON.stringify({
      message: 'Veículo atualizado com sucesso!',
      data,
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar veículo', data }), {
      status: 401,
    });
  }
}

export async function DELETE(req) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Token de acesso ausente' }), {
      status: 401,
    });
  }

  const { id } = await req.json();

  const response = await fetch(`http://ws.lifeonline.com.br:7060/api/vehicles/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  if (response.ok) {
    return new Response(JSON.stringify({
      message: 'Veículo deletado com sucesso!'
    }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: 'Erro ao deletar o veículo' }), {
      status: 401,
    });
  }
}

  