import { primaryColor } from "common/colors";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { GET, POST } from "common/api";
import AccountMenuItems from "components/AccountMenuItems";
import ProfileDialog from "components/ProfileDialog";
import Loading from "components/Loading";
import { UserInfo } from "common/types";
import logo from "images/quiz_man_hatena.png";

interface UsernameProps {
  name: string;
}

const Username = (props: UsernameProps) => {
  const { name } = props;
  if (name === "") {
    return <Typography>ログインしてください</Typography>;
  }
  return <Typography>{name}</Typography>;
};

const Home = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [myInfo, setMyInfo] = useState<UserInfo>({ name: "", picture: "" });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const history = useHistory();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
    setAnchorEl(null);
  };

  const handleProfileDialogSave = (name: string) => {
    setMyInfo((prev) => {
      return { ...prev, name: name };
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently();
        const response = await GET("/v1/users", token);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const users = await response.json();
        if (users.length === 0) {
          const newUser: UserInfo = {
            name: "未設定",
            picture: user?.picture || "",
          };
          await POST("/v1/users", token, newUser);
          setMyInfo(newUser);
        } else {
          setMyInfo(users[0]);
        }
      })();
    }
  }, [user, isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="アカウント設定">
            <IconButton size="small" sx={{ mr: 2 }} onClick={handleMenuOpen}>
              <Avatar sx={{ width: 32, height: 32 }} src={myInfo.picture} />
            </IconButton>
          </Tooltip>
          <Username name={myInfo.name} />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 16,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <AccountMenuItems handleProfileClick={handleProfileDialogOpen} />
      </Menu>
      <Box
        display="flex"
        fontFamily="'M PLUS Rounded 1c', sans-serif"
        fontWeight="bold"
        alignItems="center"
        sx={{
          flexFlow: "column",
        }}
      >
        <h1>
          <span style={{ color: primaryColor.main }}>早</span>押しクイズ
        </h1>
        <img alt="logo" src={logo} />
        <Button
          color="primary"
          sx={{
            mt: 5,
            fontSize: "1.2em",
          }}
          disabled={!isAuthenticated}
          onClick={() => history.push("/room")}
          variant="contained"
        >
          対戦する
        </Button>
      </Box>
      <ProfileDialog
        myInfo={myInfo}
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        onSave={handleProfileDialogSave}
      />
    </>
  );
};

export default Home;
