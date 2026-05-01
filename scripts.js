// Inicializar AOS
AOS.init({
    duration: 1000,
    once: true
});

// Lógica del Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white', 'text-black', 'shadow-xl', 'py-4');
        navbar.classList.remove('text-white', 'py-6');
    } else {
        navbar.classList.remove('bg-white', 'text-black', 'shadow-xl', 'py-4');
        navbar.classList.add('text-white', 'py-6');
    }
});

// Manejo del Formulario
const form = document.getElementById('reservaForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        // Mostrar un feedback elegante
        alert(`¡Grazie mille, ${nombre}! \nHemos recibido tu solicitud para el ${fecha} a las ${hora}. \nTe enviaremos un correo de confirmación.`);
        form.reset();
    });
}
