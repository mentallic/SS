const PhysicsEngine = new Physics();
function loop(t){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    PhysicsEngine.applyGravity([player], Platforms);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    Platforms.forEach(platform => platform.draw(ctx));
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