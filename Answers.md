# Answers — Pomodoro Timer Assessment

---

## 1. How to run

To run this project:

1. Download all files
2. Keep them in one folder:
   - index.html
   - style.css
   - script.js
   - alarm.mp3
3. Open `index.html` in any browser (Chrome recommended)

No installation or build step is required because this is a pure frontend project.

---

## 2. Stack & design choices

I used **vanilla HTML, CSS, and JavaScript** because the project is small and focused on UI behavior rather than backend or complex state management.

### Design decisions:

**1. Large central timer (80px font size)**
- I made the timer the most dominant element on the screen
- Reason: Pomodoro apps are time-focused, so the user should read time instantly without distraction
- This is applied in `.timer` class

**2. Card-based layout**
- I separated the UI into cards (timer, settings, history)
- Reason: It keeps focus sessions, settings, and history visually independent
- This improves readability and avoids clutter on both mobile and desktop

---

## 3. Responsive & accessibility

### Responsive behavior:
- On **1440px desktop**:
  - Timer is large and centered
  - Controls appear in 4-column grid
- On **tablet (768px)**:
  - Buttons become 2-column grid
  - Timer size reduces slightly
- On **mobile (360px)**:
  - Buttons become single column
  - Timer becomes smaller for better fit

### Accessibility:
- Clear focus outlines added for buttons and inputs
- High contrast colors used for mode states (focus/break/paused)

### One thing I skipped:
I did not fully implement ARIA labels and screen reader optimizations.

Reason: I prioritized core timer functionality and visual UX first. This would be added in a production-level accessibility pass.

---

## 4. AI usage

I used AI (ChatGPT) in the following parts:

### 1. Timer logic debugging
- Asked: Fix resume/pause behavior and prevent multiple intervals
- AI suggested using `clearInterval` and proper state handling
- I modified it to better fit my structure and avoided re-reading input values on resume

### 2. Alarm and snooze feature
- AI suggested looped audio + snooze logic
- I adapted it and simplified state variables to avoid bugs

### 3. UI improvements
- AI suggested animation on session completion (small scale effect)
- I kept it but tuned timing to 300ms for smoother feel

### What I changed from AI output:
- AI originally used re-triggered `startTimer()` in resume logic
- I replaced it with direct `setInterval` resume logic to avoid resetting state accidentally

---

## 5. Honest gap

One thing that is not fully polished:

### Issue:
The app currently does not handle edge cases like:
- User changing focus/break values while timer is running
- Browser tab being inactive for long periods (timer drift)

### If I had one more day:
- I would add proper state locking for inputs during active session
- I would also sync time using timestamps instead of only `setInterval`
- This would make timer more accurate and production-level stable

---

## Final Note
This project focuses on:
- Clean UI
- Reliable timer logic
- Simple localStorage persistence
- Smooth user experience

It is intentionally kept lightweight without frameworks.