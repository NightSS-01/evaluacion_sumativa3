const cursos = {
    instalacionesElectricas: {
        precio: 85000,
        cupos: 15,
    },
    gasfiteria: {
        precio: 75000,
        cupos: 12,
    },
    excelAvanzado: {
        precio: 60000,
        cupos: 20,
    },
};

const inscripciones = [];

const form = document.querySelector('form')
const tbody = document.querySelector('tbody')

const CuposElec = document.getElementById("cuposElectricidad")
const CuposGasfi = document.getElementById("cuposGasfiteria")
const CuposExcel = document.getElementById("cuposExcel")

const TotalInscripciones = document.getElementById("TotalInscripciones")

const inputNombre = document.getElementById("nombre")
const selectTipo = document.getElementById("tipoCurso")
const inputCantidad = document.getElementById("cantidadCupos")

const mensajeError = document.getElementById("mensajeError")
const mensajeExito = document.getElementById("mensajeExito")

const montoTotal = document.getElementById("montoTotal")


function RegistrarInscripcion(evento){

    evento.preventDefault();
    
    mensajeError.textContent = '';
    mensajeExito.textContent = '';

    const nombre = inputNombre.value.trim();
    const tipoCurso = selectTipo.value;
    const cantidadCupos = parseInt(inputCantidad.value);

    if (nombre === '' || tipoCurso === '' || inputCantidad.value === ''){
        mensajeError.textContent = 'Todos los campos son obligatorios';
        return;
    };
    if (isNaN(cantidadCupos) || cantidadCupos<= 0){
        mensajeError.textContent = 'La cantidad debe ser un numero entero mayor a cero';
        return;
    };

    const cuposDisponibles = cursos[tipoCurso].cupos;
    if (cantidadCupos > cuposDisponibles){
        mensajeError.textContent = `Cupos insuficientes, le quedan ${cuposDisponibles} entradas ${tipoCurso.toUpperCase()} disponibles`;
        return;
    };
    const total = cantidadCupos * cursos[tipoCurso].precio;
    const compra = {nombre, tipoCurso, cantidadCupos, total};
    inscripciones.push(compra);

    cursos[tipoCurso].cupos -= cantidadCupos
    //ignorado
    mensajeExito.textContent = `Inscripción registradas ${cantidadCupos} cupo(s) ${tipoCurso.toUpperCase()} para ${nombre}`;
    evento.target.reset()
    ActualizarTablaInscripciones();
    actualizarContadoresInscripciones();
};

function ActualizarTablaInscripciones(){
    tbody.innerHTML = '';
    let totalAcumulado = 0;
    inscripciones.forEach(function(compra) {
        const fila = document.createElement('tr');
        fila.classList.add(compra.tipoCurso === 'bg-instalacionesElectricas' ? 'bg-gasfiteria' : 'bg-excelAvanzado');
        fila.innerHTML = `
        <td>${compra.nombre}</td>;
        <td>${compra.tipoCurso.toUpperCase()}</td>;
        <td>${compra.cantidadCupos}</td>;
        <td>${compra.total}</td>;
        `;
        tbody.appendChild(fila);
        totalAcumulado += compra.total;
    });
    montoTotal.textContent = totalAcumulado;
};
function actualizarContadoresInscripciones(){
    CuposElec.textContent = cursos.instalacionesElectricas.cupos;
    CuposGasfi.textContent = cursos.gasfiteria.cupos;
    CuposExcel.textContent = cursos.excelAvanzado.cupos;

    const totalObtenido = inscripciones.reduce(function(acumulador, compra){
        return acumulador + compra.total;
    },0);
    TotalInscripciones.textContent = totalObtenido;
};

form.addEventListener('submit', RegistrarInscripcion);
