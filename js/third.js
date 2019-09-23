'use strict'
{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const next_btn = document.getElementById('next_btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: '学生がよく履く「ローファー」を日本語に訳すとどのように訳すとなに？', c: ['怠け者', '親不孝者', '寂しがり屋']},
        {q: 'ロダン作の彫刻「考える人」は何を考えている？', c: ['特に何も考えていない', '人生の意味について', '働く意味について']},
        {q: '次のうち人の名前が由来となっている食べ物はなに？', c: ['きんぴらごぼう', 'けんちん汁', 'おから']},
        {q: 'ハリセンボンの針は実際には何本？', c: ['350本', '250本', '150本']}
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;

    function shuffle(arr) {
        for(let i = arr.length - 1; i > 0; i--) {
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
            li.classList.add("correct");
            score++;
        } else {
            li.classList.add("wrong");
        }

        next_btn.classList.remove("disabled");
    }

    function setQuiz() {
        isAnswered = false;

        question.textContent = quizSet[currentNum].q;

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);

        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li);
        })

        if (currentNum === quizSet.length - 1 ) {
            next_btn.textContent = "スコアを確認する";
        }
    }
    setQuiz();

    next_btn.addEventListener('click', () => {
        if (next_btn.classList.contains('disabled')) {
            return;
        }

        next_btn.classList.add('disabled');

        if(currentNum === quizSet.length - 1 ) {
            if (score >= 3 ) {
                scoreLabel.textContent = `おめでとうございます！${quizSet.length} 問中 ${score} 問正解です！`
            } else if (score == 2) {
                scoreLabel.textContent = `もうちょっと！${quizSet.length} 問中 ${score} 問正解です！`
            } else {
                scoreLabel.textContent = `残念...。${quizSet.length} 問中 ${score} 問正解です！`
            }
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    })
}