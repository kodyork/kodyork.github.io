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
