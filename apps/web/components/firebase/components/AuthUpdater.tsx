import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { auth, getFirebaseToken, getNewIdToken } from "../auth";
import {
  firebaseReady,
  firebaseToken,
  firebaseUserAtom,
  profileInfoAtom,
} from "../jotai/store";
import { useAtom } from "jotai";
import axios, { Axios, AxiosError, AxiosInstance } from "axios";
import WebworkerLoader from "../webworkers/loader";
import tokenRefresher from "../webworkers/tokenRefresher";
import { FC } from "react";

export const axiosAuthInstance: AxiosInstance = axios.create();

interface Props {
  callback?: (user: User | null) => Promise<any>;
}

const AuthUpdater: FC<Props> = ({ callback }) => {
  const [profile, setProfile] = useAtom(firebaseUserAtom);
  const [ready, setReady] = useAtom(firebaseReady);
  const [token, setToken] = useAtom(firebaseToken);
  const [info, setInfo] = useAtom(profileInfoAtom);

  useEffect(() => {
    let _user: User | null = null;

    // Setup auth state detector
    onAuthStateChanged(auth, async (user) => {
      _user = user;
      // Load account data from firebase auth to redux state
      if (user) {
        const token = await getFirebaseToken();
        // Setup default header
        axiosAuthInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        setProfile({ ...user, token });
        setToken(token);
      } else {
        setProfile(null);
        setInfo(null);
      }
      if (callback) await callback(user);
      setReady(true);
    });

    // Setup webworker for token refresher
    let worker = WebworkerLoader(tokenRefresher);
    worker.postMessage("Trigger Refresh WebWorker");
    worker.addEventListener("message", async (e: any) => {
      try {
        console.log("Webworker is refreshing the token");
        const token = await getNewIdToken();
        setProfile({
          ..._user,
          token,
        });
        setToken(token);
      } catch (e) {
        console.error("An error has occured while trying to refresh ID token");
        console.log(e);
      }
    });
    return () => {};
  }, []);
  return null;
};

export { AuthUpdater };
