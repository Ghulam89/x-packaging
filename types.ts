export type Brand = {
  _id: string;
  name?: string;
  title?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  bannerImage?: string;
  image?: string;
  robots?: string;
  faqImage?: string;
  faqImageAltText?: string;
};

export type Category = {
  showBottomHero?: boolean;
  showServiceSelectionCard?: boolean;
  showTrustBanner?: boolean;
  showTabsSection1?: boolean;
  showTabsSection2?: boolean;
  _id: string;
  title?: string;
  slug: string;
  image?: string;
  imageAltText?: string;
  bannerBgColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  robots?: string;
  faqImage?: string;
  faqImageAltText?: string;
  qna?: Array<{ question: string; answer: string }>;
  brandId?: { _id?: string; slug?: string; name?: string };
  subTitle?: string;
  description?: string;
};

export type Product = {
  _id: string;
  name?: string;
  slug: string;
  description?: string;
  images?: { url?: string }[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  robots?: string;
  brandId?: { slug?: string; name?: string };
  categoryId?: { slug?: string; title?: string };
};

export type Blog = {
  _id: string;
  title?: string;
  slug: string;
  content?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  robots?: string;
  qna?: Array<{ question: string; answer: string }>;
};

export type FaqItem = {
  question?: string;
  answer?: string;
};

export type ApiStatus = "success" | "error";

export type ApiPagination = {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
};

export type ApiResponse<T> = {
  status?: ApiStatus | string;
  data?: T;
  message?: string;
  pagination?: ApiPagination;
  currentPage?: number;
  totalPages?: number;
};

export type ImageRef = {
  url?: string;
};

export type SearchProduct = {
  _id: string;
  name: string;
  slug: string;
  images?: ImageRef[];
};

export type ReviewItem = {
  _id?: string;
  name?: string;
  position?: string;
  review?: string;
  rating?: number;
};

export type RatingItem = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
};

export type CartItem = {
  _id: string;
  title?: string;
  name?: string;
  price?: string | number;
  quantity?: number;
  image?: string;
};

export type CheckoutForm = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  note: string;
  acceptTerms: boolean;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
};

export type QuoteCategory = {
  _id?: string;
  title?: string;
  icon?: string;
  image?: string;
};

export type QuoteFormState = {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  boxStyle: string;
  length: string;
  width: string;
  depth: string;
  unit: string;
  stock: string;
  colors: string;
  printingSides: string;
  quantity: string;
  addOns: string;
  image: File | null;
  description: string;
  pageUrl: string;
};
