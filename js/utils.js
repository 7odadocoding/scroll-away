// No spending time on utils functions tnx chatGPT ur the best slav.. friend ever

function generateRandomColor(previousColors) {
   while (true) {
      // Generate random hue value
      let hue = Math.floor(Math.random() * 360);

      // Set saturation and lightness to fixed values
      let saturation = 50;
      let lightness = 50;

      // Convert HSL to RGB
      let rgbColor = hslToRgb(hue, saturation, lightness);

      // Convert RGB to hex
      let colorHex = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);

      // Check if the generated color is different from the previous colors
      if (!previousColors.includes(colorHex)) {
         return colorHex;
      }
   }
}

function hslToRgb(h, s, l) {
   h /= 360;
   s /= 100;
   l /= 100;

   let r, g, b;

   if (s === 0) {
      r = g = b = l; // Achromatic color (gray)
   } else {
      let hueToRgb = function hueToRgb(p, q, t) {
         if (t < 0) t += 1;
         if (t > 1) t -= 1;
         if (t < 1 / 6) return p + (q - p) * 6 * t;
         if (t < 1 / 2) return q;
         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
         return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
   }

   return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
   };
}

function rgbToHex(r, g, b) {
   let componentToHex = function componentToHex(c) {
      let hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
   };

   return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default generateRandomColor;
