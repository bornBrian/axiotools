import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ImageTools from './pages/ImageTools';
import PDFTools from './pages/PDFTools';
import FileTools from './pages/FileTools';
import Settings from './pages/Settings';
import AdBanner from './components/AdBanner';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [selectedTool, setSelectedTool] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 1024);

  // Responsive sidebar state management
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // On desktop (≥1024px), keep sidebar open
      // On tablet (768-1023px), keep sidebar open but collapsible
      // On mobile (≤767px), close sidebar
      if (width >= 1024) {
        setSidebarOpen(true);
      } else if (width < 768) {
        setSidebarOpen(false);
      }
      // Tablet stays as current state
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when tool is selected on mobile
  const handleSelectTool = (page, tool = null) => {
    setSelectedTool(tool);
    setCurrentPage(page);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onSelectTool={handleSelectTool} />;
      case 'image-tools':
        return <ImageTools initialTool={selectedTool} onBackToDashboard={() => setCurrentPage('dashboard')} />;
      case 'pdf-tools':
        return <PDFTools initialTool={selectedTool} onBackToDashboard={() => setCurrentPage('dashboard')} />;
      case 'file-tools':
        return <FileTools onBackToDashboard={() => setCurrentPage('dashboard')} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onSelectTool={handleSelectTool} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}
      
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          if (isMobile) {
            setSidebarOpen(false);
          }
        }} 
        isOpen={sidebarOpen} 
      />
      <div className="main-content">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-area">
          <div className="page-wrapper">{renderPage()}</div>
          <aside className="right-panel">
            <AdBanner placement="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
