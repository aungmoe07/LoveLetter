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
    "ကို့ဘက်မှာ အခုချိန်ထိ ဆက်ပြီး ရပ်တည်၊ အားပေးပြီး၊ ချစ်ပေးနေတဲ့အတွက် ကျေးဇူးပါနော်လို့..ကလေးငယ်❤️",
    "ဒါနဲ့လေ အရင်တစ်ခေါက်တုန်းကလေ ငယ်ပြောပြခဲ့တဲ့ 'ကံ' ဆိုတဲ့ အရာလေးရဲ့ အဓိပ္ပါယ်လေးကို သတိရမိတိုင်း..❤️",
    "နောက် ဘယ်လိုတွေကြုံပြီး၊ ဘာဆက်ဖြစ်မယ်ဆိုတာကို အရမ်းတွေးပြီး မစိုးရိမ်မိတော့ဘူးရယ်..❤️",
    "ငယ်ငယ်ပြောတဲ့ 'ကံ' ဆိုတာ 'အလုပ်' ဆိုတဲ့ အရာလေးအတိုင်း၊ ကိုယ်ဘာလုပ်ရင် ဘာဖြစ်မယ်ဆိုတာကိုပဲ အာရုံထဲ ပိုဝင်လာတော့တယ်ရယ်..❤️ ",
    "ဒါပေမဲလည်းလေ... ငယ်သိလား၊ ငယ့်ကို သူငယ်ချင်းတွေက လက်ဆောင်လေးတွေ ‌ပေးတယ်ဆိုတိုင်း ကိုလေ...တစ်ခါတစ်လေ‌ အရမ်းအားငယ်တာပဲ..❤️‍🩹",
    "ငယ် သူများတွေနဲ့ အပြင်လေးတွေသွားတိုင်း...ကိုနဲ့သာဆိုရင် ဘာလေးတွေလုပ်ဖြစ်လောက်မလဲ ဆိုပြီး မျက်ရည်လေးတွေ ကျမိတယ်ရယ်..❤️‍🩹",
    "အားကျစရာလေးတွေပေါ့နော်..❤️‍🩹",
    "အခုလို ရပ်ဝေး‌ရောက်နေတဲ့ အခြေအနေလေးကြောင့်..❤️‍🩹",
    "အရှေ့ကို အများကြီး မပြောချင်ပေမဲ့..❤️‍🩹",
    "ဖြစ်နိုင်မယ်ဆိုရင်လေ..💞",
    "ကိုယ်တို့ရဲ့ 'ကံ' ဆိုလေးကြောင့် အနာဂတ်က ကာလတစ်ခုမှာ မတွေ့ခင်အထိ..💕",
    "အခု ဆက်သွယ်နေကြတဲ့ Digital World လေးမှာလေ..💓",
    "အဆက်အသွယ်လေး ဆက်ရှိသွားချင်ပါတယ်ရယ်...💓",
    "ကိုလေ သူများတွေလို Physical လက်ဆောင်လေးတွေ မပေနိုင်ပေမဲ့..❤️‍🩹",
    "ကိုယ်လုပ်ထားတဲ့ ဒီက Digital Letter လေးနဲ့ 💌",
    "ကိုယ့်နှလုံးသားထဲက မေတ္တာလက်ဆောင်လေးကိုတော့ လက်ခံပေးပါငယ်...💝",
    "ချစ်တယ်ငယ်..၊ များရီးချစ်တယ်နော်..😘💗"
];

// Add your image paths here
const photoSources = [
    "../img/img1.jpg",
    "../img/img2.jpg",
    "../img/img3.jpg",
    "../img/img4.jpg",
    "../img/img5.jpg",
    "../img/img6.jpg",
    "../img/img7.jpg",
    "../img/img8.jpg",
    "../img/img9.jpg",
    "../img/img10.jpg",
    "../img/img11.jpg",
    "../img/img12.jpg",
    "../img/img13.jpg",
    "../img/img14.jpg",
    "../img/img15.jpg",
    "../img/img16.jpg",
    "../img/img17.jpg",
    "../img/img18.jpg",

];

// Track the current image number
let imageCounter = 1;
const totalImages = 18;

function spawnRandomPhoto() {
    if (imageCounter > totalImages) return; // Stop if we run out of images

    const container = document.getElementById('photo-scatter-container');
    const photo = document.createElement('img');
    
    // Set source in order: img1.jpg, img2.jpg, etc.
    photo.src = `img/img${imageCounter}.jpg`;
    photo.classList.add('scatter-photo');

    // Logic to find a safe spot (avoiding the center)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const deadZoneWidth = 320; 
    const deadZoneHeight = 450; 
    
    let x, y;
    let isSafe = false;

    while (!isSafe) {
        // Randomly pick coordinates
        x = Math.random() * (screenWidth - 100);
        y = Math.random() * (screenHeight - 100);

        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Check if the spot is outside the envelope/letter area
        if (Math.abs(x - centerX) > deadZoneWidth / 2 || Math.abs(y - centerY) > deadZoneHeight / 2) {
            isSafe = true;
        }
    }

    photo.style.left = x + "px";
    photo.style.top = y + "px";

    // Random tilt for that "scattered" look
    const tilt = (Math.random() * 40) - 20;
    photo.style.setProperty('--rotation', `${tilt}deg`);

    container.appendChild(photo);

    // Fade in
    setTimeout(() => photo.classList.add('show'), 50);

    // Increase counter for the next click
    imageCounter++;
}

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
            spawnRandomPhoto();
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
            
            const allPhotos = document.querySelectorAll('.scatter-photo');
            allPhotos.forEach(photo => {
                photo.classList.remove('show'); // This triggers the CSS fade out
                
                // Remove the actual elements after they have faded (0.5s match CSS)
                setTimeout(() => {
                    photo.remove();
                    imageCounter = 1;
                }, 500);
            });

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