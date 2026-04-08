# AxioTools - Fast File Processing Platform

A modern, high-performance web application for compressing, resizing, and converting images, plus PDF manipulation. Built with React, Node.js/Express, and optimized libraries.

## 🚀 Features

### Image Processing
- **Compress** - High-quality compression with MozJPEG optimization
- **Resize** - Scale images with preset resolutions (720p, 1080p, 4K) or custom dimensions
- **Convert** - Format conversion between JPEG, PNG, and WebP

### PDF Tools
- **Merge** - Combine multiple PDFs into one
- **Split** - Extract individual pages from PDFs

### Design Philosophy
- ⚡ **Lightning Fast** - Optimized backend and frontend
- 🎨 **Clean UI** - Modern SaaS-inspired design with dark green theme
- 📱 **Mobile First** - Fully responsive across all devices
- 🔒 **Privacy Focused** - Automatic file deletion after processing
- ✨ **Premium Feel** - Clean spacing, rounded cards, soft shadows

## 📋 Tech Stack

### Frontend
- **Framework**: React 18
- **Styling**: Vanilla CSS with CSS Grid/Flexbox
- **Design**: Mobile-first responsive design
- **Fonts**: Inter & Poppins (Google Fonts)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Image Processing**: Sharp (Lanczos3 resampling, MozJPEG)
- **PDF Processing**: pdf-lib
- **File Upload**: Multer
- **Cleanup**: Automatic file deletion after 60 minutes

## 🛠 Installation & Setup

### Prerequisites
- Node.js 14+ (with npm)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
NODE_ENV=development
```

Start the backend:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
AxioTools/
├── backend/
│   ├── controllers/      # Business logic for image & PDF processing
│   ├── routes/           # API endpoints
│   ├── middleware/       # Multer upload configuration
│   ├── utils/            # Validators and cleanup utilities
│   ├── config/           # Constants and configuration
│   └── server.js         # Express server entry point
│
├── frontend/
│   ├── public/           # Static files & index.html
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (Dashboard, Tools, Settings)
│   │   ├── styles/       # Global CSS
│   │   ├── App.jsx       # Main app component
│   │   └── index.js      # React entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Image Processing

#### Compress Image
```
POST /api/image/compress
Body: { file: File, level: 'low' | 'medium' | 'high' }
Returns: { success: true, data: { originalSize, compressedSize, compressionRatio, outputPath } }
```

#### Resize Image
```
POST /api/image/resize
Body: { file: File, width: number, height: number, maintainAspectRatio: boolean, preset?: string }
Returns: { success: true, data: { newDimensions, outputPath } }
```

#### Convert Image
```
POST /api/image/convert
Body: { file: File, format: 'jpeg' | 'png' | 'webp' }
Returns: { success: true, data: { originalSize, convertedSize, format, outputPath } }
```

### PDF Processing

#### Merge PDFs
```
POST /api/pdf/merge
Body: { files: File[] }
Returns: { success: true, data: { mergedPageCount, outputPath } }
```

#### Split PDF
```
POST /api/pdf/split
Body: { file: File }
Returns: { success: true, data: { totalPages, splitFiles: Array } }
```

### Download
```
GET /download/:fileName
Downloads the processed file
```

## 🎨 Color Scheme

- **Primary**: #16a34a (Dark Green)
- **Primary Dark**: #15803d
- **Primary Light**: #22c55e
- **Background**: #ffffff
- **Secondary BG**: #f8f9fa
- **Tertiary BG**: #f1f5f9
- **Text Primary**: #1f2937
- **Text Secondary**: #6b7280
- **Border**: #e5e7eb

## 📊 UI Components

### Layout
- Sidebar Navigation (collapsible on mobile)
- Top Navigation Bar with search
- Responsive content area
- Optional right panel for ads

### Reusable Components
- `ToolCard` - Feature showcase card
- `FileUpload` - Drag & drop file upload
- `AdBanner` - Ad placement component

### Pages
- **Dashboard** - Overview of all tools
- **Image Tools** - Image compression, resizing, conversion
- **PDF Tools** - PDF merge and split
- **File Tools** - Coming soon
- **Settings** - User preferences

## 🔒 Security & Privacy

- Files stored in temporary directory (`./temp`)
- Automatic cleanup after 60 minutes
- File size limit: 50MB
- Secure filename validation (prevents directory traversal)
- CORS enabled for frontend integration
- Input validation on all endpoints

## 📈 Performance

- Sharp with Lanczos3 resampling for high-quality image processing
- MozJPEG optimization for JPEG compression
- Progressive encoding for web optimization
- Efficient file streaming for downloads
- Automatic temp file cleanup

## 🎯 Monetization

Non-intrusive ad placements:
- Top banner (below navbar)
- Right sidebar (desktop only, on large screens)
- Between sections (after tool results)
- Clearly labeled as "Advertisement"
- No popups or forced ads
- Ad code removed from download buttons

## 📝 Compression Settings

### Low Quality
- JPEG: 85 quality
- Best for general use

### Medium Quality (Default)
- JPEG: 75 quality
- Recommended balance

### High Compression
- JPEG: 60 quality
- Maximum file size reduction

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/Firebase)
- [ ] User accounts and history
- [ ] Batch processing
- [ ] Advanced image editing
- [ ] Video processing
- [ ] File archiving tools
- [ ] Dark theme
- [ ] API for developers

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Support

For bug reports and feature requests, please create an issue on GitHub.

---

**AxioTools v1.0.0** - Built for speed, simplicity, and quality.
