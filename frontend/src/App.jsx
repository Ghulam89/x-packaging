import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import { Suspense, useEffect, useState, useMemo, memo } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';
import AnnouncementBanner from './components/AnnouncementBanner';

const App = memo(function App({ serverData, CategoryProducts, homePageData }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Call hook at top level - not inside useMemo
  const routes = WebsiteRoutes({ serverData, CategoryProducts, homePageData });
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (window.location.hash) {
      window.history.replaceState(null, '', location.pathname + location.search);
    }
    setCurrentUrl(window.location.origin + location.pathname + location.search);
  }, [location]);
  
  const element = useRoutes(routes);
  
  const whatsappMessage = useMemo(
    () => `Hello, I am reaching out to inquire about ${currentUrl}`,
    [currentUrl]
  );

  return (
    <>
      <ToastContainer />
      <WhatsAppFloat
        phone="+17472470456"
        message={whatsappMessage}
        tooltip="WhatsApp us"
        bottomClass="bottom-5"
        leftClass="left-8"
      />
      <AnnouncementBanner />
      <Navbar />
      <Suspense fallback={null}>
        {element}
      </Suspense>
      <Footer />
    </>
  );
});

export default App;