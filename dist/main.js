'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const next_btn = document.getElementById('next_btn');
  const result = document.getElementById('result');
  const scoerLabel = document.querySelector('#result > p'); //result直下のpから値を取得

  const quizSet = shuffle([{
    q: '次のうちでペンギンがいない場所は?',
    c: ['北極', '南極', 'ガラパゴス諸島']
  }, {
    q: 'ウミガメはなぜ出産の際に涙を流すの？',
    c: ['体の中にある余計な塩分を出しているから', '我が子に出会えて感動しているから', '目が乾燥して痛いから']
  }, {
    q: 'カタツムリがコンクリートブロックの下によくいるのはなぜ？',
    c: ['食べているから', 'ひんやりして気持ちいから', '敵が襲ってこないから']
  }, {
    q: 'ミツバチ1匹が一生で作れる蜂蜜の量は？',
    c: ['5グラム', '50グラム', '500グラム']
  }]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      //配列の最後の要素[i]が0より大きい間、iを1ずつ減らすループ            
      const j = Math.floor(Math.random() * (i + 1)); //ランダムに選ぶ要素をjとする

      [arr[j], arr[i]] = [arr[i], arr[j]]; //最後の要素iとランダムに選んだjを入れ替える：分割代入
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
      score++; //正解したらscoreを+1
    } else {
      li.classList.add("wrong");
    }

    next_btn.classList.remove("disabled"); //回答したらdisableクラスを外す
  }

  function setQuiz() {
    isAnswered = false; //クイズの最初はまだ回答していないからfalse
    //quizSetのcurrentNum番目のqを定数questionに代入

    question.textContent = quizSet[currentNum].q; //選択肢をシャッフルする処理

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    console.log(quizSet[currentNum].c); //コンソールに表示されたデータもシャッフルされることがわかった→正解の選択肢がわからなくなる
    //スプレッド演算子→初期値の配列をそのまま渡す

    while (choices.firstChild) {
      //choicesのはじめの要素がnullになるまでの間、最初の要素を取り除く
      choices.removeChild(choices.firstChild);
    }

    shuffledChoices.forEach(choice => {
      //quizSetのcurrentNum番目のcを一つひとつ取り出してchoiceに代入
      const li = document.createElement('li'); //li要素を作成、定数liに代入

      li.textContent = choice; //liの中身に取り出されたchoiceを代入

      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li); //choicesの下にliを代入
    });

    if (currentNum === quizSet.length - 1) {
      //全て回答し終えたらtextを書き換える
      next_btn.textContent = "Show Score";
    }
  }

  setQuiz();
  next_btn.addEventListener('click', () => {
    if (next_btn.classList.contains('disabled')) {
      //disableクラスを持っているなら以降の処理をしない
      return;
    }

    next_btn.classList.add('disabled'); //disabledクラスを追加

    if (currentNum === quizSet.length - 1) {
      //最後の問題ならscoreを表示
      console.log(`Total Score: ${score} / ${quizSet.length}`);

      if (score >= 3) {
        scoerLabel.textContent = `おめでとうございます！${quizSet.length} 問中 ${score} 問正解です！`;
      } else if (score == 2) {
        scoerLabel.textContent = `惜しいです！${quizSet.length} 問中 ${score} 問正解です！`;
      } else {
        scoerLabel.textContent = `残念...${quizSet.length} 問中 ${score} 問正解です！`;
      }

      result.classList.remove('hidden'); //最後の問題ならhiddenクラスを取り除く
    } else {
      currentNum++;
      setQuiz();
    }
  });
}