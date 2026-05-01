/**
 * BELLA NOTTE COZUMEL - Script Principal
 * Gestión de Idiomas, Reservas y UI
 */

// 1. Inicializar Animaciones AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 2. Gestión de Idiomas (i18n)
// Detectamos idioma guardado o preferencia del navegador
let currentLang = localStorage.getItem('language') || 
                  (navigator.language.startsWith('en') ? 'en' : 'es');

/**
 * Actualiza todos los textos de la página actual
 */
function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        if (i18n[currentLang] && i18n[currentLang][key]) {
            // Si el elemento es un Input (como el nombre en reservas), cambiamos el placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = i18n[currentLang][key];
            } else {
                // Para el resto de elementos, cambiamos el texto interno
                el.innerText = i18n[currentLang][key];
            }
        }
    });

    // Actualizar el texto del botón selector de idioma
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';
    }
}

// 3. Manejo de Eventos (Clicks y Envío de Formulario)
document.addEventListener('click', (e) => {
    // Lógica del botón de Idioma
    if (e.target && e.target.id === 'lang-toggle') {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        updateTexts();
    }
});

/**
 * Manejo del Formulario de Reserva
 * Guarda los datos en LocalStorage para el Panel de Admin
 */
document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'reservaForm') {
        e.preventDefault();
        
        // Capturar datos
        const nuevaReserva = {
            nombre: document.getElementById('nombre').value,
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            id: Date.now() // ID único para control
        };

        // Obtener historial existente o crear uno nuevo
        let historialReservas = JSON.parse(localStorage.getItem('reservas')) || [];
        
        // Agregar la nueva reserva al inicio del array
        historialReservas.push(nuevaReserva);
        
        // Guardar de vuelta en LocalStorage
        localStorage.setItem('reservas', JSON.stringify(historialReservas));

        // Feedback visual al usuario según idioma
        const alertMsg = currentLang === 'es' 
            ? `¡Grazie mille, ${nuevaReserva.nombre}! Tu mesa ha sido reservada.` 
            : `Thank you, ${nuevaReserva.nombre}! Your table has been reserved.`;
        
        alert(alertMsg);
        
        // Limpiar el formulario
        e.target.reset();
    }
});

// 4. Efecto Visual del Navbar al hacer Scroll
// Solo aplica si el navbar existe (evita errores en páginas simples)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            // Estilo sólido al bajar
            nav.classList.add('bg-white', 'text-black', 'shadow-xl', 'py-4');
            nav.classList.remove('text-white', 'py-6');
        } else {
            // Estilo transparente en el tope
            nav.classList.remove('bg-white', 'text-black', 'shadow-xl', 'py-4');
            nav.classList.add('text-white', 'py-6');
        }
    }
});

// 5. Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
});
