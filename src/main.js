/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";



const app = createApp(App);

registerPlugins(app);

app.mount("#app");

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0YzC7KcKjKalNDxYuHJyZgYEN1ZoDJyg",
  authDomain: "vueaplikacije.firebaseapp.com",
  projectId: "vueaplikacije",
  storageBucket: "vueaplikacije.appspot.com",
  messagingSenderId: "810573763902",
  appId: "1:810573763902:web:deea9d03c8bfb1093b086f",
  measurementId: "G-VQ91XWKFGR",
};

// Initialize Firebase
let firebaseApp = initializeApp(firebaseConfig);
let db = getFirestore(firebaseApp);

export { firebaseApp, db, firebaseConfig };

