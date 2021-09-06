import ReactDOM from "react-dom";
import App from "App";
import env from "env";
import { Auth0Provider } from "@auth0/auth0-react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
