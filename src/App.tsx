import { SidebarLayout } from './components/SidebarLayout';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import './App.css';

function App() {
  return (
    <SidebarLayout>
      {(activeTab) => {
        switch (activeTab) {
          case 'home':
            return <Home />;
          case 'features':
            return <Features />;
          case 'pricing':
            return <Pricing />;
          case 'about':
            return <About />;
          case 'contact':
            return <Contact />;
          default:
            return <Home />;
        }
      }}
    </SidebarLayout>
  );
}

export default App;
