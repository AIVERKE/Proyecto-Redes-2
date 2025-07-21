import { actualizarContacto } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  console.log('ID del contacto a actualizar:', id); // <-- Esto te ayudará a depurar
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');
  const form = document.getElementById('nuevoUsuarioForm');

  // Rellenar los campos si hay valores en la URL (opcional)
  if (params.has('nombre')) nombreInput.value = params.get('nombre');
  if (params.has('email')) emailInput.value = params.get('email');
  if (params.has('mensaje')) mensajeInput.value = params.get('mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      await actualizarContacto(
        id,
        nombreInput.value,
        emailInput.value,
        mensajeInput.value
      );
      alert('Usuario actualizado correctamente');
      window.location.href = 'usuarios.html';
    } catch (error) {
      alert('Error al actualizar el usuario');
      console.error(error);
    }
  });
});
