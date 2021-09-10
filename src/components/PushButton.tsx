import { useState } from "react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

interface PushButtonPartProps {
  isPushed: boolean;
}

const PushButtonTop = (props: PushButtonPartProps) => {
  const { isPushed } = props;
  const style: SxProps = {
    width: "100%",
    height: "50%",
    bgcolor: "#ff7043",
    borderRadius: "50%",
    position: "relative",
    zIndex: 1,
  };
  if (isPushed) {
    style.top = "20%";
  }
  return <Box sx={style} />;
};

const PushButtonBody = (props: PushButtonPartProps) => {
  const { isPushed } = props;
  const style: SxProps = {
    width: "100%",
    height: "75%",
    bgcolor: "#f4511e",
    borderRadius: "0 0 50% 50% / 0 0 calc(2500% / 75) calc(2500% / 75)",
    position: "absolute",
    bottom: 0,
    zIndex: 0,
  };
  if (isPushed) {
    style.height = "55%";
    style.borderRadius = "0 0 50% 50% / 0 0 calc(2500% / 55) calc(2500% / 55)";
  }
  return <Box sx={style} />;
};

interface PushButtonProps {
  onClick: () => void;
}

const PushButton = (props: PushButtonProps) => {
  const [isPushed, setIsPushed] = useState(false);
  const { onClick } = props;
  return (
    <div
      style={{
        width: "60%",
        height: "60%",
        margin: "0 auto",
        position: "relative",
      }}
      onClick={onClick}
      onMouseDown={() => setIsPushed(true)}
      onMouseUp={() => setIsPushed(false)}
    >
      <PushButtonTop isPushed={isPushed} />
      <PushButtonBody isPushed={isPushed} />
    </div>
  );
};

interface PushButtonWithBaseProps {
  width: string;
  height: string;
  perspective: string;
  onClick: () => void;
}

const PushButtonWithBase = (props: PushButtonWithBaseProps) => {
  const { width, height, perspective, onClick } = props;

  return (
    <Box
      sx={{
        width: width,
        height: height,
        transformStyle: "preserve-3d",
        perspective: perspective,
      }}
    >
      <PushButton onClick={onClick} />
      <Box
        sx={{
          width: "100%",
          height: "50%",
          bgcolor: "#bdbdbd",
          transform: "rotateX(45deg)",
          transformOrigin: "50% 100%",
          position: "absolute",
          bottom: "35%",
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "35%",
          bgcolor: "#9e9e9e",
          position: "absolute",
          bottom: 0,
        }}
      />
    </Box>
  );
};

export default PushButtonWithBase;
