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
const database = getDatabase(app);

// Steps per revolution for both motors
const STEPS_PER_REVOLUTION = 1600;

// Function to calculate steps and display in label
window.sendAngle = function(motor) {
  const angleInput = document.getElementById(`${motor}-angle`);
  const stepLabel = document.getElementById(`${motor}-step`);
  const angle = parseFloat(angleInput.value);

  if (!isNaN(angle)) {
    console.log(`${motor} Angle (as float): ${angle}`);

    // Calculate steps
    const steps = Math.round((Math.abs(angle) / 360) * STEPS_PER_REVOLUTION);
    console.log(`Calculated Steps: ${steps}`);

    // Display steps in the corresponding label
    stepLabel.textContent = `Steps: ${steps}`;

    // Send only the angle to Firebase
    const motorPath = motor === 'nema17' ? 'Nema-17' : 'Nema-23';
    set(ref(database, motorPath), angle)
      .then(() => console.log(`Data sent for ${motor}: ${angle}`))
      .catch(error => console.error("Error writing to Firebase Database:", error));
  } else {
    console.log("Please enter a valid angle");
  }
};
