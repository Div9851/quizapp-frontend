import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { primaryColor } from "common/colors";
import { useHistory } from "react-router";
import { UserInfo, MatchResult } from "common/types";

interface CustomAvatarProps {
  userInfo: UserInfo;
  score: number;
}

const CustomAvatar = (props: CustomAvatarProps) => {
  const { userInfo, score } = props;
  return (
    <Box display="flex" alignItems="center" sx={{ flexFlow: "column" }}>
      <Avatar sx={{ width: 96, height: 96 }} src={userInfo.picture} />
      <Typography sx={{ mt: 1, mb: 1 }}>{userInfo.name}</Typography>
      <Typography fontSize="1.5em" fontWeight="bold">
        {score}
      </Typography>
    </Box>
  );
};

interface ResultPageProps {
  matchResult: MatchResult;
  myInfo: UserInfo;
  myScore: number;
  opponentInfo: UserInfo;
  opponentScore: number;
}

const ResultPage = (props: ResultPageProps) => {
  const { matchResult, myInfo, myScore, opponentInfo, opponentScore } = props;
  const history = useHistory();

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        component={Paper}
        elevation={2}
        sx={{ color: "white", bgcolor: primaryColor.main }}
        pt={3}
        pl={1}
        pr={1}
        pb={1}
      >
        <Typography fontSize="1.2em">ゲーム結果</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexFlow: "column", mt: "20vh" }}
      >
        {matchResult === "win" ? (
          <Typography color="#bc212b" fontSize="3em" sx={{ mb: 2 }}>
            YOU WIN !
          </Typography>
        ) : matchResult === "draw" ? (
          <Typography color="#314053" fontSize="3em" sx={{ mb: 2 }}>
            DRAW GAME
          </Typography>
        ) : matchResult === "lose" ? (
          <Typography color="#3d5063" fontSize="3em" sx={{ mb: 2 }}>
            YOU LOSE...
          </Typography>
        ) : null}
        <Box display="flex" alignItems="center" justifyContent="center">
          <CustomAvatar userInfo={myInfo} score={myScore} />
          <Typography fontSize="1.5em" sx={{ ml: 6, mr: 6 }}>
            VS
          </Typography>
          <CustomAvatar userInfo={opponentInfo} score={opponentScore} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: "15vh" }}>
        <Button sx={{ fontSize: "1.5em" }} onClick={() => history.push("/")}>
          ホームに戻る
        </Button>
      </Box>
    </>
  );
};

export default ResultPage;
