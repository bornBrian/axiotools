# AxioTools - Quick Reference

## Start the App

### Option 1: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (new terminal)
cd frontend
npm install
npm start
```

**Result:** App opens at http://localhost:3000

### Option 2: Automated Installation
```bash
# macOS/Linux
chmod +x install.sh
./install.sh

# Windows
install.bat
```

Then follow the manual start steps above.

---

## Available Tools

### Image Tools
- 🗜️ **Compress** - Reduce file size (low/medium/high quality levels)
- 📐 **Resize** - Scale to custom or preset dimensions (720p, 1080p, 4K)
- 🎨 **Convert** - Change format (JPEG ↔ PNG ↔ WebP)
- 📄 **Image to PDF** - Combine multiple images into PDF
- 💧 **Add Watermark** - Protect images with text watermarks
- 🎭 **Apply Filters** - Grayscale, Sepia, Blur, Sharpen, Invert, Vintage effects

### PDF Tools
- 📑 **Merge** - Combine 2-10 PDFs
- ✂️ **Split** - Extract individual pages
- 📝 **Word to PDF** - Convert DOCX/DOC to PDF format

---

## Key Features

✅ **Fast** - Optimized Sharp + MozJPEG compression  
✅ **Clean UI** - Modern SaaS design with dark green theme  
✅ **Mobile-First** - Responsive on all devices  
✅ **Privacy** - Auto-delete files after processing  
✅ **High Quality** - Professional-grade output  
✅ **No Signup** - Use instantly  
✅ **Monetization-Ready** - Built-in ad placements  
✅ **More Tools** - 9 tools covering image, PDF, and document conversions

---

## 🎯 Dashboard Navigation - NOW FIXED!

**Before:** Cards required clicking "View All" to access tools  
**Now:** Click any card directly to open that specific tool

Example:
- Click "Compress Image" card → Opens compression tool immediately
- Click "Image to PDF" card → Opens image-to-PDF converter immediately
- No more extra clicks! 

---

## 💰 Making Money with AxioTools

See **MONETIZATION_GUIDE.md** for detailed setup instructions on:
- Google AdSense (easiest, $2-10 CPM)
- AdX & Premium Ad Networks ($10-50+ CPM)
- Affiliate Links (AWS S3, Cloudinary, etc.)
- Freemium Model (Premium subscription)

**Quick Start for Ads:**
1. Apply for Google AdSense: https://www.google.com/adsense/
2. Approval takes 24-48 hours
3. Update publisher ID in `frontend/src/components/AdBanner.jsx`
4. Deploy and start earning!

---

## API Endpoints Quick Reference

| Method | Endpoint | Purpose | Form Data |
|--------|----------|---------|-----------|
| POST | `/api/image/compress` | Compress image | `file`, `level` |
| POST | `/api/image/resize` | Resize image | `file`, `width`, `height` |
| POST | `/api/image/convert` | Convert format | `file`, `format` |
| POST | `/api/image/to-pdf` | Images to PDF | `images[]` (multiple) |
| POST | `/api/image/watermark` | Add watermark | `image`, `text`, `opacity` |
| POST | `/api/image/filter` | Apply filter | `image`, `filter` |
| POST | `/api/pdf/merge` | Merge PDFs | `files[]` (2-10 files) |
| POST | `/api/pdf/split` | Split PDF | `file`, `pages` (optional) |
| POST | `/api/pdf/word-to-pdf` | Word to PDF | `document` |
| GET | `/download/:filename` | Download file | - |
| GET | `/download/:file` | Download file |
| GET | `/api/health` | Server status |

---

## Configuration

### Backend Settings (`backend/config/constants.js`)
```javascript
MAX_FILE_SIZE = 50MB          // File size limit
TEMP_DIR = './temp'           // Temp file directory
ALLOWED_IMAGE_FORMATS = [...]  // Supported formats
COMPRESSION_LEVELS = {...}    // Quality settings
PRESET_RESOLUTIONS = {...}    // Image presets
```

### Color Scheme (`frontend/src/styles/globals.css`)
```css
--primary: #16a34a              /* Main dark green */
--primary-dark: #15803d         /* Darker shade */
--primary-light: #22c55e        /* Lighter shade */
--bg-primary: #ffffff           /* White background */
--text-primary: #1f2937         /* Dark text */
```

---

## Environment Variables

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (`.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## File Upload Limits
- **Maximum Size**: 50MB
- **Supported Formats**:
  - Images: JPEG, PNG, WebP
  - Documents: PDF

---

## Performance Targets

| Operation | Target Time | File Size |
|-----------|------------|-----------|
| Compress | < 3s | 5MB |
| Resize | < 2s | 5MB |
| Convert | < 2s | 5MB |
| Merge 5 PDFs | < 5s | 20MB total |
| Split PDF | < 3s | 10 pages |

---

## Troubleshooting

### "Cannot GET /"
- Frontend not running on port 3000
- Run `npm start` in frontend folder

### "Connection refused :5000"
- Backend not running
- Run `npm run dev` in backend folder

### "File size exceeds 50MB"
- Upload a file smaller than 50MB
- Or change `MAX_FILE_SIZE` in constants.js

### CORS Error
- Check `CORS_ORIGIN` in `.env`
- Ensure frontend URL matches

### Files not deleted
- Check `./backend/temp` directory permissions
- Cleanup runs every 10 minutes

---

## Project Features Summary

### Architecture
- ✓ Modular backend (controllers, routes, middleware)
- ✓ Component-based frontend (React)
- ✓ Separation of concerns
- ✓ Scalable design

### Security
- ✓ File type validation
- ✓ Size limit enforcement
- ✓ Filename sanitization
- ✓ CORS protection
- ✓ Input validation

### UI/UX
- ✓ Dark green theme (customizable)
- ✓ Drag & drop file upload
- ✓ Real-time progress
- ✓ Download links
- ✓ Mobile responsive
- ✓ Accessibility (semantic HTML)

### Performance
- ✓ Lanczos3 resampling
- ✓ MozJPEG compression
- ✓ Progressive encoding
- ✓ Automatic cleanup
- ✓ Efficient streaming

---

## Next Steps

1. **Install Dependencies** - Run `npm install` in both folders
2. **Start Backend** - `cd backend && npm run dev`
3. **Start Frontend** - `cd frontend && npm start`
4. **Test Tools** - Upload a file and try compression/resizing
5. **Customize Colors** - Edit CSS variables
6. **Deploy** - See SETUP_GUIDE.md for production deployment

---

## Resources

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup & deployment
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development workflow
- [API_TESTING.md](API_TESTING.md) - API testing with cURL/Postman
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Directory structure
- [README.md](README.md) - Full documentation

---

## Support

For issues, check:
1. Console logs in backend terminal
2. Browser console (F12) in frontend
3. Network tab in DevTools
4. Check documentation files

---

**AxioTools v1.0.0** - Built for speed and simplicity ⚡
