//usar socket.io
const socket = io("http://localhost:3500");

let contenido = document.getElementById("contenido");
let send = document.getElementById("send");
let listamensajes = document.getElementById("mensajes");

let USUARIO = {
  _id: "5f8716f9b0b672051a74e4f2",
  nombre: "David",
  apellido: "Cubillos",
  codigo: "1",
};

let mensaje = {
  grupoId: "5f870ebbf014b501e6f1c45c",
  usuario: USUARIO,
  contenido: {},
};

//pedir datos al usuario
USUARIO._id = prompt("Ingresa tu Id");
USUARIO.nombre = prompt("Ingresa tu nombre");
USUARIO.apellido = prompt("Ingresa tu apellido");
USUARIO.codigo = prompt("Ingresa tu codigo");

send.addEventListener("click", () => {
  mensaje.contenido.texto = contenido.value;
  socket.emit("grupo:mensaje", mensaje);
  mensaje.value = "";
});

socket.on(`${mensaje.grupoId}:mensajes`, (data) => {
  console.log(data);

  let fecha = new Date(data.fecha);
  listamensajes.innerHTML += `<p>
  <strong>${
    data.usuario.codigo == USUARIO.codigo ? "Tu" : data.usuario.nombre
  }: </strong>
  <br>
  ${data.texto}
  <br>
  <span style="font-size: .9rem;">${fecha.getHours()}:${fecha.getMinutes()}</span>
  </p>`;
});

socket.on(`${mensaje.usuario.codigo}:notificacion`, (data) => {
  alert(data.mensaje);
});
