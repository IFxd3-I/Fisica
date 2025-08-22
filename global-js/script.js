/* global-js/script.js
     Dropdown handling: uses .open class, hover with small delay and leave with longer delay
*/

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
    // small helpers for other features
    const procedimentos = document.querySelectorAll('.procedimento');
    if (procedimentos && procedimentos.length) {
        procedimentos.forEach(procedimento => {
            procedimento.addEventListener('click', () => procedimento.classList.toggle('unblurred'));
        });
    }

    // Header nav toggle for small screens
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
        });
    }

    // Dropdown handling (desktop hover + mobile click)
    const dropdownToggles = Array.from(document.querySelectorAll('.dropdown-toggle'));
    const timers = new WeakMap();

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.open').forEach(dd => {
            dd.classList.remove('open');
            const btn = dd.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    dropdownToggles.forEach(btn => {
        const dd = btn.closest('.dropdown');
        if (!dd) return;
        const menu = dd.querySelector('.dropdown-menu');

        // click toggles (mobile)
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = dd.classList.contains('open');
            if (isOpen) {
                dd.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                closeAllDropdowns();
                dd.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        // mouseenter: open after short delay (desktop)
        dd.addEventListener('mouseenter', () => {
            // clear pending close timer
            const t = timers.get(dd);
            if (t) clearTimeout(t);
            const openT = setTimeout(() => {
                closeAllDropdowns();
                dd.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }, 80); // short open delay
            timers.set(dd, openT);
        });

        // mouseleave: schedule close after longer delay so user can move to menu
        dd.addEventListener('mouseleave', () => {
            const t = timers.get(dd);
            if (t) clearTimeout(t);
            const closeT = setTimeout(() => {
                dd.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }, 100); // longer close delay
            timers.set(dd, closeT);
        });

        // keep open when clicking a menu item; mark active
        if (menu) {
            menu.addEventListener('click', (e) => {
                const target = e.target.closest('a');
                if (!target) return;
                // brief click animation handled by CSS class added elsewhere
                menu.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                target.classList.add('active');
                // do not close automatically (user wanted to stay open). If you want auto-close, call:
                // dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // clicking outside closes all
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) closeAllDropdowns();
    });

    // ESC closes
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllDropdowns(); });
});
