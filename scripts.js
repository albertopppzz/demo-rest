AOS.init({ duration: 1000, once: true });

let currentLang = localStorage.getItem('language') || 'es';

function updateTexts() {
    if (typeof i18n === 'undefined') return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.tagName === 'INPUT' ? el.placeholder = i18n[currentLang][key] : el.innerText = i18n[currentLang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    const form = document.getElementById('reservaForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nuevaReserva = {
                id: Date.now(),
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                status: 'pendiente' // Estado inicial
            };

            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push(nuevaReserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));

            alert(`¡Gracias ${nuevaReserva.nombre}! Tu reserva quedó pendiente de confirmación.`);
            form.reset();
        });
    }
});

window.onscroll = () => {
    const nav = document.getElementById('navbar');
    if (nav) window.scrollY > 50 ? nav.classList.add('bg-white', 'text-black', 'shadow-md') : nav.classList.remove('bg-white', 'text-black', 'shadow-md');
};

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    updateTexts();
});
