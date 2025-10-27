/* --- メインスクリプト --- */
document.addEventListener('DOMContentLoaded', function() {

  /* --- 1. ポートフォリオのフィルター機能 --- */
  const filterButtons = document.querySelectorAll('.filter-button');
  const gridItems = document.querySelectorAll('.grid-item');

  if (filterButtons.length > 0 && gridItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        gridItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --- 2. クイズの採点機能 --- */
  const checkAnswersButton = document.getElementById('check-answers-btn');
  if (checkAnswersButton) {
    let correctAnswers = {};
    const pageTitleElement = document.querySelector('head title'); // title要素を取得
    const pageTitle = pageTitleElement ? pageTitleElement.innerText : ''; // 要素があればテキスト取得

    // ページタイトルに基づいて正解データを設定
    if (pageTitle.includes('哲学クイズ')) {
      correctAnswers = {
        q1: '3', q2: '3', q3: '4', q4: '3', q5: '1', q6: '2', q7: '2', q8: '4', q9: '1', q10: '1',
        q11: '3', q12: '1', q13: '4', q14: '3', q15: '2', q16: '2', q17: '1', q18: '2', q19: '2', q20: '3'
      };
    } else if (pageTitle.includes('香港問題クイズ')) {
      correctAnswers = {
        q1: '3', q2: '2', q3: '3', q4: '4', q5: '2', q6: '3', q7: '3', q8: '3', q9: '2', q10: '2',
        q11: '2', q12: '3', q13: '1', q14: '2', q15: '2'
      };
    } else if (pageTitle.includes('ロヒンギャ問題クイズ')) {
      correctAnswers = {
        q1: '4', q2: '1', q3: '2', q4: '2', q5: '3', q6: '1', q7: '3', q8: '2', q9: '2', q10: '1',
        q11: '3', q12: '2', q13: '2', q14: '1', q15: '2'
      };
    } else if (pageTitle.includes('センター試験 文法語法クイズ')) { // 新しいクイズのタイトル
      correctAnswers = {
        q1: '2', q2: '3', q3: '2', q4: '1', q5: '3', q6: '2', q7: '3', q8: '2', q9: '1', q10: '1',
        q11: '1', q12: '2', q13: '1', q14: '2', q15: '2', q16: '4', q17: '4', q18: '2', q19: '1', q20: '1',
        q21: '4', q22: '2', q23: '3', q24: '1', q25: '1', q26: '3', q27: '4', q28: '3', q29: '2', q30: '3',
        q31: '3', q32: '3', q33: '4', q34: '4', q35: '2', q36: '4', q37: '4', q38: '4', q39: '4', q40: '4',
        q41: '3', q42: '3', q43: '3', q44: '3', q45: '3', q46: '3', q47: '1', q48: '2', q49: '1', q50: '1',
        q51: '1', q52: '3', q53: '3', q54: '3', q55: '2', q56: '3', q57: '4', q58: '2', q59: '2', q60: '1',
        q61: '3', q62: '1', q63: '4', q64: '3', q65: '3'
      };
    }

    // 「採点する」ボタンにイベントを登録 (正解データがあれば)
    if (Object.keys(correctAnswers).length > 0) {
      checkAnswersButton.addEventListener('click', () => {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        const answerElements = document.querySelectorAll('.quiz-answer');
        answerElements.forEach(el => { el.style.display = 'block'; });

        for (const questionId in correctAnswers) {
          const questionElement = document.getElementById(questionId);
          const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
          if (!questionElement) continue;
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
        const resultElement = document.getElementById('quiz-result');
        resultElement.innerHTML = `<h2>結果: ${totalQuestions}問中 ${score}問 正解です！</h2>`;
        resultElement.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}); // End of DOMContentLoaded
