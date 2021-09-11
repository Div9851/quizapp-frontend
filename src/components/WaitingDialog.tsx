import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface WaitingDialogProps {
  open: boolean;
  onClose: () => void;
}

const WaitingDialog = (props: WaitingDialogProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} PaperProps={{ sx: { width: "80vw" } }}>
      <DialogTitle>対戦相手を探しています</DialogTitle>
      <DialogContent>
        <Box display="flex">
          <CircularProgress sx={{ ml: "auto", mr: "auto" }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WaitingDialog;
