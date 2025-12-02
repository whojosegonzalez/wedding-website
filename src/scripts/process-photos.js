import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../../photos_source');
const OUTPUT_DIR = path.join(__dirname, '../../public/gallery');
const DATA_FILE = path.join(__dirname, '../data/photos.ts');

// Helper to clean and recreate output dir
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const processPhotos = async () => {
  console.log(`📸 Scanning ${SOURCE_DIR}...`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Source folder not found.`);
    return;
  }

  // 1. Get all category folders (directories inside photos_source)
  // If a file is in the root, we label it "Uncategorized" or "Highlights"
  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });
  const photoData = [];

  for (const entry of entries) {
    const fullPath = path.join(SOURCE_DIR, entry.name);

    if (entry.isDirectory()) {
      // It's a Category Folder (e.g., "Ceremony")
      const category = entry.name;
      const files = fs.readdirSync(fullPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      
      console.log(`📂 Processing Category: ${category} (${files.length} photos)`);

      for (const file of files) {
        await convertImage(path.join(fullPath, file), file, category, photoData);
      }

    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      // It's a file in the root (Assign to "Highlights" or similar)
      await convertImage(fullPath, entry.name, "Highlights", photoData);
    }
  }

  // 4. Write Data File
  const fileContent = `export interface Photo {
  src: string;
  width: number;
  height: number;
  category: string;
}

export const photos: Photo[] = ${JSON.stringify(photoData, null, 2)};
`;

  fs.writeFileSync(DATA_FILE, fileContent);
  console.log(`\n🎉 Done! Generated data for ${photoData.length} photos.`);
};

// Helper function to process a single image
async function convertImage(inputPath, filename, category, dataArray) {
  // Output as JPG now (better for downloads)
  const outputFilename = `${category}_${filename.replace(/\.[^/.]+$/, "")}.jpg`
    .replace(/\s+/g, '_'); // Replace spaces with underscores for web safety
    
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  try {
    const metadata = await sharp(inputPath).metadata();
    
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true }) // Optimize JPEG
      .toFile(outputPath);

    dataArray.push({
      src: `/gallery/${outputFilename}`,
      width: metadata.width,
      height: metadata.height,
      category: category
    });
    
    // Optional: Print a dot to show progress without spamming
    process.stdout.write('.');
  } catch (error) {
    console.error(`\n❌ Failed: ${filename}`, error);
  }
}

processPhotos();