document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.girone-content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const h1Title = document.querySelector('h1');
    const caption = document.querySelector('.caption');

    const titleCaptionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    };

    const titleCaptionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === h1Title) {
                    h1Title.style.opacity = 1;
                    h1Title.style.transform = 'translateY(0)';
                    observer.unobserve(h1Title);
                } else if (entry.target === caption) {
                    caption.style.opacity = 1;
                    caption.style.transform = 'translateY(0)';
                    observer.unobserve(caption);
                }
            }
        });
    }, titleCaptionObserverOptions);


    if (h1Title) {
        titleCaptionObserver.observe(h1Title);
    }
    if (caption) {
        titleCaptionObserver.observe(caption);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.box-content-section');

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            setTimeout(() => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

                if (rect.bottom > viewportHeight) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center' 
                    });
                }
            }, 600);
        });
    });
});