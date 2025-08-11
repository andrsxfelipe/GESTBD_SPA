import { AdminView, home, pacientes, agregarPaciente,medicos, cerrarSesion, citas, otraInfo } from './views/admin.js';
import { UserView, setupUser } from './views/user.js';

export function admin() {
    const app = document.getElementById('container')
    app.innerHTML = AdminView()
}

export function router() {

    // TODO LO DEL ADMIN
    // Aquí se implementara un if para validar si la variable rol = 'admin', se le pasara como parametro a la funcion router
    if (true) {

        const contentadm = document.getElementById('admin-content');
        const route = location.hash.slice(1);
        cerrarSesion();
        switch (route) {
            case 'admin':
                home();
                break;
            case 'admin/pacientes':
                pacientes();
                break;
            case 'admin/medicos':
                medicos();
                break;
            case 'admin/citas':
                citas();
                break;
            case 'admin/otros':
                otraInfo();
                break;
            case 'admin/agregar':
                agregarPaciente();
                break;
            default:
                contentadm.innerHTML = `<h1>404 - Página no encontrada</h1>`;
        }
    } else if (false) { // Si es usuario
        pass;
    } else { // Si el rol es null, entonces habran dos casos: login y default, 
        // el default mostratá un letrero grande que no tiene acceso, primero logeese

    }

}
