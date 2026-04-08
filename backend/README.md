# AxioTools Backend

Fast, clean file processing backend for image compression, resizing, conversion, and PDF operations.

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
```

## Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Endpoints

### Image Processing

#### Compress Image
- **POST** `/api/image/compress`
- Upload an image and specify compression level (low, medium, high)
- Returns: Compressed image download path and compression ratio

#### Resize Image
- **POST** `/api/image/resize`
- Specify width, height, and optional preset (720p, 1080p, 4K)
- Returns: Resized image download path

#### Convert Image Format
- **POST** `/api/image/convert`
- Specify target format (jpeg, png, webp)
- Returns: Converted image download path

#### Get Image Metadata
- **POST** `/api/image/metadata`
- Returns: Image dimensions, format, and file size

### PDF Processing

#### Merge PDFs
- **POST** `/api/pdf/merge`
- Upload multiple PDF files (2-10)
- Returns: Merged PDF download path

#### Split PDF
- **POST** `/api/pdf/split`
- Upload a single PDF file
- Returns: Individual page PDFs

### Download

#### Download Processed File
- **GET** `/download/:fileName`
- Download the processed file

## File Handling

- Temporary files are stored in the `./temp` directory
- Files are automatically cleaned up after 60 minutes
- Maximum file size: 50MB

## Features

- High-quality image compression using MozJPEG
- Lanczos3 resampling for image resizing
- Support for JPEG, PNG, WebP formats
- PDF merging and splitting
- Automatic file cleanup
- Comprehensive error handling
- CORS enabled for frontend integration
