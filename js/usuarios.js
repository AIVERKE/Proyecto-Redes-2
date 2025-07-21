import { obtenerContactos, eliminarContacto as eliminarContactoAPI } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('listaContactos');

  try {
    const contactos = await obtenerContactos();

    if (contactos.length === 0) {
      contenedor.innerHTML = '<p>No hay usuarios registrados.</p>';
      return;
    }

    contactos.forEach(usuario => {
      const div = document.createElement('div');
      div.classList.add('usuario');
      div.innerHTML = `
      <div class="usuario-info">
        <strong>${usuario.nombre}</strong> (${usuario.email})<br>
        <span>${usuario.mensaje}</span>
      </div>
      <div class="botones">
        <button class="actualizar" onclick="window.location.href = 
  'modificarUsuario.html?id=${usuario.id}&nombre=${encodeURIComponent(usuario.nombre)}&email=${encodeURIComponent(usuario.email)}&mensaje=${encodeURIComponent(usuario.mensaje)}'">
  Actualizar
</button>


        <button class="eliminar" onclick="eliminarContacto(${usuario.id})">Eliminar</button>
      </div>
      `;
      contenedor.appendChild(div);
    });

  } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar los usuarios.</p>';
    console.error(error);
  }
});

// Exponer la función al ámbito global para que el botón onclick funcione
window.eliminarContacto = async function(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

  try {
    await eliminarContactoAPI(id);
    alert('Contacto eliminado correctamente.');
    location.reload(); // Recarga la página para actualizar la lista
  } catch (error) {
    alert('Hubo un error al eliminar el contacto.');
    console.error(error);
  }
};
