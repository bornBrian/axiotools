# AxioTools Development

## Getting Started

### Clone/Download
```bash
# If you have it as a git repo
git clone <repo-url>
cd AxioTools
```

### Backend Development
```bash
cd backend

# Install dependencies
npm install

# Run with auto-reload (nodemon)
npm run dev
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Development Tips

### Adding New Image Format
1. Add format to `backend/config/constants.js`
2. Update `ALLOWED_IMAGE_FORMATS`
3. Add handler in `imageController.js`
4. Update frontend UI to show option

### Adding New Tool
1. Create component in `frontend/src/components/`
2. Create route in `backend/routes/`
3. Create controller in `backend/controllers/`
4. Link in routing
5. Add page or section

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions focused and small

## Testing Tools

### Test Image Compression
```bash
# Using curl
curl -X POST http://localhost:5000/api/image/compress \
  -F "file=@test.jpg" \
  -F "level=medium"
```

### Test Image Resize
```bash
curl -X POST http://localhost:5000/api/image/resize \
  -F "file=@test.jpg" \
  -F "width=1280" \
  -F "height=720"
```

### Test PDF Merge
```bash
curl -X POST http://localhost:5000/api/pdf/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf"
```

## Performance Debugging

### Monitor Temp Directory
```bash
# Watch temp directory size
du -sh ./backend/temp

# List files
ls -lh ./backend/temp
```

### Check Memory Usage
```bash
# Monitor Node process
top | grep node
```

## Common Development Tasks

### Update API URL
Edit `frontend/src/App.jsx` fetch URLs if using different port

### Change Default Compression Level
Edit `frontend/src/components/ImageCompressor.jsx`

### Add New Route
1. Create in `backend/routes/newroute.js`
2. Import in `backend/server.js`
3. Add: `app.use('/api/new', newRoutes);`

## Build & Deploy

### Build for Production
```bash
cd frontend
npm run build
```

### Check Build Size
```bash
# After building
npm install -g serve
serve -s build
```

## Debugging

### Backend Logs
- Check console output in terminal
- Logs include file processing details
- Error messages show what went wrong

### Frontend DevTools
- Open Chrome DevTools (F12)
- Check Console for errors
- Check Network tab for API calls
- Use React DevTools extension

### Common Errors

**CORS Error**
- Backend CORS not configured
- Frontend URL not in CORS_ORIGIN

**File Upload Error**
- File too large (>50MB)
- Invalid file type
- Disk space full

**Processing Timeout**
- File too large for current memory
- Check server resources

---

Happy coding! 🚀
