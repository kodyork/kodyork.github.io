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

/* --- ここから哲学クイズ用のコードを追加 --- */

// 哲学クイズのページかどうかを判定
const checkAnswersButton = document.getElementById('check-answers-btn');
if (checkAnswersButton) {

  // 正解のデータ（キー: 質問ID, 値: 正しい選択肢のvalue）
  const correctAnswers = {
    q1: '3',
    q2: '1',
    q3: '3',
    q4: '4',
    q5: '2',
    q6: '3',
    q7: '3',
    q8: '3',
    q9: '4',
    q10: '1'
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
