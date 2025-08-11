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
        location.hash = 'admin/agregar';
    })

    //Función para agregar datos a la tabla, se hará mediante un fetch
    cargarPacientes();
}

export function agregarPaciente() {
    let content = document.getElementById('admin-content');
    content.innerHTML = ''
    content.innerHTML = `
    <form id="add-user-form">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required />

    <label for="correo">Correo:</label>
    <input type="email" id="correo" name="correo" required />

    <button type="submit">Agregar Usuario</button>
    </form> 
    `;
    document.getElementById('add-user-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("hola")
    })

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
            alert('Error al cargar los datos: ', error)
        });
}

// Citas

export function citas() {
    let content = document.getElementById('admin-content');
    content.innerHTML = ''
    content.innerHTML = `
    <button id='btn-addAppt'>Agregar cita</button>
    <table id="apptsTable">
        <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Correo</th>
            <th>Medico</th>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Descripcion</th>
            <th>Sede</th>
            <th>Metodo de pago</th>
            <th>Estado</th>
            <th></th>
        </tr>
    </table>
    `;
    cargarCitas();
}

function cargarCitas() {
    let content = document.getElementById('admin-content');
    fetch('http://localhost:3000/appts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la consulta del servidor');
            }
            return response.json();
        })
        .then(data => {
            const table = document.getElementById('apptsTable');
            data.forEach(i => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${i.id_cita}</td>
                <td>${i.paciente}</td>
                <td>${i.correo}</td>
                <td>${i.medico}</td>
                <td>${i.especialidad}</td>
                <td>${i.fecha.split('T')[0]}</td>
                <td>${i.hora}</td>
                <td>${i.motivo}</td>
                <td>${i.descripcion}</td>
                <td>${i.sede}</td>
                <td>${i.metodo}</td>
                <td>${i.status}</td>
                <td><button id=editAppt>Editar</button></td>
                `
                table.appendChild(row);
            });
        })
}

// Otra info
export function otraInfo() {
    let content = document.getElementById('admin-content');
    content.innerHTML = `
    <h2>Motivos de consulta: </h2>
    <div id='otrainfo-motivos'></div>
    <h2>Métodos de pago: </h2>
    <div id='otrainfo-pay'></div>
    <h2>Sedes: </h2>
    <div id='otrainfo-sedes'></div>
    `
    cargarOtraInfo();
}

function cargarOtraInfo() {
    fetch('http://localhost:3000/otrainfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la consulta');
            }
            return response.json();
        })
        .then(data => {
            const motivos = document.getElementById('otrainfo-motivos');
            const pay = document.getElementById('otrainfo-pay');
            const sedes = document.getElementById('otrainfo-sedes');
            data.motivos.forEach(element => {
                const row = document.createElement('h3');
                row.innerHTML = element.motivo;
                motivos.appendChild(row)
            });
            data.pagos.forEach(element => {
                const row = document.createElement('h3');
                row.innerHTML = element.metodo;
                pay.appendChild(row)
            });
            data.ubis.forEach(element => {
                const row = document.createElement('h3');
                row.innerHTML = element.ubicacion;
                sedes.appendChild(row)
            });
        })
        .catch(error => {
            console.log('Error al traer la info: ', error)
        })
}

// Cerrar sesión -----------------------------------------------------------------------------------------------------
export function cerrarSesion() {
    document.getElementById('btn-logout').addEventListener('click', () => {
        alert('Funcion para cerrar sesión');
    });
}
