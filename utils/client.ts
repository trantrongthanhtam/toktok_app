import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'u8sx2eyb',
  dataset: 'production',
  apiVersion: '2022-08-20',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
