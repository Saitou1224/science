'use strict';

(() => {
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = [
        {q: '酸素', c: ['o2', 'co2', 'o3', 'o']},
        {q: '過酸化水素', c: ['h2o2', 'h2o', 'h2o3', 'h2o4']},
        {q: '二酸化マンガン', c: ['mno2', 'mno3', 'mno4', 'mno']},
        {q: '二酸化炭素', c: ['co2', 'o2', 'co']},
        {q: '塩酸(塩化水素)', c: ['hcl', 'hcl2', 'hcl3']},
        {q: '炭酸カルシウム', c: ['caco3', 'caco2', 'caco']},
        {q: 'アンモニア', c: ['nh3', 'nh2', 'nh4']},
        {q: '塩化アンモニウム', c: ['nh4cl', 'nh3cl', 'nh2cl']},
        // {q: '水酸化カルシウム', c: ['ca(oh)2', '○']},
        {q: '水素', c: ['h2', 'h3', 'h4']},
        {q: '窒素', c: ['n2', 'n3', 'n4']},
        // {q: '塩素', c: ['Cl2', '○']},
        // {q: '塩化ナトリウム', c: ['NaCl', '○']},
        // {q: '硝酸カリウム', c: ['KNO3', '○']},
        // {q: 'エタノール', c: ['C2H5OH', '○']},
        // {q: '炭酸水素ナトリウム', c: ['NaHCO3', '○']},
        // {q: '炭酸ナトリウム', c: ['NA2CO3', '○']},
        // {q: '酸化銀', c: ['Ag2O', '○']},
        // {q: '水', c: ['H2O', '○']},
        // {q: '水酸化ナトリウム', c: ['NaOH', '○']},
        // {q: '硫化鉄', c: ['FeS', '○']},
    ];
    let currentNum = 0;
    let isAnswered;
    let score = 0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }
        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.textContent = choice;
            img.src = 'img/' + choice + '.svg';
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
            li.appendChild(img);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'Show Score';
        }
    }
    
    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });
})();
