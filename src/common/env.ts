interface Env {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience: string;
  backendUri: string;
}

const env: Env = {
  domain: process.env.REACT_APP_DOMAIN || "",
  clientId: process.env.REACT_APP_CLIENT_ID || "",
  redirectUri: process.env.REACT_APP_REDIRECT_URI || "",
  audience: process.env.REACT_APP_AUDIENCE || "",
  backendUri: process.env.REACT_APP_BACKEND_URI || "",
};

export default env;
