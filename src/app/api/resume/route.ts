import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Define the path to the resume file
  const filePath = path.join(process.cwd(), 'content', 'MyungGuk_Resume.pdf');
  
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Create and return the response with appropriate headers
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MyungGuk_Resume.pdf"',
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error serving resume file:', error);
    return new NextResponse('Error serving file', { status: 500 });
  }
} 