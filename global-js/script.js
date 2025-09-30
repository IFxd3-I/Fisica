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
});
