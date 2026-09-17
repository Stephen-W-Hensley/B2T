const gameText = document.getElementById("game-text2");
const userInput = document.getElementById("user-input2");
const submitBtn = document.getElementById("submit-btn2");

// Get references to our new overlay elements
const overlay = document.getElementById("game-over-overlay");
const codecText = document.getElementById("codec-text");
const mgsTitle = document.getElementById("mgs-title");

let currentStep = "askUsername";
let username = "";

submitBtn.addEventListener("click", async () => {
  const input = userInput.value.trim();
  userInput.value = "";

  if (currentStep === "askUsername") {
    username = input;

    if (username === "student" || username === "teacher") {
      print("Thank you.");
      await sleep(1000);
      print("Please input your password.");

      // Mask password typing
      userInput.type = "password";
      userInput.placeholder = "Password";
      currentStep = "askPassword";
    } else {
      print("Incorrect username. Please refresh page and try again.");
      currentStep = "end";
    }
  } else if (currentStep === "askPassword") {
    const password1 = input;
    if (username === "student" && password1 === "123456") {
      print("You are logged in as a student.");
      document.getElementById("main-link").style.display = "block";
      currentStep = "end";
    } else if (username === "teacher" && password1 === "qwerty") {
      print("You are logged in as a teacher.");
      document.getElementById("main-link").style.display = "block";
      currentStep = "end";
    } else {
      currentStep = "end";

      // 1. Instantly trigger the all-black screen layout
      overlay.style.display = "flex";
      setTimeout(() => (overlay.style.opacity = "1"), 10);

      // 2. Pure black silence for 3 seconds as requested
      await sleep(3000);

      // 3. The panicked radio call pops up in big font
      codecText.innerText = `${username.toUpperCase()}? ${username.toUpperCase()}?!`;

      // 4. Wait another 1.5 seconds before the final blow
      await sleep(1500);

      // 5. Massive red GAME OVER text appears
      mgsTitle.innerText = "WRONG PASSWORD. GAME OVER!";

      // 6. Reset System Sequence (Clears screen after 5 seconds so they can try again)
      await sleep(5000);
      overlay.style.opacity = "0";
      await sleep(500);
      overlay.style.display = "none";
      codecText.innerText = "";
      mgsTitle.innerText = "";
      resetLoginSystem();
    }
  } else if (currentStep === "end") {
    print("Session finished. Resetting terminal...");
  }
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents accidental page reloads or form submissions
    submitBtn.click(); // Triggers the exact logic inside your click listener
  }
});

function resetLoginSystem() {
  currentStep = "askUsername";
  username = "";
  userInput.type = "text";
  userInput.placeholder = "Username";
  gameText.innerText = "";
  print("Log-in \n\nWelcome! Please enter your username.");
}

function print(text) {
  gameText.innerText += text + "\n";
  gameText.scrollTop = gameText.scrollHeight;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

print("Log-in \n\nWelcome! Please enter your username.");
