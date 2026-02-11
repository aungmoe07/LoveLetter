const envelope = document.getElementById('envelope');
const audio = document.getElementById('myAudio');
const musicBtn = document.getElementById('music-control');
const daysCounter = document.getElementById('daysCounter');

let step = 0;

// 1. CLICK LOGIC (Open -> Pull -> Reset)
envelope.addEventListener('click', () => {
    if (step === 0) {
        // Step 1: Open Flap
        envelope.classList.add('open');
        audio.play().catch(e => console.log("Audio needs user interaction first."));
        step++;
    } else if (step === 1) {
        // Step 2: Pull out the Letter
        envelope.classList.add('opened');
        step++;
    } else {
        // Step 3: Reset to start over
        envelope.classList.remove('open', 'opened');
        step = 0;
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