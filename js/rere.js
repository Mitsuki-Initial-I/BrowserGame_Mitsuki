const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2D');
const targets = [
  { x: 50, y: 50, width: 20, height: 20 },
  { x: 100, y: 100, width: 20, height: 20 },
  { x: 150, y: 150, width: 20, height: 20 }
];

// クリック時の処理
const handleClick = (event) => {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];

    if (mouseX >= target.x && mouseX <= target.x + target.width && mouseY >= target.y && mouseY <= target.y + target.height) {
      // 的がクリックされた場合
      targets.splice(i, 1); // 的を配列から削除する
      ctx.clearRect(target.x, target.y, target.width, target.height); // 的を描画キャンバスから削除する

      // メッセージボックスを表示する
      setTimeout(() => {
        alert('的が削除されました！');
      }, 0);

      break;
    }
  }
};

canvas.addEventListener('click', handleClick);