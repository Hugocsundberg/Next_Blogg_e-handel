import document from "next/document";
import Product from "./components/Product";
import Post from "./pages/[slug]";

export interface PostFull extends PostLight {
  body: Array<any>;
  productSlug?: string;
  productReserved?: number;
  productSold?: boolean;
}

export interface PostLight extends Content {
  created: Date;
  excerpt: string;
  imageUrl?: string;
  aspectRatio: number;
  altText?: string;
  slug: string;
  title: string;
}

export interface ScrollPositionObjectType {
  [key: string]: number;
}

export interface AboutMe {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
}

export interface settings {
  aboutMe?: AboutMe;
  message?: string;
  messageImage: Image;
}

export interface ScrollEvent extends Event {
  path: [document: HTMLDocument, window: Window];
}

export interface Image {
  _ref: string;
  _type: string;
}

export type cols = 1 | 2 | 3;

export interface slug {
  _type: string;
  current: string;
}

export interface Content {
  imageHeight: number;
  imageWidth: number;
}

export interface Product extends Content {
  _createdAt: string;
  _updatedAt: string;
  desc?: string;
  image: Image;
  price: number;
  title: string;
  alt?: string;
  slug: slug;
  lastReservedAt: null | number;
  sold: boolean;
  id: string;
}

export interface NavOption {
  isActive: boolean;
  text: string;
  image: string;
  link: string;
}

export interface productSanityReturn {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  purchaseDescription: string;
  swishImage: {
    _type: string;
    asset: Image;
  };
}

export interface ImageHW {
  asset: Image;
  imageHeight: number;
  imageWidth: number;
  alt?: string;
}

export interface Product {
  _createdAt: string;
  _updatedAt: string;
  images: Array<ImageHW>;
  price: number;
  slug: slug;
  title: string;
  productHeight: number;
  productWidth: number;
  productDept?: number;
}

export interface ScreenSizes {
  S: number;
  M: number;
  L: number;
  XL: number;
}

export interface KlarnaAPIClientRequest {
  inCart: Array<Product>;
  delivery: boolean;
}

export interface KlarnaCheckoutSnippetResponse {
  htmlSnippet: string;
}

export interface KlarnaOrder {
  billing_address: {
    given_name: string;
    family_name: string;
    email: string;
    street_address: string;
    postal_code: string;
  };
  completed_at: string;
  customer: {
    date_of_birth: string;
    gender: string;
  };
  external_checkouts: Array<any>;
  external_payment_methods: Array<any>;
  html_snippet: string;
  last_modified_at: string;
  locale: string;
  merchant_urls: {
    terms: string;
    checkout: string;
    confirmation: string;
    push: string;
  };
  options: {
    allow_separate_shipping_address: boolean;
    date_of_birth_mandatory: boolean;
    require_validate_callback_success: boolean;
  };
  order_amount: number;
  order_id: string;
  order_lines: Array<KlarnaResponseProduct>;
  order_tax_amount: number;
  payment_type_allows_increase: boolean;
  purchase_country: string;
  purchase_currency: string;
  shipping_address: {
    given_name: string;
    family_name: string;
    email: string;
    street_address: string;
    postal_code: string;
  };
  started_at: string;
  status: string;
}

export interface KlarnaResponseProduct {
  name: string;
  quantity: 1;
  merchant_data: string;
  tax_rate: number;
  total_amount: number;
  total_discount_amount: number;
  total_tax_amount: number;
  type: string;
  unit_price: number;
}

export interface breakPoints {
  S: number;
  M: number;
  L: number;
}

export interface aboutMeSetting {
  aboutme: {
    slug: {
      type: string;
      current: string;
    };
  };
}
