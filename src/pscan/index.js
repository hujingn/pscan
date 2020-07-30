class Pscan {
  /**
   * 图片文件/图片地址/
   * @param {file / url / width} a
   * @param {height} b
   */
  constructor(a, b) {
    this.id = Date.now();
    this.width = 0;
    this.height = 0;
    this.size = 0;
    this.name = '';
    this.canvas = null;
    this.ctx = null;
    this.initCanvas(a, b);
  }

  /**
   * 初始化
   * @param {*} a
   * @param {*} b
   */
  initCanvas(a, b) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.ctx = ctx;
    if (a instanceof File) {
      this.size = (a.size / 1000).toFixed(2);
      this.name = a.name;
      this.readFile(a).then((file) => {
        this.loadImage(file).then((img) => {
          this.width = img.width;
          this.height = img.height;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        });
      });
    } else if (typeof a === 'string') {
      this.loadImage(a, true).then((img) => {
        this.width = img.width;
        this.height = img.height;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      });
    } else if (typeof a === 'number') {
      this.width = a;
      this.height = b;
      canvas.width = a;
      canvas.height = b;
    } else {
      console.warn(`unknow type ${a}`);
    }
  }

  test() {
    const { canvas, ctx } = this;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.width);
    // 对比度系数
    const Contrast = 1.2;
    // 亮度增量
    const brightness = 10;
    for (let i = 0; i < imgData.data.length; i += 4) {
      const r = imgData.data[i] * Contrast + brightness;
      const g = imgData.data[i + 1] * Contrast + brightness;
      const b = imgData.data[i + 2] * Contrast + brightness;
      imgData.data[i] = r;
      imgData.data[i + 1] = g;
      imgData.data[i + 2] = b;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  /**
   * 加载图片
   * @param {*} url
   * @param {*} cross
   */
  async loadImage(url, cross) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      if (cross) {
        img.crossOrigin = 'anonymous';
      }
      img.src = url;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (e) {
        reject(e);
      };
    });
  }

  /**
   * 读取图片文件
   * @param {*} file
   */
  async readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(this.result);
      };
    });
  }
}

export default Pscan;
