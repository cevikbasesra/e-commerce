import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImage(inputPath, outputPath, isJpg = true, options = {}) {
  try {
    let pipeline = sharp(inputPath);
    
    // If it's the second slider, set the background color
    if (inputPath.includes('slider-2')) {
      pipeline = pipeline.flatten({ background: '#23856D' });
    }
    
    if (isJpg) {
      pipeline = pipeline.jpeg({
        quality: 80, // Good balance between quality and file size
        mozjpeg: true // Use mozjpeg for better compression
      });
    } else {
      pipeline = pipeline.png({
        compressionLevel: 9, // Maximum compression
        palette: true // Use palette-based compression when possible
      });
    }

    await pipeline.toFile(outputPath);
    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
    console.log(`Optimized: ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function optimizeAllImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const files = await fs.readdir(publicDir);
  
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Skip already optimized files
    if (file.includes('.optimized.')) continue;
    
    if (ext === '.png') {
      // Convert PNGs to JPG
      const outputPath = path.join(publicDir, file.replace('.png', '.optimized.jpg'));
      await optimizeImage(inputPath, outputPath, true);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPGs
      const baseName = path.basename(file, ext);
      const outputPath = path.join(publicDir, `${baseName}.optimized${ext}`);
      await optimizeImage(inputPath, outputPath, true);
    }
  }
}

console.log('Starting image optimization...');
optimizeAllImages()
  .then(() => console.log('Image optimization complete!'))
  .catch(console.error);
