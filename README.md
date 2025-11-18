# BedHed Matcha

Artisanal Matcha Pop-Up in Dallas, TX

This project is organized into separate frontend and backend folders.

## Project Structure

- **frontend/** - Next.js 16 application with React 19 and Tailwind CSS 4
- **backend/** - Flask Python API server
- **public/** - Static assets (images, logo, drink photos)

## Prerequisites

- **Node.js** 18+ and npm (for frontend)
- **Python** 3.8+ (for backend)
- **pip** (Python package manager)

## Getting Started

### Backend Setup (Flask API)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (Command Prompt)**:
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend API will run on [http://localhost:3001](http://localhost:3001).

**Backend Endpoints:**
- `GET /api/health` - Health check
- `GET /api/menu` - Menu items with drink images
- `GET /api/locations` - Upcoming pop-up locations

### Frontend Setup (Next.js)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

### Running Both Servers

To run the full application, you need **both** servers running simultaneously:

1. Open **Terminal 1** for the backend:
```bash
cd backend
python app.py
```

2. Open **Terminal 2** for the frontend:
```bash
cd frontend
npm run dev
```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Testing on Mobile Devices

To test the mobile-responsive site on your actual phone:

1. **Find your computer's local IP address:**
   - Open PowerShell/Terminal and run:
     ```powershell
     ipconfig
     ```
   - Look for "IPv4 Address" under your active network adapter (e.g., `192.168.1.100`)

2. **Make sure both servers are running** (backend on port 3001, frontend on port 3000)

3. **Connect your phone to the same WiFi network** as your computer

4. **On your phone's browser, visit:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

**Note:** Replace `YOUR_IP_ADDRESS` with your actual local IP from step 1. The `localhost` URL only works on the same device, so you need the network IP address to access from your phone.

**Troubleshooting:** If the connection doesn't work, Next.js dev server may need to accept network connections:
```bash
npm run dev -- -H 0.0.0.0
```

## Features

- 🍵 **Menu Display** - Handcrafted matcha drinks with images
- 📍 **Location Finder** - Upcoming pop-up locations
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🎨 **Hand-drawn Design** - Cartoonish, minimalist aesthetic with yellow/blue theme
- 📧 **Contact** - Instagram and email integration

## Tech Stack

**Frontend:**
- Next.js 16.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Google Fonts (Permanent Marker, Indie Flower)

**Backend:**
- Python 3.x
- Flask 3.0.0
- Flask-CORS 4.0.0

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
