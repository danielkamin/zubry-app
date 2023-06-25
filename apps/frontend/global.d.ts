declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PZKOSZ_API_KEY: string;
      CMS_URL: string;
      CMS_BASE_URL: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_URL_INTERNAL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_API_URL: string;
      STRAPI_PREVIEW_SECRET: string;
      NEXT_PUBLIC_FACEBOOK_PIXEL_ID: string;
      NEXT_PUBLIC_GA_ID: string;
    }
  }
  interface Window {
    fbq: any;
    gtag: any;
  }
}

export {};
