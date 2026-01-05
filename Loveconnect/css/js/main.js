// ======================= FIREBASE SETUP =========================

// Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAov7VyLeZjCjGmS5cgDJ0PY98OzAtft-I",
  authDomain: "love-connect-d191a.firebaseapp.com",
  projectId: "love-connect-d191a",
  storageBucket: "love-connect-d191a.firebasestorage.app",
  messagingSenderId: "90791158346",
  appId: "1:90791158346:web:4f27789c2839835b9e3cb3",
  measurementId: "G-802734KWZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// =================================================================
// ====================== USER SIGN UP =============================
// =================================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        name: "",
        age: "",
        bio: "",
      });

      alert("Signup successful!");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// =================================================================
// ======================== USER LOGIN =============================
// =================================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// =================================================================
// ==================== DASHBOARD PROTECTION =======================
// =================================================================

if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}

// =================================================================
// ======================== LOGOUT BUTTON ==========================
// =================================================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth);
    window.location.href = "login.html";
  });
}

// =================================================================
// ===================== PROFILE SAVE ==============================
// =================================================================

const profileForm = document.getElementById("profileForm");

if (profileForm) {
  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) return alert("You must be logged in");

    const name = document.getElementById("profileName").value;
    const age = document.getElementById("profileAge").value;
    const bio = document.getElementById("profileBio").value;

    await updateDoc(doc(db, "users", user.uid), {
      name,
      age,
      bio,
    });

    alert("Profile updated!");
  });
}

// =================================================================
// ========================== MESSAGES ==============================
// =================================================================

const sendMessageBtn = document.getElementById("sendMessage");

if (sendMessageBtn) {
  sendMessageBtn.addEventListener("click", async () => {

    const user = auth.currentUser;
    if (!user) return alert("Login first");

    const message = document.getElementById("chatMessage").value;

    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      sender: user.email,
      text: message,
      time: Date.now(),
    });

    document.getElementById("chatMessage").value = "";
  });
}

// Live Messages
const messagesBox = document.getElementById("messagesBox");

if (messagesBox) {
  onSnapshot(collection(db, "messages"), (snapshot) => {
    messagesBox.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      messagesBox.innerHTML += `
        <p><strong>${data.sender}:</strong> ${data.text}</p>
      `;
    });
  });
}




