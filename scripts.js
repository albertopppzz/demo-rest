// Inicializar Animaciones
AOS.init({ duration: 1000, once: true });

// Lógica de Idioma
let currentLang = localStorage.getItem('language') || 
                  (navigator.language.startsWith('en') ? 'en' : 'es');

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = i18n[currentLang][key];
            } else {
                el.innerText = i18n[currentLang][key];
            }
        }
    });
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';
}

// Escuchar clicks (Botón idioma y Formulario)
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'lang-toggle') {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        updateTexts();
    }
});

document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'reservaForm') {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const msg = currentLang === 'es' ? `¡Grazie, ${nombre}! Reserva recibida.` : `Thanks, ${nombre}! Reservation received.`;
        alert(msg);
        e.target.reset();
    }
});

// Navbar Scroll Effect
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

document.addEventListener('DOMContentLoaded', updateTexts);
