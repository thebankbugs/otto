/**
 * The Bank Bugs - Automated Clipboard Copy Script
 * Injects copy elements dynamically into the existing HTML structure.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Locate the existing phrase-box element
    const phraseBox = document.querySelector('.phrase-box');
    
    if (phraseBox) {
        // Create container for alignment
        const actionContainer = document.createElement('div');
        actionContainer.style.marginTop = '12px';
        actionContainer.style.display = 'flex';
        actionContainer.style.alignItems = 'center';
        actionContainer.style.gap = '12px';

        // 2. Create the Copy Button dynamically
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

        // Add hover effects using JS styles
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

        // 3. Create the Status Message text dynamically
        const copyStatus = document.createElement('span');
        copyStatus.style.fontSize = '0.8rem';
        copyStatus.style.fontWeight = 'bold';
        copyStatus.style.transition = 'opacity 0.3s ease';

        // 4. Append the elements directly after the text box
        actionContainer.appendChild(copyBtn);
        actionContainer.appendChild(copyStatus);
        phraseBox.parentNode.appendChild(actionContainer);

        // 5. Add Clipboard functionality
        copyBtn.addEventListener('click', () => {
            // Strip decorative quotation marks to get only the real text message
            const rawText = phraseBox.innerText.replace(/[“”"']/g, '').trim();

            navigator.clipboard.writeText(rawText).then(() => {
                // Success feedback state
                copyStatus.textContent = 'Copied!';
                copyStatus.style.color = '#00ff66';
                copyStatus.style.textShadow = '0 0 5px #00ff66';
                copyBtn.textContent = 'Copied ✔';

                // Reset the layout to standard after 2 seconds
                setTimeout(() => {
                    copyStatus.textContent = '';
                    copyBtn.textContent = 'Click to Copy Text';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyStatus.textContent = 'Failed to copy. Please copy manually.';
                copyStatus.style.color = '#ff3333';
                copyStatus.style.textShadow = 'none';
            });
        });
    }
});
