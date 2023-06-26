import qs from 'qs';

import { cmsAxiosInstance, publicAxiosInstance } from '@/utils/axios';
import { TMainPageService } from '@/types/services.types';
import { TStrapiArrayResponse, TStrapiPlayer, TStrapiSponsor } from '@/types/strapi.types';

const MainPageService: TMainPageService = {
  getPaginatedArticles: async (pageNumber = 1, searchQuery = '', sortQuery = 'DESC', elementsPerPage = 6) => {
    const queryString = qs.stringify(
      {
        sort: `publishedAt:${sortQuery}`,
        publicationState: 'live',
        pagination: {
          page: pageNumber,
          pageSize: elementsPerPage
        },
        populate: 'Image'
      },
      {
        encodeValuesOnly: true
      }
    );

    let requestUrl = `/artykuls?${queryString}`;
    if (searchQuery) requestUrl += `&_q=${encodeURI(searchQuery)}`;
    try {
      const { data } = await cmsAxiosInstance.get(requestUrl);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getPreviewPostBySlug: async (slug) => {
    try {
      const { data } = await cmsAxiosInstance.get(`/artykuls/${slug}`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getNewsCount: async (searchQuery = null) => {
    let baseUrl = '/artykuls';
    searchQuery && (baseUrl += `?_q=${searchQuery}`);
    try {
      const { data } = await cmsAxiosInstance(baseUrl);
      return { status: true, result: data.meta.pagination.total };
    } catch (err) {
      console.error(err);
      return { status: false, result: 0 };
    }
  },
  getSingleArticle: async (slug) => {
    try {
      const slicedSlug = slug.startsWith('/') ? slug.slice(1) : slug;
      const { data } = await cmsAxiosInstance.get(`/artykuls/${slicedSlug}?populate=Image`);
      return { status: true, result: data };
    } catch (err) {
      return { result: null, status: false };
    }
  },
  getAllNewsWithSlug: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/artykuls?_publicationState=live');
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { result: null, status: false };
    }
  },
  getClubHistoryData: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/historia');
      return { status: false, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  postContactFormData: async (fullName, email, message) => {
    try {
      await publicAxiosInstance.post('/wiadomosc-kontaktowas/send', {
        data: {
          Name: fullName,
          Email: email,
          Message: message
        }
      });
      return { status: true, result: null };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getContactAndLocationData: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('kontakt');
      return { status: true, result: data };
    } catch (err) {
      return {
        status: false,
        result: null
      };
    }
  },
  getPzkoszSettingsData: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/ustawienia-pz-kosz');
      return {
        status: true,
        result: data
      };
    } catch (err) {
      console.error(err.response);
      return { status: false, result: null };
    }
  },
  getCookieConsentRegulations: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/polityka-cookie');
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  getTransferTax: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/podatek-1-5?populate=Image');
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get3LMLeaderboard: async () => {
    try {
      const queryString = qs.stringify(
        {
          populate: {
            Table: {
              populate: '*'
            }
          },
          sort: 'id:asc'
        },
        {
          encodeValuesOnly: true
        }
      );

      const { data } = await cmsAxiosInstance.get(`/tabela-3-lms?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get3LMTimetable: async () => {
    const queryString = qs.stringify(
      {
        populate: {
          Schedule: {
            populate: '*'
          }
        },
        sort: 'id:asc'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/terminarz-3-lms?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      return { status: true, result: null };
    }
  },
  get3LMPlayers: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data }: { data: TStrapiArrayResponse<TStrapiPlayer> } = await cmsAxiosInstance.get(
        `/zawodnicy-3-lms?${queryString}`
      );
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get2LMPlayers: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data }: { data: TStrapiArrayResponse<TStrapiPlayer> } = await cmsAxiosInstance.get(
        `/zawodnicy-2-lms?${queryString}`
      );
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get2LMPlayer: async (slug) => {
    const slicedSlug = slug.startsWith('/') ? slug.slice(1) : slug;
    const query = qs.stringify(
      {
        populate: ['Photo', 'Images']
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/zawodnicy-2-lms/${slicedSlug}?${query}`);
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get3LMCoaches: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/trenerzy-3-lms?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  get2LMCoaches: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/trenerzy-2-lms?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      return { status: false, result: null };
    }
  },
  getSponsors: async () => {
    const queryString = qs.stringify(
      {
        sort: 'Order',
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data }: { data: TStrapiArrayResponse<TStrapiSponsor> } = await cmsAxiosInstance.get(
        `/sponsors?${queryString}`
      );
      return { status: true, result: data };
    } catch (err) {
      console.error(err.toJSON().message);
      return { status: false, result: null };
    }
  },
  getZarzadInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get(`/zarzad-klubu-informacje`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err.toJSON().message);
      return { status: false, result: null };
    }
  },
  getZarzadMembers: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/zarzads?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getPhotoGalleryCategories: async (id) => {
    const query = qs.stringify(
      {
        populate: {
          Categories: {
            //sort not working
            //https://github.com/strapi/strapi/pull/16139
            //change after updating
            sort: ['id:desc'],
            populate: '*',
            filters: id
              ? {
                  id: {
                    $eq: id
                  }
                }
              : null
          },
          Preview: {
            populate: '*'
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/galeria?${query}`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getGlobalSettings: async () => {
    const queryString = qs.stringify(
      {
        populate: '*',
        publicationState: 'live'
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/ustawienia-ogolne?${queryString}`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  }
};

export default MainPageService;
