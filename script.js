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
          // data-category 属性がない要素は常に表示 (または必要に応じて非表示)
          const category = item.getAttribute('data-category');
          if (filter === 'all' || !category || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --- 2. クイズの個別採点機能 --- */
  const quizContainer = document.querySelector('.quiz-container');

  if (quizContainer) { // クイズページかどうかを判定

    let correctAnswers = {};
    const pageTitleElement = document.querySelector('head title');
    const pageTitle = pageTitleElement ? pageTitleElement.innerText.trim() : '';

    // ページタイトルに基づいて正解データを読み込む
    if (pageTitle.includes('哲学クイズ')) {
      correctAnswers = { /* ... 哲学 ... */ };
    } else if (pageTitle.includes('香港問題クイズ')) {
      correctAnswers = { /* ... 香港 ... */ };
    } else if (pageTitle.includes('ロヒンギャ問題クイズ')) {
      correctAnswers = { /* ... ロヒンギャ ... */ };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1990')) {
       correctAnswers = { q1:'2', q2:'3', q3:'2', q4:'1', q5:'3', q6:'2', q7:'3', q8:'2', q9:'1', q10:'1', q11:'1', q12:'2', q13:'1', q14:'2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1991')) {
       correctAnswers = { q1:'2', q2:'4', q3:'4', q4:'2', q5:'1', q6:'1', q7:'4', q8:'2', q9:'3', q10:'1', q11:'1', q12:'3', q13:'4', q14:'3', q15:'2', q16:'3', q17:'3' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1992')) {
       correctAnswers = { q1:'3', q2:'4', q3:'4', q4:'2', q5:'4', q6:'4', q7:'4', q8:'4', q9:'4', q10:'3', q11:'3', q12:'3', q13:'3', q14:'3', q15:'3', q16:'1', q17:'2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1993')) {
        correctAnswers = { q1:'1', q2:'1', q3:'1', q4:'3', q5:'3', q6:'3', q7:'2', q8:'3', q9:'4', q10:'2', q11:'2', q12:'1', q13:'3', q14:'1', q15:'4', q16:'3', q17:'3' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1994')) {
      correctAnswers = { q1:'4', q2:'1', q3:'3', q4:'2', q5:'4', q6:'3', q7:'2', q8:'3', q9:'3', q10:'4', q11:'2', q12:'2', q13:'1', q14:'4', q15:'4', q16:'2', q17:'2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1995')) {
      correctAnswers = { q1:'3', q2:'3', q3:'4', q4:'4', q5:'3', q6:'4', q7:'3', q8:'4', q9:'2', q10:'3', q11:'3', q12:'2', q13:'3', q14:'2', q15:'3' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1996')) {
      correctAnswers = { q1:'2', q2:'4', q3:'1', q4:'3', q5:'3', q6:'2', q7:'2', q8:'3', q9:'2', q10:'4', q11:'2', q12:'2', q13:'1', q14:'2', q15:'4' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1997')) {
      correctAnswers = { q1:'2', q2:'3', q3:'3', q4:'4', q5:'3', q6:'1', q7:'4', q8:'2', q9:'1', q10:'3', q11:'3', q12:'1', q13:'3', q14:'1' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1998')) {
      correctAnswers = { q1:'4', q2:'4', q3:'4', q4:'3', q5:'3', q6:'3', q7:'3', q8:'1', q9:'2', q10:'2', q11:'1', q12:'2', q13:'3', q14:'4' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 1999')) {
      correctAnswers = { q1:'3', q2:'1', q3:'2', q4:'4', q5:'1', q6:'4', q7:'4', q8:'4', q9:'3', q10:'1', q11:'4', q12:'3', q13:'1', q14:'4' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2000')) {
      correctAnswers = { q1: '3', q2: '2', q3: '2', q4: '3', q5: '1', q6: '4', q7: '1', q8: '3', q9: '1', q10: '2', q11: '2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2001')) {
      correctAnswers = { q1: '2', q2: '4', q3: '1', q4: '3', q5: '2', q6: '3', q7: '4', q8: '1', q9: '3', q10: '1' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2002')) {
      correctAnswers = { q1: '2', q2: '2', q3: '4', q4: '4', q5: '3', q6: '2', q7: '3', q8: '1', q9: '3', q10: '2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2003')) {
      correctAnswers = { q1: '4', q2: '3', q3: '1', q4: '2', q5: '3', q6: '1', q7: '1', q8: '3', q9: '4', q10: '4' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2004')) {
      correctAnswers = { q1: '4', q2: '3', q3: '3', q4: '4', q5: '1', q6: '3', q7: '4', q8: '3', q9: '3', q10: '2' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2005')) {
      correctAnswers = { q1: '1', q2: '3', q3: '1', q4: '3', q5: '1', q6: '2', q7: '3', q8: '2', q9: '2', q10: '4' };
    } else if (pageTitle.includes('センター試験 文法語法クイズ 2006')) { // ★ New
      correctAnswers = { // 2006 (q1-q10)
        q1: '3', q2: '4', q3: '1', q4: '4', q5: '1', q6: '2', q7: '2', q8: '3', q9: '1', q10: '1'
      };
    }
    // ... Add other years here ...


    // Set up event listener for individual check buttons (event delegation)
    if (Object.keys(correctAnswers).length > 0) { // Only if answers are loaded
         quizContainer.addEventListener('click', function(event) {
           if (event.target.classList.contains('check-single-answer-btn')) {
             const checkButton = event.target;
             const questionElement = checkButton.closest('.quiz-question');
             if (!questionElement) return;

             const questionId = questionElement.id;
             const selectedOption = questionElement.querySelector(`input[name="${questionId}"]:checked`);
             const answerElement = questionElement.querySelector('.quiz-answer');
             const options = questionElement.querySelectorAll(`input[name="${questionId}"]`);

             if (!selectedOption) {
               alert('Please select an answer first.');
               return;
             }

             questionElement.classList.remove('correct', 'incorrect');
             if (correctAnswers.hasOwnProperty(questionId) && selectedOption.value === correctAnswers[questionId]) {
               questionElement.classList.add('correct');
             } else {
               questionElement.classList.add('incorrect');
             }

             if (answerElement) {
               answerElement.style.display = 'block';
             }

             options.forEach(option => option.disabled = true);
             checkButton.disabled = true;
             checkButton.textContent = 'Checked';
           }
         });
    } else {
        if (quizContainer.querySelector('.check-single-answer-btn')) {
            console.error("Quiz checking function error: Correct answers not loaded. Check page title and script's if/else if conditions. Page Title:", pageTitle);
        }
    }
  } // End if (quizContainer)


  /* --- 3. 穴埋め問題（クリック表示）機能 --- */
  const articleContent = document.querySelector('.post article');
  if (articleContent) {
    articleContent.addEventListener('click', function(event) {
      if (event.target.classList.contains('blank-space') && !event.target.classList.contains('revealed')) {
        const blankSpan = event.target;
        const answer = blankSpan.getAttribute('data-answer');
        const idNum = blankSpan.getAttribute('data-id');
        if (answer) {
          blankSpan.innerHTML = `(${idNum}: <span class="answer-text">${answer}</span>)`;
          blankSpan.classList.remove('blank-space');
          blankSpan.classList.add('revealed');
        }
      }
    });
  }

}); // End of DOMContentLoaded
