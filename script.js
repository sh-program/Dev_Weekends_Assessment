const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const statusDisplay = document.getElementById("status");

const focusInput = document.getElementById("focusMinutes");
const breakInput = document.getElementById("breakMinutes");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

const historyList = document.getElementById("historyList");
const alarm = document.getElementById("alarm");

const alarmControls = document.getElementById("alarmControls");
const stopAlarmBtn = document.getElementById("stopAlarmBtn");
const snoozeBtn = document.getElementById("snoozeBtn");

let timer;
let isRunning = false;
let isPaused = false;
let isFocus = true;

let timeLeft = Number(focusInput.value) * 60;

// ---------------- INIT ----------------
checkNewDay();
loadHistory();
updateDisplay();

// ---------------- DISPLAY ----------------
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ---------------- START ----------------
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;

    statusDisplay.textContent = "Running";

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            sessionFinished();
        }
    }, 1000);
}

// ---------------- PAUSE ----------------
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);

    isRunning = false;
    isPaused = true;

    statusDisplay.textContent = "Paused";
}

// ---------------- RESUME (FIXED) ----------------
function resumeTimer() {
    if (!isPaused) return;

    isPaused = false;
    isRunning = true;

    statusDisplay.textContent = "Running";

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            sessionFinished();
        }
    }, 1000);
}

// ---------------- RESET (FIXED) ----------------
function resetTimer() {
    clearInterval(timer);

    isRunning = false;
    isPaused = false;
    isFocus = true;

    alarm.pause();
    alarm.currentTime = 0;
    alarm.loop = false;

    alarmControls.style.display = "none";

    timeLeft = Number(focusInput.value) * 60;

    modeDisplay.textContent = "Focus Session";
    modeDisplay.className = "mode focus";

    statusDisplay.textContent = "Ready to Start";

    updateDisplay();
}

// ---------------- SESSION FINISHED ----------------
function sessionFinished() {

    // alarm LOOP
    alarm.loop = true;
    alarm.currentTime = 0;
    alarm.play();

    alarmControls.style.display = "flex";

    // UX animation
    document.body.style.transform = "scale(1.01)";
    setTimeout(() => {
        document.body.style.transform = "scale(1)";
    }, 300);

    if (isFocus) {

        saveSession();

        isFocus = false;

        modeDisplay.textContent = "Break Time";
        modeDisplay.className = "mode break";

        timeLeft = Number(breakInput.value) * 60;

    } else {

        isFocus = true;

        modeDisplay.textContent = "Focus Session";
        modeDisplay.className = "mode focus";

        timeLeft = Number(focusInput.value) * 60;
    }

    updateDisplay();

    isRunning = false;

    startTimer();
}

// ---------------- HISTORY ----------------
function saveSession() {
    const now = new Date();

    const session = {
        duration: `${focusInput.value}:00`,
        time: now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        })
    };

    let history =
        JSON.parse(localStorage.getItem("pomodoroHistory")) || [];

    history.push(session);

    localStorage.setItem("pomodoroHistory", JSON.stringify(history));

    renderHistory();
}

function renderHistory() {
    let history =
        JSON.parse(localStorage.getItem("pomodoroHistory")) || [];

    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML =
            `<li class="empty-history">No sessions completed yet.</li>`;
        return;
    }

    // FIX: latest first
    history.slice().reverse().forEach(item => {
        const li = document.createElement("li");
        li.textContent = `✓ ${item.duration} Focus - ${item.time}`;
        historyList.appendChild(li);
    });
}

function loadHistory() {
    renderHistory();
}

function checkNewDay() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("pomodoroDate");

    if (savedDate !== today) {
        localStorage.removeItem("pomodoroHistory");
        localStorage.setItem("pomodoroDate", today);
    }
}

// ---------------- ALARM CONTROLS ----------------

// STOP
stopAlarmBtn.addEventListener("click", () => {
    alarm.pause();
    alarm.currentTime = 0;
    alarm.loop = false;

    alarmControls.style.display = "none";
});

// SNOOZE 1 MIN
snoozeBtn.addEventListener("click", () => {
    alarm.pause();
    alarm.currentTime = 0;
    alarm.loop = false;

    alarmControls.style.display = "none";

    clearInterval(timer);

    isRunning = false;
    isPaused = false;

    timeLeft = 60;

    statusDisplay.textContent = "Snoozed for 1 minute";

    updateDisplay();
    startTimer();
});

// ---------------- INPUT UPDATE ----------------
focusInput.addEventListener("change", () => {
    if (!isRunning && isFocus) {
        timeLeft = Number(focusInput.value) * 60;
        updateDisplay();
    }
});

// ---------------- BUTTONS ----------------
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);