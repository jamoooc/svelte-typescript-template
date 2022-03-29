export default process.env.NODE_ENV === "production"
  ? process.env.HOSTNAME_PROD 
  : process.env.HOSTNAME_DEV;