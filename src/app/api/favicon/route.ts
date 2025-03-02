import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This static route handler will serve the favicon from the public directory
export async function GET() {
  try {
    // Get the path to the favicon in the public directory
    const filePath = path.join(process.cwd(), 'public', 'favicon.ico');
    
    // Read the file
    const fileData = fs.readFileSync(filePath);
    
    // Create a buffer from the file data
    const buffer = Buffer.from(fileData);
    
    // Return the file with the correct content type
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving favicon:', error);
    return new NextResponse(null, { status: 404 });
  }
} 