import { useLayoutEffect } from 'react';

// ─── Central assets (from assets/index.js) ───
import {
  CustomCupsImage,
  templateBox1,
  templateBox2,
  templateBox3,
  Hero1,
  usa,
  uk,
  canada,
  logo,
  special1,
  special2,
  special3,
  special4,
  special5,
  special6,
  special7,
  insert1,
  insert2,
  insert3,
  insert4,
  insert5,
  Box1,
  Box2,
  Box3,
  Box4,
  Box5,
  Box6,
  Box7,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery14,
  gallery15,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  faq,
  IndustryStandard,
  review,
  banner,
  map,
  goScreen,
} from '../assets';

// ─── Videos ───
import heroVideo from '../assets/videos/hero.mp4';
import heroImage from '../assets/images/banner-slider-image.webp';

// ─── Footer / Trust / Navbar / BottomNav ───
import trust from '../assets/images/footer/trust.png';
import img1 from '../assets/images/footer/google-reviws-logo.webp';
import img2 from '../assets/images/footer/Trustpilot_logo.png';
import img3 from '../assets/images/footer/reviews-io-logo.webp';
import img4 from '../assets/images/footer/fedex.png';
import img5 from '../assets/images/footer/dhl.png';
import img6 from '../assets/images/footer/United_States_Postal_Service.png';
import sky from '../assets/images/footer/sky.svg';
import ups from '../assets/images/footer/ups.svg';
import partner1 from '../assets/images/footer/partner1.png';
import partner2 from '../assets/images/footer/partner2.png';
import partner3 from '../assets/images/footer/partner3.png';
import partner4 from '../assets/images/footer/partner4.png';

import portfolio from '../assets/images/brand/portfolio.png';
import custom from '../assets/images/brand/custom-pricing.png';
import BgSpecification from '../assets/images/brand/specificationbg.webp';
import brand1 from '../assets/images/brand/1.png';
import brand2 from '../assets/images/brand/2.png';
import brand3 from '../assets/images/brand/3.png';
import brand4 from '../assets/images/brand/4.png';
import brand5 from '../assets/images/brand/5.png';
import brand6 from '../assets/images/brand/6.png';
import brand7 from '../assets/images/brand/7.png';
import brand8 from '../assets/images/brand/8.png';
import brand9 from '../assets/images/brand/9.png';
import brand10 from '../assets/images/brand/10.png';
import brand11 from '../assets/images/brand/11.png';
import brand12 from '../assets/images/brand/12.png';
import brand13 from '../assets/images/brand/13.png';
import brand14 from '../assets/images/brand/14.png';
import brand15 from '../assets/images/brand/15.png';

import usaFlag from '../assets/images/flag/usa.svg';
import ukFlag from '../assets/images/flag/uk.svg';
import australia from '../assets/images/flag/australia.svg';
import uae from '../assets/images/flag/uae.svg';
import chaina from '../assets/images/flag/chaina.svg';

import chat from '../assets/images/icon/chat.png';
import specification1 from '../assets/images/icon/Dimensions.png';
import specification2 from '../assets/images/icon/Quantity.png';
import specification3 from '../assets/images/icon/Stock.png';
import specification4 from '../assets/images/icon/Printing.png';
import specification5 from '../assets/images/icon/Finishing.png';
import specification6 from '../assets/images/icon/included-options.png';
import specification7 from '../assets/images/icon/Additional-option.png';
import specification8 from '../assets/images/icon/sETTING.png';
import specification9 from '../assets/images/icon/pROOF.png';
import sATISFIED from '../assets/images/icon/sATISFIED-CLIENTS-BAGE.png';
import BigSale from '../assets/images/icon/Big sale.svg';
import BulkOrder from '../assets/images/icon/Bulk orders.svg';
import Discount from '../assets/images/icon/Discount.svg';
import contactUs from '../assets/images/icon/contact us.svg';
import freeShipping from '../assets/images/icon/Free-delivery.png';

import pickbox from '../assets/images/1.svg';
import provideBox from '../assets/images/2.svg';
import boxMaterial from '../assets/images/3.svg';
import uploadArtwork from '../assets/images/4.svg';
import discover from '../assets/images/discover.png';
import american from '../assets/images/emrican-expreess.png';
import bankTranfer from '../assets/images/ebank-transfer.png';
import masterCard from '../assets/images/master-card.png';
import paypal from '../assets/images/paypal.png';
import wireTransfer from '../assets/images/wire-transfer.png';
import maestro from '../assets/images/mastro.png';
import visa from '../assets/images/visa.png';

import categoryReview from '../assets/images/category-review.webp';
import abstractBg from '../assets/images/custom packaging production.webp';
import gallery1About from '../assets/images/about-imges/gallery1.jpg';
import gallery2About from '../assets/images/about-imges/gallery2.jpg';
import Leatherjackets from '../assets/images/about-imges/leatherjackets.webp';
import xinc from '../assets/images/about-imges/x-inc.webp';
import xcustompacakging from '../assets/images/about-imges/xcustompacakging.webp';
import xcustomclothing from '../assets/images/about-imges/xcustomclothing.webp';
import Silks from '../assets/images/about-imges/Silks.webp';
import xpackaging from '../assets/images/about-imges/xpackaging.webp';
import usaAbout from '../assets/images/about-imges/usa.svg';
import ukAbout from '../assets/images/about-imges/uk.svg';
import candaAbout from '../assets/images/about-imges/canda.svg';
import australiaAbout from '../assets/images/about-imges/australia.svg';
import uaeAbout from '../assets/images/about-imges/uae.svg';
import chainaAbout from '../assets/images/about-imges/chaina.svg';

import googleLogo from '../assets/images/google-logo.png';
import stars from '../assets/images/stars.webp';
import gift from '../assets/images/Gift.webp';
import backgroundAbstract from '../assets/images/abstract-bg.png';

import dieImg1 from '../assets/images/dielines/Auto-lock-Boxes.webp';
import dieImg2 from '../assets/images/dielines/Bakery-Boxes_.webp';
import dieImg3 from '../assets/images/dielines/Bookend-Boxes_-1.webp';
import dieImg4 from '../assets/images/dielines/Burger-Boxes_-1.webp';
import dieImg5 from '../assets/images/dielines/Child-Resistant.webp';
import dieImg7 from '../assets/images/dielines/Face-Mask-Boxes-1-1.webp';
import dieImg8 from '../assets/images/dielines/Gable-Boxes_-1.webp';
import dieImg9 from '../assets/images/dielines/Gloves-Boxes_.webp';
import dieImg10 from '../assets/images/dielines/Heart-Shaped-Boxes-2-1.webp';
import dieImg11 from '../assets/images/dielines/Tuck-End-Boxes-3.webp';
import dieImg12 from '../assets/images/dielines/Window-Boxes-1.webp';

// Portfolio images
import p1 from '../assets/images/p-1.webp';
import p2 from '../assets/images/p-2.webp';
import p3 from '../assets/images/p-3.webp';
import p4 from '../assets/images/p-4.webp';
import p5 from '../assets/images/p-5.webp';
import p6 from '../assets/images/p6.webp';
import p7 from '../assets/images/p7.webp';
import p8 from '../assets/images/p8.webp';
import p9 from '../assets/images/p9.webp';
import p10 from '../assets/images/p10.webp';
import p11 from '../assets/images/p11.webp';
import p12 from '../assets/images/p12.webp';
import p13 from '../assets/images/p13.webp';
import p14 from '../assets/images/p14.webp';
import p15 from '../assets/images/p15.webp';
import p16 from '../assets/images/p16.webp';
import p17 from '../assets/images/p17.webp';
import p18 from '../assets/images/p18.webp';
import p19 from '../assets/images/p19.webp';
import p20 from '../assets/images/p20.webp';
import p21 from '../assets/images/p21.webp';
import p22 from '../assets/images/p22.webp';
import p23 from '../assets/images/p23.webp';
import p24 from '../assets/images/p24.webp';
import p25 from '../assets/images/p25.webp';
import p26 from '../assets/images/p26.webp';
import p27 from '../assets/images/p27.webp';
import p28 from '../assets/images/p28.webp';
import p29 from '../assets/images/p29.webp';
import p30 from '../assets/images/p30.webp';
import p31 from '../assets/images/p31.webp';
import p32 from '../assets/images/p32.webp';
import p33 from '../assets/images/p33.webp';

const ALL_IMAGES = [
  heroImage,
  CustomCupsImage,
  templateBox1,
  templateBox2,
  templateBox3,
  Hero1,
  usa,
  uk,
  canada,
  logo,
  special1,
  special2,
  special3,
  special4,
  special5,
  special6,
  special7,
  insert1,
  insert2,
  insert3,
  insert4,
  insert5,
  Box1,
  Box2,
  Box3,
  Box4,
  Box5,
  Box6,
  Box7,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  gallery12,
  gallery13,
  gallery14,
  gallery15,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  faq,
  IndustryStandard,
  review,
  banner,
  map,
  goScreen,
  trust,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  sky,
  ups,
  partner1,
  partner2,
  partner3,
  partner4,
  portfolio,
  custom,
  BgSpecification,
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand11,
  brand12,
  brand13,
  brand14,
  brand15,
  usaFlag,
  ukFlag,
  australia,
  uae,
  chaina,
  chat,
  specification1,
  specification2,
  specification3,
  specification4,
  specification5,
  specification6,
  specification7,
  specification8,
  specification9,
  sATISFIED,
  BigSale,
  BulkOrder,
  Discount,
  contactUs,
  freeShipping,
  pickbox,
  provideBox,
  boxMaterial,
  uploadArtwork,
  discover,
  american,
  bankTranfer,
  masterCard,
  paypal,
  wireTransfer,
  maestro,
  visa,
  categoryReview,
  abstractBg,
  gallery1About,
  gallery2About,
  Leatherjackets,
  xinc,
  xcustompacakging,
  xcustomclothing,
  Silks,
  xpackaging,
  usaAbout,
  ukAbout,
  candaAbout,
  australiaAbout,
  uaeAbout,
  chainaAbout,
  googleLogo,
  stars,
  gift,
  backgroundAbstract,
  dieImg1,
  dieImg2,
  dieImg3,
  dieImg4,
  dieImg5,
  dieImg7,
  dieImg8,
  dieImg9,
  dieImg10,
  dieImg11,
  dieImg12,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16,
  p17,
  p18,
  p19,
  p20,
  p21,
  p22,
  p23,
  p24,
  p25,
  p26,
  p27,
  p28,
  p29,
  p30,
  p31,
  p32,
  p33,
];

const CRITICAL_VIDEOS = [heroVideo];

/**
 * Preloads all static images and critical videos before paint using useLayoutEffect.
 * Reduces layout shift and speeds up perceived load across the website.
 */
export function usePreloadAssets() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const uniqueUrls = [...new Set(ALL_IMAGES.filter(Boolean))];

    uniqueUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    CRITICAL_VIDEOS.forEach((src) => {
      if (!src) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      link.type = 'video/mp4';
      document.head.appendChild(link);
    });
  }, []);
}

export { ALL_IMAGES, CRITICAL_VIDEOS };
