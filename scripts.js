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
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.innerText = currentLang === 'es' ? 'EN' : 'ES';
}

// FIX DE SCROLL Y COLORES
window.onscroll = () => {
    const nav = document.getElementById('navbar');
    const links = nav.querySelectorAll('a, button');
    
    if (window.scrollY > 50) {
        nav.classList.add('bg-white', 'shadow-md', 'py-4', 'text-stone-900');
        nav.classList.remove('text-white', 'py-6');
        links.forEach(l => l.style.color = '#1c1917'); // Stone-900
    } else {
        nav.classList.remove('bg-white', 'shadow-md', 'py-4', 'text-stone-900');
        nav.classList.add('text-white', 'py-6');
        links.forEach(l => l.style.color = 'white');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    
    const form = document.getElementById('reservaForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const res = {
                id: Date.now(),
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                status: 'pendiente'
            };
            let h = JSON.parse(localStorage.getItem('reservas')) || [];
            h.push(res);
            localStorage.setItem('reservas', JSON.stringify(h));
            alert("Reserva enviada. Grazie!");
            form.reset();
        });
    }
});

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    updateTexts();
});
