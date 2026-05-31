# Pomodoro Timer (Frontend Assessment)

## Overview
This is a simple Pomodoro Timer web app built using vanilla HTML, CSS, and JavaScript.  
It helps users manage focus sessions (default 25 minutes) and break sessions (default 5 minutes), with automatic switching between them.

The app also stores daily focus session history using localStorage.

---

## Features
- Start, Pause, Resume, Reset timer
- Focus & Break cycle auto-switching
- Custom focus and break duration
- Audible alarm when session ends
- Snooze and Stop alarm controls
- Daily history of completed focus sessions
- History resets automatically each new day
- Responsive design (mobile + desktop)

---

## How to Run

### Option 1 (Local)
1. Download or clone the project
2. Make sure these files exist:
   - index.html
   - style.css
   - script.js
   - alarm.mp3
3. Open `index.html` in any modern browser

### Option 2 (Live)
If deployed, open:https://sh-program.github.io/Dev_Weekends_Assessment/

---

## Tech Stack
- HTML5
- CSS
- JavaScript

No frameworks were used because the goal was to keep it lightweight and fully browser-native.

---

## Notes
- Data is stored using localStorage (no backend required)
- Alarm sound must be included as `alarm.mp3` in root folder