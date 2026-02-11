const envelope = document.getElementById('envelope');
const letterText = document.getElementById('mainMessage');
const clickHint = document.getElementById('click-hint');
const nextHint = document.getElementById('next-hint');
const audio = document.getElementById('myAudio');
const musicBtn = document.getElementById('music-control');

let step = 0;
let messageIndex = 0;

const messages = [
    "Happy 3 years and 4 months anniversay ပါငယ်ရေ..❤️",
    "ဒီတစ်ခေါက်တော့ ဒီလိုညလေးကို အတူတူပြန်ပြီး ဖြတ်သန်းကြရပြီပေါ့နော်..❤️",
    "example2",
    "example3 (The End)"
];

envelope.addEventListener('click', () => {
    if (step === 0) {
        // Step 1: Open
        envelope.classList.add('open');
        clickHint.classList.add('hidden'); // Hide "Click To Open"
        if (audio) audio.play();
        step++;
    } else if (step === 1) {
        // Step 2: Pull out
        envelope.classList.add('opened');
        nextHint.classList.add('visible'); // Show "Next"
        step++;
    } else if (step === 2) {
        // Step 3: Change text
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            
            // If it's the last message, change "Next" to "Close"
            if (messageIndex === messages.length - 1) {
                nextHint.innerText = "Close ✖";
            }

            letterText.style.opacity = 0;
            setTimeout(() => {
                letterText.innerText = messages[messageIndex];
                letterText.style.opacity = 1;
            }, 300);
        } else {
            // Step 4: Reset
            envelope.classList.remove('open', 'opened');
            nextHint.classList.remove('visible');
            clickHint.classList.remove('hidden');
            nextHint.innerText = "Next ➔"; // Reset button text
            
            setTimeout(() => {
                messageIndex = 0;
                letterText.innerText = messages[0];
                step = 0;
            }, 500);
        }
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Randomize horizontal position (0 to 100% of screen width)
    heart.style.left = Math.random() * 100 + "vw";
    
    // Randomize fall duration (between 3 and 6 seconds)
    const duration = Math.random() * 3 + 3;
    heart.style.animation = `fall ${duration}s linear forwards`;
    
    // Randomize size slightly for depth
    const sizeScale = Math.random() * 0.8 + 0.5;
    heart.style.transform = `rotate(-45deg) scale(${sizeScale})`;
    
    // Add to body
    document.body.appendChild(heart);

    // Remove heart from memory after it finishes falling
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Start the heart rain!
setInterval(createHeart, 300);

musicBtn.addEventListener('click', (e) => {
    // This stops the click from opening/closing the envelope
    e.stopPropagation(); 

    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.innerHTML = "🎵"; // Icon when playing
            musicBtn.style.opacity = "1";
        }).catch(err => {
            console.log("Playback failed:", err);
        });
    } else {
        audio.pause();
        musicBtn.innerHTML = "🔇"; // Icon when muted
        musicBtn.style.opacity = "0.6";
    }
});

// 3. Optional: Auto-start music on first envelope click 
// (Browsers often require a user to click something before sound plays)
envelope.addEventListener('click', () => {
    if (step === 0 && audio.paused) {
        audio.play();
        musicBtn.innerHTML = "🎵";
    }
    // ... rest of your existing envelope code ...
});