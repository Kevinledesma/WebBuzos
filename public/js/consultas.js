document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/api/consultas', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((consultas) => {
      console.log('Consultas obtenidas del servidor:', consultas); // Verifica la estructura
      const tabla = document.getElementById('tabla-consultas'); // Revisa que el ID coincida
      if (!tabla) {
        console.error('No se encontró el elemento con ID tabla-consultas');
        return;
      }
      tabla.innerHTML = ''; // Limpia la tabla
      consultas.forEach((consulta) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${consulta.id}</td>
          <td>${consulta.nombre_cliente}</td>
          <td>${consulta.producto_nombre || 'Sin producto'}</td>
          <td>${consulta.color || 'Sin producto'}</td>
          <td>${consulta.tamaño || 'Sin producto'}</td>
          <td>${consulta.logotipo || 'Sin producto'}</td>
          <td>${consulta.mensaje || 'Sin mensaje'}</td>
          <td>${new Date(consulta.created_at).toLocaleDateString()}</td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error('Error al obtener las consultas:', error);
    });
});
