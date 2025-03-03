const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, '../public/videos');
const optimizedDir = path.join(__dirname, '../public/videos/optimized');

// Make sure ffmpeg is installed
try {
  execSync('ffmpeg -version');
} catch (error) {
  console.error('Error: ffmpeg is not installed. Please install it to optimize videos.');
  console.error('You can install it from https://ffmpeg.org/download.html');
  process.exit(1);
}

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all MP4 files
const videoFiles = fs.readdirSync(videosDir).filter(file => 
  file.endsWith('.mp4') && !file.includes('-optimized')
);

if (videoFiles.length === 0) {
  console.log('No MP4 files found in the videos directory to optimize.');
  process.exit(0);
}

console.log(`Found ${videoFiles.length} video files. Optimizing...`);

videoFiles.forEach(videoFile => {
  const videoPath = path.join(videosDir, videoFile);
  const optimizedPath = path.join(optimizedDir, videoFile.replace('.mp4', '-optimized.mp4'));
  
  // Skip if optimized version already exists
  if (fs.existsSync(optimizedPath)) {
    console.log(`Optimized version of ${videoFile} already exists. Skipping.`);
    return;
  }
  
  try {
    // Create a lower resolution, more compressed version
    console.log(`Optimizing ${videoFile}...`);
    execSync(`ffmpeg -i "${videoPath}" -vf "scale=720:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${optimizedPath}"`);
    
    const originalSize = fs.statSync(videoPath).size;
    const optimizedSize = fs.statSync(optimizedPath).size;
    const savings = ((1 - (optimizedSize / originalSize)) * 100).toFixed(2);
    
    console.log(`✅ Successfully optimized ${videoFile}`);
    console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Savings: ${savings}%`);
  } catch (error) {
    console.error(`Error optimizing ${videoFile}:`, error.message);
  }
});

console.log('\nVideo optimization complete!');
console.log('\nTo use the optimized videos, update the path in your data files.');
console.log('Example: Change "/videos/example.mp4" to "/videos/optimized/example-optimized.mp4"'); 