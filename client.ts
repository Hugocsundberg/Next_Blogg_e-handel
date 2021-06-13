const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '9r33i0al',
  dataset: 'production',
  apiVersion: '2021-06-13', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export default client