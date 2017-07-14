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
        if(this.left) {
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
    registerControls(){
        console.log('here')
        window.onkeydown = (e)=>{
            console.log('press', e.code)
            switch(e.code){
                case "ArrowLeft": this.left = true; break;
                case "ArrowRight": this.right = true; break;
                case "ArrowUp": this.jump = true; break;
            }
        }
        window.onkeyup = (e)=>{
            console.log('press', e.code)
            switch(e.code){
                case "ArrowLeft": this.left = false;  break;
                case "ArrowRight": this.right = false; break;
                case "ArrowUp": this.jump = false; break;
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

const Platforms = [];
const iWidth = window.innerWidth;
const iHeight = window.innerHeight;
Platforms.push(new Platform(new Point(iWidth/3,iHeight-120), 2*(iWidth/3), 20));
Platforms.push(new Platform(new Point(0, iHeight-240), iWidth/3, 20));
Platforms.push(new Platform(new Point(iWidth/3+30, iHeight-240), iWidth/6, 20));
Platforms.push(new Platform(new Point(iWidth/3+iWidth/6+60, iHeight-240), iWidth/6, 20));
for (i = 0; i < 5; i++) {
  Platforms.push(new Platform(new Point(iWidth/6 + (i * 60)+ 100, iHeight -340 - (i * 50)), 40, 20))
}
Platforms.push(new Platform(new Point(iWidth/3+iWidth/6+150, iHeight-540), iWidth/6, 20));
Platforms.push(new Platform(new Point(0, 60), iWidth/6*3.4, 20));


//borders
Platforms.push(new Platform(new Point(0, 0), window.innerWidth, 20))
Platforms.push(new Platform(new Point(0, window.innerHeight-20), window.innerWidth, 100))
Platforms.push(new Platform(new Point(0, 0), 20, window.innerHeight))
Platforms.push(new Platform(new Point(window.innerWidth -20, 0), 20, window.innerHeight))
