import { AdminView, pacientes, home, cerrarSesion } from './views/admin.js';
import { UserView, setupUser } from './views/user.js';

export function admin() {
}

export function router() {

    // TODO LO DEL ADMIN
    // Aquí se implementara un if para validar si la variable rol = 'admin', se le pasara como parametro a la funcion router
    if (true) {
        const app = document.getElementById('container')
        app.innerHTML = AdminView()
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
                contentadm.innerHTML = `<h2>Medicos: </h2>`
                break;
            case 'admin/citas':
                contentadm.innerHTML = `<h2>Citas: </h2>`
                break;
            case 'admin/otros':
                contentadm.innerHTML = `<h2>Otra info: </h2>`
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
