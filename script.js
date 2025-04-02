// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-1vPLT6l5UEKyBqa22ANSl1B_vPmh3jw",
  authDomain: "mohamed-bue.firebaseapp.com",
  databaseURL: "https://mohamed-bue-default-rtdb.firebaseio.com",
  projectId: "mohamed-bue",
  storageBucket: "mohamed-bue.firebasestorage.app",
  messagingSenderId: "993485669758",
  appId: "1:993485669758:web:970afac6f9baae08fbdf2f",
  measurementId: "G-7K4MJYH22T"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get the database reference

// Function to send angle values to Firebase as a float
window.sendAngle = function(motor) {
  const angleInput = document.getElementById(`${motor}-angle`);
  const angle = parseFloat(angleInput.value); // Convert input value to float

  if (!isNaN(angle)) { // Check if the input is a valid number
    console.log(`${motor} Angle (as float): ${angle}`); // Log angle as a float

    // Send the float value to the Firebase Realtime Database
    const motorPath = motor === 'nema17' ? 'Nema-17' : 'Nema-23'; // Determine the motor path
    set(ref(database, motorPath), angle) // Store the angle as a float in Firebase
      .then(() => {
        console.log(`Data sent for ${motor}: ${angle}`);
      })
      .catch((error) => {
        console.error("Error writing to Firebase Database:", error);
      });
  } else {
    console.log("Please enter a valid angle");
  }
};
