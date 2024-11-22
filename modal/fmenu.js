const openModalMenu = document.getElementById('openModalMenu')
const modalMenu = document.getElementById('modalMenu')
const cancelModalMenu = document.getElementById('cancelModalMenu')
const menuForm = document.getElementById('menuForm')
const packs = document.getElementById('packs')

let menuItems = JSON.parse(localStorage.getItem('menuItems')) || []
let editingIndex = null

// Abrir modal
openModalMenu.addEventListener('click', () => {
  menuForm.reset()
  editingIndex = null
  document.getElementById('modalTitle').textContent = 'Add Menu Item'
  modalMenu.classList.remove('hidden')
})

// Cerrar modal
cancelModalMenu.addEventListener('click', () => {
  modalMenu.classList.add('hidden')
})

// Manejar envío del formulario
menuForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const image = document.getElementById('menuImage').value
  const title = document.getElementById('menuTitle').value
  const price = document.getElementById('menuPrice').value
  const oldPrice = document.getElementById('menuOldPrice').value
  const stars = document.getElementById('menuStars').value

  const menuItem = { image, title, price, oldPrice, stars }

  if (editingIndex === null) {
    menuItems.push(menuItem)
  } else {
    menuItems[editingIndex] = menuItem
  }

  saveMenuItems()
  renderMenuItems()
  modalMenu.classList.add('hidden')
})

// Renderizar los elementos del menú
function renderMenuItems() {
  packs.innerHTML = ''

  menuItems.forEach((item, index) => {
    const menuCard = document.createElement('div')
    menuCard.className = 'bg-blue-500 text-white rounded-lg shadow-lg p-6'

    const starsHTML = '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars)

    menuCard.innerHTML = `
      <img src="${item.image}" alt="${
      item.title
    }" class="w-20 h-20 mx-auto rounded-full mb-4">
      <h2 class="text-xl font-semibold text-center">${item.title}</h2>
      <div class="flex justify-center items-center my-2">
        <span class="text-yellow-400">${starsHTML}</span>
      </div>
      <div class="text-center">
        <p class="text-lg font-bold">${item.price}</p>
        <p class="text-sm line-through">${item.oldPrice || ''}</p>
      </div>
      <div class="flex justify-end mt-4">
        <button class="bg-yellow-500 hover:text-white px-4 py-2 rounded-lg mr-2 edit-btn-menu" data-index="${index}">Editar</button>
        <button class="bg-red-500 hover:text-white px-4 py-2 rounded-lg delete-btn-menu" data-index="${index}">Borrar</button>
      </div>
    `

    packs.appendChild(menuCard)
  })

  // Botones de editar y eliminar
  document.querySelectorAll('.edit-btn-menu').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index
      openEditModal(index)
    })
  })

  document.querySelectorAll('.delete-btn-menu').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index
      deleteMenuItem(index)
    })
  })
}

// Abrir modal en modo edición
function openEditModal(index) {
  const item = menuItems[index]
  document.getElementById('menuImage').value = item.image
  document.getElementById('menuTitle').value = item.title
  document.getElementById('menuPrice').value = item.price
  document.getElementById('menuOldPrice').value = item.oldPrice
  document.getElementById('menuStars').value = item.stars

  editingIndex = index
  document.getElementById('modalTitle').textContent = 'AGREGAR MENU'
  modalMenu.classList.remove('hidden')
}

// Eliminar un elemento del menú
function deleteMenuItem(index) {
  menuItems.splice(index, 1)
  saveMenuItems()
  renderMenuItems()
}

// Guardar datos en localStorage
function saveMenuItems() {
  localStorage.setItem('menuItems', JSON.stringify(menuItems))
}

// Renderizar al cargar la página
renderMenuItems()
