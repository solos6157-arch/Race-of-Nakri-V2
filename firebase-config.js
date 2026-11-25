// OPTIONAL CLOUD SETUP: create a Firebase project, enable Anonymous Authentication and Realtime Database,
 // then replace these placeholders with your Firebase web app configuration.
 // Without this configuration, the game still works locally, but leaderboard and real online matchmaking
 // cannot sync between different visitors/devices.
 window.NAKRI_FIREBASE_CONFIG = {
   apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
   authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
   databaseURL: "https://PASTE_YOUR_PROJECT-default-rtdb.firebaseio.com",
   projectId: "PASTE_YOUR_PROJECT",
   storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
   messagingSenderId: "PASTE_YOUR_SENDER_ID",
   appId: "PASTE_YOUR_APP_ID"
 };
