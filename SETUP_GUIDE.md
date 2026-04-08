# AxioTools - Complete Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js 14+ installed
- npm (comes with Node.js)

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
```

**Expected output:**
```
✓ AxioTools backend running on http://localhost:5000
✓ Temp directory: ./temp
```

### 2. Start the Frontend (in a new terminal)

```bash
cd frontend
npm install
npm start
```

**Expected output:**
```
Local:            http://localhost:3000
```

Your browser should automatically open the app at `http://localhost:3000` ✓

---

## Project Overview

### Backend Architecture

**Express Server** (`backend/server.js`)
- Runs on port 5000
- CORS enabled for frontend communication
- Routes for image and PDF processing
- Automatic file cleanup every 10 minutes

**Controllers**
- `imageController.js` - Image compression, resizing, conversion
- `pdfController.js` - PDF merging and splitting

**Middleware**
- `upload.js` - Multer configuration for file uploads
  - File size limit: 50MB
  - Allowed types: JPEG, PNG, WebP, PDF
  - Temporary storage in `./temp` directory

**Routes**
- `/api/image/compress` - Compress images
- `/api/image/resize` - Resize images
- `/api/image/convert` - Convert image formats
- `/api/pdf/merge` - Merge PDFs
- `/api/pdf/split` - Split PDFs
- `/download/:fileName` - Download processed files

**Utilities**
- `validators.js` - Input validation
- `cleanup.js` - Automatic file cleanup

### Frontend Architecture

**React App** (`frontend/src/App.jsx`)
- Main component managing page navigation
- Sidebar toggle functionality on mobile

**Components**
- `Sidebar.jsx` - Navigation menu
- `TopBar.jsx` - Header with search and upload
- `Dashboard.jsx` - Home page with tool overview
- `ToolCard.jsx` - Reusable card component
- `FileUpload.jsx` - Drag & drop file upload
- `AdBanner.jsx` - Ad placement component
- `ImageCompressor.jsx` - Image compression tool
- `ImageResizer.jsx` - Image resizing tool
- `ImageConverter.jsx` - Image format conversion
- `PDFMerge.jsx` - PDF merging tool
- `PDFSplit.jsx` - PDF splitting tool

**Pages**
- `ImageTools.jsx` - All image tools
- `PDFTools.jsx` - All PDF tools
- `FileTools.jsx` - Coming soon
- `Settings.jsx` - Settings page

**Styling**
- CSS Grid and Flexbox layouts
- Mobile-first responsive design
- Dark green color scheme
- Smooth transitions and animations

---

## File Processing Pipeline

### Image Compression Flow
1. User selects image and compression level
2. Frontend sends POST to `/api/image/compress`
3. Backend receives file via Multer
4. Sharp processes image with MozJPEG
5. Temporary file created in `./temp`
6. Response sent with download link
7. Frontend displays results and download button
8. User downloads or processes another file
9. Automatic cleanup after 60 minutes

### Image Resizing Flow
1. User selects image and dimensions (or preset)
2. Frontend sends POST to `/api/image/resize`
3. Backend validates dimensions (1-4000px)
4. Sharp resizes with Lanczos3 algorithm
5. Temporary PNG file created
6. Response with new dimensions and download link
7. Same download and cleanup process

### Image Conversion Flow
1. User selects image and target format
2. Frontend sends POST to `/api/image/convert`
3. Backend converts to PNG/JPEG/WebP
4. Format-specific optimization applied
5. Temporary file created
6. Same download and cleanup process

### PDF Merge Flow
1. User uploads 2-10 PDF files
2. Frontend sends POST to `/api/pdf/merge` with files array
3. Backend loads each PDF with pdf-lib
4. Pages copied to new document
5. Merged PDF saved to `./temp`
6. Response with page count and download link
7. Same download and cleanup process

### PDF Split Flow
1. User uploads single PDF
2. Frontend sends POST to `/api/pdf/split`
3. Backend extracts all pages
4. Individual PDF created for each page
5. All page PDFs saved to `./temp`
6. Response with download links for each page
7. User can download individual pages

---

## Environment Variables

### Backend (.env)
```
PORT=5000                  # Server port
NODE_ENV=development       # Environment
CORS_ORIGIN=http://localhost:3000  # Frontend URL
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000  # Backend API URL
```

---

## API Request/Response Examples

### Compress Image Request
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('level', 'medium');

const response = await fetch('http://localhost:5000/api/image/compress', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalSize": 2048576,
    "compressedSize": 512144,
    "compressionRatio": "75.00%",
    "fileName": "compressed-1707312000000.jpg",
    "outputPath": "/download/compressed-1707312000000.jpg"
  }
}
```

---

## Performance Optimization

### Image Processing
- **Sharp Library** - Fast C++ binding for libvips
- **MozJPEG** - High-quality JPEG compression
- **Lanczos3** - High-quality image resampling
- **Progressive Encoding** - Faster perceived load

### File Upload
- **Multer** - Efficient streaming
- **50MB Limit** - Prevents server overload
- **Temporary Storage** - Not stored permanently

### Cleanup
- **Automatic Deletion** - Files deleted after 60 minutes
- **Background Job** - Cleanup runs every 10 minutes
- **Scheduled Task** - No manual intervention needed

---

## Security Measures

### File Validation
- Mime type checking on upload
- File size validation (50MB limit)
- Filename sanitization (prevents directory traversal)
- Extension validation

### API Security
- CORS configuration
- Input validation on all endpoints
- Error handling without exposing sensitive info
- Secure file downloads with proper headers

### Data Privacy
- No permanent file storage
- Automatic file deletion
- No user tracking
- No analytics

---

## Customization Guide

### Change Primary Color
Edit `frontend/src/styles/globals.css`:
```css
:root {
  --primary: #16a34a;  /* Change this hex code */
  --primary-dark: #15803d;
  --primary-light: #22c55e;
}
```

### Adjust File Size Limit
Edit `backend/config/constants.js`:
```javascript
const MAX_FILE_SIZE = 50 * 1024 * 1024; // Change to desired size
```

### Change Temp Directory
Edit `backend/config/constants.js`:
```javascript
const TEMP_DIR = './temp'; // Change path
```

### Add New Image Format
Edit `backend/config/constants.js`:
```javascript
const ALLOWED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'gif']; // Add format
```

### Adjust Auto Cleanup Time
Edit `backend/utils/cleanup.js`:
```javascript
scheduleCleanup(TEMP_DIR, 120); // 120 minutes instead of 60
```

---

## Production Deployment

### Before Going Live

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Update `CORS_ORIGIN` to production URL
   - Set proper API endpoints

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```
   Creates optimized build in `frontend/build/`

3. **Serve Frontend**
   - Use Express static middleware or deploy to CDN
   - Point to `frontend/build/` directory

4. **Backend Config**
   - Use production-grade process manager (PM2, Systemd)
   - Enable HTTPS
   - Set up proper logging
   - Configure database connection (for future)

5. **Scaling Considerations**
   - Use CDN for static files
   - Implement caching headers
   - Consider cloud storage for temp files (AWS S3)
   - Load balancing for multiple backend instances
   - Database for processing history

### Example PM2 Configuration
```javascript
module.exports = {
  apps: [{
    name: "axiotools-backend",
    script: "./backend/server.js",
    instances: 4,
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
};
```

---

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Install all dependencies: `npm install`
- Check Node.js version: `node --version` (should be 14+)

### Frontend won't connect
- Ensure backend is running on port 5000
- Check `.env` file has correct `REACT_APP_API_URL`
- Check browser console for CORS errors

### File upload fails
- Check file size (max 50MB)
- Verify file type (JPEG, PNG, WebP for images; PDF for PDFs)
- Check disk space in temp directory

### Temp files not being deleted
- Check `./temp` directory exists (auto-created)
- Verify cleanup job is running (check console logs)
- Check file permissions

---

## Support & Resources

- **Sharp Documentation**: https://sharp.pixelplumbing.com/
- **pdf-lib Documentation**: https://pdf-lib.js.org/
- **Express.js Guide**: https://expressjs.com/
- **React Documentation**: https://react.dev/

---

**Ready to deploy?** Follow the production deployment section above and launch your tool!
