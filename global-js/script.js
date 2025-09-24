function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgElement.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const procedimentos = document.querySelectorAll('.procedimento');
    if (procedimentos && procedimentos.length) {
        procedimentos.forEach(procedimento => {
            procedimento.addEventListener('click', () => procedimento.classList.toggle('unblurred'));
        });
    }

    const yearBoxes = document.querySelectorAll('.year-box');
    const initialView = document.querySelector('h1');
    const yearsContainer = document.querySelector('.years-container');
    const yearSections = document.querySelectorAll('.year-section');
    const backBtns = document.querySelectorAll('.back-btn');

    yearBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const year = this.dataset.year;
            initialView.style.display = 'none';
            yearsContainer.style.display = 'none';
            document.getElementById(`year-${year}`).style.display = 'block';
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            yearSections.forEach(section => section.style.display = 'none');
            initialView.style.display = 'block';
            yearsContainer.style.display = 'flex';
        });
    });
});
