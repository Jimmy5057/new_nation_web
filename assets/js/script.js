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

    // Price Update Function
    async function updatePrice() {
        try {
            const response = await fetch('https://api.crmclick.io/PublicApi/allTicker');
            const data = await response.json();
            
            // Find NNC price data
            const nncData = data.data.find(item => item.market === 'NNCUSDT');
            if (nncData) {
                // Update desktop price
                const priceElement = document.querySelector('[data-price]');
                const percentElement = document.querySelector('[data-percent]');
                // Update mobile price
                const priceMobileElement = document.querySelector('[data-price-mobile]');
                const percentMobileElement = document.querySelector('[data-percent-mobile]');
                
                const price = Number(nncData.last).toFixed(8);
                const percent = Number(nncData.priceChangePercent).toFixed(2);
                const isNegative = percent < 0;
                const color = isNegative ? '#FF4B4B' : '#56966D';

                // Update desktop elements
                if (priceElement && percentElement) {
                    priceElement.textContent = price;
                    percentElement.textContent = `${percent > 0 ? '+' : ''}${percent}%`;
                    priceElement.style.color = color;
                    percentElement.style.color = color;
                }

                // Update mobile elements
                if (priceMobileElement && percentMobileElement) {
                    priceMobileElement.textContent = price;
                    percentMobileElement.textContent = `${percent > 0 ? '+' : ''}${percent}%`;
                    priceMobileElement.style.color = color;
                    percentMobileElement.style.color = color;
                }
            }
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    }

    // Initial price update
    updatePrice();

    // Update price every 5 seconds
    setInterval(updatePrice, 5000);
});