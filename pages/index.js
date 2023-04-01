import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import axios from "axios";

/*export async function getStaticProps() {
  const API_KEY = process.env.ENGINE_KEY;

  return {
    props: { 
      key: API_KEY
    }
  }
  // ...
}*/

export default function Auth() {
  const {username, secret, setUsername, setSecret} = useContext(Context);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    if (!username || !secret) {
      return;
    }
    try {
      await axios.put(
        'https://api.chatengine.io/users/', 
        {username, secret},
        {headers: {"Private-key": "bdc5c5a5-f2ba-4bc2-9980-190682491d3c"}}
      );
      router.replace("/chats");// navigate to the "chat" page
    } catch (error) {
      console.error(error);
    }
  }
  

  return <div className="background">
    <div className="auth-container">
      <form className="auth-form" onSubmit={e => onSubmit(e)}>
        <div className="auth-title">Our Place</div>
        <div className="input-container">
          <input type="email"
           className="text-input"
           required={true}
           placeholder="Email"
           onChange={e =>  setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="password"
          placeholder="Password"
          className="text-input"
          required={true}
          onChange={e =>  setSecret(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button" onClick={() => router.push("/chats")}>Login / Signup</button>
      </form>
    </div>
  </div>;
}
