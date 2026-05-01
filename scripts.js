// 1. Inicializar AOS (Animaciones)
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
}

// 2. Lógica de Idioma
// Detectamos el idioma guardado o el del navegador
let currentLang = localStorage.getItem('language') || 
                  (navigator.language.startsWith('en') ? 'en' : 'es');

function updateTexts() {
    // Buscamos todos los elementos con el atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.innerText = i18n[currentLang][key];
        }
    });

    // Actualizamos el texto del botón (si estamos en ES, el botón ofrece cambiar a EN)
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';
    }
}

// 3. Evento Click para el Botón de Idioma
// Usamos delegación de eventos para que siempre funcione
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'lang-toggle') {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        updateTexts();
    }
});

// 4. Navbar Scroll Effect (Solo para el Index que tiene Hero)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white', 'text-black', 'shadow-xl', 'py-4');
            nav.classList.remove('text-white', 'py-6');
        } else {
            nav.classList.remove('bg-white', 'text-black', 'shadow-xl', 'py-4');
            nav.classList.add('text-white', 'py-6');
        }
    }
});

// 5. Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
});
