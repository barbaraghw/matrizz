function crearEnteroReactivo(valorInicial = 0) {
    let valor = valorInicial;
    const dependientes = [];
  
    function obtenerValor() {
      return valor;
    }
  
    function establecerValor(nuevoValor) {
      valor = nuevoValor;
      notificarDependientes();
    }
  
    function agregarDependiente(dependiente) {
      dependientes.push(dependiente);
    }
  
    function notificarDependientes() {
      dependientes.forEach(dependiente => dependiente.actualizar());
    }
  
    return {
      get valor() {
        return obtenerValor();
      },
      set valor(nuevoValor) {
        establecerValor(nuevoValor);
      },
      agregarDependiente,
    };
  }
  
  function crearOperacionReactiva(operacion, ...enterosReactivos) {
    let valor = calcularValor();
  
    function calcularValor() {
      return operacion(...enterosReactivos.map(er => er.valor));
    }
  
    function actualizar() {
      valor = calcularValor();
      console.log(valor); // Mostrar el valor actualizado en la consola
    }
  
    enterosReactivos.forEach(er => er.agregarDependiente({ actualizar }));
  
    return {
      get valor() {
        return valor;
      },
      actualizar,
    };
  }
  
  // Uso del componente reactivo
  let i = crearEnteroReactivo(5);
  let j = crearEnteroReactivo(7);
  let Z = crearOperacionReactiva((a, b) => a + b, i, j);
  
  console.log(Z.valor); // 12
  
  j.valor = 3;
  console.log(Z.valor); // 8
  
