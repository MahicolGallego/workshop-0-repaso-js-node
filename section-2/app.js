//Definimos la clase Task
class Note {
  //creamos el constructor de la clase
  constructor(id, description, important = false) {
    //asignamos como valores para los atributos los argumentos que
    //se pasen
    this.id = id;
    this.description = description;
    this.important = important;
  }

  toggleImportant() {
    //cambiamos la importancia de la nota
    this.important = !this.important;
  }
}

//Se crea la clase NoteManager donde se realizar el crud para que
//el usuario puede interactuar

class NoteManager {
  //creamos el constructor de la clase
  constructor() {
    //Seteamos la lista de task con contenido si ya existe en el localstorage
    //sino, lista vacia
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];

    //renderizamos las notas
    this.renderNotes();
  }

  //creamos el método addTask que añade una nueva tarea a la lista
  //y solicita description como parametro

  addNote(description) {
    //Generamos un id para la nota y la creamos con la descripción dada
    //con el operador ternario si ya existen notas registradas, incrementamos el id
    //sino el primer el id sera 1

    const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;

    //Hacemos uso de la clase Note e instanciamos la nota con sus
    //Atributos y sus metodos

    const note = new Note(id, description);

    //Añadimos la nota a la lista
    //Se guarda de nuevo la lista en la localstorage y se renderiza

    this.notes.push(note);

    //Se guarda de nuevo la lista en la localstorage y se renderiza
    this.saveNotes();
    this.renderNotes();
  }

  //creamos el metodo para cambiar el estado de la nota a importante
  toggleNoteImportant(id) {
    //haciendo uso del id encontramos la nota objetivo
    const note = this.notes.find((note) => note.id === id);

    if (note) {
      //instanciamos de nuevo como clase por si se ha recargado
      //el sitio y bajamos una lista ya existente del localstorage
      //ya que asi, JSON al ejecutar .parse le quita la cualidad
      //de instancia de clase, por ello la volvemos a instanciarla
      //para evitar que pueda que no se ejecute toggleImportant
      //por ya ser un objetno normal y no contar con el metodo

      //instanciamos una nueva copia con la informacion de la nota

      const noteInstantiatedAgain = new Note(
        note.id,
        note.description,
        note.important
      );

      //ya como instancia nuevamente
      //cambiamos su estado important con su metodo toggle

      noteInstantiatedAgain.toggleImportant();

      //reemplazamos el objeto/instancia anterior, con la nueva
      //que se instacio nuevamente

      this.notes = this.notes.map((note) =>
        note.id === id ? noteInstantiatedAgain : note
      );

      //Se guarda de nuevo la lista en la localstorage y se renderiza
      this.saveNotes();
      this.renderNotes();
    }

    //Se guarda de nuevo la lista en la localstorage y se renderiza
  }

  //creamos el metodo para subir la lista al localstorage
  saveNotes() {
    //subimos al localstorage la lista actual al momento
    //Para esto lo subimos como una cadena JSON con stringify
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  //creamos el metodo editar que recibe como parametro el id
  editNote(id) {
    //haciendo uso del id encontramos la tarea objetivo
    const note = this.notes.find((note) => note.id === id);

    if (note) {
      //Preguntamos por el nuevo dato
      const newDescription = prompt(
        "Indica la nueva descripcion para la nota"
      ).trim();
      //verificamos si si hay dato nuevo
      if (newDescription) {
        //le cambiamos el atributo desde la nota directamente, no desde su metodo
        note.description = newDescription;
      }

      //Se guarda de nuevo la lista en la localstorage y se renderiza
      this.saveNotes();
      this.renderNotes();
    }
  }

  //definimos deleteNote que solicita el id como parametro
  deleteNote(id) {
    //haciendo uso del id con filter le asignamos un nuevo arreglo a las notes exceptuando la nota a eliminar
    this.notes = this.notes.filter((note) => note.id !== id);

    //Se guarda de nuevo la lista en la localstorage y se renderiza
    this.saveNotes();
    this.renderNotes();
  }

  renderNotes() {
    //obtenemos el elemento donde se renderizaran las notas
    const $noteList = document.getElementById("note-list");
    //lo seteamos siempre a vacia
    $noteList.innerHTML = "";

    //llenamos el elemento con las notas haciendo uso de forEach
    this.notes.forEach((note) => {
      //creamos un li para la nota
      const $item = document.createElement("LI");

      //le agregamos como contenido la descripcion
      $item.innerHTML = `<p>${note.description}</p>`;

      //agregamos la clase important basandonos en el atributo de la instancia
      $item.classList.add(`${note.important === true ? "important" : "NA"}`);

      //creamos botones y sus caracteristicas y accion(logica)

      //important note

      const $importantButton = document.createElement("BUTTON");

      //verificamos si las notas ya han marcadas como importante y agregamos estilos
      //para diferenciarlos
      if ($item.className.includes("important")) {
        $item.innerHTML += "<p>Importante</p>";
        $importantButton.textContent = "Normal";
      } else {
        $importantButton.textContent = "Importante";
      }

      $importantButton.classList.add("btn-important");
      $importantButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleNoteImportant(note.id);
      });

      //edit note

      const $editButton = document.createElement("BUTTON");
      $editButton.textContent = "Editar";
      $editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.editNote(note.id);
      });

      //delete note

      const $deleteButton = document.createElement("BUTTON");
      $deleteButton.textContent = "Eliminar";
      $deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteNote(note.id);
      });

      //agregamos los botones al item
      $item.appendChild($editButton);
      $item.appendChild($deleteButton);
      $item.appendChild($importantButton);

      //agregamos el item al elemento noteList
      $noteList.appendChild($item);
    });
  }
}

//Cuando carga el DOM arrancamos
document.addEventListener("DOMContentLoaded", () => {
  //Instancionamos la

  const noteManager = new NoteManager();
  //obtenemos el boton para añadir notas y asignamos el evento
  document.getElementById("add-note").addEventListener("click", () => {
    //obtenemos la descripcion de la tarea desde el input

    const newNote = document.getElementById("new-note").value;

    //si hay note designada la añadimos a la lista
    if (newNote) {
      noteManager.addNote(newNote);

      //seteamos el input de nuevo a vacio
      document.getElementById("new-note").value = "";
    }
  });
});
