import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import {useEffect, useState, useMemo, memo } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';
import AnnouncementBanner from './components/AnnouncementBanner';

const App = memo(function App({ serverData, CategoryProducts, homePageData }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
  const routes = WebsiteRoutes({ serverData, CategoryProducts, homePageData });
  
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    requestAnimationFrame(() => scrollToTop());
    const timer = setTimeout(scrollToTop, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', location.pathname + location.search);
    }
    setCurrentUrl(window.location.origin + location.pathname + location.search);
    return () => clearTimeout(timer);
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
      {/* <Suspense fallback={null}> */}
        {element}
        {/*  */}
      {/* </Suspense> */}
      <Footer />
    </>
  );
});

export default App;