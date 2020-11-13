//usar socket.io
const socket = io("http://localhost:3500");

const url = "http://localhost:3500/grupos";
let lista = document.getElementById("listagrupos");
let grupo = document.getElementById("grupo");
let send = document.getElementById("send");

let USUARIO = {
  _id: "1234567890",
  nombre: "David",
  apellido: "Cubillos",
  codigo: "1234567890",
};

axios.get(url).then((response) => {
  //mostrar grupos
  response.data.grupos.map((grupo) => {
    lista.innerHTML += `<p>
    ${grupo.nombre}
    <a
    href="#"
    class="btn-floating btn-large waves-effect waves-light red"
    onclick="addpersona('${grupo._id}')"
  >
    <i class="material-icons">person_add</i>
  </a>
    </p>`;
  });
});

send.addEventListener("click", () => {
  socket.emit("nuevo:grupo", { nombre: grupo.value, persona: USUARIO.codigo });
});

socket.on(`${USUARIO._id}:grupos-lista`, (respuesta) => {
  lista.innerHTML = ``;
  respuesta.data.map((grupo) => {
    lista.innerHTML += `<p>
    ${grupo.nombre} 
    <a
              href="#"
              class="btn-floating btn-large waves-effect waves-light red"
              onclick="addpersona('${grupo._id}')"
            >
              <i class="material-icons">person_add</i>
            </a>
     </p>`;
  });
});

function addpersona(grupoId) {
  let persona = {
    nombre: null,
    apellido: null,
    codigo: null,
  };

  persona.nombre = prompt("Ingresar  nombre");
  persona.apellido = prompt("Ingresar apellido");
  persona.codigo = prompt("Ingresar codigo");

  const data = {
    grupoId,
    persona,
    codigoPersona: USUARIO.codigo,
  };

  socket.emit("grupo:agregar", data);
}

socket.on(`${USUARIO.codigo}:grupo-nuevo`, (respuesta) => {
  alert(respuesta.mensaje);
});

socket.on(`${USUARIO.codigo}:notificacion`, (data) => {
  alert(data.mensaje);
});
