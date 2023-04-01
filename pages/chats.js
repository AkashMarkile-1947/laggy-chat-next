import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";


const ChatEngine = dynamic(() => import("react-chat-engine").then((module) => module.ChatEngine));
const MessageFromSocial = dynamic(() => import("react-chat-engine").then((module) => module.MessageFromSocial));

export default function Chats() {
  const {username, secret} = useContext(Context);
  const [showChat,setShowChat] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/chats");
  });

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(() => true);
    }
  });

  if  (!showChat) return <div />;

  return <div className="background">
    <div className="shadow">
      <ChatEngine
        height="calc(100vh - 200px)"
        projectID="c2741802-07c3-4bc3-872f-9afcbbe0055c"
        userName={username}
        userSecret={secret}
      />
    </div>
  </div>;
}
