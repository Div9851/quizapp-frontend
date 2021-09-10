import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { primaryColor } from "common/colors";

interface AnsweringDialogProps {
  you: boolean;
  open: boolean;
  choices: string[];
  answer: string;
  countdown: number;
  onClick: (choice: string) => void;
}

const AnsweringDialog = (props: AnsweringDialogProps) => {
  const { you, open, choices, answer, countdown, onClick } = props;
  const buttons = choices.map((choice: string) => (
    <Button size="large" onClick={() => onClick(choice)}>
      {choice}
    </Button>
  ));
  return (
    <Dialog open={open} PaperProps={{ sx: { width: "50vw" } }}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box sx={{ color: primaryColor.dark }}>
          {you ? `解答中...` : `相手が解答中...`}
        </Box>
        {you ? (
          <Box sx={{ position: "absolute", right: 10 }}>{countdown}</Box>
        ) : null}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexFlow: "column", alignItems: "center" }}
      >
        <Typography fontSize="1.2em" mb={2}>
          {answer}
        </Typography>
        {you ? <ButtonGroup>{buttons}</ButtonGroup> : null}
      </DialogContent>
    </Dialog>
  );
};

export default AnsweringDialog;
