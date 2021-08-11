import Phaser from 'phaser';
import assets from './assetManifest';
import Loader from './scenes/loading';
import Intro from './scenes/intro';

/**
 * This should be the root and should manage scenes?
 */

class Root extends Phaser.Scene
{
    constructor ()
    {
      super();
      console.log("Root.construct");
    }

    preload ()
    {
      console.log("Root.load");
      
      Loader(this, assets)
        // Go to next scene
        .then(() => this.scene.add('intro', Intro, true, { x: 400, y: 300 }))
        // Go to error scene 
        .catch(e => e);
    } 
    
    create ()
    {
      console.log("Root.create");
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'root',
    width: 800,
    height: 600,
    scene: Root
};

const game = new Phaser.Game(config);
