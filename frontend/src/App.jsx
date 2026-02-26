import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { Suspense, useEffect, useState, useMemo, memo, lazy } from 'react';
import Navbar from './components/Header/Navbar';
import { usePreloadAssets } from './hooks/usePreloadAssets';

const ToastContainer = lazy(() =>
  import('react-toastify').then((m) => ({ default: m.ToastContainer }))
);
const Footer = lazy(() => import('./components/Footer/Footer'));
const WhatsAppFloat = lazy(() => import('./components/SocialMedia/WhatsAppModal'));
const AnnouncementBanner = lazy(() => import('./components/AnnouncementBanner'));

const App = memo(function App({ serverData, CategoryProducts, homePageData }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
  const [clientReady, setClientReady] = useState(false);
  const routes = WebsiteRoutes({ serverData, CategoryProducts, homePageData });

  // Preload critical static images/videos + key backend images
  usePreloadAssets(serverData, CategoryProducts, homePageData);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setReady = () => setClientReady(true);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(setReady, { timeout: 3000 });
    } else {
      setTimeout(setReady, 1500);
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
      <Suspense fallback={null}>
        {clientReady ? <ToastContainer /> : null}
      </Suspense>
      <Suspense fallback={null}>
        {clientReady ? (
          <WhatsAppFloat
            phone="+17472470456"
            message={whatsappMessage}
            tooltip="WhatsApp us"
            bottomClass="bottom-5"
            leftClass="left-8"
          />
        ) : null}
      </Suspense>
      <Suspense fallback={null}>
        {clientReady ? <AnnouncementBanner /> : null}
      </Suspense>
      <Navbar />
      <Suspense fallback={null}>
        {element}
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
});

export default App;
