import ReactDOM from "react-dom";
import App from "App";
import env from "env";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={env.domain}
    clientId={env.clientId}
    redirectUri={env.redirectUri}
    audience={env.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
