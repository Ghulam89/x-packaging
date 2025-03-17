import React, { useState } from 'react';
import Accordion from '../common/Accordion';
import Button from '../common/Button';

const FAQ = () => {
  const [accordions, setAccordions] = useState([
    {
      key:1,
      id:"01",
      title: "Do you offer Free Samples?",
      data: "Yes, if you need any random samples to check the material and printing quality. If you need the samples of your customized box, we do not offer free samples or material kits.",
      isOpen: false,
    },
    {
      key:2,
      id:"02",
      title: "Do you charge extra, based on the number of colors and ink coverage?",
      data: "No, all the products are printed in full color at no extra charge.",
      isOpen: false,
    },
    {
      key:3,
      id:"03",
      title: "How can I create my design?",
      data: "All you need send us your artwork and we would provide you a 3D digital Mockup of your box along with a template.",
      isOpen: false,
    },
    {
      key:4,
      id:"04",
      title: "What kind of custom packaging do you offer?",
      data: "Visit our Home Page to see the full range of what we are offering. Each custom packaging option has a free and easy-to-use online designer that’ll help you create attractive and unforgettable unboxing experiences. Don’t see what you’re looking for? Reach out to us at sales@umbrellapackaging.com.",
      isOpen: false,
    },
    {
      key:5,
      id:"05",
      title: "Do you have a pick-up location?",
      data: "Yes, we do have a pick-up location but usually we ship the orders to the doorstep. please email us at sales@umbrellapackaging.com for more details.",
      isOpen: false,
    },
    {
      key:6,
      id:"06",
      title: "How can I reorder?",
      data: "Simply, contact to the same email you contacted last time and place your reorder.",
      isOpen: false,
    },
    {
      key:7,
      id:"07",
      title: "What is the best way to contact you?",
      data: "Contact us via email any time sales@umbrellapackaging.com. You can also DM us through Facebook or Instagram, where our team will get back to you within 24 – 48 business hours.",
      isOpen: false,
    },
    {
      key:8,
      id:"08",
      title: "What is your MOQ? Do you print small order quantities?",
      data: "Our MOQ is 100 boxes, yes we can offer less number of boxes for ordering.",
      isOpen: false,
    }
  ]);

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

  return (
    <div className="">
      <div className="   sm:max-w-7xl max-w-[95%] mx-auto">
      <div  className="sm:pb-10 pb-4">
      <div className="">
       
        <h2 className="  pt-7">
          Frequently Asked Questions
        </h2>
      </div>
     
        <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
          <div className=" sm:w-6/12 w-full">
            <div className="mt-12">
              {accordions.slice(0, 4).map((accordion, index) => (
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
          <div className=" sm:w-6/12 w-full">
            <div className="sm:mt-12 mt-0">
              {accordions.slice(4).map((accordion, index) => (
                <Accordion
                  id={accordion.id}
                  title={accordion.title}
                  data={accordion.data}
                  isOpen={accordion.isOpen}
                  toggleAccordion={() => toggleAccordion(accordion.key)}
                  customKey={`${index + 5}`} 
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