import Phaser from 'phaser';

export default function Loader(root, assets) {
  return new Promise((resolve, reject) => {
    // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
    var progressBar = root.add.graphics();
    var progressBox = root.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    
    var width = root.cameras.main.width;
    var height = root.cameras.main.height;
    var loadingText = root.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = root.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = root.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
    
    root.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    root.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
    root.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      resolve();
    });
    root.load.on('loaderror', reject);

    assets.forEach(({ key, href }) => {
      root.load.image(key, href);
    });
  });
}
