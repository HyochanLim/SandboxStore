const mobileMenuButtonElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    if (mobileMenuElement.style.display === 'flex') {
        mobileMenuElement.style.display = 'none';
    } else {
        mobileMenuElement.style.display = 'flex';
    }
}

mobileMenuButtonElement.addEventListener('click', toggleMobileMenu);