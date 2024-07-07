document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 1500,
      stock: 10,
    },
    {
      id: 2,
      name: "Smartphone",
      category: "Electronics",
      price: 800,
      stock: 20,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Electronics",
      price: 100,
      stock: 30,
    },
    { id: 4, name: "T-shirt", category: "Clothing", price: 20, stock: 50 },
    { id: 5, name: "Jeans", category: "Clothing", price: 50, stock: 40 },
    { id: 6, name: "Sneakers", category: "Clothing", price: 80, stock: 30 },
    {
      id: 7,
      name: "Backpack",
      category: "Accessories",
      price: 40,
      stock: 25,
    },
    { id: 8, name: "Watch", category: "Accessories", price: 60, stock: 20 },
    {
      id: 9,
      name: "Sunglasses",
      category: "Accessories",
      price: 30,
      stock: 35,
    },
  ];

  /*1. Visualización de Productos:

    La aplicación debe mostrar una lista de productos en la página. Puedes interactuar con el DOM o con la consola del navegador.
    Concepto de JavaScript aplicado: Manipulación del DOM, forEach. */

  //Seleccionar el botón

  const $allProductsButton = document.getElementById("all-products-button");
  // console.log($allProductsButton);

  //Añadir la funcionalidad

  $allProductsButton.addEventListener("click", () => {
    displayProducts(products);
  });

  /*2.  Calcular el Precio Total:

    La aplicación debe calcular y mostrar el precio total de todos los productos utilizando el método reduce.
    Concepto de JavaScript aplicado: reduce.*/

  //Seleccionar el botón

  const $totalStockPriceButton = document.getElementById(
    "total-value-stock-button"
  );
  // console.log($totalStockPriceButton);

  //Añadir la funcionalidad

  $totalStockPriceButton.addEventListener("click", () => {
    calculateTotalStockPrice(products);
  });

  /*3.  Filtrar Productos por Categoría:

    La aplicación debe permitir filtrar productos por categoría utilizando el método filter.
    Concepto de JavaScript aplicado: filter.*/

  //Seleccionar el botón

  const $categoryFilterButton = document.getElementById(
    "category-filter-button"
  );
  // console.log($categoryFilterButton);

  //Añadir la funcionalidad

  $categoryFilterButton.addEventListener("click", function () {
    productsByCategory(products);
  });

  /*4.  Buscar un Producto por Nombre:

    La aplicación debe permitir buscar un producto específico por su nombre utilizando el método find.
    Concepto de JavaScript aplicado: find.*/

  //Seleccionar el botón

  const $nameFilterButton = document.getElementById("name-filter-button");
  // console.log($nameFilterButton);

  //Añadir la funcionalidad

  $nameFilterButton.addEventListener("click", () => {
    productByName(products);
  });

  /*5.  Verificar Disponibilidad de Productos:

    La aplicación debe verificar si todos los productos están disponibles utilizando el método every.
    Concepto de JavaScript aplicado: every.*/

  //Seleccionar el botón

  const $productsAvailabilityButton = document.getElementById(
    "products-availability-button"
  );
  // console.log($productsDisponibilityButton);

  //Añadir la funcionalidad

  $productsAvailabilityButton.addEventListener("click", () => {
    checkProductsAvailability(products);
  });

  /*6  Obtener Nombres de Productos:

    La aplicación debe crear una lista con los nombres de todos los productos utilizando el método map.
    Concepto de JavaScript aplicado: map.*/

  //Seleccionar el botón

  const $allNameProductsButton = document.getElementById(
    "all-name-products-button"
  );
  // console.log($allNameProductsButton);

  //Añadir la funcionalidad
  $allNameProductsButton.addEventListener("click", () => {
    displayNamesProducts(products);
  });

  //--------------------------------------------------------------------------------------

  //Funcion -> Mostrar todos los productos

  const displayProducts = (products) => {
    //obtenemos la tabla donde se mostrara la informacion
    const $tableBody = document.getElementsByTagName("table")[0];
    // console.log($tableBody);
    //Iniciamos el contenido con las cabeceras
    $tableBody.innerHTML = /*html*/ `
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      `;

    //Insertamos el contenido por medio del Foreach
    products.forEach((product) => {
      //Creamos las filas para cada producto
      const $row = document.createElement("TR");
      //Creamos y llenamos las cerda para cada dato
      const $tdName = document.createElement("TD");
      $tdName.textContent = product.name;

      const $tdCategory = document.createElement("TD");
      $tdCategory.textContent = product.category;

      const $tdPrice = document.createElement("TD");
      $tdPrice.textContent = `$${product.price}`;

      const $tdStock = document.createElement("TD");
      $tdStock.textContent = product.stock;

      //añadimos la info a la fila
      $row.appendChild($tdName);
      $row.appendChild($tdCategory);
      $row.appendChild($tdPrice);
      $row.appendChild($tdStock);

      //añadimos la fila a la tabla
      $tableBody.appendChild($row);
    });
  };

  //--------------------------------------------------------------------------------------

  //Funcion -> Calcular precio total del stock

  const calculateTotalStockPrice = function (products) {
    const totalPrice = products.reduce((totalAccum, currentlyProduct) => {
      totalAccum += currentlyProduct.price * currentlyProduct.stock;
      return totalAccum;
    }, 0);

    const $tableBody = document.getElementsByTagName("table")[0];

    //Iniciamos el contenido con las cabeceras
    $tableBody.innerHTML = /*html*/ `
        <tr>
          <th>Total Stock Price</th>
        </tr>
      `;

    const $row = document.createElement("TR");
    //Creamos y llenamos la celda
    const $tdTotalStockprice = document.createElement("TD");
    $tdTotalStockprice.textContent = `$${totalPrice}`;

    //añadimos la info a la fila

    $row.appendChild($tdTotalStockprice);
    //añadimos la fila a la tabla
    $tableBody.appendChild($row);
  };

  //--------------------------------------------------------------------------------------

  //Funcion -> Mostrar productos por categoria

  function productsByCategory(products) {
    //obtenemos el valor del select escogido

    const categorySelected = document.getElementById("select-category").value;

    if (!categorySelected) {
      alert("Debes seleccionar una categoria");
      return;
    }

    const productsByCategory = products.filter(
      (product) => product.category === categorySelected
    );

    console.log(productsByCategory);

    if (!productsByCategory) {
      alert("No hay productos en esta categoria");
      return;
    }

    displayProducts(productsByCategory);
  }

  //--------------------------------------------------------------------------------------

  //Funcion -> Buscar producto por nombre

  function productByName(products) {
    //obtener el nombredel input
    const productName = document.querySelectorAll("[type='text']")[0].value;

    //si no se halla el producto salimos
    if (!productName) {
      alert("Debes introducir un nombre");
      return;
    }

    const productFound = products.find(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    );

    if (!productFound) {
      alert("El producto buscado no existe");
      return;
    }

    //Si hay coincidencias mostramos los datos

    const $tableBody = document.getElementsByTagName("table")[0];

    //Iniciamos el contenido con las cabeceras
    $tableBody.innerHTML = /*html*/ `
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      `;
    //Creamos las filas para cada producto
    const $row = document.createElement("TR");
    //Creamos y llenamos las cerda para cada dato
    const $tdName = document.createElement("TD");
    $tdName.textContent = productFound.name;

    const $tdCategory = document.createElement("TD");
    $tdCategory.textContent = productFound.category;

    const $tdPrice = document.createElement("TD");
    $tdPrice.textContent = `$${productFound.price}`;

    const $tdStock = document.createElement("TD");
    $tdStock.textContent = productFound.stock;

    //añadimos la info a la fila

    $row.appendChild($tdName);
    $row.appendChild($tdCategory);
    $row.appendChild($tdPrice);
    $row.appendChild($tdStock);
    //añadimos la fila a la tabla
    $tableBody.appendChild($row);
  }

  //--------------------------------------------------------------------------------------

  //Funcion -> Verificar Disponibilidad de Productos

  const checkProductsAvailability = (products) => {
    //checamos si todos los productos cumplen
    const checkEveryProductsOk = products.every((product) => product.stock > 0);

    //si no cumplen
    if (!checkEveryProductsOk) {
      alert("No todos los productos cuentan con disponibilidad de stock");
    } else {
      alert("Todos los productos cuentan con disponibilidad de stock");
    }

    //Si every
    displayProducts(products);
  };

  //--------------------------------------------------------------------------------------

  //Funcion -> Mostrar todos los nombres de los productos

  const displayNamesProducts = (products) => {
    //Tomamos solo los names
    const allNamesProducts = products.map((product) => product.name);

    //obtenemos la tabla donde se mostrara la informacion
    const $tableBody = document.getElementsByTagName("table")[0];

    //Iniciamos el contenido con las cabeceras
    $tableBody.innerHTML = /*html*/ `
        <tr>
          <th>Name</th>
        </tr>
      `;

    //Insertamos el contenido por medio del Foreach
    allNamesProducts.forEach((nameProduct) => {
      //Creamos las filas para cada producto
      const $row = document.createElement("TR");

      //Creamos y llenamos las cerda para cada dato
      const $tdName = document.createElement("TD");
      $tdName.textContent = nameProduct;

      //añadimos la info a la fila
      $row.appendChild($tdName);

      //añadimos la fila a la tabla
      $tableBody.appendChild($row);
    });
  };
});
