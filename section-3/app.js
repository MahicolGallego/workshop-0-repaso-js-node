//seleccionamos el boton para activar la peticion fetch
//agregamos el evento para consumir la api.
document.getElementById("fetch-posts").addEventListener("click", () => {
  //Ejecutamos la funcion completa que nos permite comsumir la api
  //Y mostrar post y ver los errores
  fetchPosts();
});

//funcion expresada que consume la api
const fetchPosts = () => {
  //hacemos la peticion de los datos, nos devuelve una promesa
  fetch("https://jsonplaceholder.typicode.com/posts")
    //.then para deteminar que hacer con la respuesta del fetch
    .then((response) => {
      //si la respuesta no es ok(sino es exitosa), lanzamos una excepcion
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      //si es exitosa con .json() convertimos/parseamos a formato JS los datos que
      //vienen en el cuerpo de nuestra peticion. de cadena de texto Json a -> Objeto JS
      //esto genera de nuevo otra promesa
      return response.json();
    })
    //.then para manejar la respuesta en formato Objetos JS
    .then((posts) => {
      //mostramos los post/data obtenidos con la funcion expresada
      //correspondientes antes creada
      displayPosts(posts);
    })
    .catch((error) => {
      //manejamos los posibles errores con la funcion expresada
      //correspondiente antes creada
      displayError(error);
    });

  /******* POR QUE PODEMOS UTILIZAR LAS FUNCIONES EXPRESADAS
    SI LAS ESTAMOS USANDO ANTES******************************* 
    
    Estas funciones las podemos utilizar por la asincronia, ya
    que la primera accion que se hace al llegar el Hoisting a
    al fetch(fetch es una promesa), por su tipo sube la promesa
    a las micro tareas y continua con la lectura, al avanzar ya se topa
    con las funciones expresadas y realiza las asignaciones. Por
    esto cuando la promesa pasa a ejecutarse podemos usar estas
    funciones aunque en el codigo parezcan estar antes ya que
    por asincronia ya se han asignado antes de que la promesa(fetch)
    se haga efectiva.

  *********************/
};

//Funcion para mostrar la data obtenida
const displayPosts = (posts) => {
  //seleccionamos donde vamos a renderizar
  const postList = document.getElementById("post-list");
  //limpiamos su contenido
  postList.innerHTML = "";
  //con foreach llenamos con la informacion de los posts
  posts.forEach((post) => {
    //creamos el LI deonde iran los datos los datos
    const listItem = document.createElement("li");
    //ponemos el titulo en el LI
    listItem.textContent = `Title: ${post.title}`;
    //lo agregamos al ul
    postList.appendChild(listItem);
  });
};

//Funcion para renderizar errores
const displayError = (error) => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = `Error: ${error.message}`;
};
