document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is the highest mountain in the world?", options: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
        { question: "What is the largest country by area?", options: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
        { question: "Which is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
        { question: "What is the capital of Canada?", options: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
    ];

    const questionContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    function loadStoredProgress() {
        return JSON.parse(sessionStorage.getItem("progress")) || {};
    }

    function saveProgress(progress) {
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    function loadStoredScore() {
        const storedScore = localStorage.getItem("score");
        if (storedScore !== null) {
            scoreDisplay.textContent = `Your last score: ${storedScore} out of 5`;
        }
    }

    function renderQuiz() {
        questionContainer.innerHTML = ""; // Clear previous content to prevent duplication
        const storedProgress = loadStoredProgress();

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;

            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = option;
                questionDiv.appendChild(label);
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(document.createElement("br"));
                
                setTimeout(() => {
                    if (storedProgress[index] && storedProgress[index] === option) {
                        input.checked = true;
                    }
                }, 10); // Ensures checked attribute is properly set

                input.addEventListener("change", () => {
                    storedProgress[index] = input.value;
                    saveProgress(storedProgress);
                });
            });
            questionContainer.appendChild(questionDiv);
        });
    }

    submitButton.addEventListener("click", () => {
        let score = 0;
        const storedProgress = loadStoredProgress();

        questions.forEach((q, index) => {
            if (storedProgress[index] === q.answer) {
                score++;
            }
        });
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });

    renderQuiz();
    loadStoredScore();
});