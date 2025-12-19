import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../common/Accordion';
import { BaseUrl } from '../../utils/BaseUrl';

const FAQ = () => {
  const [accordions, setAccordions] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    }
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/faq/getAll`);
        
        if (response.data.status === 'success' && response.data.data) {
          const faqData = response.data.data.map((faq, index) => ({
            key: index + 1,
            id: String(index + 1).padStart(2, '0'),
            title: faq.question,
            data: stripHtml(faq.answer),
            isOpen: false,
          }));
          setAccordions(faqData);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordion = (accordionKey) => {
    const updatedAccordions = accordions.map((accordion) => {
      if (accordion.key === accordionKey) {
        return { ...accordion, isOpen: !accordion.isOpen };
      } else {
        return { ...accordion, isOpen: false };
      }
    });

    setAccordions(updatedAccordions);
  };

  if (loading) {
    return (
      <div className="">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto">
          <div className="sm:pb-10 pb-4">
            <div className="">
              <h2 className="pt-7">Frequently Asked Questions</h2>
            </div>
            <div className="mt-12 text-center">
              <p>Loading FAQs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="sm:pb-10 pb-4">
          <div className="">
            <h2 className="pt-7">Frequently Asked Questions</h2>
          </div>
          <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
            <div className="sm:w-6/12 w-full">
              <div className="mt-12">
                {accordions.slice(0, Math.ceil(accordions.length / 2)).map((accordion, index) => (
                  <Accordion
                    key={accordion.key}
                    id={accordion.id}
                    title={accordion.title}
                    data={accordion.data}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion.key)}
                    customKey={`0${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="sm:w-6/12 w-full">
              <div className="sm:mt-12 mt-0">
                {accordions.slice(Math.ceil(accordions.length / 2)).map((accordion, index) => (
                  <Accordion
                    key={accordion.key}
                    id={accordion.id}
                    title={accordion.title}
                    data={accordion.data}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion.key)}
                    customKey={`${Math.ceil(accordions.length / 2) + index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;