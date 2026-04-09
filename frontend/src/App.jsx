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
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth > 768);

  // Close sidebar on mobile on page change
  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when tool is selected on mobile
  const handleSelectTool = (page, tool = null) => {
    setSelectedTool(tool);
    setCurrentPage(page);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onSelectTool={handleSelectTool} />;
      case 'image-tools':
        return <ImageTools initialTool={selectedTool} />;
      case 'pdf-tools':
        return <PDFTools initialTool={selectedTool} />;
      case 'file-tools':
        return <FileTools />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onSelectTool={handleSelectTool} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          if (window.innerWidth <= 768) {
            setSidebarOpen(false);
          }
        }} 
        isOpen={sidebarOpen} 
      />
      <div className="main-content" onClick={() => {
        if (window.innerWidth <= 768 && sidebarOpen) {
          setSidebarOpen(false);
        }
      }}>
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
