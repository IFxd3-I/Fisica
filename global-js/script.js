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

document.addEventListener('DOMContentLoaded', function () {
    const procedimentos = document.querySelectorAll('.procedimento');
    if (procedimentos && procedimentos.length) {
        procedimentos.forEach(procedimento => {
            procedimento.addEventListener('click', () => {
                procedimento.classList.toggle('unblurred');
            });
        });
    }
});

// Header nav toggle for small screens
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
        });
    }
});

// Dropdown toggles (mobile friendly)
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = Array.from(document.querySelectorAll('.dropdown-toggle'));

    function closeAllDropdowns() {
        dropdownToggles.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            const menu = btn.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) menu.style.display = '';
        });
    }

    dropdownToggles.forEach(btn => {
        const menu = btn.nextElementSibling;
        // click to toggle (useful on touch)
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            closeAllDropdowns();
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                if (menu) menu.style.display = 'flex';
            }
        });
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllDropdowns();
    });
});
