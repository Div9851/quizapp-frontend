import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import io, { Socket } from "socket.io-client";
import env from "common/env";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (socket === null) {
      (async () => {
        const token = await getAccessTokenSilently();
        const newSocket = io(env.backendUri, {
          auth: {
            token: `Bearer ${token}`,
          },
        });
        setSocket(newSocket);
      })();
    }
  }, [socket, getAccessTokenSilently]);
  return socket;
};

export default useSocket;
