import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Outlet, useLoaderData } from "react-router-dom";
import Home, { socket } from "..";
import axiosUtil from "../services";
import Editors from "../components/Editors";
import JoinForm from "../components/JoinForm";
import Room from "../components/Room";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";

const JoinRoom = () => {
  const [createdUserName, setCreatedUsername] = useState(false);
  const [userRoomName, setUserRoomName] = useState("");
  const [session, setSession] = useState(null);
  const [validRoom, setValidRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const room = useLoaderData();

  useEffect(() => {
    setSession(sessionStorage.getItem("user_room_name"));
    socket.emit("is-valid-room", room);
    socket.on("valid-room", (isValid) => {
      setValidRoom(isValid);
      setTimeout(() => {
        setIsLoading(false);
      }, 800)
    });
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (validRoom) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>codefusion</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <div className="bg-blackish h-screen">
          {!createdUserName && !session ? (
            <JoinForm
              room={room}
              userRoomName={userRoomName}
              setUserRoomName={setUserRoomName}
              setCreatedUsername={setCreatedUsername}
            />
          ) : (
            <Room room={room} username={userRoomName || session} />
          )}
        </div>
      </HelmetProvider>
    );
  } else {
    return <ErrorPage room={room} />
  }
};

JoinRoom.getLayout = function getLayout(page) {
  return <main>{page}</main>;
};
export default JoinRoom;
