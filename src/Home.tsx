import { primaryColor } from "colors";
import React, { useState, useEffect } from "react";
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
import { GET, POST } from "api";
import AccountMenuItems from "components/AccountMenuItems";
import ProfileDialog from "components/ProfileDialog";
import logo from "images/quiz_man_hatena.png";

interface UsernameProps {
  name: string;
}

const Username = (props: UsernameProps) => {
  if (props.name === "") {
    return <Typography>ログインしてください</Typography>;
  }
  return <Typography>{props.name}</Typography>;
};

const Home = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

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

  const handleProfileDialogSave = (username: string) => {
    setUsername(username);
  };

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const response = await GET("/v1/users", token);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const users = await response.json();
        if (users.length === 0) {
          await POST("/v1/users", token, {
            name: "未設定",
          });
          setUsername("未設定");
        } else {
          setUsername(users[0].name);
        }
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="アカウント設定">
            <IconButton size="small" sx={{ mr: 2 }} onClick={handleMenuOpen}>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <Username name={username} />
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
          onClick={() => alert("not implemented")}
          variant="contained"
        >
          はじめる
        </Button>
      </Box>
      <ProfileDialog
        currentUsername={username}
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        onSave={handleProfileDialogSave}
      />
    </>
  );
};

export default Home;
