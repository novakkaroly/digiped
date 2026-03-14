/* ====== THEME TOGGLE ====== */
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  updateIcon();
  t && t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    updateIcon();
  });
  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

/* ====== SCROLL REVEAL ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ====== MODULE TOGGLE ====== */
function toggleModule(header) {
  const detail = header.closest('.module-detail');
  detail.classList.toggle('open');
}

function scrollToModule(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      if (!el.classList.contains('open')) {
        el.classList.add('open');
      }
    }, 500);
  }
}

/* ====== QUIZ DATA ====== */
const quizQuestions = [
  {
    question: "Melyik platform alkalmas online \"faliújság\" készítésére?",
    options: ["PowerPoint", "Padlet", "Paint", "Audacity"],
    correct: 1
  },
  {
    question: "Mi a Bee-Bot?",
    options: [
      "Egy online rajzprogram",
      "Egy méhecske formájú padlórobot, amelyet gyerekek programozhatnak",
      "Egy képszerkesztő alkalmazás",
      "Egy közösségi média platform"
    ],
    correct: 1
  },
  {
    question: "Melyik nem ingyenes képadatbázis?",
    options: ["Pixabay", "Adobe Stock", "Pexels", "CleanPNG"],
    correct: 1
  },
  {
    question: "Mi az algoritmus egyszerű definíciója?",
    options: [
      "Egy programozási nyelv neve",
      "Lépések sorozata egy feladat megoldásához",
      "Egy számítógépes vírus típusa",
      "Egy online tárolási módszer"
    ],
    correct: 1
  },
  {
    question: "Melyik eszközzel készíthetünk interaktív párosító feladatot?",
    options: ["Microsoft Word", "LearningApps", "Paint", "Google Maps"],
    correct: 1
  },
  {
    question: "Mi a Canva fő felhasználási területe az oktatásban?",
    options: [
      "Programozás tanítása",
      "Grafikai tervezés: infografikák, meghívók, dokumentumok készítése",
      "Videóvágás",
      "Zeneszerkesztés"
    ],
    correct: 1
  },
  {
    question: "Mit jelent az \"elágazásos prezentáció\"?",
    options: [
      "A prezentáció automatikusan újraindul",
      "A néző maga választja ki, milyen útvonalon halad a tartalomban",
      "A diákon csak képek szerepelnek",
      "A prezentáció nem tartalmaz szöveget"
    ],
    correct: 1
  },
  {
    question: "Mi a fényújság (kiosk mód) lényege?",
    options: [
      "A prezentáció hangot játszik le",
      "A prezentáció automatikusan, folyamatosan ismétlődik",
      "A prezentáció csak nyomtatható",
      "A prezentáció titkosított"
    ],
    correct: 1
  },
  {
    question: "Melyik platform segíti a Kahoot-szerű kvízek létrehozását?",
    options: ["Padlet", "Kahoot", "Padlórobot", "Canva"],
    correct: 1
  },
  {
    question: "Mi a Wordwall?",
    options: [
      "Egy falépítő játék",
      "Szófelhő-készítő eszköz",
      "Interaktív feladatkészítő platform különböző sablonokkal",
      "Online szótár"
    ],
    correct: 2
  },
  {
    question: "Az AI képgenerálás során melyik eszközt NEM használhatjuk?",
    options: ["Canva AI", "Copilot", "MagicSchool", "Excel"],
    correct: 3
  },
  {
    question: "A Google Drive melyik funkciója teszi lehetővé a valós idejű közös szerkesztést?",
    options: [
      "Fájlok törlése",
      "Megosztás és együttműködés",
      "Jelszókezelés",
      "Vírusirtás"
    ],
    correct: 1
  },
  {
    question: "Milyen típusú hivatkozásokat készíthetünk PowerPointban?",
    options: [
      "Csak külső weboldalakra mutatókat",
      "Csak prezentáción belülieket",
      "Prezentáción belüli és külső hivatkozásokat is",
      "Hivatkozások nem lehetségesek PowerPointban"
    ],
    correct: 2
  },
  {
    question: "Melyik szempont a legfontosabb a digitális eszközök óvodai alkalmazásakor?",
    options: [
      "Minél több képernyőidő biztosítása",
      "A pedagógiai cél legyen az első, a technológia csak eszköz",
      "Csak szórakoztató tartalmak használata",
      "A gyerekek önállóan használják az eszközöket"
    ],
    correct: 1
  },
  {
    question: "Mi a Padlet portfólió szerepe a kurzus értékelésében?",
    options: [
      "Nem számít bele az értékelésbe",
      "Az órai munkák gyűjtőhelye, amelyből érdemjegyet kap a hallgató",
      "Csak dekoratív célú",
      "Csak a vizsgán használjuk"
    ],
    correct: 1
  }
];

/* ====== QUIZ STATE ====== */
let currentQuestion = 0;
let answers = [];
let studentName = '';
let neptunCode = '';

/* ====== API ====== */
const API = "port/8000".startsWith("__") ? "http://localhost:8000" : "port/8000";

/* ====== START QUIZ ====== */
function startQuiz() {
  studentName = document.getElementById('studentName').value.trim();
  neptunCode = document.getElementById('neptunCode').value.trim().toUpperCase();

  if (!studentName || !neptunCode) {
    alert('Kérlek, add meg a neved és a Neptun kódod!');
    return;
  }

  if (neptunCode.length < 6) {
    alert('A Neptun kód 6 karakter hosszú!');
    return;
  }

  document.getElementById('quizIntro').classList.add('hidden');
  document.getElementById('quizQuestions').classList.remove('hidden');
  document.getElementById('quizProgress').style.display = 'flex';

  currentQuestion = 0;
  answers = [];
  renderQuestion();
}

/* ====== RENDER QUESTION ====== */
function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  const container = document.getElementById('quizQuestions');
  const total = quizQuestions.length;

  let optionsHtml = '';
  q.options.forEach((opt, i) => {
    optionsHtml += `
      <label class="quiz-option" id="opt-${currentQuestion}-${i}">
        <input type="radio" name="q${currentQuestion}" value="${i}" onchange="selectAnswer(${i})">
        <span>${opt}</span>
      </label>
    `;
  });

  container.innerHTML = `
    <div class="quiz-form">
      <div class="quiz-question">
        <div class="quiz-question__number">${currentQuestion + 1}. kérdés / ${total}</div>
        <div class="quiz-question__text">${q.question}</div>
        ${optionsHtml}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4);">
        <button class="btn btn--outline" onclick="prevQuestion()" ${currentQuestion === 0 ? 'disabled style="opacity:0.4;pointer-events:none;"' : ''}>
          &#8592; Előző
        </button>
        <button class="btn btn--primary" id="nextBtn" onclick="nextQuestion()" disabled>
          ${currentQuestion === total - 1 ? 'Befejezés ✓' : 'Következő →'}
        </button>
      </div>
    </div>
  `;

  // Update progress
  const progress = ((currentQuestion) / total) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  document.getElementById('progressText').textContent = `${currentQuestion + 1}/${total}`;

  // Restore previous answer if exists
  if (answers[currentQuestion] !== undefined) {
    const radio = document.querySelector(`input[name="q${currentQuestion}"][value="${answers[currentQuestion]}"]`);
    if (radio) {
      radio.checked = true;
      document.getElementById('nextBtn').disabled = false;
    }
  }
}

/* ====== SELECT ANSWER ====== */
function selectAnswer(index) {
  answers[currentQuestion] = index;
  document.getElementById('nextBtn').disabled = false;
}

/* ====== NEXT QUESTION ====== */
function nextQuestion() {
  if (answers[currentQuestion] === undefined) return;

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}

/* ====== PREV QUESTION ====== */
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

/* ====== SHOW RESULTS ====== */
async function showResults() {
  const total = quizQuestions.length;
  let score = 0;
  const detailedAnswers = [];

  quizQuestions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correct;
    if (isCorrect) score++;
    detailedAnswers.push({
      question: q.question,
      selected: q.options[answers[i]] || 'Nem válaszolt',
      correctAnswer: q.options[q.correct],
      correct: isCorrect
    });
  });

  const percentage = (score / total) * 100;
  let grade, gradeEmoji, message;

  if (percentage >= 85) {
    grade = 'Jeles (5)';
    gradeEmoji = '🌟';
    message = 'Kiváló teljesítmény! Gratulálok!';
  } else if (percentage >= 70) {
    grade = 'Jó (4)';
    gradeEmoji = '👏';
    message = 'Szép munka! Jó eredmény!';
  } else if (percentage >= 55) {
    grade = 'Közepes (3)';
    gradeEmoji = '📚';
    message = 'Elfogadható eredmény. Érdemes még átismételni az anyagot.';
  } else if (percentage >= 40) {
    grade = 'Elégséges (2)';
    gradeEmoji = '📖';
    message = 'Átmentél, de ajánlott az anyag alaposabb áttanulmányozása.';
  } else {
    grade = 'Elégtelen (1)';
    gradeEmoji = '🔄';
    message = 'Sajnos nem sikerült. Nézd át újra az anyagot és próbáld meg később!';
  }

  // Hide questions, show result
  document.getElementById('quizQuestions').classList.add('hidden');
  document.getElementById('quizProgress').style.display = 'none';

  const resultDiv = document.getElementById('quizResult');
  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `
    <div class="quiz-result">
      <div style="font-size: 3rem; margin-bottom: var(--space-4);">${gradeEmoji}</div>
      <div class="quiz-result__score">${score} / ${total}</div>
      <div class="quiz-result__grade">${grade}</div>
      <div class="quiz-result__msg">${message}</div>
      <div class="quiz-result__status quiz-result__status--sending" id="emailStatus">
        ⏳ Az eredmény küldése folyamatban...
      </div>
      <div id="answerReview" style="text-align: left; margin-top: var(--space-8);"></div>
      <button class="btn btn--outline mt-6" onclick="resetQuiz()">Újrakezdés</button>
    </div>
  `;

  // Show answer review
  let reviewHtml = '<h4 style="font-family: var(--font-display); margin-bottom: var(--space-4);">Válaszok áttekintése</h4>';
  detailedAnswers.forEach((a, i) => {
    const icon = a.correct ? '✅' : '❌';
    const bgClass = a.correct ? 'info-box--tip' : 'info-box--warning';
    reviewHtml += `
      <div class="info-box ${bgClass}" style="margin-bottom: var(--space-3);">
        <strong>${icon} ${i + 1}. ${a.question}</strong><br>
        A te válaszod: ${a.selected}<br>
        ${!a.correct ? `Helyes válasz: ${a.correctAnswer}` : ''}
      </div>
    `;
  });
  document.getElementById('answerReview').innerHTML = reviewHtml;

  // Send email via backend
  const now = new Date();
  const timestamp = now.toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' });

  try {
    const response = await fetch(`${API}/api/submit-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: studentName,
        neptun_code: neptunCode,
        score: score,
        total: total,
        percentage: percentage,
        answers: detailedAnswers,
        timestamp: timestamp
      })
    });

    const data = await response.json();
    const statusEl = document.getElementById('emailStatus');

    if (data.success) {
      statusEl.className = 'quiz-result__status quiz-result__status--success';
      statusEl.innerHTML = '✅ Az eredmény sikeresen elküldve az oktatónak!';
    } else {
      statusEl.className = 'quiz-result__status quiz-result__status--error';
      statusEl.innerHTML = '⚠️ Az eredmény elküldése nem sikerült. Kérlek, jelezd az oktatónak!';
    }
  } catch (err) {
    const statusEl = document.getElementById('emailStatus');
    statusEl.className = 'quiz-result__status quiz-result__status--error';
    statusEl.innerHTML = '⚠️ Hálózati hiba. Az eredmény elküldése nem sikerült.';
  }
}

/* ====== RESET QUIZ ====== */
function resetQuiz() {
  currentQuestion = 0;
  answers = [];
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizResult').innerHTML = '';
  document.getElementById('quizIntro').classList.remove('hidden');
  document.getElementById('quizProgress').style.display = 'none';
  document.getElementById('studentName').value = '';
  document.getElementById('neptunCode').value = '';
}

/* ====== MOBILE NAV CLOSE ====== */
document.querySelectorAll('.header__nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.header__nav').classList.remove('active');
  });
});
