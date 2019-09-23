'use strict'
{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const next_btn = document.getElementById('next_btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: '漫画「サザエさん」の主人公サザエさんの結婚前の職業はなに?', c: ['出版社の記者', 'バスガイド', 'スーパーのレジ']},
        {q: '古代エジプトで「守護神」として最も多くの人に崇拝されていた動物はなに？', c: ['猫', '豚', '犬']},
        {q: '次のうち、イタリアが発祥の食べ物はなに？', c: ['カルパッチョ', 'ドリア', 'プリン・ア・ラモード']},
        {q: '日本の郵便ポストは昔は赤色ではありませんでした。さて、何色でしょうか？', c: ['黒', '緑', '青']}
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

        if(li.textContent === quizSet[currentNum].c[0]) {
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
        console.log(quizSet[currentNum].c)

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

        if(currentNum === quizSet.length - 1) {
            next_btn.textContent = "スコアを確認する";
        }
    }
    setQuiz();

    next_btn.addEventListener('click', () => {
        if (next_btn.classList.contains('disabled')) {
            return;
        }

        next_btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1 ) {
            if( score >= 3) {
                scoreLabel.textContent = `おめでとうございます！${quizSet.length} 問中 ${score} 問正解です！`
            }else if (score == 2) {
                scoreLabel.textContent = `もうちょっと！${quizSet.length} 問中 ${score} 問正解です！`
            }else {
                scoreLabel.textContent = `残念...。${quizSet.length} 問中 ${score} 問正解です！`
            }
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    })
}