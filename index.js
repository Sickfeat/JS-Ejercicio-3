//To Do
//1) Almacenar todas las variables Necesarias ✅
//2) Crear funcion Init ✅
// 3) enlazar el evento del form con el submit ✅
//4) crear un validador para el submit de tipo numero no disponible ✅
//5) Crear un render para el validador de submit ✅
//6) crear un validador si no se ingreso un numero ✅
//7) crear un render si no se ingreso un numero
//8) crear una funcion con find para encontrar la pizza seleccionada con el input✅
//9) Crear el render con la card del find seleccionado ✅
//10)Guardar en el local storage LA ULTIMA PIZZA RENDERIZADA, no los mensajes de error.

const pizzasInfo = document.querySelector(".pizzas__container");
const pizzasForm = document.querySelector(".pizzas__form");
const pizzasInput = document.querySelector(".pizzas__input");
const pizzasRender = document.querySelector(".pizzas__render");

const pizzas =  [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];



// PARAMETROS NUMERICOS
const MIN_NUMBER = 1;
const MAX_NUMBER = 5;


// Funcion validadora
const validarPizza = (taskName, min, max) => {
  let isValid = true;

  if (taskName < min || taskName > max) {
    pizzasRender.innerHTML = ` <h2> ERROR: Por favor ingresa un numero valido (Del ${MIN_NUMBER} al ${MAX_NUMBER})</h2>`;
    isValid = false;
  } 
   if (!taskName.length) {
    pizzasRender.innerHTML = ` <h2> ERROR: Por favor ingresa un numero</h2>`;
    isValid = false;
  }
  return isValid;
};

// funcion crear html
const crearPizza = (task) => {
  return `<div class="pizza__card">
  <h2 class="pizza__name">${task.nombre}</h2>
  <p class="pizza__card-p">Precio: <span class="pizza__span">$${task.precio}</span></p>
  <p class="pizza__card-p">Ingredientes: ${task.ingredientes.toString()} </p>
  <img src="${task.imagen}" class="pizza__img"/>
  </div>`;
};

// Funcion renderizar Pizza
const renderizarPizza = (pizza) => {
  if (pizza) {
    const pizzaHTML = crearPizza(pizza);
    pizzasRender.innerHTML = pizzaHTML;
  }
};
// Funcion Find para encontrar la pizza con el respectivo input
const findPizzas = () => pizzas.find((pizza) => pizza.id == pizzasInput.value);

const EncontrarPizza = (e) => {
  e.preventDefault();
  const pizzaValue = pizzasInput.value;

  //Ejecutando Validador de Pizzas y llamando a la funcion de renderizar
  if (validarPizza(pizzaValue, MIN_NUMBER, MAX_NUMBER)) {
    const almacenarPizza = findPizzas();
    renderizarPizza(almacenarPizza);
    findPizzas()
    guardarLocalStorage()
  }

};


// !!!!!!!!!!!!!!!!!!!!!!!!!! LOCAL STORAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!! LOCAL STORAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!! LOCAL STORAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!


// Funcion Find para guardar en localStorage
const guardarLocalStorage = () => {
  localStorage.setItem("pizza", JSON.stringify(findPizzas()))
}

// almacenando el valor de la pizza en en local storage
const pizzaParseada = JSON.parse(localStorage.getItem("pizza"))

// renderizando para que se ejecute al cargar la pagina la pizza guardada por local storage
const renderLocalStorage = renderizarPizza(pizzaParseada)



//Funcion inicializadora
const init = () => {
  document.addEventListener("DOMContentLoaded",renderLocalStorage)
  pizzasForm.addEventListener("submit", EncontrarPizza);
};
init();
