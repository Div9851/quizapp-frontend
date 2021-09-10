import { primaryColor } from "common/colors";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { UserInfo } from "common/types";

interface CustomAvatarProps {
  userInfo: UserInfo;
  score: number;
  reverse?: boolean;
}

const CustomAvatar = (props: CustomAvatarProps) => {
  const { userInfo, score, reverse } = props;
  const flow = reverse ? "row-reverse" : "row";

  return (
    <Box display="flex" alignItems="flex-end" sx={{ flexFlow: flow }}>
      <Box>
        <Avatar sx={{ width: 50, height: 50 }} src={userInfo.picture} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexFlow: "column", pl: 1, pr: 1 }}
      >
        <Typography>score</Typography>
        <Typography fontSize="1.3em">{score}</Typography>
      </Box>
    </Box>
  );
};

interface RoomHeaderProps {
  myInfo: UserInfo;
  opponentInfo: UserInfo;
  myScore: number;
  opponentScore: number;
  questionNumber: number;
  displayQuestionNumber: boolean;
}

const RoomHeader = (props: RoomHeaderProps) => {
  const {
    myInfo,
    opponentInfo,
    myScore,
    opponentScore,
    questionNumber,
    displayQuestionNumber,
  } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      component={Paper}
      elevation={2}
      sx={{ color: "white", bgcolor: primaryColor.main }}
      pt={2}
      pl={1}
      pr={1}
      pb={1}
    >
      <CustomAvatar userInfo={myInfo} score={myScore} />
      <Box display="flex" alignItems="center">
        {displayQuestionNumber ? (
          <Typography fontSize="1.5em">Q {questionNumber}</Typography>
        ) : null}
      </Box>
      <CustomAvatar userInfo={opponentInfo} score={opponentScore} reverse />
    </Box>
  );
};

export default RoomHeader;
