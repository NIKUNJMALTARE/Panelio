export const cropImageTo450x350 = (file) => {
  const TARGET_WIDTH = 450;
  const TARGET_HEIGHT = 350;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        const scale = Math.min(
          TARGET_WIDTH / img.width,
          TARGET_HEIGHT / img.height
        );

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const dx = (TARGET_WIDTH - scaledWidth) / 2;
        const dy = (TARGET_HEIGHT - scaledHeight) / 2;

        ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            const croppedFile = new File([blob], file.name, {
              type: "image/jpeg"
            });
            resolve(croppedFile);
          },
          "image/jpeg",
          0.9
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for cropping"));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};
