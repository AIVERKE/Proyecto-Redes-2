import { agregarContacto } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nuevoUsuarioForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const respuesta = await agregarContacto(nombre, email, mensaje);
      alert('Usuario agregado con éxito: ' + respuesta);
      form.reset();
    } catch (error) {
      alert('Error al agregar usuario.');
      console.error(error);
    }
  });
});
