import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { primaryColor } from "common/colors";

interface CorrectDialogProps {
  open: boolean;
}

const CorrectDialog = (props: CorrectDialogProps) => {
  const { open } = props;

  return (
    <Dialog open={open} PaperProps={{ sx: { width: "50vw" } }}>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={primaryColor.dark}
        >
          <CircleOutlinedIcon sx={{ width: 70, height: 70, mr: 1 }} />
          <Typography fontSize="3em">正解</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CorrectDialog;
