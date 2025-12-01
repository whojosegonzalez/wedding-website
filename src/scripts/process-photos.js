import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Setup paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../../photos_source');
const OUTPUT_DIR = path.join(__dirname, '../../public/gallery');
const DATA_FILE = path.join(__dirname, '../data/photos.ts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const processPhotos = async () => {
  console.log(`📸 Scanning ${SOURCE_DIR}...`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Error: Source folder not found at ${SOURCE_DIR}`);
    console.log("Please create a folder named 'photos_source' in your project root and add your photos.");
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log(`found ${files.length} photos. Processing...`);

  const photoData = [];

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputFilename = file.replace(/\.[^/.]+$/, "") + ".webp";
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    try {
      // 1. Get Metadata (Width/Height)
      const metadata = await sharp(inputPath).metadata();
      
      // 2. Resize & Convert to WebP
      // We limit width to 1920px (Full HD) to save space, keeping aspect ratio
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true }) 
        .webp({ quality: 80 }) // 80% quality is the sweet spot for weddings
        .toFile(outputPath);

      // 3. Add to our data list
      photoData.push({
        src: `/gallery/${outputFilename}`,
        width: metadata.width, // We store original aspect ratio dimensions
        height: metadata.height,
        alt: "Wedding photo"
      });

      console.log(`Processed: ${file}`);
    } catch (error) {
      console.error(`Failed to process ${file}:`, error);
    }
  }

  // 4. Write the TypeScript data file
  const fileContent = `export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const photos: Photo[] = ${JSON.stringify(photoData, null, 2)};
`;

  fs.writeFileSync(DATA_FILE, fileContent);
  console.log(`\n🎉 Done! Generated data for ${photoData.length} photos at ${DATA_FILE}`);
};

processPhotos();