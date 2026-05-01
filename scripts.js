// 1. Inicializar AOS
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
}

// 2. Traducciones
let currentLang = localStorage.getItem('language') || 'es';

function updateTexts() {
    if (typeof i18n === 'undefined') return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang] && i18n[currentLang][key]) {
            if (el.tagName === 'INPUT') el.placeholder = i18n[currentLang][key];
            else el.innerText = i18n[currentLang][key];
        }
    });
}

// 3. LA CORRECCIÓN CRÍTICA PARA RESERVAS
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();

    const form = document.getElementById('reservaForm');
    
    if (form) {
        console.log("Formulario detectado correctamente");
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Intentando guardar reserva...");

            const nombreVal = document.getElementById('nombre').value;
            const fechaVal = document.getElementById('fecha').value;
            const horaVal = document.getElementById('hora').value;

            const nuevaReserva = {
                nombre: nombreVal,
                fecha: fechaVal,
                hora: horaVal,
                id: Date.now()
            };

            // Guardar
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push(nuevaReserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));

            alert("Reserva Guardada Exitosamente: " + nombreVal);
            console.log("Historial actual:", JSON.parse(localStorage.getItem('reservas')));
            
            form.reset();
        });
    } else {
        console.error("ERROR: No se encontró el formulario 'reservaForm'");
    }
});

// 4. Navbar y otros eventos
window.onscroll = () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('bg-white', 'text-black') : nav.classList.remove('bg-white', 'text-black');
    }
};

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    updateTexts();
});
