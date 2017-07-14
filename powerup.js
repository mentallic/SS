class Powerup {
  constructor(x, y) {
    this.location = new Point(x, y);
    this.velocity = new Point(0, 0);
    this.width = 20;
    this.height = 20;
  }
  draw(ctx) {
    const oldFill = ctx.fillStyle;
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    ctx.fillStyle = oldFill;
  }
  applyVelocity(x, y) {
    this.velocity.x += x;
    this.velocity.y += y;
  }
  collide(x, y, w, h) {
    return (
      x < this.location.x + this.width &&
      x + w > this.location.x &&
      y < this.location.y + this.height &&
      h + y > this.location.y
    );
  }
  checkAndApply(player) {
    if(this.collide(player.location.x, player.location.y, player.width, player.height)) {
      player.width += 5;
      player.height += 5;
      player.location.y -= 5;
      SCORE += 50;
      return true;
    }
    return false;
  }
}
