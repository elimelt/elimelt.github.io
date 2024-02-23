class ImageUtils {
  static transformations = {
    grayscale: [],
    invertColor: [],
    sepia: [],
    brightness: [{ name: 'value', label: 'Brightness Value', type: 'number', defaultValue: 50 }],
    contrast: [{ name: 'value', label: 'Contrast Value', type: 'number', defaultValue: 50 }],
    saturation: [{ name: 'value', label: 'Saturation Value', type: 'number', defaultValue: 50 }],
  };

  static async processImage(base64, transformation, params) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Apply transformation based on selected option
        switch (transformation) {
          case 'grayscale':
            this.applyGrayscale(ctx, canvas);
            break;
          case 'invertColor':
            this.applyInvertColor(ctx, canvas);
            break;
          case 'sepia':
            this.applySepia(ctx, canvas);
            break;
          case 'brightness':
            this.adjustBrightness(ctx, canvas, params.value);
            break;
          case 'contrast':
            this.adjustContrast(ctx, canvas, params.value);
            break;
          case 'saturation':
            this.adjustSaturation(ctx, canvas, params.value);
            break;
          default:
            // No transformation
            break;
        }

        // Convert the canvas content back to base64 string
        const processedImageDataUrl = canvas.toDataURL('image/png');
        resolve(processedImageDataUrl);
      };
      img.src = base64;
    });
  }

  static applyGrayscale(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static applyInvertColor(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static applySepia(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static adjustBrightness(ctx, canvas, value) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const adjustment = (value - 50) * 2;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjustment; // Red
      data[i + 1] += adjustment; // Green
      data[i + 2] += adjustment; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static adjustContrast(ctx, canvas, value) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const factor = (259 * (value + 255)) / (255 * (259 - value));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128; // Red
      data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
      data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  }

  static adjustSaturation(ctx, canvas, value) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const saturation = value / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = 0.2989 * r + 0.587 * g + 0.114 * b;

      data[i] = gray + saturation * (r - gray);
      data[i + 1] = gray + saturation * (g - gray);
      data[i + 2] = gray + saturation * (b - gray);
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

export default ImageUtils;
