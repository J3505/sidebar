const openModalButton = document.getElementById('openModalFoods')
const dishModal = document.getElementById('dishModal')
const cancelModalButton = document.getElementById('cancelModal')
const dishForm = document.getElementById('dishForm')
const dishesContainer = document.getElementById('dishes')

let dishes = JSON.parse(localStorage.getItem('dishes')) || []
let editingIndex = null

// Abrir el modal para agregar un plato
openModalButton.addEventListener('click', () => {
  dishForm.reset()
  editingIndex = null
  document.getElementById('modalTitle').textContent = 'AGREGAR CHEFS'
  dishModal.classList.remove('hidden')
})

// Cerrar el modal
cancelModalButton.addEventListener('click', () => {
  dishModal.classList.add('hidden')
})

// Manejar el envío del formulario
dishForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('dishName').value
  const description = document.getElementById('dishDescription').value
  const price = document.getElementById('dishPrice').value
  const image = document.getElementById('dishImage').value

  const dish = { name, description, price, image }

  if (editingIndex === null) {
    dishes.push(dish)
  } else {
    dishes[editingIndex] = dish
  }

  saveDishes()
  renderDishes()
  dishModal.classList.add('hidden')
})

// Renderizar los platos en la interfaz
function renderDishes() {
  dishesContainer.innerHTML = ''

  dishes.forEach((dish, index) => {
    const dishCard = document.createElement('div')
    dishCard.className = 'flex bg-white rounded-lg shadow-lg overflow-hidden'

    dishCard.innerHTML = `
      <div class="w-48 h-48 bg-cyan-500 flex-shrink-0">
        <img src="${dish.image || 'assets/menu.jpeg'}" alt="${
      dish.name
    }" class="w-full h-full object-cover">
      </div>
      <div class="p-6">
        <h3 class="font-bold text-xl mb-2">${dish.name}</h3>
        <p class="text-gray-600 text-sm mb-4">${dish.description}</p>
        <p class="font-bold">$ ${dish.price}</p>
        <div class="flex space-x-4 mt-4">
          <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 edit-btn-food" data-index="${index}">Editar</button>
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg delete-btn-food" data-index="${index}">borrar</button>
        </div>
      </div>
    `

    dishesContainer.appendChild(dishCard)
  })

  // Editar y eliminar
  document.querySelectorAll('.edit-btn-food').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index
      openEditModal(index)
    })
  })

  document.querySelectorAll('.delete-btn-food').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index
      deleteDish(index)
    })
  })
}

// Abrir el modal para editar un plato
function openEditModal(index) {
  const dish = dishes[index]
  document.getElementById('dishName').value = dish.name
  document.getElementById('dishDescription').value = dish.description
  document.getElementById('dishPrice').value = dish.price
  document.getElementById('dishImage').value = dish.image

  editingIndex = index
  document.getElementById('modalTitle').textContent = 'Edit Dish'
  dishModal.classList.remove('hidden')
}

// Eliminar un plato
function deleteDish(index) {
  dishes.splice(index, 1)
  saveDishes()
  renderDishes()
}

// Guardar los platos en localStorage
function saveDishes() {
  localStorage.setItem('dishes', JSON.stringify(dishes))
}

// Renderizar los platos al cargar la página
renderDishes()
