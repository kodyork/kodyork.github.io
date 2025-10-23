/* --- メインスクリプト --- */
document.addEventListener('DOMContentLoaded', function() {

  /* --- 1. ポートフォリオのフィルター機能 --- */
  const filterButtons = document.querySelectorAll('.filter-button');
  const gridItems = document.querySelectorAll('.grid-item');

  if (filterButtons.length > 0 && gridItems.length > 0) {
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
  }

  /* --- 2. クイズの採点機能 --- */
  const checkAnswersButton = document.getElementById('check-answers-btn');
  if (checkAnswersButton) {
    // このページがクイズページであると判断

    let correctAnswers = {};
    const pageTitle = document.querySelector('h1').innerText;

    if (pageTitle.includes('哲学クイズ')) {
      // 哲学クイズの答え
      correctAnswers = {
        q1: '3', q2: '3', q3: '4', q4: '3', q5: '1',
        q6: '2', q7: '2', q8: '4', q9: '1', q10: '1',
        q11: '3', q12: '1', q13: '4', q14: '3', q15: '2',
        q16: '2', q17: '1', q18: '2', q19: '2', q20: '3'
      };
    } else if (pageTitle.includes('香港問題クイズ')) {
      // 香港クイズの答え
      correctAnswers = {
        q1: '3', q2: '2', q3: '3', q4: '4', q5: '2',
        q6: '3', q7: '3', q8: '3', q9: '2', q10: '2',
        q11: '2', q12: '3', q13: '1', q14: '2', q15: '2'
      };
    } else if (pageTitle.includes('ロヒンギャ問題クイズ')) {
      // ロヒンギャクイズの答え
      correctAnswers = {
        q1: '4', q2: '1', q3: '2', q4: '2', q5: '3',
        q6: '1', q7: '3', q8: '2', q9: '2', q10: '1',
        q11: '3', q12: '2', q13: '2', q14: '1', q15: '2'
      };
    }

    // 「採点する」ボタンにイベントを登録
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

        if (!questionElement) continue; // 念のため

        questionElement.classList.remove('correct', 'incorrect');

        if (selectedOption) {
          if (selectedOption.value === correctAnswers[questionId]) {
            score++;
            questionElement.classList.add('correct');
          } else {
            questionElement.classList.add('incorrect');
          }
        } else {
          questionElement.classList.add('incorrect');
        }
      }

      // 結果を表示
      const resultElement = document.getElementById('quiz-result');
      resultElement.innerHTML = `<h2>結果: ${totalQuestions}問中 ${score}問 正解です！</h2>`;
      resultElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

}); // End of DOMContentLoaded
