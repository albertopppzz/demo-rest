AOS.init({ duration: 1000, once: true });

let currentLang = localStorage.getItem('language') || 
                  (navigator.language.startsWith('en') ? 'en' : 'es');

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.innerText = i18n[currentLang][key];
        }
    });
    document.getElementById('lang-toggle').innerText = currentLang === 'es' ? 'EN' : 'ES';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    updateTexts();
});

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
