import { CircularProgress, styled } from "@mui/material";

const Centered = styled(CircularProgress)({
  position: "absolute",
  top: "calc(50% - 40px)",
  left: "calc(50% - 40px)",
});

const Loading = () => {
  return <Centered size={80} />;
};

export default Loading;
