import { TCreateOrderForm, TProductsQuery, TSession } from './common.types';
import { TCartProduct } from '../types/common.types';
import {
  TStrapiArrayResponse,
  TStrapiPlayer,
  TStrapiObjectResponse,
  TStrapiSponsor,
  TStrapiArticle,
  TStrapiCookieRegulations,
  TStrapiContactData,
  TStrapiPzkoszSettings,
  TStrapiClubManagementInfo,
  TStrapiManagementMember,
  TStrapi3LMLeaderboard,
  TStrapi3LMSchedule,
  TStrapiClubHistory,
  TStrapiClubGallery,
  TStrapiUser,
  TStrapiShopRegulations,
  TStrapiDeliveryRegulations,
  TStrapiReturnsRegulations,
  TStrapiPrivacyPolicy,
  TStrapiComplaintsRegulations,
  TStrapiProduct,
  TStrapiOrder,
  TStrapiComplaint,
  TStrapiReturn,
  TStrapiGlobalSettings,
  TStrapiTaxTransfer
} from './strapi.types';

//#region base
export type TServiceResponse<T> = Promise<{ status: boolean; result: T }>;
//#endregion base

export type TShopService = {
  getAllProducts: () => TServiceResponse<TStrapiArrayResponse<TStrapiProduct>>;
  getProducts: (
    query: TProductsQuery,
    pageNumber?: number,
    elementsPerPage?: number
  ) => TServiceResponse<TStrapiArrayResponse<TStrapiProduct>>;
  getProduct: (slug: string) => TServiceResponse<TStrapiObjectResponse<TStrapiProduct>>;
  getAllOrders: () => TServiceResponse<TStrapiArrayResponse<TStrapiOrder>>;
  getOrder: (slug: string, sessionData: TSession) => TServiceResponse<TStrapiObjectResponse<TStrapiProduct>>;
  getDeliveryRegulationsInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiDeliveryRegulations>>;
  getShopRegulationsInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiShopRegulations>>;
  getComplaintsRegulationsInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiComplaintsRegulations>>;
  getPrivacyPolicyInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiPrivacyPolicy>>;
  getReturnsRegulationsInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiReturnsRegulations>>;
  createOrder: (
    products: TCartProduct[],
    orderData: TCreateOrderForm,
    sessionData: TSession
  ) => TServiceResponse<TStrapiObjectResponse<TStrapiOrder>>;
  sendOrderConfirmationEmail: (
    products: TCartProduct[],
    orderData: any,
    sessionData: TSession
  ) => TServiceResponse<string>;
  getProductImageUrl: (productId: number) => TServiceResponse<string>;
  getUserOrders: (userId: number, jwt: string) => TServiceResponse<TStrapiArrayResponse<TStrapiOrder>>;
  getUserReturns: (userId: number, jwt: string) => TServiceResponse<TStrapiArrayResponse<TStrapiReturn>>;
  getUserComplaints: (userId: number, jwt: string) => TServiceResponse<TStrapiArrayResponse<TStrapiComplaint> | null>;
  returnOrder: (orderId: number, orderNumber: string, sessionData: TSession) => TServiceResponse<null>;
};

export type TUserService = {
  registerAccount: (data: any) => TServiceResponse<string>;
  getUserData: (userId: number, jwt: string) => TServiceResponse<TStrapiUser>;
};
export type TMainPageService = {
  getSponsors: () => TServiceResponse<TStrapiArrayResponse<TStrapiSponsor> | null>;
  getPaginatedArticles: (
    pageNumber?: number,
    searchQuery?: string,
    sortQuery?: string,
    elementsPerPage?: number
  ) => TServiceResponse<TStrapiArrayResponse<TStrapiArticle> | null>;
  postContactFormData: (fullName: string, email: string, message: string) => TServiceResponse<null>;
  getCookieConsentRegulations: () => TServiceResponse<TStrapiObjectResponse<TStrapiCookieRegulations> | null>;
  getSingleArticle: (slug: string) => TServiceResponse<TStrapiObjectResponse<TStrapiArticle> | null>;
  getAllNewsWithSlug: () => TServiceResponse<TStrapiArrayResponse<TStrapiArticle> | null>;
  getNewsCount: (searchQuery?: string) => TServiceResponse<number>;
  getContactAndLocationData: () => TServiceResponse<TStrapiObjectResponse<TStrapiContactData>>;
  getPzkoszSettingsData: () => TServiceResponse<TStrapiObjectResponse<TStrapiPzkoszSettings>>;
  get3LMLeaderboard: () => TServiceResponse<TStrapiArrayResponse<TStrapi3LMLeaderboard | null>>;
  get3LMTimetable: () => TServiceResponse<TStrapiArrayResponse<TStrapi3LMSchedule | null>>;
  get3LMPlayers: () => TServiceResponse<TStrapiArrayResponse<TStrapiPlayer> | null>;
  get2LMPlayers: () => TServiceResponse<TStrapiArrayResponse<TStrapiPlayer> | null>;
  get2LMPlayer: (slug: string) => TServiceResponse<TStrapiObjectResponse<TStrapiPlayer> | null>;
  get3LMCoaches: () => TServiceResponse<TStrapiArrayResponse<TStrapiPlayer> | null>;
  get2LMCoaches: () => TServiceResponse<TStrapiArrayResponse<TStrapiPlayer> | null>;
  getClubHistoryData: () => TServiceResponse<TStrapiObjectResponse<TStrapiClubHistory | null>>;
  getZarzadInfo: () => TServiceResponse<TStrapiObjectResponse<TStrapiClubManagementInfo> | null>;
  getZarzadMembers: () => TServiceResponse<TStrapiArrayResponse<TStrapiManagementMember> | null>;
  getPreviewPostBySlug: (slug: string) => TServiceResponse<TStrapiObjectResponse<TStrapiArticle>>;
  getPhotoGalleryCategories: (id?: string) => TServiceResponse<TStrapiObjectResponse<TStrapiClubGallery | null>>;
  getGlobalSettings: () => TServiceResponse<TStrapiObjectResponse<TStrapiGlobalSettings> | null>;
  getTransferTax: () => TServiceResponse<TStrapiObjectResponse<TStrapiTaxTransfer> | null>;
};
