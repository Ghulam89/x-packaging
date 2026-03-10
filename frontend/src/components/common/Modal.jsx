 
import React, { useEffect } from 'react';
 
const Modal = ({ isOpen, onClose, children,className }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        const prevTop = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (prevTop) {
          window.scrollTo(0, parseInt(prevTop || '0') * -1);
        }
      };
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed bg-black/60 backdrop-blur-sm z-50 inset-0 overflow-y-auto animate-fadeIn">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <div 
            className="fixed inset-0 bg-black/40 transition-opacity" 
            onClick={onClose}
            aria-hidden="true"
          ></div> */}

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className={`inline-block align-middle bg-white text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle rounded-2xl ${className || 'sm:max-w-lg w-full'}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
