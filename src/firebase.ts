import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9_WMv-ykpTKRXbIbI0Tf3A5DW-vex9xI",
  authDomain: "dadohealth-77fea.firebaseapp.com",
  databaseURL: "https://dadohealth-77fea-default-rtdb.firebaseio.com",
  projectId: "dadohealth-77fea",
  storageBucket: "dadohealth-77fea.appspot.com",
  messagingSenderId: "1058237149477",
  appId: "1:1058237149477:web:bd0c5a1190903cae2d6acc",
  measurementId: "G-DF89R6ESSB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { firebaseConfig, analytics, auth, db };
export default app;