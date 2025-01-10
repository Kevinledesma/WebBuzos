// Validación y envío del formulario
document.getElementById('consultaForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Recolectar datos del formulario
    const formData = {
      nombre_cliente: document.getElementById('nombre_cliente').value,
      correo_cliente: document.getElementById('correo_cliente').value,
      telefono_cliente: document.getElementById('telefono_cliente').value,
      id_producto: document.getElementById('id_producto').value,
      personalizacion: {
        color: document.getElementById('color').value,
        tamaño: document.getElementById('tamaño').value,
        logotipo: document.getElementById('logotipo').value || "N/A",
        inscripcion: document.getElementById('inscripcion').value || "N/A",
      },
      mensaje: document.getElementById('mensaje').value || "Sin mensaje adicional",
    };
  
    // Validación simple
    if (!formData.nombre_cliente || !formData.correo_cliente || !formData.telefono_cliente || !formData.id_producto) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    // Enviar datos al backend usando fetch
    fetch('http://localhost:3000/api/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Asegúrate de que el tipo de contenido sea JSON
        },
        body: JSON.stringify(formData),  // Los datos deben ser un string JSON
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);  // Verifica la respuesta del servidor
          if (data.message) {
            alert('Consulta enviada exitosamente');
          } else {
            alert('Error al enviar la consulta');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Hubo un problema al enviar la consulta');
        });
      
  });
  