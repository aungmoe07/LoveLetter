const envelope = document.getElementById('envelope');
const letterText = document.getElementById('mainMessage');
const audio = document.getElementById('myAudio');

let step = 0;
let messageIndex = 0;

const messages = [
    "",
    "မင်းနဲ့အတူရှိရတဲ့ ၃ နှစ်နဲ့ ၄ လဟာ ငါ့အတွက် အရမ်းတန်ဖိုးရှိပါတယ်။",
    "example1",
    "example2",
    "example3 (This is the last one!)"
];

envelope.addEventListener('click', () => {
    if (step === 0) {
        // STEP 1: Open Flap
        envelope.classList.add('open');
        if (audio) audio.play();
        step++;
    } else if (step === 1) {
        // STEP 2: Pull out the Letter
        envelope.classList.add('opened');
        step++;
    } else if (step === 2) {
        // STEP 3: Change text OR Close
        if (messageIndex < messages.length - 1) {
            // If there are more messages, show the next one
            messageIndex++;
            
            letterText.style.opacity = 0;
            setTimeout(() => {
                letterText.innerText = messages[messageIndex];
                letterText.style.opacity = 1;
            }, 300);
        } else {
            // If it was the last message, RESET everything
            envelope.classList.remove('open', 'opened');
            
            // Optional: Reset message to the first one for next time
            setTimeout(() => {
                messageIndex = 0;
                letterText.innerText = messages[0];
                step = 0; 
            }, 500); // Wait for the "closing" animation to finish
        }
    }
});

// 2. MUSIC TOGGLE LOGIC
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents clicking the button from triggering the envelope
    if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = "🎵";
    } else {
        audio.pause();
        musicBtn.innerHTML = "🔇";
    }
});

// 3. DAYS TOGETHER CALCULATOR
function calculateDays() {
    // CHANGE THIS DATE to your actual anniversary (Year, Month - 1, Day)
    // Note: Months in JS are 0-indexed (January is 0, October is 9)
    const startDate = new Date(2022, 9, 11); // Example: Oct 11, 2022
    const today = new Date();
    
    const timeDiff = today - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    daysCounter.innerText = `${days} Days of Loving You`;
}

calculateDays();

// 4. FALLING HEARTS GENERATOR
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-falling');
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    // Randomize size slightly
    const size = (Math.random() * 10 + 10) + "px";
    heart.style.width = size;
    heart.style.height = size;

    document.body.appendChild(heart);

    // Clean up heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create a heart every 300ms
setInterval(createHeart, 300);