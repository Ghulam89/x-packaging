import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import { Suspense, useEffect, useState, useMemo, memo } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';
import AnnouncementBanner from './components/AnnouncementBanner';
import { usePreloadAssets } from './hooks/usePreloadAssets';

const App = memo(function App({ serverData, CategoryProducts, homePageData }) {
  const location = useLocation();
  const routes = WebsiteRoutes(serverData, CategoryProducts, homePageData);

  usePreloadAssets(serverData, CategoryProducts, homePageData);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    if (window.location.hash) {
      window.history.replaceState(null, '', location.pathname + location.search);
    }
  }, [location]);

  const currentUrl = useMemo(() => {
    return window.location.origin + location.pathname + location.search;
  }, [location]);

  const whatsappMessage = useMemo(
    () => `Hello, I am reaching out to inquire about ${currentUrl}`,
    [currentUrl]
  );

  const element = useRoutes(routes);

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
      {element}
      <Footer />
    </>
  );
});

export default App;