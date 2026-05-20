const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPRITE_WIDTH = 130, SPRITE_HEIGHT = 140;
const BG_WIDTH = 1025, BG_HEIGHT = 650;

const snowflakeImage = new Image();
snowflakeImage.src = "./assets/snowflake.png";

class Snowflake 
{
    x = 0;
    y = 0;
    velocity = {x : 0, y : 0};

    constructor () 
    {
        this.init ();
    }

    init ()
    {
        this.x = Math.random () * (canvas.width - 16);
        this.y = Math.random () * (canvas.height - 16);

        this.velocity.x = 1 - Math.random () * 2;
        this.velocity.y = Math.random () * 2;
    }

    reset () 
    {
        this.init ();
        this.y = -16;
    }

    update () 
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y > canvas.height || this.x > canvas.width || this.x + 16 < 0)
        {
            this.reset ();
        }
    }
    
    draw () 
    {
        context.drawImage (snowflakeImage, this.x, this.y);
    }
}

let background = {x: (canvas.width - BG_WIDTH) / 2, y: ((canvas.height - BG_HEIGHT) / 2) - 20};
const backgroundImage = new Image ();
backgroundImage.src = "./assets/snowbg.png";

let foxglove = {x: background.x + (BG_WIDTH / 2) - 160, y: background.y + (BG_HEIGHT - 175)};
const foxgloveImage = new Image ();
foxgloveImage.src = "./assets/foxglove_assets.png";

const music = new Audio ("./assets/winter world 8bit.mp3");
music.loop = true;
music.volume = 0.25;

window.addEventListener("click", () => {
    music.play();
}, { once: true });

const framerate = 10;
const elapsed = 1000 / framerate;

let currentFrame = 0;

let snowflakes = [];
let snowflakeAmount = 120;

for (let i = 0 ; i < snowflakeAmount ; i++)
{
    snowflakes.push (new Snowflake ());
}

update ();

function update ()
{
    currentFrame = (currentFrame + 1) % 8;

    for (let i = 0 ; i < snowflakeAmount ; i++)
    {
        snowflakes[i].update ();
    }

    draw ();
    setTimeout (update, elapsed);
}

function draw ()
{
    context.clearRect (0, 0, canvas.width, canvas.height);

    for (let i = 0 ; i < snowflakeAmount ; i++)
    {
        snowflakes[i].draw ();
    }

    context.drawImage (
        backgroundImage,
        background.x,
        background.y
    );


    context.drawImage (
        foxgloveImage, 
        currentFrame * SPRITE_WIDTH, 
        0, 
        SPRITE_WIDTH, 
        SPRITE_HEIGHT, 
        foxglove.x, 
        foxglove.y, 
        SPRITE_WIDTH, 
        SPRITE_HEIGHT
    );
}