import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "components/LoginButton";
import LogoutButton from "components/LogoutButton";

type Props = {
  isLoggedIn: boolean;
};

const Button: React.FC<Props> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
};

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>Hello, World!</h1>
      <Button isLoggedIn={isAuthenticated} />
    </div>
  );
}

export default App;
