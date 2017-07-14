class Physics {
  applyGravity(gameObjects, collisions, powerUps) {
    gameObjects.forEach(gameObject => {
      gameObject.applyVelocity(0, 3);
      check('x', gameObject, collisions);
      check('y', gameObject, collisions);
    });
    const player = gameObjects[0];
    const newPowerUps = powerUps.filter((gameObject, i) => {
      return !gameObject.checkAndApply(player);
    });
    return newPowerUps;
  }
}

function check(prop, gameObject, collisions) {
  const newPos = new Point(gameObject.location.x, gameObject.location.y);
  newPos[prop] = gameObject.location[prop] + gameObject.velocity[prop];

  const collisionTarget = collisions.map(platform => {
    if(platform.collide(newPos.x, newPos.y, gameObject.width, gameObject.height)) {
      return platform;
    }
    return null;
  }).filter(platform => platform);
  if (collisionTarget.length > 0) {
    if (prop === 'y' && gameObject.velocity.y > 0) {
        gameObject.jumping = false;
    }
    const velocity = new Point(gameObject.velocity.x, gameObject.velocity.y);
    velocity[prop] = 0;
    gameObject.velocity = velocity;

  } else {
    gameObject.location[prop] = newPos[prop]
    if (gameObject.velocity[prop] > 0) {
      gameObject.velocity[prop]-= 0.1;
    } else if(gameObject.velocity[prop] < 0) {
      gameObject.velocity[prop]+= 0.1;
    }
  }
}
