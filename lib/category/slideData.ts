/** Slide data for category page tabs (ported from CRA `constants/slideData.js`). */

const MATERIAL_IMG =
  "https://www.halfpricepackaging.com/_ipx/f_webp&q_70&s_200x200/images/products/material/white.jpg";

export type SlideItem = { title: string; image: string; description: string };

export const baseMaterialsSlides: SlideItem[] = [
  { title: "White", image: MATERIAL_IMG, description: "Premium white cardboard material" },
  { title: "Card Stock", image: MATERIAL_IMG, description: "Durable card stock option" },
  { title: "Corrugated", image: MATERIAL_IMG, description: "Strong corrugated material" },
  { title: "Kraft", image: MATERIAL_IMG, description: "Eco-friendly kraft paper" },
  { title: "Recycled", image: MATERIAL_IMG, description: "Sustainable recycled material" },
  { title: "Bleached", image: MATERIAL_IMG, description: "Bright bleached paper" },
  { title: "Unbleached", image: MATERIAL_IMG, description: "Natural unbleached paper" },
  { title: "Coated", image: MATERIAL_IMG, description: "Premium coated material" },
];

export const wrappingsSlides: SlideItem[] = [
  { title: "Cellophane", image: MATERIAL_IMG, description: "Clear cellophane wrapping" },
  { title: "Shrink Wrap", image: MATERIAL_IMG, description: "Tight shrink wrap film" },
  { title: "Bubble Wrap", image: MATERIAL_IMG, description: "Protective bubble wrap" },
  { title: "Polyethylene", image: MATERIAL_IMG, description: "Durable PE wrapping" },
  { title: "Polypropylene", image: MATERIAL_IMG, description: "Strong PP wrapping" },
  { title: "Stretch Film", image: MATERIAL_IMG, description: "Flexible stretch film" },
];

export const printingsSlides: SlideItem[] = [
  { title: "Offset Printing", image: MATERIAL_IMG, description: "High-quality offset printing" },
  { title: "Digital Printing", image: MATERIAL_IMG, description: "Fast digital printing" },
  { title: "Flexographic", image: MATERIAL_IMG, description: "Flexographic printing" },
  { title: "Screen Printing", image: MATERIAL_IMG, description: "Custom screen printing" },
  { title: "Embossing", image: MATERIAL_IMG, description: "Elegant embossed design" },
  { title: "Foil Stamping", image: MATERIAL_IMG, description: "Premium foil stamping" },
];

export const coatingsSlides: SlideItem[] = [
  { title: "Glossy Coating", image: MATERIAL_IMG, description: "Shiny glossy finish" },
  { title: "Matte Coating", image: MATERIAL_IMG, description: "Smooth matte finish" },
  { title: "UV Coating", image: MATERIAL_IMG, description: "Durable UV coating" },
  { title: "Aqueous Coating", image: MATERIAL_IMG, description: "Water-based coating" },
  { title: "Varnish", image: MATERIAL_IMG, description: "Protective varnish" },
];

export const finishesSlides: SlideItem[] = [
  { title: "Glossy Finish", image: MATERIAL_IMG, description: "High-gloss finish" },
  { title: "Matte Finish", image: MATERIAL_IMG, description: "Elegant matte finish" },
  { title: "Satin Finish", image: MATERIAL_IMG, description: "Smooth satin finish" },
  { title: "Textured Finish", image: MATERIAL_IMG, description: "Unique textured finish" },
];

export const addonsSlides: SlideItem[] = [
  { title: "Handles", image: MATERIAL_IMG, description: "Custom handles" },
  { title: "Windows", image: MATERIAL_IMG, description: "Display windows" },
  { title: "Magnetic Closure", image: MATERIAL_IMG, description: "Magnetic closure system" },
  { title: "Ribbons", image: MATERIAL_IMG, description: "Decorative ribbons" },
  { title: "Labels", image: MATERIAL_IMG, description: "Custom labels" },
];
