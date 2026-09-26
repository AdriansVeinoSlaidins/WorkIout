const fs = require("fs");
const path = require("path");

const imageFolder = path.join(
  __dirname,
  "../../assets/images/workoutImages"
);

const outputFile = path.join(
  __dirname,
  "exerciseImages.ts"
);

const files = fs.readdirSync(imageFolder);

const imageFiles = files.filter(
  (file) => file.toLowerCase().endsWith(".png")
);

let output = `export const exerciseImages = {\n`;

for (const file of imageFiles) {
  const id = path.basename(file, path.extname(file));

  output += `  "${id}": require("@/assets/images/workoutImages/${file}"),\n`;
}

output += `};\n`;

fs.writeFileSync(outputFile, output);

console.log(`Generated ${imageFiles.length} exercise images.`);