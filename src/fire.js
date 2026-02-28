
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSZerqverEWxjVl4Cqg9KMg1VSW6YhFuI",
  authDomain: "loginfirebase-2cb66.firebaseapp.com",
  databaseURL: "https://loginfirebase-2cb66-default-rtdb.firebaseio.com",
  projectId: "loginfirebase-2cb66",
  storageBucket: "loginfirebase-2cb66.firebasestorage.app",
  messagingSenderId: "624741957757",
  appId: "1:624741957757:web:4e3a7e1c379061ebbc3114",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
