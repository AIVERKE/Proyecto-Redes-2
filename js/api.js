const API_BASE = 'http://localhost:3000';

export async function obtenerContactos() {
  const res = await fetch(`${API_BASE}/contactos`);
  if (!res.ok) throw new Error('Error al obtener contactos');
  return await res.json();
}

export async function agregarContacto(nombre, email, mensaje) {
  const res = await fetch(`${API_BASE}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, mensaje }),
  });
  if (!res.ok) throw new Error('Error al agregar contacto');
  return await res.text();
}

export async function eliminarContacto(id) {
  const res = await fetch(`${API_BASE}/contacto/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar contacto');
  return await res.text();
}

export async function actualizarContacto(id, nombre, email, mensaje) {
  const res = await fetch(`${API_BASE}/contacto/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, email, mensaje }),
  });

  if (!res.ok) throw new Error('Error al actualizar contacto');
  return await res.text();
}
