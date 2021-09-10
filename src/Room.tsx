import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import { Box, LinearProgress, Typography } from "@mui/material";
import ResultPage from "ResultPage";
import RoomHeader from "components/RoomHeader";
import PushButton from "components/PushButton";
import WaitingDialog from "components/WaitingDialog";
import AnsweringDialog from "components/AnsweringDialog";
import CorrectDialog from "components/CorrectDialog";
import Loading from "components/Loading";
import { GET } from "common/api";
import useSocket from "common/socketio";
import { Counter } from "common/counter";
import { UserInfo, MatchResult } from "common/types";
import { primaryColor } from "common/colors";

const StatusValues = {
  Waiting: "waiting",
  Matched: "matched",
  NextQuestion: "next question",
  Thinking: "thinking",
  EndQuestion: "end question",
  EndGame: "end game",
} as const;

type Status = typeof StatusValues[keyof typeof StatusValues];

const Room = () => {
  const [myInfo, setMyInfo] = useState<UserInfo>({ name: "", picture: "" });
  const [opponentInfo, setOpponentInfo] = useState<UserInfo>({
    name: "",
    picture: "",
  });
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [matchResult, setMatchResult] = useState<MatchResult>("not finished");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [answering, setAnswering] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [roomStatus, setRoomStatus] = useState<Status>("waiting");
  const [pos, setPos] = useState(new Counter());
  const [posTimer, setPosTimer] = useState<NodeJS.Timeout | null>(null);
  const [limit, setLimit] = useState(new Counter());
  const [enableLimit, setEnableLimit] = useState(false);
  const [limitTimer, setLimitTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(new Counter());
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [openCorrectDialog, setOpenCorrectDialog] = useState(false);

  const socket = useSocket();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const response = await GET(`/v1/users`, token);
      const users = await response.json();
      if (users.length > 0) setMyInfo(users[0]);
    })();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("match", (recv) => {
      setRoomStatus("matched");
      (async () => {
        const token = await getAccessTokenSilently();
        const response = await GET(`/v1/users/${recv}`, token);
        const users = await response.json();
        if (users.length > 0) setOpponentInfo(users[0]);
      })();
    });

    socket.on("next", () => {
      setQuestionNumber((n) => n + 1);
      setPos(new Counter());
      setLimit(new Counter());
      setRoomStatus("next question");
      socket.emit("ready");
    });

    socket.on("question", (recv) => {
      setQuestion(recv);
      const posTm = setInterval(
        () => setPos((prev: Counter) => prev.tick()),
        100
      );
      setPosTimer(posTm);
      setPos(
        new Counter(0, recv.length, "up", false, () => {
          clearInterval(posTm);
          setEnableLimit(true);
          const limitTm = setInterval(() => {
            setLimit((prev: Counter) => prev.tick());
          }, 100);
          setLimitTimer(limitTm);
          setLimit(
            new Counter(50, 0, "down", false, () => {
              clearInterval(limitTm);
              setEnableLimit(false);
              socket.emit("timeup");
            })
          );
        })
      );
      setIncorrect(false);
      setRoomStatus("thinking");
    });

    socket.on("answering", (recv) => {
      setAnswering(recv);
      setAnswer("");
      setPos((prev) => {
        return { ...prev, locked: true, tick: prev.tick };
      });
      setLimit((prev) => {
        return { ...prev, locked: true, tick: prev.tick };
      });
    });

    socket.on("answer", (recv) => {
      setAnswer((prev) => prev + recv);
    });

    socket.on("choices", (recv) => {
      setCountdown(new Counter());
      const tm = setInterval(() => {
        setCountdown((prev) => prev.tick());
      }, 1000);
      setCountdownTimer(tm);
      setCountdown(
        new Counter(5, 0, "down", false, () => {
          clearInterval(tm);
          socket.emit("answer", "");
        })
      );
      setChoices(recv);
    });

    socket.on("correct", (recv) => {
      setAnswering(null);
      setOpenCorrectDialog(true);
      setTimeout(() => setOpenCorrectDialog(false), 1000);
      if (recv === socket.id) {
        setMyScore((prev) => prev + 10);
      } else {
        setOpponentScore((prev) => prev + 10);
      }
    });

    socket.on("incorrect", (recv) => {
      setAnswering(null);
      setPos((prev) => {
        return { ...prev, locked: false, tick: prev.tick };
      });
      setLimit((prev) => {
        return { ...prev, locked: false, tick: prev.tick };
      });
      if (recv === socket.id) {
        setIncorrect(true);
        setMyScore((prev) => Math.max(prev - 10, 0));
      } else {
        setOpponentScore((prev) => Math.max(prev - 10, 0));
      }
    });

    socket.on("endGame", (recv) => {
      if (recv === socket.id) setMatchResult("win");
      else if (recv === "") setMatchResult("draw");
      else setMatchResult("lose");
      setRoomStatus("end game");
    });
  }, [socket, getAccessTokenSilently]);

  useEffect(() => {
    if (socket === null) return;

    socket.off("endQuestion");
    socket.on("endQuestion", (recv) => {
      if (posTimer !== null) clearInterval(posTimer);
      if (limitTimer !== null) clearInterval(limitTimer);
      setPos((prev) => {
        return { ...prev, value: prev.endValue, tick: prev.tick };
      });
      setEnableLimit(false);
      setAnswer(recv);
      setRoomStatus("end question");
    });
  }, [socket, posTimer, limitTimer]);

  if (socket === null) {
    return <Loading />;
  }

  const handleClose = () => {
    socket.close();
    history.push("/");
  };

  if (roomStatus === "end game") {
    socket.close();
    return (
      <ResultPage
        matchResult={matchResult}
        myInfo={myInfo}
        myScore={myScore}
        opponentInfo={opponentInfo}
        opponentScore={opponentScore}
      />
    );
  }

  return (
    <>
      <RoomHeader
        myInfo={myInfo}
        opponentInfo={opponentInfo}
        myScore={myScore}
        opponentScore={opponentScore}
        questionNumber={questionNumber}
        displayQuestionNumber={
          roomStatus === "thinking" || roomStatus === "end question"
        }
      />
      {roomStatus === "thinking" || roomStatus === "end question" ? (
        <>
          {roomStatus === "thinking" && enableLimit ? (
            <LinearProgress
              variant="determinate"
              value={limit.value * 2}
              sx={{ color: primaryColor.dark }}
            />
          ) : null}
          <Box display="flex" p={2}>
            <Typography fontSize="1.2em">Q.</Typography>
            <Typography fontSize="1.2em">
              {question.substr(0, pos.value)}
            </Typography>
          </Box>
          {roomStatus === "end question" ? (
            <Box
              display="flex"
              justifyContent="end"
              p={2}
              sx={{ color: primaryColor.dark }}
            >
              <Typography fontSize="1.2em" mr={1}>
                A.
              </Typography>
              <Typography fontSize="1.2em">{answer}</Typography>
            </Box>
          ) : null}
          {roomStatus === "thinking" && !incorrect ? (
            <Box
              display="flex"
              justifyContent="center"
              position="absolute"
              bottom="10vh"
              width="100vw"
            >
              <PushButton
                width="200px"
                height="150px"
                perspective="250px"
                onClick={() => {
                  socket.emit("push");
                }}
              />
            </Box>
          ) : null}
        </>
      ) : null}
      {roomStatus === "next question" ? (
        <Typography
          display="flex"
          justifyContent="center"
          fontSize="2em"
          sx={{ mt: 5 }}
        >
          第{questionNumber}問
        </Typography>
      ) : null}
      <AnsweringDialog
        you={answering === socket.id}
        open={answering !== null}
        choices={choices}
        answer={answer}
        countdown={countdown.value}
        onClick={(choice) => {
          if (countdownTimer !== null) clearInterval(countdownTimer);
          socket.emit("answer", choice);
        }}
      />
      <CorrectDialog open={openCorrectDialog} />
      <WaitingDialog open={roomStatus === "waiting"} onClose={handleClose} />
    </>
  );
};

export default withAuthenticationRequired(Room, {
  returnTo: "/",
});
