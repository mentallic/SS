let SCORE = 0;
let START = new Date().getTime();
const PhysicsEngine = new Physics();
let PowerUps = [];
PowerUps.push(new Powerup(40, 300), new Powerup(540, 300));
function loop(t){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'
    PowerUps = PhysicsEngine.applyGravity([player].concat(PowerUps), Platforms, PowerUps);
    player.draw(ctx);
    PowerUps.forEach(pu => pu.draw(ctx));
    Platforms.forEach(platform => platform.draw(ctx));
    ctx.fillStyle = 'white'
    ctx.font = "15px Arial";
    ctx.fillText(`Score ${SCORE}`, 50, window.innerHeight-5);
    ctx.fillText(`Time: ${(new Date().getTime() - START) / 1000}s`, 250, window.innerHeight-5);
    window.requestAnimationFrame(loop);
}

function init(){
  canvas = document.getElementById("myCanvas");
  canvas.width = document.body.clientWidth; //document.width is obsolete
  canvas.height = document.body.clientHeight; //document.height is obsolete
}

const player = new Player(new Point(100,window.innerHeight-70))
window.onload = function() {
  init();
  window.requestAnimationFrame(loop);
};
