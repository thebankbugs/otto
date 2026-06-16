/**
 * THE BANK BUGS - ALL-IN-ONE SYSTEM SCRIPT
 * Handles Live Ticker Tape Injection, Copy Text, PWA Registration, Favicon, and Manifest links dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AUTOMATED LIVE MARKET TICKER TAPE INJECTION
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Construct the structural theme container dynamically
        const tickerContainer = document.createElement('div');
        tickerContainer.className = 'tradingview-widget-container';
        tickerContainer.style.cssText = 'width: 100%; background-color: #000000; border-bottom: 1px solid #1c1c1c; padding: 4px 0; z-index: 10;';
        
        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container__widget';
        tickerContainer.appendChild(widgetDiv);
        
        // Build the automated external link script element
        const tvScript = document.createElement('script');
        tvScript.type = 'text/javascript';
        tvScript.src = 'https://tradingview.com';
        tvScript.async = true;
        
        // Pass asset configuration mapping metrics directly to server layer
        tvScript.innerHTML = JSON.stringify({
            "symbols": [
                { "proName": "FX:EURUSD", "title": "EUR/USD" },
                { "proName": "FX:GBPUSD", "title": "GBP/USD" },
                { "proName": "FX:AUDUSD", "title": "AUD/USD" },
                { "proName": "FX:USDJPY", "title": "USD/JPY" },
                { "proName": "FOREXCOM:XAUUSD", "title": "XAU/USD" },
                { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
                { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
                { "proName": "FOREXCOM:DJI", "title": "Dow 30" }
            ],
            "showSymbolLogo": false,
            "colorTheme": "dark",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
        });
        
        tickerContainer.appendChild(tvScript);
        
        // Dynamically deploy the module right after your navbar menu banner element
        navbar.parentNode.insertBefore(tickerContainer, navbar.nextSibling);
    }

    // ==========================================
    // 2. CLICK TO COPY FEATURE (LIME GREEN ARCHITECTURE)
    // ==========================================
    const phraseBox = document.querySelector('.phrase-box');
    
    if (phraseBox) {
        const actionContainer = document.createElement('div');
        actionContainer.style.marginTop = '12px';
        actionContainer.style.display = 'flex';
        actionContainer.style.alignItems = 'center';
        actionContainer.style.gap = '12px';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Click to Copy Text';
        copyBtn.style.backgroundColor = 'transparent';
        copyBtn.style.border = '1px solid #222222';
        copyBtn.style.color = '#888888';
        copyBtn.style.padding = '6px 12px';
        copyBtn.style.fontSize = '0.8rem';
        copyBtn.style.borderRadius = '4px';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.transition = 'all 0.3s ease';
        copyBtn.style.fontWeight = '600';

        // Realigned button hover effects from gold to active Lime Green theme
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.borderColor = '#00ff00';
            copyBtn.style.color = '#ffffff';
            copyBtn.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.2)';
        });
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.borderColor = '#222222';
            copyBtn.style.color = '#888888';
            copyBtn.style.boxShadow = 'none';
        });

        const copyStatus = document.createElement('span');
        copyStatus.style.fontSize = '0.8rem';
        copyStatus.style.fontWeight = 'bold';
        copyStatus.style.transition = 'opacity 0.3s ease';

        actionContainer.appendChild(copyBtn);
        actionContainer.appendChild(copyStatus);
        phraseBox.parentNode.appendChild(actionContainer);

        copyBtn.addEventListener('click', () => {
            const rawText = phraseBox.innerText.replace(/[“”"']/g, '').trim();

            navigator.clipboard.writeText(rawText).then(() => {
                copyStatus.textContent = 'Copied!';
                copyStatus.style.color = '#00ff00';
                copyStatus.style.textShadow = '0 0 5px #00ff00';
                copyBtn.textContent = 'Copied ✔';

                setTimeout(() => {
                    copyStatus.textContent = '';
                    copyBtn.textContent = 'Click to Copy Text';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyStatus.textContent = 'Failed to copy. Please copy manually.';
                copyStatus.style.color = '#ff3333';
            });
        });
    }

    // ==========================================
    // 3. DYNAMIC FAVICON & PWA LINKS
    // ==========================================
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';
    faviconLink.href = '/bankbugs.png';
    document.head.appendChild(faviconLink);

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
});

// ==========================================
// 4. BACKGROUND PWA SERVICE WORKER REGISTRATION
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('The Bank Bugs PWA Registered Successfully!'))
            .catch(err => console.log('PWA registration failed: ', err));
    });
}

// ==========================================
// 5. FRONTEND LIVE TRACKER UPDATER (LIME THEME ALIGNED)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const trackerContainer = document.querySelector('.site-tracker');
    if (trackerContainer) {
        // Shift user tracker counter style properties to pure Standout Green text metrics
        trackerContainer.innerHTML = '<span class="pulse-dot"></span> LIVE TRADERS: <span id="liveCount" style="color: #00ff00; font-weight: bold; margin-left: 4px;">42</span>';
        
        const countElement = document.getElementById('liveCount');
        
        setInterval(() => {
            let currentCount = parseInt(countElement.textContent);
            let change = Math.floor(Math.random() * 7) - 3; 
            let newCount = currentCount + change;
            
            if (newCount < 35) newCount = 35;
            if (newCount > 65) newCount = 65;
            
            countElement.textContent = newCount;
        }, 4000);
    }
});
