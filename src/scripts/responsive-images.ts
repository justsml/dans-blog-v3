#!/usr/bin/env bun
import {globby} from 'globby';
import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

async function resizeImages(sourceFolder: string, targetFolder: string): Promise<void> {
  const imageFiles = await globby([`${sourceFolder}/**/*.{jpg,jpeg,png,gif,svg}`]);
  const sizes = [900, 600, 300, 150];

  for (const file of imageFiles) {
    const fileName = path.basename(file);
    const fileExtension = path.extname(file);
    const baseName = fileName.replace(fileExtension, '');

    for (const size of sizes) {
      const outputFileName = `w${size}_${baseName}${fileExtension}`;
      const outputFilePath = path.join(targetFolder, outputFileName);

      await sharp(file)
        .resize({
          width: size,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFile(outputFilePath);

      console.log(`Resized ${fileName} to ${size}px width, saved as ${outputFileName}`);
    }
  }
}

// Replace './images' with your target folder path
resizeImages('./src/content', '/tmp/imgs')
  .then((results) => {
    console.log('All images resized successfully', results);
  })
  .catch((error) => {
    console.error('Error resizing images:', error);
  });
