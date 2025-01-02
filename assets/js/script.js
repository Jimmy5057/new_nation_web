document.addEventListener('DOMContentLoaded', () => {
  console.log('Website Loaded');

  // Language selector functionality
  const languageButton = document.getElementById('languageButton');
  const languageDropdown = document.getElementById('languageDropdown');

  if (languageButton && languageDropdown) {
      // Toggle dropdown
      languageButton.addEventListener('click', (e) => {
          e.stopPropagation();
          languageDropdown.classList.toggle('hidden');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
          languageDropdown.classList.add('hidden');
      });
  }
});