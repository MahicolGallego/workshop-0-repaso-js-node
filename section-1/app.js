//Definimos la clase Task
class Task {
  //creamos el constructor de la clase
  constructor(id, description, completed = false) {
    //asignamos como valores para los atributos los argumentos que
    //se pasen
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

//Se crea la clase taskManager donde se realizar el crud para que
//el usuario puede interactuar

class TaskManager {
  //creamos el constructor de la clase
  constructor() {
    //Seteamos la lista de task con contenido si ya existe en el localstorage
    //sino, lista vacia
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    //si bajamos los datos de la localastorage, significa que ya es un objeto comun
    //y no una instancia de clase, por lo cual ya no tendran los metodos
    //Para solucionar re asignamos tasks con un array con los elementos de nuevo instanciado
    if (this.tasks.length) {
      this.tasks = this.tasks.map((task) => {
        const taskInstantiatedAgain = new Task(
          task.id,
          task.description,
          task.completed
        );

        return taskInstantiatedAgain;
      });
    }

    // console.dir(this.tasks);

    //-> Se omite loadTasks, ya que solo llama a renderTask
    //y se llama a renderTask directamente
    //this.loadTasks();
    this.renderTasks();
  }

  //creamos el método addTask que añade una nueva tarea a la lista
  //y solicita description como parametrp
  addTask(description) {
    //Generamos un id para la tarea y la creamos con la descripción dada
    //con el operador ternario si ya existen tareas registradas, incrementamos el id
    //sino la primera el id sera 1
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;

    //Hacemos uso de la clase Task e instanciamos la tarea con sus
    //Atirbutos y sus metodos
    const task = new Task(id, description);

    //Añadimos la tarea a la lista y actualizamos/las guardamos de nuevo en el localstorage
    this.tasks.push(task);
    this.saveTasks();

    //Renderizamos de nuevo las tareas
    this.renderTasks();
  }

  //creamos el metodo editar que recibe como parametro el id
  editTask(id) {
    //haciendo uso del id encontramos la tarea objetivo
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      //Preguntamos por el nuevo dato
      const newDescription = prompt(
        "Indica la nueva descripcion para la tarea"
      ).trim();

      //verificamos si si hay dato nuevo
      if (newDescription) {
        //le cambiamos el atributo desde la tarea directamente, no desde su metodo
        task.description = newDescription;
      } else {
        alert("sin cambios");
      }

      //Se guarda de nuevo la lista en la localstorage y se renderiza
      this.saveTasks();
      this.renderTasks();
    }
  }

  //definimos deleteTaks que solicita el id como parametro
  deleteTask(id) {
    //haciendo uso del id con filter le asignamos un nuevo arreglo a las tasks exceptuando la tarea a eliminar
    this.tasks = this.tasks.filter((task) => task.id !== id);

    //Se guarda de nuevo la lista en la localstorage y se renderiza
    this.saveTasks();
    this.renderTasks();
  }

  //creamos el metodo para cambiar el estado de la tarea a completado
  toggleTaskComplete(id) {
    //haciendo uso del id encontramos la tarea objetivo
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      //No utilizamos el metodo ya que lo quitamos por problemas con
      //el tipo instancia al recuperarlos desde la localstorage
      task.toggleComplete();

      //le cambiamos el atributo desde la tarea directamente, no desde su metodo
      // task.completed = !task.completed;

      //Se guarda de nuevo la lista en la localstorage y se renderiza
      this.saveTasks();
      this.renderTasks();
    }
  }

  //creamos el metodo para subir la lista al localstorage

  saveTasks() {
    //subimos al localstorage la lista actual al momento
    //Para esto lo subimos como una cadena JSON con stringify
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  //-> Se omite, ya que solo llama a renderTask
  // loadTasks() {
  //   this.renderTasks();
  // }

  renderTasks() {
    //obtenemos el elemento donde se renderizaran las tareas
    const $taskList = document.getElementById("task-list");
    //lo seteamos siempre a vacia
    $taskList.innerHTML = "";

    //llenamos el elemento con las tareas haciendo uso de forEach
    this.tasks.forEach((task) => {
      //creamos un li para la tarea
      const $item = document.createElement("li");

      //le agregamos como contenido la descripcion
      $item.textContent = task.description;

      //agregamos la clase completed basandonos en el atributo de la instancia
      //corregimos a agregar por medio de classList
      // $item.className = task.completed ? "completed" : "";

      $item.classList.add(`${task.completed === true ? "completed" : "NA"}`);

      //verificamos si las tareas ya han sido completadas y agregamos estilos
      //para diferenciarlos
      if ($item.className.includes("completed")) {
        $item.style.backgroundColor = "yellow";
      } else {
        $item.style.backgroundColor = null;
      }
      //le quitamos la responsabilidad de completar al padre y la ejecutamos con BTN
      // item.addEventListener("click", () => this.toggleTaskComplete(task.id));

      //creamos botones y sus caracteristicas y accion(logica)

      //completar tarea
      const $completedButton = document.createElement("BUTTON");
      $completedButton.textContent = "Completar";
      $completedButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleTaskComplete(task.id);
      });

      //editar tarea
      const $editButton = document.createElement("BUTTON");
      $editButton.textContent = "Editar";
      $editButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
        this.editTask(task.id);
      });

      //borrar tarea
      const $deleteButton = document.createElement("BUTTON");
      $deleteButton.textContent = "Eliminar";
      $deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
        this.deleteTask(task.id);
      });

      //agregamos los botones al item
      $item.appendChild($editButton);
      $item.appendChild($deleteButton);
      $item.appendChild($completedButton);

      //agregamos el item al elemento taskList
      $taskList.appendChild($item);
    });
  }
}

//Cuando carga el DOM arrancamos
document.addEventListener("DOMContentLoaded", () => {
  //Instancionamos la taskManager
  const taskManager = new TaskManager();

  //obtenemos el boton para añadir taks y asignamos el evento
  document.getElementById("add-task").addEventListener("click", () => {
    //obtenemos la descripcion de la tarea desde el input
    const newTask = document.getElementById("new-task").value;
    if (newTask) {
      //si hay tarea designada la añadimos a la lista
      taskManager.addTask(newTask);

      //seteamos la tareas el input de nuevo a vacio
      document.getElementById("new-task").value = "";
    }
  });
});
