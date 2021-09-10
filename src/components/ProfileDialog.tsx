import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PUT } from "common/api";
import { UserInfo } from "common/types";

interface ProfileDialogProps {
  myInfo: UserInfo;
  open: boolean;
  onClose: () => void;
  onSave: (username: string) => void;
}

const ProfileDialog = (props: ProfileDialogProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const { myInfo, open, onClose, onSave } = props;
  const [username, setUsername] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const usernameError = usernameHelperText !== "";

  useEffect(() => {
    if (open) {
      setUsername(myInfo.name);
      setUsernameHelperText("");
    }
  }, [myInfo, open, setUsername]);

  const handleSave = () => {
    if (usernameError) {
      return;
    }
    (async () => {
      const token = await getAccessTokenSilently();
      await PUT("/v1/users", token, {
        name: username,
        picture: myInfo.picture,
      });
    })();
    onSave(username);
    onClose();
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setUsernameHelperText("0文字にはできません");
    } else {
      setUsernameHelperText("");
    }
    setUsername(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "50vw" } }}
    >
      <DialogTitle>プロフィール</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={usernameError}
          helperText={usernameHelperText}
          fullWidth
          label="名前"
          margin="dense"
          value={username}
          variant="standard"
          onChange={handleUsernameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
        <Button onClick={handleSave} variant="outlined">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
