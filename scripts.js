// 1. Inicializar Animaciones
AOS.init({ duration: 1000, once: true });

// 2. Lógica de Idioma
let currentLang = localStorage.getItem('language') || (navigator.language.startsWith('en') ? 'en' : 'es');

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = i18n[currentLang][key];
            } else {
                el.innerText = i18n[currentLang][key];
            }
        }
    });
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';
}

// 3. EVENTO PARA GUARDAR RESERVAS (EL MÁS IMPORTANTE)
document.addEventListener('submit', function(e) {
    // Verificamos que el formulario sea el de reservas
    if (e.target && e.target.id === 'reservaForm') {
        e.preventDefault();

        // Capturamos los valores
        const nombreVal = document.getElementById('nombre').value;
        const fechaVal = document.getElementById('fecha').value;
        const horaVal = document.getElementById('hora').value;

        const nuevaReserva = {
            nombre: nombreVal,
            fecha: fechaVal,
            hora: horaVal,
            id: Date.now()
        };

        // LEER, AGREGAR Y GUARDAR
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(nuevaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        console.log("Reserva guardada:", nuevaReserva); // Para que verifiques en consola

        const msg = currentLang === 'es' ? `¡Grazie, ${nombreVal}!` : `Thanks, ${nombreVal}!`;
        alert(msg);
        
        e.target.reset();
    }
});

// 4. Cambio de Idioma
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'lang-toggle') {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        updateTexts();
    }
});

// 5. Navbar Scroll
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
