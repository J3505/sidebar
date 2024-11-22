// Elementos del DOM
const modalReseña = document.getElementById("modalReseña");
const openModalReseña = document.getElementById("openModalseña");
const cancelModalReseña = document.getElementById("cancelModalReseña");
const reviewForm = document.getElementById("reviewForm");
const storyContainer = document.getElementById("story");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let editingIndex = null; // Índice de la reseña que se está editando

// // Abrir el modal
// openModalReseña.addEventListener("click", () => {
//     reviewForm.reset();
//     editingIndex = null;
//     modalReseña.classList.remove("hidden");
// });

// Cerrar el modal
// cancelModalReseña.addEventListener("click", () => {
//     modalReseña.classList.add("hidden");
// });

// Manejar el envío del formulario
reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const image = document.getElementById("reviewImage").value;
    const title = document.getElementById("reviewTitle").value;
    const description = document.getElementById("reviewDescription").value;

    const review = { image, title, description };

    if (editingIndex === null) {
        reviews.push(review);
    } else {
        reviews[editingIndex] = review;
    }

    saveReviews();
    renderReviews();
    reviewForm.reset();
    modalReseña.classList.add("hidden");
    editingIndex = null;
});

// Guardar las reseñas en localStorage
function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Renderizar las reseñas
function renderReviews() {
    storyContainer.innerHTML = "";

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "rounded-lg overflow-hidden shadow-lg";

        reviewCard.innerHTML = `
            <img src="${review.image}" alt="${review.title}" class="w-full h-48 object-cover">
            <div class="p-6 bg-[#fff3d6]">
                <h2 class="font-bold text-xl mb-2">${review.title}</h2>
                <p class="text-gray-700 text-sm">${review.description}</p>
                <div class="flex justify-end mt-4">
                    
                </div>
            </div>
        `;

        storyContainer.appendChild(reviewCard);
    });

    // Agregar eventos a los botones de editar y eliminar
    // document.querySelectorAll(".edit-btn").forEach((button) => {
    //     button.addEventListener("click", (e) => {
    //         const index = e.target.dataset.index;
    //         openEditModal(index);
    //     });
    // });

    // document.querySelectorAll(".delete-btn").forEach((button) => {
    //     button.addEventListener("click", (e) => {
    //         const index = e.target.dataset.index;
    //         deleteReview(index);
    //     });
    // });
}

// Abrir el modal en modo edición
// function openEditModal(index) {
//     const review = reviews[index];
//     document.getElementById("reviewImage").value = review.image;
//     document.getElementById("reviewTitle").value = review.title;
//     document.getElementById("reviewDescription").value = review.description;

//     editingIndex = index;
//     modalReseña.classList.remove("hidden");
// }

// Eliminar una reseña
// function deleteReview(index) {
//     reviews.splice(index, 1);
//     saveReviews();
//     renderReviews();
// }

// Inicializar las reseñas al cargar la página
renderReviews();
