import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Sample = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (resp) => setUser(resp),
    onFailure: (err) => console.log("Login Failed : ", err),
  });

  const logout = () => {
    googleLogout();
    setProfile(null);
    console.log(profile);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <div>
        {profile ? (
          <div>
            <h1>Hello {profile.name}</h1>
            <img src={profile.picture} alt={profile.name} />
            <h2>Email: {profile.email}</h2>
            <button onClick={logout}>SignOut</button>
          </div>
        ) : (
          <button onClick={login}>Google SignIn</button>
        )}
      </div>
    </>
  );
};

export default Sample;
