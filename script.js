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
    const pageTitleElement = document.querySelector('head title');
    const pageTitle = pageTitleElement ? pageTitleElement.innerText : '';

    // ページタイトルに基づいて正解データを設定
    if (pageTitle.includes('哲学クイズ')) {
      correctAnswers = { /* ... 哲学クイズの答え ... */
        q1: '3', q2: '3', q3: '4', q4: '3', q5: '1', q6: '2', q7: '2', q8: '4', q9: '1', q10: '1',
        q11: '3', q12: '1', q13: '4', q14: '3', q15: '2', q16: '2', q17: '1', q18: '2', q19: '2', q20: '3'
      };
    } else if (pageTitle.includes('香港問題クイズ')) {
      correctAnswers = { /* ... 香港クイズの答え ... */
        q1: '3', q2: '2', q3: '3', q4: '4', q5: '2', q6: '3', q7: '3', q8: '3', q9: '2', q10: '2',
        q11: '2', q12: '3', q13: '1', q14: '2', q15: '2'
      };
    } else if (pageTitle.includes('ロヒンギャ問題クイズ')) {
      correctAnswers = { /* ... ロヒンギャクイズの答え ... */
        q1: '4', q2: '1', q3: '2', q4: '2', q5: '3', q6: '1', q7: '3', q8: '2', q9: '2', q10: '1',
        q11: '3', q12: '2', q13: '2', q14: '1', q15: '2'
      };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1990-1993')) {
       correctAnswers = { /* ... 90-93年の答え ... */
        q1: '2', q2: '3', q3: '2', q4: '1', q5: '3', q6: '2', q7: '3', q8: '2', q9: '1', q10: '1',
        q11: '1', q12: '2', q13: '1', q14: '2', q15: '2', q16: '4', q17: '4', q18: '2', q19: '1', q20: '1',
        q21: '4', q22: '2', q23: '3', q24: '1', q25: '1', q26: '3', q27: '4', q28: '3', q29: '2', q30: '3',
        q31: '3', q32: '3', q33: '4', q34: '4', q35: '2', q36: '4', q37: '4', q38: '4', q39: '4', q40: '4',
        q41: '3', q42: '3', q43: '3', q44: '3', q45: '3', q46: '3', q47: '1', q48: '2', q49: '1', q50: '1',
        q51: '1', q52: '3', q53: '3', q54: '3', q55: '2', q56: '3', q57: '4', q58: '2', q59: '2', q60: '1',
        q61: '3', q62: '1', q63: '4', q64: '3', q65: '3'
      };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1994-1997')) {
      correctAnswers = { /* ... 94-97年の答え ... */
        q66: '4', q67: '1', q68: '3', q69: '2', q70: '4', q71: '3', q72: '2', q73: '3', q74: '3', q75: '4',
        q76: '2', q77: '2', q78: '1', q79: '4', q80: '4', q81: '2', q82: '2', q83: '3', q84: '3', q85: '4',
        q86: '4', q87: '3', q88: '4', q89: '3', q90: '4', q91: '2', q92: '3', q93: '3', q94: '2', q95: '3',
        q96: '2', q97: '3', q98: '2', q99: '4', q100: '1', q101: '3', q102: '3', q103: '2', q104: '2', q105: '3',
        q106: '2', q107: '4', q108: '2', q109: '2', q110: '1', q111: '2', q112: '4', q113: '2', q114: '3', q115: '3',
        q116: '4', q117: '3', q118: '1', q119: '4', q120: '2', q121: '1', q122: '3', q123: '3', q124: '1', q125: '3',
        q126: '1'
      };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1998-2001')) { // ★ 新しく追加
      correctAnswers = { // 1998-2001 (q130-q177) ※元の番号は127-174
        q130: '3', q131: '2', q132: '3', q133: '1', q134: '3', q135: '2', q136: '3', q137: '1', q138: '1', q139: '2',
        q140: '1', q141: '2', q142: '3', q143: '2', q144: '1', q145: '2', q146: '1', q147: '1', q148: '3', q149: '3',
        q150: '1', q151: '4', q152: '3', q153: '2', q154: '1', q155: '4', q156: '1', q157: '1', q158: '1', q159: '3',
        q160: '2', q161: '2', q162: '1', q163: '4', q164: '1', q165: '2', q166: '2', q167: '1', q168: '2', q169: '4',
        q170: '1', q171: '3', q172: '2', q173: '3', q174: '4', q175: '2', q176: '1', q177: '1'
        // q178-q181 は元データに無し
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
