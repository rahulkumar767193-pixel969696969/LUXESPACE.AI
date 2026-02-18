
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResultPage from './pages/ResultPage';
import History from './pages/History';
import Support from './pages/Support';
import ChatWidget from './components/ChatWidget';
import { User, DesignResult } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [currentDesign, setCurrentDesign] = useState<DesignResult | null>(null);

  // Simple Router based on window hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      
      // Smooth scroll to top on navigation for polished UX
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Check auth
    const storedUser = authService.getCurrentUser();
    if (storedUser) setUser(storedUser);

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (page: string) => {
    window.location.hash = page;
  };

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    navigate('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('home');
  };

  const handleDesignResult = (result: DesignResult) => {
    setCurrentDesign(result);
    setCurrentPage('result');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStart={() => navigate(user ? 'dashboard' : 'login')} />;
      case 'login':
        return <Login onSuccess={handleAuthSuccess} onNavigate={navigate} />;
      case 'signup':
        return <Signup onSuccess={handleAuthSuccess} onNavigate={navigate} />;
      case 'dashboard':
        if (!user) { navigate('login'); return null; }
        return <Dashboard onResult={handleDesignResult} />;
      case 'result':
        if (!currentDesign) { navigate('dashboard'); return null; }
        return <ResultPage result={currentDesign} onBack={() => navigate('dashboard')} />;
      case 'history':
        if (!user) { navigate('login'); return null; }
        return <History onView={handleDesignResult} />;
      case 'support':
        return <Support />;
      default:
        return <Home onStart={() => navigate('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col text-white">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={navigate} 
        currentPage={currentPage}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
      <ChatWidget currentDesign={currentDesign} />
    </div>
  );
};

export default App;
