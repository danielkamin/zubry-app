import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.CMS_URL}/auth/local`, {
            identifier: credentials.username,
            password: credentials.password
          });
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (e) {
          if (e.response.status) {
            switch (e.response.status) {
              case 401:
                console.error({ module: 'nextauth-authorize', msg: 'response code 401' });
                throw new Error('401');
              case 403:
                console.error({ module: 'nextauth-authorize', msg: 'response code 403' });
                throw new Error('403');
              case 404:
                console.error({ module: 'nextauth-authorize', msg: 'response code 404' });
                throw new Error('404');
              case 500:
                console.error({ module: 'nextauth-authorize', msg: 'CredentialsSignin || Server Error' });
                break;
              default:
                console.error({ module: 'nextauth-authorize', msg: 'unexpected' });
                throw new Error('unexpected');
            }
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
      }
      return Promise.resolve(token);
    },

    async session({ session, token }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return Promise.resolve(session);
    }
  },
  pages: {
    signIn: '/sklep/login',
    error: '/sklep/login'
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth;
