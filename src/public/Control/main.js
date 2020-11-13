const socket = io("http://localhost:3000");

let actGrupo = document.getElementById("update");
let listaGrupos = document.getElementById("listaGrupos");

let grupo = [];

actGrupo.addEventListener("click", function () {
  socket.emit("grupo:addintegrante", null);
});
