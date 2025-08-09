// Importa lo necesario de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbhfcGiPRIqAzhSao2Jho8RIgAhtE8-t0",
  authDomain: "sistema-emergencias-fb844.firebaseapp.com",
  projectId: "sistema-emergencias-fb844",
  storageBucket: "sistema-emergencias-fb844.firebasestorage.app",
  messagingSenderId: "815114410283",
  appId: "1:815114410283:web:89e30447e6d333d7974d6e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar autenticación y proveedor de Google
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Inicializar Firestore y exportar como db
export const db = getFirestore(app);
