//usar socket.io
const socket = io("http://localhost:3500");

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let codigo = document.getElementById("codigo");
let send = document.getElementById("send");

let USUARIO = {
  _id: "1234567890",
  nombre: "David",
  apellido: "Cubillos",
  codigo: "1234567890",
};

send.addEventListener("click", () => {
  let persona = {
    nombre: nombre.value,
    apellido: apellido.value,
    codigo: codigo.value,
    id_persona: USUARIO.codigo,
  };

  console.log("persona", persona);

  socket.emit("persona:nueva", persona);
});

socket.on(`${USUARIO.codigo}:notificacion`, (data) => {
  alert(data.mensaje);
});
