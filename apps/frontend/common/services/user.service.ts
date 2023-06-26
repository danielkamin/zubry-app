import { TUserService } from '@/types/services.types';
import { cmsAxiosInstance, publicAxiosInstance } from '@/utils/axios';

const UserService: TUserService = {
  registerAccount: async (data) => {
    try {
      await publicAxiosInstance.post('/auth/local/register', {
        username: data.email,
        email: data.email,
        password: data.password
      });
      return { status: true, result: 'Poprawnie utworzono konto. Możesz się teraz zalogować.' };
    } catch (err) {
      console.error(err);
      return { status: false, result: 'Coś poszło nie tak. Skontaktuj się z administratorem.' };
    }
  },
  getUserData: async (userId, jwt) => {
    try {
      const { data } = await cmsAxiosInstance.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return { status: false, result: data };
    } catch (err) {
      err.toJSON ? console.error(err.toJSON()) : console.error(err);
      return { status: false, result: null };
    }
  }
};

export default UserService;
