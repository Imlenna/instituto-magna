document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobileMenuButton');
  const navigation = document.getElementById('primary-navigation');
  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('hidden', expanded);
  });

  const desktopViewport = window.matchMedia('(min-width: 768px)');
  desktopViewport.addEventListener('change', (event) => {
    if (event.matches) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.add('hidden');
    }
  });
});
