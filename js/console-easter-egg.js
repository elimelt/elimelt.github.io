/**
 * console-easter-egg.js
 * Authentic Web 1.0 Experience
 */

(function() {
  // ASCII art for console
  const asciiArt = `
   _      _ _           _   _
  | |    (_) |         | | | |
  | |     _| | _____   | |_| |__
  | |    | | |/ / _ \\  | __| '_ \\
  | |____| |   <  __/  | |_| | | |
  |______|_|_|\\_\\___|   \\__|_| |_|

   _   _                         _ _
  | | | |                       | (_)
  | |_| |__   ___    _ __   __ _| |_
  | __| '_ \\ / _ \\  | '_ \\ / _\` | | |
  | |_| | | |  __/  | |_) | (_| | | |
   \\__|_| |_|\\___|  | .__/ \\__,_|_|_|
                     | |
                     |_|
  `;

  // Print the easter egg
  console.log('%c' + asciiArt, 'font-family: monospace; color: green;');
  console.log('%cWelcome to my Geocities page!', 'color: red; font-size: 20px; font-weight: bold;');
  console.log('%cYou are visitor number: ' + Math.floor(Math.random() * 10000 + 10000), 'color: blue; font-weight: bold;');
  console.log('%cThis site is best viewed in Netscape Navigator 4.0', 'color: purple;');
  
  console.log('%cTry these retro commands:', 'color: green;');
  console.log('%c> webRing()', 'color: blue;');
  console.log('%c> guestBook()', 'color: blue;');
  console.log('%c> dialUp()', 'color: blue;');
  
  // Web 1.0 easter egg functions
  window.webRing = function() {
    console.log('%c🔄 WEBRING SITES 🔄', 'color: red; font-weight: bold;');
    console.log('1. CoolDudes95 Homepage');
    console.log('2. JavaScriptIsTheNewHotness');
    console.log('3. Welcome To My Homepage');
    console.log('4. ** YOU ARE HERE **');
    console.log('5. DHTML Paradise');
    return "You have entered the Web Ring! Check console for navigation.";
  };

  window.guestBook = function() {
    console.log('%c✒️ GUESTBOOK ENTRIES ✒️', 'color: purple; font-weight: bold;');
    console.log('🗓️ 02/14/2025 - CoolDude95: "Awesome site! Love the browser defaults!"');
    console.log('🗓️ 01/30/2025 - WebMaster2000: "Your HTML skills are top notch!"');
    console.log('🗓️ 01/15/2025 - JavaFan: "Thanks for the tips on distributed systems!"');
    
    const name = prompt("Sign my guestbook! Enter your name:");
    if (name) {
      const message = prompt("Enter your message:");
      if (message) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        console.log(`🗓️ ${formattedDate} - ${name}: "${message}"`);
        alert("Thanks for signing my guestbook!");
      }
    }
    
    return "Guestbook accessed!";
  };

  window.dialUp = function() {
    console.log('%c☎️ DIALING UP... ☎️', 'color: blue; font-weight: bold;');
    
    // Play the dial-up sound effect (simulation in console)
    setTimeout(() => console.log('Beep...'), 500);
    setTimeout(() => console.log('Boop...'), 1000);
    setTimeout(() => console.log('Screeeeeech...'), 1500);
    setTimeout(() => console.log('Bing!'), 2000);
    setTimeout(() => console.log('Bong!'), 2500);
    setTimeout(() => console.log('Ksssssshhhhhhh...'), 3000);
    setTimeout(() => console.log('%cCONNECTED AT 56K!', 'color: green; font-weight: bold;'), 4000);
    
    return "Dialing up... check console for connection progress!";
  };
  
  // No need to implement blink or marquee effects here
  // They're now handled via CSS animations
  
  // Hit counter incrementer
  const counterElement = document.querySelector('p.small-text');
  if (counterElement && counterElement.textContent.includes('Hit Counter')) {
    const currentCount = parseInt(counterElement.textContent.replace(/\D/g, '')) || 0;
    const newCount = currentCount + 1;
    counterElement.textContent = 'Hit Counter: ' + newCount.toLocaleString();
  }
})();