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

export function home(){
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

function agregarUsuario(){
    alert('Agregar usuario')
}

function cargarPacientes(){
    const table = document.getElementById('patientsTable');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>1</td>
    <td>Andres Londono</td>
    <td>aflondonol@eafit.edu.co</td>
    `;
    table.appendChild(row);
}

// Cerrar sesión -----------------------------------------------------------------------------------------------------
export function cerrarSesion() {
    document.getElementById('btn-logout').addEventListener('click', () => {
        alert('Funcion para cerrar sesión');
    });
}
