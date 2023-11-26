module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.wp.pl'),
        port: 465,
        secure: true,
        auth: {
          user: env('EMAIL_USERNAME'),
          pass: env('EMAIL_PASSWORD')
        },
        tls: {
          rejectUnauthorized: env('NODE_ENV') === 'development' ? false : true
        }
      },
      settings: {
        defaultFrom: 'zubrybiuro@wp.pl',
        defaultReplyTo: 'zubrybiuro@wp.pl'
      }
    }
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('OVH_ACCESS_KEY_ID'),
        secretAccessKey: env('OVH_ACCESS_SECRET'),
        region: env('OVH_REGION'),
        endpoint: env('OVH_ENDPOINT'),
        params: {
          Bucket: env('OVH_BUCKET')
        }
      }
    }
  }
});
