import Phaser from 'phaser';

class Planet {
  create({ radius, mass, fill }) {
    this.__circle = new Phaser.Geom.Circle(0,0, radius);
    this.__mass = mass;
    this.__radius = radius;
    this.__graphics = this.add.graphics({ 
      fillStyle: { color: fill } 
    });
    this.__graphics.fillCircleShape(this.__circle);
  }
  moveTo(x, y) {
    this.__graphics.x = x;
    this.__graphics.y = y;
  }
}

// debris is a particle emitter
// need to add / remove gravity wells to the emitter
// the particles should have a deathZone
// need to react to collisions

export default class Garden extends Phaser.Scene
{
  generate() {
    return new Promise(resolve => {
      const planet = this.scene.add(
        'planet', 
        Planet, 
        true, 
        { radius: 100, mass: 100, fill: 0xff0000 }
      );
      planet.moveTo(400, 300);
    });
  }
  create ()
  {
    //this.animateIn().then(() => {
    // Generate a solar system
    this.generate();
    // Explain what to do
    //
    //});
  }
}
