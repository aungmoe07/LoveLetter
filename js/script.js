const envelope = document.getElementById('envelope');
const letterText = document.getElementById('mainMessage');
const clickHint = document.getElementById('click-hint');
const nextHint = document.getElementById('next-hint');
const audio = document.getElementById('myAudio');

let step = 0;
let messageIndex = 0;

const messages = [
    "",
    "Happy 3 years and 4 months anniversay ပါငယ်ရေ..❤️",
    "ဒီတစ်တော့ခါ အခုလိုညလေးကို အတူတူပြန်ပြီး ဖြတ်သန်းကြရပြီပေါ့နော်..❤️",
    "ငယ်သိလား၊ ငယ့်ကို သူငယ်ချင်းတွေက လက်ဆောင်လေးတွေ ‌ပေးတယ်ဆိုတိုင်း ကိုလေ...တစ်ခါတစ်လေ‌ အရမ်းအားငယ်တာပဲ..",
    "1",
    "2",
    "3",
    "4",
    "example3 (The End)"
];

envelope.addEventListener('click', () => {
    if (step === 0) {
        // Step 1: Open
        envelope.classList.add('open');
        clickHint.classList.add('hidden');
        
        // Music starts automatically on the first click
        if (audio) {
            audio.play().catch(e => console.log("Playback blocked until interaction"));
        }
        
        step++;
    } else if (step === 1) {
        // Step 2: Pull out
        envelope.classList.add('opened');
        nextHint.classList.add('visible');
        step++;
    } else if (step === 2) {
        // Step 3: Change text logic
        if (messageIndex < messages.length - 1) {
            messageIndex++;
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
            nextHint.innerText = "Next ➔";
            
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
    
    // Use Math.floor and innerWidth for better mobile compatibility
    const randomLeft = Math.floor(Math.random() * window.innerWidth);
    heart.style.left = randomLeft + "px";
    
    // Random duration for variety
    const duration = Math.random() * 3 + 3;
    heart.style.animation = `fall ${duration}s linear forwards`;
    
    // Random size scale
    const size = Math.random() * 0.8 + 0.5;
    heart.style.transform = `rotate(-45deg) scale(${size})`;

    document.body.appendChild(heart);

    // Clean up
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Start generating
setInterval(createHeart, 400); // Slightly slower rate for better mobile performance