/**
 * contact.js
 * Handles the obfuscated contact information
 */

(function() {
  // Get all obfuscated elements
  const obfuscatedElements = document.querySelectorAll('.obfuscated');
  
  // Add click handler to reveal the real information
  obfuscatedElements.forEach(element => {
    element.addEventListener('click', function() {
      const originalValue = this.getAttribute('data-original');
      
      // Only reveal if we haven't already
      if (this.classList.contains('obfuscated')) {
        // Replace content with the original value
        this.textContent = originalValue;
        this.classList.remove('obfuscated');
        
        // Add ability to copy to clipboard
        this.addEventListener('click', function(e) {
          e.stopPropagation();
          copyToClipboard(originalValue);
        });
        
        // Add indicator that clicking will copy
        this.title = "Click to copy to clipboard";
        this.style.cursor = "pointer";
      }
    });
  });
  
  // Function to copy text to clipboard
  function copyToClipboard(text) {
    // Create temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    
    // Select and copy
    tempInput.select();
    document.execCommand('copy');
    
    // Remove temporary element
    document.body.removeChild(tempInput);
    
    // Show a brief message that the text was copied
    const message = document.createElement('div');
    message.textContent = "Copied to clipboard!";
    message.style.position = "fixed";
    message.style.left = "50%";
    message.style.bottom = "20px";
    message.style.transform = "translateX(-50%)";
    message.style.padding = "8px 16px";
    message.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    message.style.color = "white";
    message.style.borderRadius = "4px";
    message.style.zIndex = "1000";
    
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transition = "opacity 0.5s";
      setTimeout(() => {
        document.body.removeChild(message);
      }, 500);
    }, 1500);
  }
})();