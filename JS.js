  // Datos de la tabla
  let data = [];
  // Número de filas por página
  const Filaporpag = 5;
  // Página actual
  let PagActual = 1;

  // Actualiza la tabla basándose en la página actual
  function ActualizarTabla() {
      const tableBody = document.getElementById('dataGrid');
      tableBody.innerHTML = '';
      const InicioPaginacion = (PagActual - 1) * Filaporpag;
      const FinalPaginacion = Math.min(InicioPaginacion + Filaporpag, data.length);
      for (let i = InicioPaginacion; i < FinalPaginacion; i++) {
          const fila= document.createElement('tr');

          const nombreCelda = document.createElement('td');
          nombreCelda.textContent = data[i].nombre;
          fila.appendChild(nombreCelda);

          const edadCelda = document.createElement('td');
          edadCelda.textContent = data[i].edad;
          fila.appendChild(edadCelda);

          const accionCelda = document.createElement('td');

          const editarBoton = document.createElement('button');
          editarBoton.textContent = 'Editar';
          editarBoton.onclick = function() {
              SeleccionarFila(i);
          };
          accionCelda.appendChild(editarBoton);

          const borrarBoton = document.createElement('button');
          borrarBoton .textContent = 'Eliminar';
          borrarBoton .onclick = function() {
              EliminarFila(i);
          };
          accionCelda.appendChild(borrarBoton);

          fila.appendChild(accionCelda);

          tableBody.appendChild(fila);
      }

      document.getElementById('paginaInfo').textContent = `Página ${PagActual} de ${Math.ceil(data.length / Filaporpag)}`;
  }

  // Agrega una nueva fila a los datos y actualiza la tabla
  function Agregarfila() {
      const nombre = document.getElementById('NombreInput').value;
      const edad = document.getElementById('EdadInput').value;

      if (nombre === '' || edad === '') {
          alert('Por favor, ingrese nombre y edad.');
          return;
      }

      data.push({ nombre, edad });
      document.getElementById('NombreInput').value = '';
      document.getElementById('EdadInput').value = '';
      ActualizarTabla();
  }

  // Permite seleccionar una fila para edición
  function SeleccionarFila(index) {
      const fila = data[index];
      document.getElementById('NombreInput').value = fila.nombre;
      document.getElementById('EdadInput').value = fila.edad;

      // Cambiar el botón de agregar a un botón de guardar
      const  AgregarBoton = document.getElementById('AgregarFilaBoton');
      AgregarBoton.textContent = 'Guardar Cambios';
      AgregarBoton.onclick = function() {
        GuardarFila(index);
      };
  }

  // Guarda los cambios en la fila editada
  function GuardarFila(index) {
      const nombre = document.getElementById('NombreInput').value;
      const edad = document.getElementById('EdadInput').value;

      if (nombre=== '' || edad === '') {
          alert('Por favor, ingrese el nombre y la edad.');
          return;
      }

      data[index] = { nombre, edad };
      document.getElementById('NombreInput').value = '';
      document.getElementById('EdadInput').value = '';

      // Cambiar el botón de guardar de nuevo a un botón de agregar
      const AgregarBoton = document.getElementById('AgregarFilaBoton');
      AgregarBoton.textContent = 'Agregar Fila';
      AgregarBoton.onclick = Agregarfila;

      ActualizarTabla();
  }

  // Elimina una fila de los datos y actualiza la tabla
  function EliminarFila(index) {
      data.splice(index, 1);
      ActualizarTabla();
  }

  // Vuelve a la página anterior si es posible
  function AnteriorPag() {
      if (PagActual > 1) {
        PagActual--;
        ActualizarTabla();
      }
  }

  // Vuelve a la página siguiente si es posible
  function SigPag() {
      if (PagActual < Math.ceil(data.length / Filaporpag)) {
        PagActual++;
        ActualizarTabla();
      }
  }

  // Vincula los botones a sus funciones correspondientes
  document.getElementById('AgregarFilaBoton').onclick = Agregarfila;
  document.getElementById('AnteriorPagButton').onclick = AnteriorPag;
  document.getElementById('SigPagButton').onclick = SigPag;

  // Renderiza la tabla inicial
  ActualizarTabla();