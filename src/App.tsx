import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "components/LoginButton";
import LogoutButton from "components/LogoutButton";
import { get as GET } from "api";

const Hello = () => {
  const [name, setName] = useState("nanashi");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently();
        const response = await GET("/v1/users", token);
        const user = await response.json();
        setName(user.name);
      })();
    }
  });
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <h2>{user?.sub}</h2>
    </div>
  );
};

const Button = () => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
};

const App = () => {
  return (
    <div>
      <Hello />
      <Button />
    </div>
  );
};

export default App;
