function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgElement.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

document.querySelectorAll('ex .procedimento').forEach(procedimento => {
    procedimento.addEventListener('click', () => {
        procedimento.classList.toggle('unblurred');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initializeStaticElements();
});

function initializeStaticElements() {
    const lastUpdatedElement = document.querySelector('.last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = 'Ultimo aggiornamento: Agosto 2025';
    }
}
