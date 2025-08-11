export function AdminView() {
    return `
    <nav id=nav_bar>
        <a href=#admin>Home</a>
        <a href=#admin/pacientes>Pacientes</a>
        <a href=#admin/medicos>Médicos</a>
        <a href=#admin/citas>Citas</a>
        <a href=#admin/otros>Otra info</a>
        <button id='btn-logout'>Logout</button>
    <nav>
    <div id="admin-content">
    </div>
  `;
}

// Home ---------------------------------------------------------------------------------------------------

export function home() {
    let content = document.getElementById('admin-content');
    content.innerHTML = ''
    content.innerHTML = `
    <h2> Bienvenido, admin</h2>`
}

// Ventana Pacientes ---------------------------------------------------------------------------------------

export function pacientes() {
    let content = document.getElementById('admin-content');
    content.innerHTML = ''
    content.innerHTML = `
    <button id='btn-addUser'>Agregar paciente</button>
    <table id="patientsTable">
        <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Correo electrónico</th>
            <th></th>
        </tr>
    </table>  
    `;
    document.getElementById('btn-addUser').addEventListener('click', (e) => {
        e.preventDefault();
        //Funcion para agregar usuario
        agregarUsuario();
    })

    //Función para agregar datos a la tabla, se hará mediante un fetch
    cargarPacientes();
}

function agregarUsuario() {
    alert('Agregar usuario')
}

function cargarPacientes() {
    fetch('http://localhost:3000/patients')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la consulta al servidor');
            }
            return response.json();
        })
        .then(data => {
            const table = document.getElementById('patientsTable');
            data.forEach(element => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${element.id_paciente}</td>
                <td>${element.nombre}</td>
                <td>${element.correo}</td>
                <td><button id=editPatient>Editar</button></td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => {
            alert('Error al cargar los datos: ', error)
        });
}

// Ventana Medicos ----------------------------------------------------------------------------------------------------------
export function medicos() {
    let content = document.getElementById('admin-content');
    content.innerHTML = ''
 
    cargarMedicos();
}

function cargarMedicos() {
    let content = document.getElementById('admin-content');
    fetch('http://localhost:3000/medicos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la consulta del servidor');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                content.innerHTML += `
                <h2>Medico: </h2>
                <h3>${element.medico}</h3>
                <h3>Especialidades: ${element.especialidades}</h3>
                `
            });
        })
        .catch(error => {
            alert('Error al cargar los datos: ',error)
        });
}

// Cerrar sesión -----------------------------------------------------------------------------------------------------
export function cerrarSesion() {
    document.getElementById('btn-logout').addEventListener('click', () => {
        alert('Funcion para cerrar sesión');
    });
}
