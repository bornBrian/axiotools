# AxioTools - Project Structure

## Complete Directory Structure

```
AxioTools/
├── backend/                          # Node.js Express backend
│   ├── config/
│   │   └── constants.js              # Configuration & constants
│   ├── middleware/
│   │   └── upload.js                 # Multer upload configuration
│   ├── controllers/
│   │   ├── imageController.js        # Image processing logic
│   │   └── pdfController.js          # PDF processing logic
│   ├── routes/
│   │   ├── image.js                  # Image processing endpoints
│   │   ├── pdf.js                    # PDF processing endpoints
│   │   └── download.js               # File download endpoint
│   ├── utils/
│   │   ├── cleanup.js                # Automatic file cleanup
│   │   └── validators.js             # Input validation
│   ├── server.js                     # Main Express server
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example env file
│   └── README.md                     # Backend documentation
│
├── frontend/                         # React frontend
│   ├── public/
│   │   ├── index.html                # HTML template
│   │   └── package.json              # Proxy configuration
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   │   ├── Sidebar.css
│   │   │   ├── TopBar.jsx           # Top navigation bar
│   │   │   ├── TopBar.css
│   │   │   ├── ToolCard.jsx         # Tool showcase card
│   │   │   ├── ToolCard.css
│   │   │   ├── FileUpload.jsx       # Drag & drop upload
│   │   │   ├── FileUpload.css
│   │   │   ├── AdBanner.jsx         # Advertisement component
│   │   │   ├── AdBanner.css
│   │   │   ├── ImageCompressor.jsx  # Image compression tool
│   │   │   ├── ImageCompressor.css
│   │   │   ├── ImageResizer.jsx     # Image resizing tool
│   │   │   ├── ImageResizer.css
│   │   │   ├── ImageConverter.jsx   # Image format converter
│   │   │   ├── ImageConverter.css
│   │   │   ├── PDFMerge.jsx         # PDF merge tool
│   │   │   ├── PDFMerge.css
│   │   │   ├── PDFSplit.jsx         # PDF split tool
│   │   │   └── PDFSplit.css
│   │   ├── pages/                    # Page components
│   │   │   ├── Dashboard.jsx         # Home/dashboard page
│   │   │   ├── Dashboard.css
│   │   │   ├── ImageTools.jsx       # Image tools page
│   │   │   ├── PDFTools.jsx         # PDF tools page
│   │   │   ├── FileTools.jsx        # File tools page (coming soon)
│   │   │   ├── Settings.jsx         # Settings page
│   │   │   └── PageLayout.css       # Page layout styles
│   │   ├── styles/
│   │   │   └── globals.css           # Global CSS & variables
│   │   ├── utils/                    # Utility functions
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # App styling
│   │   └── index.js                  # React entry point
│   ├── package.json                  # Frontend dependencies
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example env file
│   └── README.md                     # Frontend documentation
│
├── docs/                             # Documentation (optional)
│   ├── ARCHITECTURE.md               # System architecture
│   └── API_REFERENCE.md              # Detailed API docs
│
├── .gitignore                        # Git ignore rules
├── README.md                         # Project overview
├── SETUP_GUIDE.md                    # Installation & setup
├── DEVELOPMENT.md                    # Development guide
├── API_TESTING.md                    # API testing guide
├── PROJECT_STRUCTURE.md              # This file
├── LICENSE                           # MIT License
├── install.sh                        # Linux/Mac installer
└── install.bat                       # Windows installer
```

## File Organization Explanation

### Backend Organization

**config/** - Centralized configuration
- File size limits, temp directory paths
- Compression levels, preset resolutions
- Format allowlists

**middleware/** - Request processing
- File upload handling with Multer
- File type validation
- Size limit enforcement

**controllers/** - Business logic
- Image processing: compress, resize, convert
- PDF processing: merge, split
- High-quality output optimization

**routes/** - API endpoints
- `/api/image/*` - Image operations
- `/api/pdf/*` - PDF operations
- `/download/*` - File retrieval

**utils/** - Helper functions
- File validation logic
- Automatic cleanup scheduling
- Error handling

### Frontend Organization

**components/** - Reusable UI pieces
- Navigation (Sidebar, TopBar)
- Interactive tools (FileUpload, ToolCard)
- Monetization (AdBanner)
- Feature implementations (Image/PDF tools)

**pages/** - Full-page layouts
- Combined components into complete pages
- Page-specific logic
- Navigation between tool types

**styles/** - Design system
- CSS variables for theming
- Global typography
- Base element styles

**public/** - Static assets
- HTML template
- Configuration

## Key Files

### Core Server Files
- `backend/server.js` - Main server entry point
- `frontend/src/index.js` - React entry point
- `frontend/src/App.jsx` - Main app component

### Configuration Files
- `backend/config/constants.js` - All configurable values
- `backend/.env` - Backend environment
- `frontend/.env` - Frontend environment
- `frontend/public/package.json` - Frontend proxy settings

### API Endpoints
Image Processing:
- POST `/api/image/compress` - Compress with MozJPEG
- POST `/api/image/resize` - Resize with Lanczos3
- POST `/api/image/convert` - Format conversion

PDF Processing:
- POST `/api/pdf/merge` - Combine PDFs
- POST `/api/pdf/split` - Extract pages

File Download:
- GET `/download/:fileName` - Retrieve processed file

## Data Flow

### Request Flow
```
User Input (Frontend)
    ↓
FileUpload Component
    ↓
FormData + Fetch
    ↓
Express Route Handler
    ↓
Multer Middleware (validation)
    ↓
Controller (processing)
    ↓
Sharp/pdf-lib ProcessingLibraries
    ↓
Temporary File Storage
    ↓
JSON Response
    ↓
Frontend Display Results
    ↓
User Downloads File
    ↓
Auto-cleanup After 60 Minutes
```

## Database Integration Points (Future)

While currently no database is used, the structure allows easy integration:

1. **User Accounts** - Store in database
   - Location: New service in `backend/services/userService.js`

2. **Processing History** - Track transformations
   - Location: New table/collection
   - Updated in controllers after successful processing

3. **Analytics** - Track tool usage
   - Location: New service in `backend/services/analyticsService.js`

4. **Saved Presets** - User preferences
   - Location: Extend user profile in database

## Naming Conventions

- **Files**: camelCase for `.jsx`, `.css`, `.js`
- **Components**: PascalCase (e.g., `ImageCompressor.jsx`)
- **Functions**: camelCase (e.g., `compressImage()`)
- **CSS Classes**: kebab-case (e.g., `.tool-card`)
- **CSS Variables**: --kebab-case (e.g., `--primary`)

## Scalability Notes

### Backend Scaling
- Stateless design allows horizontal scaling
- Multer stores files temporarily (can use S3 instead)
- Database integration enables user persistence
- API can be containerized with Docker

### Frontend Scaling
- React can be optimized with code splitting
- Static files can be served from CDN
- Build is production-optimized

### Infrastructure
- Backend: Node.js cluster mode or multiple instances
- Frontend: Static file hosting (Vercel, Netlify, etc.)
- Storage: Cloud storage for temp files (AWS S3, Azure Blob)
- Database: MongoDB, PostgreSQL, Firebase
- Caching: Redis for session/file metadata

---

Questions? Check [SETUP_GUIDE.md](SETUP_GUIDE.md) or [API_TESTING.md](API_TESTING.md)!
