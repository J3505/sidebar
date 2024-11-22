const openModalOpciones = document.getElementById("openModalOpciones");
const modalOpciones = document.getElementById("modalOpciones");
const cancelModalOpciones = document.getElementById("cancelModalOpciones");
const opcionesForm = document.getElementById("opcionesForm");
const opcionesContainer = document.getElementById("opciones");

let opciones = JSON.parse(localStorage.getItem("opciones")) || [];
let editingIndex = null;


// // Abrir modal
// openModalOpciones.addEventListener("click", () => {
//   opcionesForm.reset();
//   editingIndex = null;
//   document.getElementById("modalTitle").textContent = "agregar opciones";
//   modalOpciones.classList.remove("hidden");
// });

// Cerrar modal
// cancelModalOpciones.addEventListener("click", () => {
//   modalOpciones.classList.add("hidden");
// });

// Manejar envío del formulario
opcionesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const icon = document.getElementById("iconImage").value;
  const title = document.getElementById("optionTitle").value;
  const description = document.getElementById("optionDescription").value;

  const option = { icon, title, description };

  if (editingIndex === null) {
    opciones.push(option);
  } else {
    opciones[editingIndex] = option;
  }

  saveOpciones();
  renderOpciones();
  modalOpciones.classList.add("hidden");
});

// Renderizar las opciones
function renderOpciones() {
  opcionesContainer.innerHTML = "";

  opciones.forEach((item) => {
    const optionCard = document.createElement("div");
    optionCard.className = "flex flex-col items-center text-center";

    optionCard.innerHTML = `
      <div class="bg-yellow-300 rounded-full p-4 mb-2">
        <img src="${item.icon }" alt="${item.title}" class="h-12 w-12">
      </div>
      <h3 class="text-lg font-semibold">${item.title}</h3>
      <p class="text-sm text-gray-600">${item.description}</p>
      <div class="flex mt-4">
        
      </div>
    `;

    opcionesContainer.appendChild(optionCard);
  });

  // Botones de editar y eliminar
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      openEditModal(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteOption(index);
    });
  });
}

// Abrir modal en modo edición
// function openEditModal(index) {
//   const item = opciones[index];
//   document.getElementById("iconImage").value = item.icon;
//   document.getElementById("optionTitle").value = item.title;
//   document.getElementById("optionDescription").value = item.description;

//   editingIndex = index;
//   document.getElementById("modalTitle").textContent = "editar opciones";
//   modalOpciones.classList.remove("hidden");
// }

// Eliminar una opción
// function deleteOption(index) {
//   opciones.splice(index, 1);
//   saveOpciones();
//   renderOpciones();
// }

// Guardar opciones en localStorage
function saveOpciones() {
  localStorage.setItem("opciones", JSON.stringify(opciones));
}

// Renderizar al cargar la página
renderOpciones();
