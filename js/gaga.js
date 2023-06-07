const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const targetSize = 50; // 的のサイズ
const targetSpeed = 2; // 的の移動速度
const maxTargets = 5; // 的の最大数

let targets = []; // 的の配列
let clicks = 0;
let clickCount=5;

// ゲームの初期化
function init() {
    canvas.addEventListener('click', handleClick);
    createTargets();
    // ゲームループ開始
    requestAnimationFrame(gameLoop);
}

// クリック時の処理
function handleClick(event) {
    clickCount--;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 的をクリックしたか判定
    targets.forEach((target, index) => {
        if (
            x >= target.x - targetSize &&
            x <= target.x + targetSize &&
            y >= target.y - targetSize &&
            y <= target.y + targetSize
        ) {
            removeTarget(index);
        }
    });
    updateScore();
}

// 的を生成
function createTargets() {
    for (let i = 0; i < maxTargets; i++) {
        const x = Math.random() * (canvas.width - targetSize * 2) + targetSize;
        const y = canvas.height / 2;
        const dx = 1; //(Math.random() > 0.5 ? -1 : 1) * targetSpeed; // ランダムに左右に移動する
        targets.push({ x, y, dx });
    }
}

// 的を削除
function removeTarget(index) {
    targets.splice(index, 1);
    if(clickCount<=0){
        endGame();
    }
}

// スコアの更新
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `クリック回数: ${clickCount}`;
}
// ゲームの描画
function draw() {
    // 背景を描画
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 的を描画
    context.fillStyle = 'red';
    targets.forEach(target => {
        context.beginPath();
        context.arc(target.x, target.y, targetSize, 0, Math.PI * 2);
        context.fill();
    });
}

// ゲームのメインループ
function gameLoop() 
{
    // 的の移動
    targets.forEach(target => {
        target.x += target.dx;

        // 的が画面外に出た場合、反対側から出現する
        if (target.x + targetSize < 0) {
            target.x = canvas.width + targetSize;
        } else if (target.x - targetSize > canvas.width) {
            target.x = -targetSize;
        }
    });

    draw();
    requestAnimationFrame(gameLoop);
}

// ゲーム終了時の処理
function endGame() {
    canvas.removeEventListener('click', handleClick);
    alert('Game Over!');
}

// ページが読み込まれた時にゲームを開始する
window.onload = function () {
    init();
    updateScore();
};