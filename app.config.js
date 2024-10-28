import 'dotenv/config';

export default {
  expo: {
    name: 'AsteroidApp',
    slug: 'AsteroidApp',
    extra: {
      NASA_API_KEY: process.env.NASA_API_KEY,
    },
  },
};
