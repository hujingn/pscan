// 加载图片
export async function loadImage(url, cross) {
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

// 读取二进制文件
export async function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(this.result);
    };
  });
}
