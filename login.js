const gameText = document.getElementById('game-text2');
const userInput = document.getElementById('user-input2');
const submitBtn = document.getElementById('submit-btn2');

let currentStep = "askUsername"; // Track the current step of the login process
let username = ""; // Store the username

submitBtn.addEventListener('click', async () => {
    const input = userInput.value.trim();
    userInput.value = ''; // Clear the input field

    if (currentStep === "askUsername") {
        username = input;

        if (username === "student" || username === "teacher") {
            print("Thank you.");
            await sleep(1000); // Wait for 1 second
            print("Please input your password.");
            currentStep = "askPassword"; // Move to the next step
        } else {
            print("Incorrect username. Please refresh page and try again.");
            currentStep = "end"; // End the process
        }
    } else if (currentStep === "askPassword") {
        const password1 = input;
        if (username === "student" && password1 === "123456") {
            print("You are logged in as a student.");
            document.getElementById('main-link').style.display = 'block'; // Show the link to the main page
        } else if (username === "teacher" && password1 === "qwerty") {
            print("You are logged in as a teacher.");
            document.getElementById('main-link').style.display = 'block'; // Show the link to the main page
        } else {
            // Metal Gear Solid Game Over Sequence
            print("Incorrect password.");
            await sleep(1000);
            print(`${username.toUpperCase()}? ${username.toUpperCase()}?!`);
            await sleep(1500);
            print("GAME OVER");
        };
        currentStep = "end"; // End the process after password check
    } else if (currentStep === "end") {
        print("Session finished. Refresh page to try again.");
    }
});


function print(text) {
    gameText.innerText += text + '\n';
    gameText.scrollTop = gameText.scrollHeight; // Scroll to the bottom
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

print("Log-in \n\nWelcome! Please enter your username.");
