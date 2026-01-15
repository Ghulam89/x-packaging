import React from 'react';
import Button from '../common/Button';
import abstractBg from '../../assets/images/stars.webp';
// Generating 30 sample testimonials
const testimonialsData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: i % 3 === 0 ? "Aren Jordan" : i % 3 === 1 ? "Mathilde Lewis" : "Sarah Chen",
    text: "The training was hands-on and practical. I landed my first clients fast.",
    role: "Certified Appointment Setter",
    rating: 5,
}));

const TestimonialCard = ({ testimonial }) => {
    // Logic to get initials (e.g., "Aren Jordan" -> "AJ")
    const initials = testimonial.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-left w-[320px] md:w-[350px] shrink-0 mb-2 overflow-x-hidden">
            <div className="flex items-center gap-3 ">
                {/* Initials Avatar with #ee334b background */}
                <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-inner p-3"
                    style={{ backgroundColor: '#ee334b' }}
                >
                    {initials}
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-tight" style={{ color: '#213554' }}>
                        {testimonial.name}
                    </h4>
                    <div className="flex text-amber-400 text-[10px] mt-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-zinc-600 text-[14px] leading-relaxed line-clamp-3">
                {testimonial.text}
            </p>

        </div>
    );
};

const PersonalTestimonial = () => {
    return (
        <section className="bg-[#f7f7f7] py-10 overflow-hidden  relative bg-cover bg-center bg-no-repeat">


            <style>
                {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-350px * 15 - 1.5rem * 15)); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(calc(-350px * 15 - 1.5rem * 15)); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left { animation: scrollLeft 60s linear infinite; }
          .animate-scroll-right { animation: scrollRight 60s linear infinite; }
          .pause-on-hover:hover .animate-scroll-left,
          .pause-on-hover:hover .animate-scroll-right {
            animation-play-state: paused;
          }
          /* Gradient mask to fade edges */
          .testimonial-mask {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}
            </style>

            <div className="max-w-8xl mx-auto" >
              
              <div  className='  relative bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${abstractBg})` }}>
              <div className='flex flex-col  justify-between items-center pb-10'>
                    <h2
                        className="text-3xl md:text-5xl font-black text-center mb-10 tracking-tight"
                        style={{ color: '#213554' }}
                    >
                        What People Are Saying
                    </h2>
                    <Button label={"Write a Review"} />

                </div>
              <div className="flex flex-col gap-8  pause-on-hover testimonial-mask">
                    {/* Row 1: Sliding Left */}
                    <div className="flex overflow-hidden">
                        <div className="flex gap-6 animate-scroll-left">
                            {[...testimonialsData.slice(0, 15), ...testimonialsData.slice(0, 15)].map((t, idx) => (
                                <TestimonialCard key={`row1-${t.id}-${idx}`} testimonial={t} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Sliding Right */}
                    <div className="flex overflow-hidden">
                        <div className="flex gap-6 animate-scroll-right">
                            {[...testimonialsData.slice(15, 30), ...testimonialsData.slice(15, 30)].map((t, idx) => (
                                <TestimonialCard key={`row2-${t.id}-${idx}`} testimonial={t} />
                            ))}
                        </div>
                    </div>
                </div>
                  <div className='flex flex-col  justify-between items-center pt-10'>
                
                    <Button label={"Read More"} variant='red' />

                </div>
              </div>
                
            </div>
        </section>
    );
};

export default PersonalTestimonial;