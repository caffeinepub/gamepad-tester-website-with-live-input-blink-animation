import { useState } from 'react';
import SiteLayout from './components/SiteLayout';
import TesterPage from './pages/TesterPage';
import AboutPage from './pages/AboutPage';

type View = 'tester' | 'about';

function App() {
  const [currentView, setCurrentView] = useState<View>('tester');

  return (
    <SiteLayout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'tester' ? <TesterPage /> : <AboutPage />}
    </SiteLayout>
  );
}

export default App;
