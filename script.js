document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const gridItems = document.querySelectorAll('.grid-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // すべてのボタンからactiveクラスを削除
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // クリックされたボタンにactiveクラスを追加
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      gridItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block'; // 表示する
        } else {
          item.style.display = 'none'; // 非表示にする
        }
      });
    });
  });
});

/* --- 哲学クイズのコード --- */

// 哲学クイズのページ（philosophy.html）でのみ実行
if (document.getElementById('check-answers-btn')) {
  initializeQuiz();
}

function initializeQuiz() {
  const checkAnswersButton = document.getElementById('check-answers-btn');

  // 正解のデータ（問1〜20）
  const correctAnswers = {
    q1: '3',
    q2: '3',
    q3: '4',
    q4: '3',
    q5: '1',
    q6: '2',
    q7: '2',
    q8: '4',
    q9: '1',
    q10: '1',
    q11: '3',
    q12: '1',
    q13: '4',
    q14: '3',
    q15: '2',
    q16: '2',
    q17: '1',
    q18: '2',
    q19: '2',
    q20: '3'
  };

  // 「採点する」ボタンがクリックされた時の処理
  checkAnswersButton.addEventListener('click', () => {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // 全ての答えの表示エリアを取得して表示する
    const answerElements = document.querySelectorAll('.quiz-answer');
    answerElements.forEach(el => {
      el.style.display = 'block';
    });

    // 各質問をチェック
    for (const questionId in correctAnswers) {
      const questionElement = document.getElementById(questionId);
      const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);

      // 古い正解・不正解のスタイルをリセット
      questionElement.classList.remove('correct', 'incorrect');

      if (selectedOption) {
        // 選択肢が選ばれている場合
        if (selectedOption.value === correctAnswers[questionId]) {
          // 正解
          score++;
          questionElement.classList.add('correct');
        } else {
          // 不正解
          questionElement.classList.add('incorrect');
        }
      } else {
        // 未回答の場合
        questionElement.classList.add('incorrect');
      }
    }

    // 結果を表示
    const resultElement = document.getElementById('quiz-result');
    resultElement.innerHTML = `<h2>結果: ${totalQuestions}問中 ${score}問 正解です！</h2>`;
    // 結果表示エリアまでスクロール
    resultElement.scrollIntoView({ behavior: 'smooth' });
  });
}
