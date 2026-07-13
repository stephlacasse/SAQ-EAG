const awsmobile = {
  aws_project_region: 'ca-central-1',
  aws_cognito_region: 'ca-central-1',
  aws_user_pools_id: import.meta.env.VITE_USER_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
  oauth: {
      domain: `${import.meta.env.VITE_USER_POOL_DOMAIN}.auth.ca-central-1.amazoncognito.com`,
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: `${import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION_URL}`,
      redirectSignOut: `${import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION_URL}`,
      responseType: 'code'
  },
};
 
export default awsmobile;