const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

/* Ajustar canvas al tamaño de la ventana */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/* Frases románticas */
const phrases = [
    "un cafecito para Johelys porfa",
    "te adoro Johe",
    "cuidate mucho Jana",
    "guapa",
    "eres mi todo",
    "iloveu",
    "preciosa",
    "te amo cafe duran",
    "mi corazón de melon",
    "bella",
    "mi vida",
    "dulce como la coca-cola",
    "jsjsjsjs",
    "hermosa",
    "me encantas"
];

/* Colores llamativos */
const colors = [
    '#ff69b4', '#00ff41', '#ff6b6b', '#4ecdc4', '#45b7d1',
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
    '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3'
];

/* Configuración del efecto Matrix */
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

/* Inicializar las gotas */
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

/* Crear texto cayendo */
function createFallingText() {
    const text  = phrases[Math.floor(Math.random() * phrases.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x     = Math.random() * (window.innerWidth - text.length * 10);

    const element = document.createElement('div');
    element.className   = 'falling-text';
    element.textContent = text;
    element.style.color = color;
    element.style.left  = x + 'px';
    element.style.top   = '-50px';
    element.style.animationDuration = (Math.random() * 3 + 2) + 's';

    /* Generar animación de caída */
    const keyframes = `
        @keyframes fall {
            to { transform: translateY(${window.innerHeight + 100}px); }
        }
    `;
    if (!document.querySelector('#falling-styles')) {
        const style = document.createElement('style');
        style.id           = 'falling-styles';
        style.textContent  = keyframes;
        document.head.appendChild(style);
    }

    document.body.appendChild(element);

    /* Remover elemento después de la animación */
    setTimeout(() => element.remove(), 5000);
}

/* Animación principal tipo Matrix */
function draw() {
    /* Desvanecer levemente el lienzo */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Dibujar caracteres */
    for (let i = 0; i < drops.length; i++) {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const color  = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle   = color;
        ctx.font        = fontSize + 'px Courier New';
        ctx.shadowBlur  = 10;
        ctx.shadowColor = color;

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(phrase.charAt(Math.floor(Math.random() * phrase.length)), x, y);

        /* Reiniciar cuando llega al fondo */
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

/* Ejecutar animación Matrix */
setInterval(draw, 50);

/* Generar textos cayendo cada 0,8 s */
setInterval(createFallingText, 800);

/* Interacción al hacer clic */
let clickCount = 0;
document.addEventListener('click', e => {
    clickCount++;

    /* Mensaje central */
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = 'para ti de mi: ❤';
    const heartColors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ff9ff3'];
    message.style.color = heartColors[clickCount % heartColors.length];
    document.body.appendChild(message);

    /* Partículas de corazones */
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML   = '❤';
            heart.style.position      = 'fixed';
            heart.style.left          = e.clientX + 'px';
            heart.style.top           = e.clientY + 'px';
            heart.style.color         = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize      = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex        = '1000';
            heart.style.animation     = 'heartFloat 2s ease-out forwards';

            /* Animación flotante (solo se añade una vez) */
            if (!document.querySelector('#heart-styles')) {
                const style = document.createElement('style');
                style.id          = 'heart-styles';
                style.textContent = `
                    @keyframes heartFloat {
                        0%   { transform: translateY(0) scale(1);   opacity: 1; }
                        100% { transform: translateY(-100px) scale(0.3); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }

    /* Remover mensaje */
    setTimeout(() => message.remove(), 3000);
});

/* Efecto inicial */
setTimeout(createFallingText, 500);
