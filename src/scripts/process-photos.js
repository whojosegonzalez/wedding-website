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
  console.log(`Scanning ${SOURCE_DIR}...`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Error: Source folder not found.`);
    return;
  }

  // 1. Get all entries and SORT them alphabetically
  // This ensures 01_Getting_Ready comes before 02_Ceremony
  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const photoData = [];

  for (const entry of entries) {
    const fullPath = path.join(SOURCE_DIR, entry.name);

    if (entry.isDirectory()) {
      // Clean up category name (Remove "01_", "02_" prefixes and underscores)
      // Example: "01_Getting_Ready" -> "Getting Ready"
      const rawName = entry.name;
      const cleanCategory = rawName.replace(/^\d+[-_]/, '').replace(/_/g, ' ');

      const files = fs.readdirSync(fullPath)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })); // Sort photos too
      
      console.log(`Processing: ${cleanCategory} (${files.length} photos)`);

      for (const file of files) {
        await convertImage(path.join(fullPath, file), file, cleanCategory, photoData);
      }

    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      await convertImage(fullPath, entry.name, "Highlights", photoData);
    }
  }

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

async function convertImage(inputPath, filename, category, dataArray) {
  // Use a hash or simpler name to avoid huge filenames, but keep category for sorting
  const safeFilename = filename.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_');
  const outputFilename = `${category.replace(/\s+/g, '')}_${safeFilename}.jpg`;
    
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  try {
    const metadata = await sharp(inputPath).metadata();
    
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true }) 
      .toFile(outputPath);

    dataArray.push({
      src: `/gallery/${outputFilename}`,
      width: metadata.width,
      height: metadata.height,
      category: category
    });
    
    process.stdout.write('.');
  } catch (error) {
    console.error(`\nFailed: ${filename}`, error);
  }
}

processPhotos();