document.addEventListener("DOMContentLoaded", () => {
  //Tomamos lo botones y damos funcionalida

  //Button consultar todos los productos
  const $allProductsButton = document.getElementById(
    "fetch-all-products-button"
  );

  //   console.log($allProductsButton);

  //Event consultar todos los productos
  $allProductsButton.addEventListener("click", () => {
    fetchAllProducts();
  });

  //Button consultar por categoria
  const $filterByCategoryProductsButton = document.getElementById(
    "category-filter-button"
  );
  //   console.log($filterByCategoryProductsButton);

  //Event consultar productos por categorias

  $filterByCategoryProductsButton.addEventListener("click", () => {
    /*** SINO FUNCIONA REVISAR LAS REFERENCIAS DE ID DE LA API PLATZI 
    YA QUE ESTAS CAMBIAN EN LA API EN EL TIEMPO Y MODIFICARLA EN EL
    SELECT EN EL HTML ***/
    fetchPerCategoryProducts();
  });

  //Button consultar por nombre
  const $filterByNameProductsButton =
    document.getElementById("name-filter-button");
  //   console.log($filterByNameProductsButton);

  //Event consultar productos por nombre
  $filterByNameProductsButton.addEventListener("click", () => {
    fetchPerNameProducts();
  });

  //Definimos la funcion para el fetch de todos los products
  function fetchAllProducts() {
    //Hacemos la peticion fetch a la api}
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Respuesta dice peticion no esta ok: " + response.statusText
          );
        }
        //Si la peticion es ok, parseamos el json
        return response.json();
      })
      .then((dataproducts) => {
        showProducts(dataproducts);
      })
      .catch((err) => {
        //Renderizar errores
        displayError(err);
      });
  }

  //Definimos la funcion para el fetch filtrado por categorias
  function fetchPerCategoryProducts() {
    //obtenemos el valor del select escogido

    const categorySelected = document.getElementById("select-category").value;

    if (!categorySelected) {
      alert("Debes seleccionar una categoria");
      return;
    }

    // console.log(categorySelected);

    //Hacemos la peticion fetch con la categoria seleccionada la api}
    fetch(
      `https://api.escuelajs.co/api/v1/products/?categoryId=${categorySelected}`
    )
      .then((response) => {
        //Lanzamos error si la peticion no es exitosa
        if (!response.ok) {
          throw new Error(
            "Respuesta dice peticion no esta ok: " + response.statusText
          );
        }
        //Si la peticion es ok, parseamos a Json
        return response.json();
      })
      //mostramos los datos
      .then((dataproducts) => {
        console.log(dataproducts);
        showProducts(dataproducts);
      })
      .catch((err) => {
        //Renderizar errores
        displayError(err);
      });
  }

  //Definimos la funcion para el fetch filtrado por categorias
  async function fetchPerNameProducts() {
    //obtener el nombredel input
    const productName = document.querySelectorAll("[type='text']")[0].value;

    //si esta vacio salimos
    if (!productName) {
      alert("Debes introducir un nombre");
      return;
    }

    try {
      //hacemos la peticion fetch por el valor solicitado
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${productName}`
      );

      //Lanzamos error si la peticion no es exitosa
      if (!response.ok) {
        throw new Error(
          "Respuesta dice peticion no esta ok: " + response.statusText
        );
      }

      //Si la peticion esta ok paraseamos a JSON
      const dataProductsJson = await response.json();

      //verificamos que si hay datos por coincidencias
      if (!dataProductsJson.length) {
        alert("No hay productos con este nombre");
        return;
      }

      //Si hay coincidencias mostramos los datos
      showProducts(dataProductsJson);
    } catch (err) {
      //Renderizar errores
      displayError(err);
    }
  }

  //Funcion para mostrar los productos
  const showProducts = (products) => {
    //obtenemos la tabla donde se mostrara la informacion
    const $tableBody = document.getElementsByTagName("table")[0];
    // console.log($tableBody);
    //Iniciamos el contenido con las cabeceras
    $tableBody.innerHTML = /*html*/ `
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      `;

    //Insertamos el contenido por medio del Foreach
    products.forEach((product) => {
      //Creamos las filas para cada producto
      const $row = document.createElement("TR");
      //Creamos y llenamos las celdas para cada dato
      const $tdName = document.createElement("TD");
      $tdName.textContent = product.title;

      const $tdPrice = document.createElement("TD");
      $tdPrice.textContent = `$${product.price}`;

      const $tdDescription = document.createElement("TD");
      $tdDescription.textContent = product.description;

      const $tdCategory = document.createElement("TD");
      $tdCategory.textContent = product.category.name;

      //añadimos la info a la fila

      $row.appendChild($tdName);
      $row.appendChild($tdPrice);
      $row.appendChild($tdDescription);
      $row.appendChild($tdCategory);
      //añadimos la fila a la tabla
      $tableBody.appendChild($row);
    });
  };

  //Funcion para mostrar errores
  const displayError = function (error) {
    const $showErrorMessage = document.getElementById("error-message");
    $showErrorMessage.textContent = `Throw Error: ${error.message}`;
  };
});
