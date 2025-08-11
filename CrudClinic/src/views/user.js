export function UserView() {
  return `
    <h1>Usuario</h1>
    <button id="btn-user">Presióname</button>
  `;
}

export function setupUser() {
  document.getElementById('btn-user').addEventListener('click', () => {
    alert('Hola Usuario');
  });
}
