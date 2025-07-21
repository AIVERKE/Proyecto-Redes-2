/*
1. getElementById: Busca un formulario en la página con el id de 'contactForm'
2. addEventListener: Le dice que reaccione cuando el formulario se envie con submit
3. async (e) es una función que se ejecuta cuando se envia el formuario,
utilizamos esta porque nos permite utilizar await para esperar la respuesta del servidor
*/
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  /*
  Evita que la página web se recargue despues de enviar el formulario
  */
  e.preventDefault();

/*
1. Objtemos los datos del formulario buscando por el id correspondiente de la etiqueta
*/
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

/*
1. try indica que el script intentará ejecutar código y si no lo lográ entonces el error será
recibido por catch
*/
  try {
    /*
    Enviamos los datos recibidos al servidor
    1. fetch es la función que llevará los datos al servidor
      a. Primero le pasamos la dirección donde el servidor en node está trabajando
      b. Luego debemos espeficicar 3 cosas
        1. method: en este caso es POST
        2. headers: le estamos diciendo que lo vamos a pasar en formato json
        3. Body: los datos en json que son convertidos por la función JSON.stringify
    */
    const response = await fetch('http://localhost:3000/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje })
    });

    /*
    Espera la respuesta del servifor y la guarda en result
    */
    const result = await response.text();
    /*
    Muestra la respuesta del servidor
    */
    alert('Servidor respondió: ' + result);
  } catch (error) {
    alert('Error al enviar datos al servidor Node.js');
    console.error(error);
  }

});

function mostrarContactosEnPagina(contactos) {
  const contenedor = document.getElementById('listaContactos');
  contenedor.innerHTML = ''; // Limpia los resultados anteriores
  contactos.forEach(c => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${c.nombre}</strong> (${c.email}): ${c.mensaje} 
    <button onclick="eliminarContacto(${c.id})">Eliminar</button>`;
    contenedor.appendChild(div);
  });
}

async function obtenerContactos() {
  try {
    const response = await fetch('http://localhost:3000/contactos');
    const data = await response.json();
    mostrarContactosEnPagina(data);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
  }
}

async function actualizarContacto(id, nombre, email, mensaje) {
  try {
    const response = await fetch(`http://localhost:3000/contacto/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje })
    });

    const result = await response.text();
    console.log('Respuesta del servidor:', result);
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
  }
}
async function eliminarContacto(id) {
  try {
    const response = await fetch(`http://localhost:3000/contacto/${id}`, {
      method: 'DELETE'
    });

    const result = await response.text();
    console.log('Contacto eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
  }
}
