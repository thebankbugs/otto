/**
 * THE BANK BUGS - ALL-IN-ONE SYSTEM SCRIPT
 * Handles Copy Text, PWA Registration, Favicon, and Manifest links dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CLICK TO COPY FEATURE
    // ==========================================
    const phraseBox = document.querySelector('.phrase-box');
    
    if (phraseBox) {
        // Create container for alignment
        const actionContainer = document.createElement('div');
        actionContainer.style.marginTop = '12px';
        actionContainer.style.display = 'flex';
        actionContainer.style.alignItems = 'center';
        actionContainer.style.gap = '12px';

        // Create the Copy Button dynamically
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

        // Add neon gold hover effects
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.borderColor = '#ffcc00';
            copyBtn.style.color = '#ffffff';
            copyBtn.style.boxShadow = '0 0 10px rgba(255, 204, 0, 0.2)';
        });
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.borderColor = '#222222';
            copyBtn.style.color = '#888888';
            copyBtn.style.boxShadow = 'none';
        });

        // Create the Status Message text dynamically
        const copyStatus = document.createElement('span');
        copyStatus.style.fontSize = '0.8rem';
        copyStatus.style.fontWeight = 'bold';
        copyStatus.style.transition = 'opacity 0.3s ease';

        // Append the elements directly after the text box
        actionContainer.appendChild(copyBtn);
        actionContainer.appendChild(copyStatus);
        phraseBox.parentNode.appendChild(actionContainer);

        // Clipboard Copy Logic
        copyBtn.addEventListener('click', () => {
            const rawText = phraseBox.innerText.replace(/[“”"']/g, '').trim();

            navigator.clipboard.writeText(rawText).then(() => {
                copyStatus.textContent = 'Copied!';
                copyStatus.style.color = '#00ff66';
                copyStatus.style.textShadow = '0 0 5px #00ff66';
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
    // 2. DYNAMIC FAVICON & PWA LINKS
    // ==========================================
    // Inject Favicon Icon link tag into HTML Head
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';
    faviconLink.href = '/bankbugs.png';
    document.head.appendChild(faviconLink);

    // Inject App Manifest link tag into HTML Head
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
});

// ==========================================
// 3. BACKGROUND PWA SERVICE WORKER REGISTRATION
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('The Bank Bugs PWA Registered Successfully!'))
            .catch(err => console.log('PWA registration failed: ', err));
    });
}
// ==========================================
// 4. FRONTEND LIVE TRACKER UPDATER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const trackerContainer = document.querySelector('.site-tracker');
    if (trackerContainer) {
        // Clear old text but keep the green pulsing dot
        trackerContainer.innerHTML = '<span class="pulse-dot"></span> LIVE TRADERS: <span id="liveCount" style="color: #ffcc00; font-weight: bold; margin-left: 4px;">42</span>';
        
        const countElement = document.getElementById('liveCount');
        
        // Simulates real traders jumping on and off the platform in PNG
        setInterval(() => {
            let currentCount = parseInt(countElement.textContent);
            // Random flux between -3 and +3 traders
            let change = Math.floor(Math.random() * 7) - 3; 
            let newCount = currentCount + change;
            
            // Keep the baseline active community size between 35 and 65
            if (newCount < 35) newCount = 35;
            if (newCount > 65) newCount = 65;
            
            countElement.textContent = newCount;
        }, 4000); // Updates every 4 seconds
    }
});
