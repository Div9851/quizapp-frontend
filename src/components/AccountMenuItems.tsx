import { useAuth0 } from "@auth0/auth0-react";
import { ListItemIcon, MenuItem } from "@mui/material";
import { AccountCircle, Login, Logout } from "@mui/icons-material";

interface Props {
  handleProfileClick: () => void;
}

const AccountMenuItems = (props: Props) => {
  const { handleProfileClick } = props;
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          プロフィール
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </>
    );
  }
  return (
    <>
      <MenuItem onClick={() => loginWithRedirect()}>
        <ListItemIcon>
          <Login fontSize="small" />
        </ListItemIcon>
        ログイン
      </MenuItem>
    </>
  );
};

export default AccountMenuItems;
