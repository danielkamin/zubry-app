import qs from 'qs';

import { TShopService } from '@/types/services.types';
import { cmsAxiosInstance, publicAxiosInstance } from '@/utils/axios';
import { getPopulateUserQuery } from '@/utils/helpers';
import { getDateOnly } from '@/utils/helpers';
import { TStrapiObjectResponse, TStrapiProduct } from '@/types/strapi.types';
import { TCreateOrderForm, TSession } from '@/types/common.types';

const shopServiceHelpers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatOrderData: (orderDetails: any, orderData: TCreateOrderForm, sessionData: TSession) => {
    const todayDate = getDateOnly();

    const order = {
      Order_Date: todayDate,
      Is_Returned: false,
      Is_Sent: false,
      Is_Realized: false,
      Order_Number: `${todayDate.replaceAll('-', '/')}/${new Date().getTime()}`,
      User: sessionData.id,
      Note: orderData.note,
      City: orderData.city,
      Street: orderData.street,
      Phone_Number: orderData.phoneNumber,
      First_Name: orderData.firstName,
      Last_Name: orderData.lastName,
      Details: orderDetails,
      Building_Number: orderData.buildingNumber,
      Apartment_Number: orderData.apartmentNumber,
      Zip_Code: orderData.postalCode
    };
    return order;
  }
};

const ShopService: TShopService = {
  getShopRegulationsInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/regulamin-sklepu');
      return { status: true, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: true, result: null };
    }
  },
  getComplaintsRegulationsInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/polityka-reklamacji');
      return { status: true, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: true, result: null };
    }
  },
  getPrivacyPolicyInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/polityka-prywatnosci');
      return { status: true, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: true, result: null };
    }
  },
  getReturnsRegulationsInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/polityka-zwrotow');
      return { status: true, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: true, result: null };
    }
  },
  getDeliveryRegulationsInfo: async () => {
    try {
      const { data } = await cmsAxiosInstance.get('/polityka-dostaw');
      return { status: true, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: true, result: null };
    }
  },
  getProducts: async (query, pageNumber = 1, elementsPerPage = 999) => {
    let sortQuery = null;
    const categories = query.categories;
    const filtersQuery = categories
      ? {
          Category: {
            Category: {
              $in: JSON.parse(categories)
            }
          }
        }
      : {};
    sortQuery = query.sort ? query.sort : [];
    const queryStringified = qs.stringify(
      {
        filters: filtersQuery,
        sort: sortQuery,
        populate: 'Image',
        pagination: {
          page: pageNumber,
          pageSize: elementsPerPage
        }
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/produkts?${queryStringified}`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: true, result: [] };
    }
  },
  getAllProducts: async () => {
    const { data } = await cmsAxiosInstance.get(`/produkts`);
    return { status: true, result: data };
  },
  getProduct: async (slug) => {
    const slicedSlug = slug.startsWith('/') ? slug.slice(1) : slug;
    try {
      const { data } = await cmsAxiosInstance.get(`/produkts/${slicedSlug}?populate=*`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: true, result: null };
    }
  },
  createOrder: async (products, orderData, sessionData) => {
    const orderDetails = products.map((cartProduct) => {
      return {
        __component: 'zamowienie.products',
        Count: cartProduct.quantity,
        Product: cartProduct.id,
        Size: cartProduct.size.id
      };
    });
    const order = shopServiceHelpers.formatOrderData(orderDetails, orderData, sessionData);
    try {
      const { data } = await publicAxiosInstance.post(
        '/zamowienies',
        { data: order },
        {
          headers: {
            Authorization: `Bearer ${sessionData.jwt}`
          }
        }
      );
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  sendOrderConfirmationEmail: async (products, orderData, sessionData) => {
    const orderDetails = products.map((cartProduct) => {
      return {
        Quantity: cartProduct.quantity,
        Product: cartProduct.name,
        Size: cartProduct.size.size
      };
    });
    const order = shopServiceHelpers.formatOrderData(orderDetails, orderData, sessionData);
    try {
      const { data } = await publicAxiosInstance.post(
        '/zamowienies/confirm',
        { data: order },
        {
          headers: {
            Authorization: `Bearer ${sessionData.jwt}`
          }
        }
      );
      return { status: true, result: data.data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getOrder: async (slug, sessionData) => {
    const query = qs.stringify(
      {
        populate: {
          Details: {
            populate: ['Product', 'Size']
          }
        },
        filters: {
          user: {
            id: {
              $eq: sessionData.id
            }
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/zamowienies/${slug}?${query}`, {
        headers: {
          Authorization: `Bearer ${sessionData.jwt}`
        }
      });
      const orderProductsLength = data.data.attributes.Details.length;
      for (let i = 0; i < orderProductsLength; i++) {
        data.data.attributes.Details[i].Product.data.attributes['imageUrl'] = (
          await ShopService.getProductImageUrl(data.data.attributes.Details[i].Product.data.id)
        ).result;
      }
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getAllOrders: async () => {
    try {
      const { data } = await cmsAxiosInstance.get(`/zamowienies`);
      return { status: true, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getProductImageUrl: async (productId) => {
    try {
      const { data }: { data: TStrapiObjectResponse<TStrapiProduct> } = await cmsAxiosInstance.get(
        `/produkts/${productId}?populate=Image`
      );
      return { status: true, result: `/strapi${data.data.attributes.Image.data.attributes.url}` };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getUserOrders: async (userId, jwt) => {
    const populateQuery = qs.stringify(
      {
        populate: {
          Details: {
            populate: ['Product', 'Size']
          }
        },
        filters: {
          User: {
            id: {
              $eq: userId
            }
          },
          Is_Returned: {
            $eq: false
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/zamowienies?${populateQuery}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return { status: false, result: data };
    } catch (err) {
      console.error(err.toJSON());
      return { status: false, result: null };
    }
  },
  getUserReturns: async (userId, jwt) => {
    const query = qs.stringify(
      {
        populate: ['Order'],
        filters: {
          Order: {
            User: {
              id: {
                $eq: userId
              }
            }
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );
    try {
      const { data } = await cmsAxiosInstance.get(`/zwroties?${query}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return { status: false, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  getUserComplaints: async (userId, jwt) => {
    const query = getPopulateUserQuery(userId);
    try {
      const { data } = await cmsAxiosInstance.get(`/reklamacjes?${query}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return { status: false, result: data };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  },
  returnOrder: async (orderId, orderNumber, sessionData) => {
    try {
      await publicAxiosInstance.post(
        `/zwroties/email`,
        {
          data: {
            Return_Date: getDateOnly(),
            Is_Realized: false,
            Order: orderId,
            Note: ''
          },
          super: {
            Order_Number: orderNumber
          }
        },
        {
          headers: {
            Authorization: `Bearer ${sessionData.jwt}`
          }
        }
      );
      await publicAxiosInstance.put(
        `/zamowienies/${orderId}`,
        {
          data: {
            Is_Returned: true
          }
        },
        {
          headers: {
            Authorization: `Bearer ${sessionData.jwt}`
          }
        }
      );
      return { status: true, result: null };
    } catch (err) {
      console.error(err);
      return { status: false, result: null };
    }
  }
};

export default ShopService;
