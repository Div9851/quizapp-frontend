interface Env {
  domain: string;
  clientId: string;
  redirectUri: string;
}

const env: Env = {
  domain: process.env.REACT_APP_DOMAIN || "",
  clientId: process.env.REACT_APP_CLIENT_ID || "",
  redirectUri: process.env.REACT_APP_REDIRECT_URI || "",
};

export default env;
