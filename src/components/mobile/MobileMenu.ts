export function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const closeMobileMenuButton = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuContent = mobileMenu?.querySelector('div');

  function openMobileMenu() {
    if (mobileMenu && mobileMenuContent) {
      document.body.style.overflow = 'hidden';
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuContent.classList.remove('translate-x-full');
      }, 10);
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && mobileMenuContent) {
      document.body.style.overflow = '';
      mobileMenuContent.classList.add('translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    }
  }

  mobileMenuButton?.addEventListener('click', openMobileMenu);
  closeMobileMenuButton?.addEventListener('click', closeMobileMenu);
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}