function Point(x,y){
  this.x = x;
  this.y = y;
}

class Player{
    constructor(location){
        this.location = location;
        this.velocity = new Point(0, 0);
        this.width = 20;
        this.height = 20;
        this.registerControls();
        this.left = false;
        this.right = false;
        this.jump = false;
        this.stop = false;
    }
    draw(ctx){
        this.move();
        ctx.fillRect(this.location.x,this.location.y, this.width, this.height);
    }
    applyVelocity(x, y) {
        this.velocity.x += x;
        this.velocity.y += y;
    }
    move() {
        if (this.stop) {
          this.velocity.x = 0;
        } else if(this.left) {
            this.applyVelocity(-0.3, 0);
        } else if (this.right) {
            this.applyVelocity(0.3, 0);
        }
        if (this.jump) {
            if(!this.jumping) {
               this.applyVelocity(0,-30);
               this.jumping = true;
            }
        }
    }
    
    collide(x, y, w, h) {
        return (x < this.location.x + this.width &&
        x + w > this.location.x &&
        y < this.location.y + this.height &&
        h + y > this.location.y);
    }
    
    registerControls(){
        window.onkeydown = (e)=>{
            switch(e.code){
                case "ArrowLeft": this.left = true; break;
                case "ArrowRight": this.right = true; break;
                case "ArrowUp": this.jump = true; break;
                case "Space": this.jump = true; break;
                case "ArrowDown": this.stop = true; break;
            }
        }
        window.onkeyup = (e)=>{
            switch(e.code){
                case "ArrowLeft": this.left = false;  break;
                case "ArrowRight": this.right = false; break;
                case "ArrowUp": this.jump = false; break;
                case "Space": this.jump = false; break;
                case "ArrowDown": this.stop = false; break;

               }
            }
        }
    }

class Platform{
    constructor(location, w, h) {
        this.location = location;
        this.width = w;
        this.height = h;
    }
    draw(ctx) {
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }
    collide(x, y, w, h) {
        return (x < this.location.x + this.width &&
        x + w > this.location.x &&
        y < this.location.y + this.height &&
        h + y > this.location.y);
    }
}

let Platforms = [];
const iWidth = window.innerWidth;
const iHeight = window.innerHeight;
const Borders = [
  [0, 0, iWidth, 20],
  [0, iHeight -20, iWidth, 100],
  [0, 0, 20, iHeight],
  [iWidth -20, 0, 20, iHeight],
];

function clearLevel() {
  Platforms = [];
}

const LevelOne = [
  [iWidth/3, iHeight-120, 2*(iWidth/3), 20],
  [0, iHeight-240, iWidth/3, 20],
  [iWidth/3+30, iHeight-240, iWidth/6, 20],
  [iWidth/3+iWidth/6+60, iHeight-240, iWidth/6, 20],
  [iWidth/3+iWidth/6+150,iHeight-540,iWidth/6, 20],
  [0,80,iWidth/6*3.4, 20],
];

const LevelTwo = [
  [iWidth/3, iHeight-120, 2*(iWidth/3), 20],
  [0, iHeight-240, iWidth/3, 20],
  [iWidth/3+30, iHeight-240, iWidth/6, 20],
  [iWidth/3+iWidth/6+60, iHeight-240, iWidth/6, 20],
  [iWidth/3+iWidth/6+150,iHeight-540,iWidth/6, 20],
  [0,80,iWidth/6*3.4, 20],
];

for (i = 0; i < 5; i++) {
  LevelOne.push([iWidth/6 + (i * 70)+ 100, iHeight -340 - (i * 30), 40, 20]);
}

function ApplyPlatforms(from, to) {
  from.forEach(plat => {
    const point = new Point(plat[0], plat[1]);
    const platform = new Platform(point, plat[2], plat[3]);
    to.push(platform);
  });
}

Levels = {
  '1': {
    layout: LevelOne,
    startPoint: new Point(0, 0),
    endPoint: new Point(40, 40),
  },
  '2': {
    layout: LevelTwo,
    startPoint: new Point(0, 0),
    endPoint: new Point(40, 40),
  },
}

function setupLevel(lvl) {
  clearLevel();
  ApplyPlatforms(Borders, Platforms);
  ApplyPlatforms(Levels[lvl].layout, Platforms);
}
