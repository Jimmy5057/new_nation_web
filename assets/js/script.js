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

    // Chat Button Functionality
    const chatButton = document.getElementById('chatButton');
    let isAnimating = false;
    let animationTimer = null;
    let shouldTriggerEmail = false;

    function openEmail() {
        const email = 'connect.newnation@gmail.com';
        const subject = 'Inquiry about New Nation';
        const body = `Hi New Nation team,

I am interested in learning more about your project.

Best regards.`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Delay reset for 2 seconds after email action
        setTimeout(() => {
            isAnimating = false;
            chatButton.classList.remove('holding');
        }, 2000);
    }

    function handlePress(e) {
        if (e.type === 'touchstart') e.preventDefault();
        if (isAnimating) return;
        
        isAnimating = true;
        shouldTriggerEmail = true;
        chatButton.classList.add('holding');
        
        // Start animation timer
        animationTimer = setTimeout(() => {
            if (shouldTriggerEmail) {
                openEmail();
            }
        }, 500);
    }

    function handleRelease() {
        if (isAnimating) {
            // Only reset if email hasn't been triggered
            if (shouldTriggerEmail) {
                shouldTriggerEmail = false;
                clearTimeout(animationTimer);
                isAnimating = false;
                chatButton.classList.remove('holding');
            }
        }
    }

    if (chatButton) {
        // Desktop events
        chatButton.addEventListener('mousedown', handlePress);
        chatButton.addEventListener('mouseup', handleRelease);
        chatButton.addEventListener('mouseleave', handleRelease);

        // Mobile events
        chatButton.addEventListener('touchstart', handlePress);
        chatButton.addEventListener('touchend', handleRelease);
        chatButton.addEventListener('touchcancel', handleRelease);
    }

    // Set the countdown date (January 22, 2025)
    const countDownDate = new Date('2025-01-22T00:00:00').getTime();

    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }
    }, 1000);
});