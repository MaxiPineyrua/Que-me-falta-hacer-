let tareas = [];

const tareasGuardadas = localStorage.getItem("tareas");
if (tareasGuardadas) {
  tareas = JSON.parse(tareasGuardadas);
}

//Seleccionemos los elementos
const input = document.querySelector("#inputTarea")
const boton = document.querySelector("#btnAgregar")
const lista = document.querySelector("#listaTareas")

//Mostrar tareas guardadas
tareas.forEach(function(tarea, index){
  //Crea el <li>
  const li = document.createElement("li");
  if (tarea.completada){
    li.classList.add("completada", "list-group-item", "d-flex", "justify-content-between", "align-items-center");
  }
  //Contenido del <li>
  li.textContent = tarea.texto + "    ";
  
  //Botón para completar
  const btnCompletar = document.createElement("button");
  btnCompletar.textContent = "✅" + "  ";

  //Evento para completar
  btnCompletar.addEventListener("click", function() {
    li.classList.toggle("completada");
    tareas[index].completada = !tareas[index].completada;
    localStorage.setItem("tareas", JSON.stringify(tareas));
  });

  //Agregar botón de completar al li
  li.appendChild(btnCompletar);

  const btnEliminar =document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  //Evento para eliminar
  btnEliminar.addEventListener("click", function() {
    li.remove();
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));  
  });

  //Agregar botón de eliminar al li
  li.appendChild(btnEliminar);

  //Se agrega a la lista
  lista.appendChild(li);
  
})

//Al hacer click al botón
boton.addEventListener("click", function() {
  //Texto del input
  const texto = input.value;
  if (texto === "") return;
  //Revisamos si la tarea ya existe
  if(tareas.some(tarea => tarea.texto.toLowerCase() === texto.toLowerCase())){
    alert("Esa tarea ya existe! ");
    return;
  }

  //Agregamos el texto a la lista
  const index = tareas.length
  //texto (como objeto) y el estado de completado
  tareas.push ({
    texto: texto,
    completada: false
  })
  localStorage.setItem("tareas", JSON.stringify(tareas));
  //Crea el <li>
  const li = document.createElement("li");
  //Contenido del <li>
  li.textContent = texto + "    ";

  //Botón para completar
  const btnCompletar = document.createElement("button");
  btnCompletar.textContent = "✅" + "  ";

  //Evento para completar
  btnCompletar.addEventListener("click", function() {
    li.classList.toggle("completada");
    tareas[index].completada = !tareas[index].completada;
    localStorage.setItem("tareas", JSON.stringify(tareas));
  });

  //Agregar botón de completar al li
  li.appendChild(btnCompletar);

  //Boton para eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  //Evento para eliminar una tarea
  btnEliminar.addEventListener("click", function() {
    li.remove();
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
  });

  //Agregar botón de eliminar al li
  li.appendChild(btnEliminar);

  //Se agrega a la lista
  lista.appendChild(li);

  //Vaciar el input
  input.value = "";
})

document.addEventListener('DOMContentLoaded' , () => {
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
        emojis: ['✅', '✨', '🥳', '🎉', '🎈', '🎊', '📈' ]
    })
})