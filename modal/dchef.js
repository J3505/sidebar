const openChefModalButton = document.getElementById("openModalChef");
const chefModal = document.getElementById("chefModal");
const cancelChefModalButton = document.getElementById("cancelChefModal");
const chefForm = document.getElementById("chefForm");
const chefsContainer = document.getElementById("chefs");

let chefs = JSON.parse(localStorage.getItem("chefs")) || [];
let editingChefIndex = null;

// Abrir el modal para agregar un chef
openChefModalButton.addEventListener("click", () => {
  chefForm.reset();
  editingChefIndex = null;
  document.getElementById("modalTitleChef").textContent = "Agregar Chef";
  chefModal.classList.remove("hidden");
});

// Cerrar el modal
cancelChefModalButton.addEventListener("click", () => {
  chefModal.classList.add("hidden");
});

// Manejar el envío del formulario
chefForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("chefName").value;
  const role = document.getElementById("chefRole").value;
  const image = document.getElementById("chefImage").value;

  const chef = { name, role, image };

  if (editingChefIndex === null) {
    chefs.push(chef);
  } else {
    chefs[editingChefIndex] = chef;
  }

  saveChefs();
  renderChefs();
  chefModal.classList.add("hidden");
});

// Renderizar los chefs en la interfaz
function renderChefs() {
  chefsContainer.innerHTML = "";

  chefs.forEach((chef, index) => {
    const chefCard = document.createElement("div");
    chefCard.className = "rounded-lg overflow-hidden shadow-lg";

    chefCard.innerHTML = `
      <div class="bg-[#20B2AA] p-4">
        <img 
          src="${chef.image || '/assets/chef2.jpeg'}" 
          alt="${chef.name}" 
          class="w-full h-48 object-cover rounded-xl"
        />
      </div>
      <div class="bg-black text-white p-4 text-center">
        <h2 class="text-xl font-semibold">${chef.name}</h2>
        <p class="text-gray-300 text-sm">${chef.role}</p>
        <div class="flex justify-center mt-4 space-x-4">
          <button class="bg-yellow-500 text-black px-4 py-2 rounded-lg edit-chef" data-index="${index}">Editar</button>
          <button class="bg-red-500  text-black px-4 py-2 rounded-lg delete-chef" data-index="${index}">Borrar</button>
        </div>
      </div>
    `;

    chefsContainer.appendChild(chefCard);
  });

  // Editar y eliminar
  document.querySelectorAll(".edit-chef").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      openEditChefModal(index);
    });
  });

  document.querySelectorAll(".delete-chef").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteChef(index);
    });
  });
}

// Abrir el modal para editar un chef
function openEditChefModal(index) {
  const chef = chefs[index];
  document.getElementById("chefName").value = chef.name;
  document.getElementById("chefRole").value = chef.role;
  document.getElementById("chefImage").value = chef.image;

  editingChefIndex = index;
  document.getElementById("modalTitleChef").textContent = "Editar Chef";
  chefModal.classList.remove("hidden");
}

// Eliminar un chef
function deleteChef(index) {
  chefs.splice(index, 1);
  saveChefs();
  renderChefs();
}

// Guardar los chefs en localStorage
function saveChefs() {
  localStorage.setItem("chefs", JSON.stringify(chefs));
}

// Renderizar los chefs al cargar la página
renderChefs();
