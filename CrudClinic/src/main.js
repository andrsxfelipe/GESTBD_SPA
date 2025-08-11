import { router,admin } from './router.js';


if (true) { // Si es admin
    // Logica para obtener el rol
    location.hash = 'admin';
} // Si es user
// Si no esta logeado (mandara a login), el rol será null

// Se le pasara el rol a la funcion router
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
