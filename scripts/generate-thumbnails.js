const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '../public/videos');
const thumbnailsDir = path.join(__dirname, '../public/videos/thumbnails');

// Create thumbnails directory if it doesn't exist
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
  console.log('Created thumbnails directory');
}

// Get all MP4 files
const videoFiles = fs.readdirSync(videosDir).filter(file => file.endsWith('.mp4'));

if (videoFiles.length === 0) {
  console.log('No MP4 files found in the videos directory.');
  process.exit(0);
}

console.log(`Found ${videoFiles.length} video files. Creating placeholder thumbnails...`);

// Ensure placeholder SVG exists
const placeholderPath = path.join(thumbnailsDir, 'placeholder.svg');
if (!fs.existsSync(placeholderPath)) {
  // Create a basic placeholder SVG if it doesn't exist
  const placeholderSvg = `<svg width="720" height="480" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#2a2a2a"/>
  <circle cx="360" cy="240" r="80" fill="#404040"/>
  <path d="M385 240l-40-25v50z" fill="#808080"/>
</svg>`;
  
  fs.writeFileSync(placeholderPath, placeholderSvg);
  console.log('Created placeholder SVG');
}

videoFiles.forEach(videoFile => {
  const videoName = videoFile.replace('.mp4', '');
  const thumbnailPath = path.join(thumbnailsDir, `${videoName}-thumb.svg`);
  
  // Skip if thumbnail already exists
  if (fs.existsSync(thumbnailPath)) {
    console.log(`Thumbnail for ${videoFile} already exists. Skipping.`);
    return;
  }
  
  try {
    // Create a symbolic link to the placeholder (or copy if symlinks aren't supported)
    try {
      // Try to create a symbolic link first
      fs.symlinkSync(placeholderPath, thumbnailPath);
      console.log(`Created symbolic link for ${videoFile}`);
    } catch (symlinkError) {
      // If symlink fails (common on Windows without admin), copy the file
      fs.copyFileSync(placeholderPath, thumbnailPath);
      console.log(`Copied placeholder for ${videoFile}`);
    }
  } catch (error) {
    console.error(`Error creating thumbnail for ${videoFile}:`, error.message);
  }
});

console.log('Placeholder thumbnail creation complete!'); 