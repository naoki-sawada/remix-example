import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "[API KEY]",
});

const auth = getAuth(app);

export { auth };
