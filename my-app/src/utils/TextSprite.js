import * as THREE from 'three';

class TextSprite extends THREE.Sprite {
  constructor({
    text = '',
    fontFamily = 'Arial',
    fontSize = 24,
    color = '#ffffff',
    backgroundColor = 'transparent'
  } = {}) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size
    const padding = 8;
    context.font = `${fontSize}px ${fontFamily}`;
    const textMetrics = context.measureText(text);
    canvas.width = textMetrics.width + padding * 2;
    canvas.height = fontSize + padding * 2;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture and material
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture });
        
    super(material);

    // Scale sprite to maintain text aspect ratio
    const aspectRatio = canvas.width / canvas.height;
    this.scale.set(aspectRatio * fontSize, fontSize, 1);
  }
}

export default TextSprite; 