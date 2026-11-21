
// ==========================================
// GENETICA — MAIN JAVASCRIPT
// ==========================================

// 1. LOADER
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("loader").classList.add("hide");
    }, 700);
});

// 2. MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// 3. DARK / LIGHT THEME
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☾";
    } else {
        themeBtn.textContent = "☀";
    }
});

// 4. SCROLL PROGRESS AND TOP BUTTON
const progressLine = document.getElementById("progressLine");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;

    progressLine.style.width = progress + "%";

    if (scrollTop > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 5. SCROLL ANIMATIONS
const revealElements = document.querySelectorAll(
    ".concept-card, .law-card, .info-card, .glossary-grid article, .application-card, .facts-grid article, .resource-grid a, .timeline-item"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(function (element) {
    observer.observe(element);
});

// 6. ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// 7. MENDEL LAW MODALS
const modalData = {
    law1: {
        title: "Birinchi qonun — bir xillik",
        paragraphs: [
            "Bu qonunga ko'ra, bir juft qarama-qarshi belgi bo'yicha farqlanuvchi ikki gomozigotali organizm chatishtirilganda F1 avlod bir xil genotipga ega bo'ladi.",
            "Misol: AA × aa. Birinchi ota-onadan A, ikkinchisidan a alleli gametaga o'tadi.",
            "Natija: barcha avlodlar Aa bo'ladi. To'liq dominantlikda ularning fenotipi dominant belgiga ega bo'ladi.",
            "Muhim: bu qoida to'liq dominantlik kabi ma'lum shartlarda fenotipik bir xillikni ham beradi."
        ]
    },
    law2: {
        title: "Ikkinchi qonun — ajralish",
        paragraphs: [
            "Geterozigotali ikki organizm chatishtirilganda F2 avlodda allellar ajralishi kuzatiladi.",
            "Misol: Aa × Aa. Har bir ota-ona A va a allellarini teng ehtimol bilan beradi.",
            "Genotipik nisbat: 1 AA : 2 Aa : 1 aa.",
            "To'liq dominantlikda fenotipik nisbat: 3 dominant : 1 retsessiv."
        ]
    },
    law3: {
        title: "Uchinchi qonun — mustaqil kombinatsiyalanish",
        paragraphs: [
            "Ikki yoki undan ortiq gen juftining allellari gametalarga mustaqil taqsimlanishi mumkin.",
            "Misol: AaBb × AaBb. Har bir ota-ona AB, Ab, aB va ab gametalarini teng ehtimol bilan hosil qiladi.",
            "To'liq dominantlik va mustaqil taqsimlanish sharoitida F2 fenotipik nisbati 9:3:3:1 bo'ladi.",
            "Bu qonun turli xromosomalarda joylashgan genlar uchun ayniqsa muhimdir."
        ]
    }
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

document.querySelectorAll("[data-modal]").forEach(function (button) {
    button.addEventListener("click", function () {
        const data = modalData[button.dataset.modal];

        modalTitle.textContent = data.title;
        modalText.innerHTML = "";

        data.paragraphs.forEach(function (paragraph) {
            const p = document.createElement("p");
            p.textContent = paragraph;
            modalText.appendChild(p);
        });

        modal.classList.add("open");
    });
});

function closeModal() {
    modal.classList.remove("open");
}

document.getElementById("modalClose").addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// 8. GENETIC CROSS LABORATORY
const parent1 = document.getElementById("parent1");
const parent2 = document.getElementById("parent2");
const crossBtn = document.getElementById("crossBtn");
const punnett = document.getElementById("punnett");
const resultSummary = document.getElementById("resultSummary");
const ratioResults = document.getElementById("ratioResults");

function getGametes(genotype) {
    return genotype.split("");
}

function crossGenetics() {
    const firstParent = getGametes(parent1.value);
    const secondParent = getGametes(parent2.value);

    const combinations = [];
    const counts = {};

    secondParent.forEach(function (gene1) {
        firstParent.forEach(function (gene2) {
            let result = gene1 + gene2;

            // Dominant allelni birinchi o'ringa joylashtirish
            if (result === "aA") {
                result = "Aa";
            }

            combinations.push(result);
            counts[result] = (counts[result] || 0) + 1;
        });
    });

    punnett.innerHTML = `
    <div class="punnett-cell head">×</div>
    <div class="punnett-cell head">${firstParent[0]}</div>
    <div class="punnett-cell head">${firstParent[1]}</div>
    <div class="punnett-cell head">${secondParent[0]}</div>
    <div class="punnett-cell result">${combinations[0]}</div>
    <div class="punnett-cell result">${combinations[1]}</div>
    <div class="punnett-cell head">${secondParent[1]}</div>
    <div class="punnett-cell result">${combinations[2]}</div>
    <div class="punnett-cell result">${combinations[3]}</div>
  `;

    const total = combinations.length;
    const dominant = combinations.filter(function (item) {
        return item.includes("A");
    }).length;

    const recessive = total - dominant;

    const genotypeParts = Object.keys(counts).map(function (genotype) {
        return genotype + ": " + counts[genotype] + "/" + total;
    });

    const dominantPercent = (dominant / total) * 100;
    const recessivePercent = (recessive / total) * 100;

    resultSummary.innerHTML = `
    <strong>${parent1.value} × ${parent2.value}</strong><br>
    Dominant fenotip ehtimoli: <strong>${dominantPercent}%</strong><br>
    Retsessiv fenotip ehtimoli: <strong>${recessivePercent}%</strong>
  `;

    ratioResults.innerHTML = "";

    genotypeParts.forEach(function (part) {
        const pill = document.createElement("div");
        pill.className = "ratio-pill";
        pill.textContent = part;
        ratioResults.appendChild(pill);
    });
}

crossBtn.addEventListener("click", crossGenetics);

// Dastlabki natija
crossGenetics();

// 9. QUIZ SYSTEM
const questions = [
    {
        question: "Genetika fani nimani o'rganadi?",
        answers: [
            "Organizmlarning irsiyati va o'zgaruvchanligini",
            "Faqat o'simliklarning o'sishini",
            "Yerning tuzilishini",
            "Hayvonlarning harakatini"
        ],
        correct: 0,
        explanation: "Genetika irsiyat va o'zgaruvchanlikni o'rganadi."
    },
    {
        question: "Genetikada asosiy tajribalari bilan mashhur olim kim?",
        answers: [
            "Charles Darwin",
            "Gregor Mendel",
            "Isaac Newton",
            "Louis Pasteur"
        ],
        correct: 1,
        explanation: "Gregor Mendel no'xat o'simliklarida tajribalar o'tkazgan."
    },
    {
        question: "Odatda inson somatik hujayrasida nechta xromosoma bo'ladi?",
        answers: ["23", "44", "46", "48"],
        correct: 2,
        explanation: "Inson somatik hujayrasida odatda 46 ta xromosoma mavjud."
    },
    {
        question: "Geterozigota genotip qaysi?",
        answers: ["AA", "aa", "Aa", "BB"],
        correct: 2,
        explanation: "Geterozigotada bir genning ikki xil alleli mavjud."
    },
    {
        question: "DNKda Adenin qaysi asos bilan juftlashadi?",
        answers: ["Guanin", "Timin", "Sitozin", "Uratsil"],
        correct: 1,
        explanation: "DNKda A-T va G-C juftlari hosil bo'ladi."
    },
    {
        question: "Aa × Aa chatishtirishda genotipik nisbat qanday?",
        answers: ["3:1", "1:1", "1:2:1", "9:3:3:1"],
        correct: 2,
        explanation: "Genotipik nisbat 1 AA : 2 Aa : 1 aa."
    },
    {
        question: "Retsessiv allel qachon fenotipda namoyon bo'ladi?",
        answers: [
            "Har doim",
            "To'liq dominantlikda odatda gomozigota holatda",
            "Faqat AA holatida",
            "Hech qachon"
        ],
        correct: 1,
        explanation: "To'liq dominantlikda retsessiv belgi aa holatida namoyon bo'ladi."
    },
    {
        question: "DNKning asosiy vazifalaridan biri nima?",
        answers: [
            "Irsiy axborotni saqlash",
            "Ovqatni hazm qilish",
            "Qonni aylantirish",
            "Tana haroratini boshqarish"
        ],
        correct: 0,
        explanation: "DNK genetik axborotni saqlaydi va uzatilishida ishtirok etadi."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");
const questionCounter = document.getElementById("questionCounter");
const scoreLabel = document.getElementById("scoreLabel");
const quizProgress = document.getElementById("quizProgress");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");

function loadQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionCounter.textContent =
        "SAVOL " + (currentQuestion + 1) + " / " + questions.length;

    scoreLabel.textContent = "BALL: " + score;

    quizProgress.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    questionText.textContent = question.question;
    answersBox.innerHTML = "";
    quizFeedback.textContent = "";
    nextQuestion.disabled = true;

    question.answers.forEach(function (answer, index) {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent =
            String.fromCharCode(65 + index) + ". " + answer;

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answersBox.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersBox.querySelectorAll(".answer");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        quizFeedback.textContent = "✓ To'g'ri! " + question.explanation;
        quizFeedback.style.color = "#4fdaa0";
    } else {
        selectedButton.classList.add("wrong");
        quizFeedback.textContent = "✕ Noto'g'ri. " + question.explanation;
        quizFeedback.style.color = "#ff8787";
    }

    scoreLabel.textContent = "BALL: " + score;
    nextQuestion.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextQuestion.textContent = "Natijani ko'rish →";
    }
}

nextQuestion.addEventListener("click", function () {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        nextQuestion.textContent = "Keyingi savol →";
        loadQuestion();
    } else {
        showQuizResult();
    }
});

function showQuizResult() {
    const percentage = Math.round((score / questions.length) * 100);

    let message = "";

    if (percentage === 100) {
        message = "Ajoyib! Siz barcha savollarga to'g'ri javob berdingiz!";
    } else if (percentage >= 75) {
        message = "Juda yaxshi! Genetika bo'yicha bilimingiz kuchli.";
    } else if (percentage >= 50) {
        message = "Yaxshi! Yana biroz takrorlash orqali natijangizni oshiring.";
    } else {
        message = "Mavzularni qayta o'rganing va yana bir bor urinib ko'ring.";
    }

    questionCounter.textContent = "TEST YAKUNLANDI";
    scoreLabel.textContent = "NATIJANGIZ";
    quizProgress.style.width = "100%";

    questionText.textContent = score + " / " + questions.length;

    answersBox.innerHTML = `
    <div class="result-summary">
      <div style="font-size:42px;margin:15px;">${percentage}%</div>
      <strong>${message}</strong>
    </div>
  `;

    quizFeedback.textContent = "GENETICA bilimlar laboratoriyasi";
    nextQuestion.textContent = "Qayta boshlash ↻";
    nextQuestion.disabled = false;

    nextQuestion.onclick = function () {
        currentQuestion = 0;
        score = 0;
        nextQuestion.textContent = "Keyingi savol →";
        nextQuestion.onclick = null;
        loadQuestion();
    };
}

// Testni boshlash
loadQuestion();

console.log("GENETICA platformasi muvaffaqiyatli ishga tushdi!");
