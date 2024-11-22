const headerTitle = document.getElementById("headerTitle");
const headerDescription = document.getElementById("headerDescription");
const headerImage = document.getElementById("headerImage");
const editHeaderButton = document.getElementById("editHeader");

let headerContent = JSON.parse(localStorage.getItem("headerContent")) || {
  title: "Check Start Your Personal Business.",
  description: "Delivery To Your Home Or Office, Check Full Menu And Items, Safe & Easy Payment From Food King.",
  image: "https://i.ebayimg.com/images/g/n8IAAOSwltRkNCSF/s-l1200.png",
};

// Renderizar contenido desde localStorage
function renderHeaderContent() {
  headerTitle.textContent = headerContent.title;
  headerDescription.textContent = headerContent.description;
  headerImage.src = headerContent.image;
}

// Abrir editor modal para editar contenido
editHeaderButton.addEventListener("click", () => {
  const title = prompt("Editar titulo:", headerContent.title);
  const description = prompt("Editar descripcion:", headerContent.description);
  const image = prompt("Ingresar URL:", headerContent.image);

  if (title !== null && description !== null && image !== null) {
    headerContent = { title, description, image };
    saveHeaderContent();
    renderHeaderContent();
  }
});

// Guardar en localStorage
function saveHeaderContent() {
  localStorage.setItem("headerContent", JSON.stringify(headerContent));
}

// Cargar contenido inicial
renderHeaderContent();
