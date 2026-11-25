RACE OF NAKRI — UPDATE

Added:
- Nickname required before racing; nickname is used for leaderboard entries.
- Top 10 leaderboard display.
- Single Play and Multiplayer mode selector.
- Selected purchased car appears on the player's track and in the online race queue.
- Multiplayer searches for an online player; if none is found, a CPU racer joins.
- Local game progress/coins/cars continue to save in this browser.
- Optional Firebase integration for a shared global leaderboard and online matchmaking.

IMPORTANT ABOUT GLOBAL SAVE / ONLINE MULTIPLAYER:
A static website cannot share visitor data between devices by itself. To enable shared global data:
1. Go to https://console.firebase.google.com/ and create a Firebase project.
2. Add a Web App and copy its config values into firebase-config.js.
3. In Firebase Authentication, enable Anonymous sign-in.
4. Create a Realtime Database.
5. Set database rules for authenticated users. For a public game prototype, a simple starting ruleset is shown below, but it is not hardened against cheating; use stricter validation before launching publicly.

Prototype rules (not cheat-proof; use only for testing):
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

6. Host the updated folder on HTTPS (GitHub Pages is fine). All visitors must use the same hosted site and Firebase project.

If Firebase is not configured, local play still works and Multiplayer uses a CPU opponent; the leaderboard only reflects this browser/device. Real global leaderboard and player-to-player matching require the Firebase setup above.

The game uses anonymous Firebase authentication. Do not put private service-account keys in this website. Only the public web app config belongs in firebase-config.js.
