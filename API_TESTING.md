# API Testing Guide

## Using Postman

Import this collection to test all endpoints:

### Image Compression
```
Method: POST
URL: http://localhost:5000/api/image/compress
Body (form-data):
  - file: [select image file]
  - level: medium
```

### Image Resize
```
Method: POST
URL: http://localhost:5000/api/image/resize
Body (form-data):
  - file: [select image file]
  - width: 1920
  - height: 1080
  - maintainAspectRatio: true
```

### Image Convert
```
Method: POST
URL: http://localhost:5000/api/image/convert
Body (form-data):
  - file: [select image file]
  - format: png
```

### PDF Merge
```
Method: POST
URL: http://localhost:5000/api/pdf/merge
Body (form-data):
  - files: [select 2+ PDF files]
```

### PDF Split
```
Method: POST
URL: http://localhost:5000/api/pdf/split
Body (form-data):
  - file: [select PDF file]
```

### Health Check
```
Method: GET
URL: http://localhost:5000/api/health
```

## Expected Responses

### Success Response
```json
{
  "success": true,
  "data": {
    "fileName": "compressed-1707312000000.jpg",
    "originalSize": 2048576,
    "compressedSize": 512144,
    "compressionRatio": "75.00%",
    "outputPath": "/download/compressed-1707312000000.jpg"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "File size exceeds 50MB limit",
  "errors": ["File too large"]
}
```

## cURL Examples

### Test Image Compression
```bash
curl -X POST http://localhost:5000/api/image/compress \
  -F "file=@path/to/image.jpg" \
  -F "level=medium"
```

### Test Image Resize
```bash
curl -X POST http://localhost:5000/api/image/resize \
  -F "file=@path/to/image.jpg" \
  -F "width=1920" \
  -F "height=1080" \
  -F "maintainAspectRatio=true"
```

### Test Image Convert
```bash
curl -X POST http://localhost:5000/api/image/convert \
  -F "file=@path/to/image.jpg" \
  -F "format=png"
```

### Test PDF Merge
```bash
curl -X POST http://localhost:5000/api/pdf/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf"
```

### Test PDF Split
```bash
curl -X POST http://localhost:5000/api/pdf/split \
  -F "file=@path/to/document.pdf"
```

### Download Processed File
```bash
curl -O http://localhost:5000/download/compressed-1707312000000.jpg
```

## JavaScript Fetch Examples

### Image Compression
```javascript
const file = document.getElementById('fileInput').files[0];
const formData = new FormData();
formData.append('file', file);
formData.append('level', 'medium');

const response = await fetch('http://localhost:5000/api/image/compress', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data);
```

### Image Resize
```javascript
const file = document.getElementById('fileInput').files[0];
const formData = new FormData();
formData.append('file', file);
formData.append('width', 1920);
formData.append('height', 1080);
formData.append('maintainAspectRatio', true);
formData.append('preset', '1080p');

const response = await fetch('http://localhost:5000/api/image/resize', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data);
```

### PDF Merge
```javascript
const files = document.getElementById('fileInput').files; // 2+ files
const formData = new FormData();

for (let i = 0; i < files.length; i++) {
  formData.append('files', files[i]);
}

const response = await fetch('http://localhost:5000/api/pdf/merge', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data);
```

## Performance Testing

### Test with Different File Sizes

**Small (500KB)**
- Should process in < 1 second

**Medium (5MB)**
- Compression: < 3 seconds
- Resize: < 2 seconds
- Convert: < 2 seconds

**Large (20MB)**
- Compression: 5-10 seconds
- Resize: 3-8 seconds
- PDF operations: 2-5 seconds

### Concurrent Requests

Test multiple uploads simultaneously:
```bash
for i in {1..10}; do
  curl -X POST http://localhost:5000/api/image/compress \
    -F "file=@test.jpg" \
    -F "level=medium" &
done
wait
```

## Monitoring

### Check Temp Directory
```bash
# Unix/Linux/Mac
ls -lh backend/temp
du -sh backend/temp

# Windows
dir backend\temp
```

### Monitor Cleanup
Check server console for cleanup logs:
```
Auto-deleted old file: ./temp/compressed-1707311940000.jpg
```

---

That's it! Your API is ready for testing. 🚀
