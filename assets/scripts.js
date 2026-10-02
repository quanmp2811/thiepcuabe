/* ===== Sửa nội dung thư ở đây ===== */
const LETTER = {
  greet: "Chúc mừng sinh nhật anh",
  greetIcon: "❤️", // nằm cùng dòng với lời chào

  paragraphs: [
    "Mới chốc mà chúng ta đã gặp nhau được 4 năm rồi. Nghĩ lại cũng thấy lạ, 4 năm không phải là một khoảng thời gian ngắn, vậy mà em vẫn nhớ những chuyện từ ngày đầu chúng ta gặp nhau như thể mới hôm qua.",
    "Cảm ơn anh vì suốt 4 năm qua vẫn luôn ở bên em. Cảm ơn vì những lúc em vui có anh cùng vui, những lúc em buồn hay mệt mỏi vẫn có anh ở đó để nghe em kể đủ thứ chuyện. Có thể em không phải lúc nào cũng nói ra, nhưng em thật sự rất trân trọng việc anh chưa từng rời đi, vẫn kiên nhẫn và ở bên cạnh em theo cách của anh.",
    "Em nghĩ điều đáng quý nhất của một tình bạn không phải là lúc nào cũng phải nói chuyện hay lúc nào cũng ở cạnh nhau, mà là dù thời gian có trôi, cuộc sống có thay đổi thì vẫn biết rằng mình có một người luôn ở đó.",
    "Tuổi mới, em không chúc anh những điều quá lớn lao. Chỉ mong anh luôn bình an, vui vẻ, làm được những điều anh muốn và gặp được thật nhiều người tốt. Còn tình bạn của chúng ta, em mong dù sau này mỗi đứa có cuộc sống riêng, bận rộn với những điều riêng thì anh vẫn sẽ ở đó, và em cũng vậy.",
    "Cảm ơn anh vì đã xuất hiện trong tuổi trẻ của em, và cảm ơn vì 4 năm qua đã không rời đi. Mong rằng 4 năm, 8 năm hay thật nhiều năm sau nữa, chúng ta vẫn có thể ngồi cạnh nhau và nhắc lại rằng: “Ngày đấy mình đã thân nhau lâu thật rồi nhỉ.” ❤️",
    "Chúc anh sinh nhật vui vẻ. Tuổi mới thật nhiều niềm vui và thật hạnh phúc nhé! 🫶",
  ],
  sign: "", // để trống nếu không cần chữ ký, ví dụ: "Em 🫶"
};

// Ảnh trong khung polaroid, tự đổi lần lượt
const imageList = [
  "./assets/a1.jpg",
  "./assets/a2.jpg",
  "./assets/a3.jpg",
  "./assets/a4.jpg",
  "./assets/a5.jpg",
];

// Hình thư / quà rơi
const letterImages = [
  "./assets/letters.png",
  "./assets/q3.png",
  "./assets/h1.png",
  "./assets/h3.png",
  "./assets/t2.png",
  "./assets/t5.png",
];
/* ================================== */

// Hoa mọc ở đáy màn hình: chia đều từ mép trái sang mép phải để không bị hở
const FLOWER_COUNT = 20;
function createFlower(i) {
  const flower = document.createElement("img");
  const size = Math.random() * 40 + 40;
  const slot = 100 / FLOWER_COUNT;
  flower.src = "./assets/hoa1.png";
  flower.classList.add("flower");
  flower.style.position = "fixed";
  flower.style.bottom = "0";
  flower.style.left = `calc(${i * slot + Math.random() * slot}vw - ${size / 2}px)`;
  flower.style.width = size + "px";
  flower.style.pointerEvents = "none";
  flower.alt = "";
  // lắc lư bằng CSS (nhẹ hơn chạy JS mỗi khung hình)
  const dur = 3 + Math.random() * 4;
  flower.style.setProperty("--amp", 5 + Math.random() * 8 + "deg");
  flower.style.setProperty("--dur", dur + "s");
  flower.style.setProperty("--delay", -Math.random() * dur + "s");
  document.body.appendChild(flower);
}

for (let i = 0; i < FLOWER_COUNT; i++) {
  setTimeout(() => createFlower(i), i * 200);
}

// Thư / quà rơi (chỉ để trang trí)
function createFallingLetter() {
  if (document.hidden) return;
  const letter = document.createElement("img");
  letter.src = letterImages[Math.floor(Math.random() * letterImages.length)];
  letter.alt = "";
  letter.classList.add("falling-letter");
  letter.style.left = Math.random() * (window.innerWidth - 50) + "px";
  if (window.innerWidth <= 768) {
    letter.style.width = "40px";
    letter.style.animationDuration = "9s";
  }
  document.body.appendChild(letter);
  letter.addEventListener("animationend", () => letter.remove());
}

setInterval(createFallingLetter, 1000);

// Nội dung thư
// Dải ảnh kiểu cuộn phim ở đầu thư (lặp 2 lần để chạy vòng liền mạch)
const filmFrames = imageList
  .map((src) => `<div class="film-frame"><img src="${src}" alt=""></div>`)
  .join("");

const letterBody = document.getElementById("letterBody");
const film = document.createElement("div");
film.className = "film";
film.innerHTML = `<div class="film-track">${filmFrames}${filmFrames}</div>`;
letterBody.before(film);

// chữ trong thư bắt đầu ngay dưới dải ảnh
function fitFilm() {
  letterBody.style.setProperty("--film-h", film.offsetHeight + "px");
}
fitFilm();
window.addEventListener("resize", fitFilm);
if (window.ResizeObserver) new ResizeObserver(fitFilm).observe(film);

letterBody.innerHTML =
  `<p class="greet">${LETTER.greet}` +
  // &nbsp; giữ trái tim dính với chữ cuối, không bị rớt xuống dòng một mình
  (LETTER.greetIcon ? `&nbsp;<span class="greet-icon">${LETTER.greetIcon}</span>` : "") +
  `</p>` +
  LETTER.paragraphs.map((p) => `<p>${p}</p>`).join("") +
  (LETTER.sign ? `<p class="sign">${LETTER.sign}</p>` : "") +
  `<img class="end-img" src="./assets/h3.png" alt="">`;

// Mở thư và đọc thư chạy bằng CSS (checkbox + label); JS thêm nhạc, vuốt và đổi ảnh
const openChk = document.getElementById("openChk");
const readChk = document.getElementById("readChk");
const player = document.getElementById("player");
let openedAt = 0;

function playMusic() {
  if (player.paused) player.play().catch(() => {});
}
document.addEventListener("pointerdown", playMusic);
document.addEventListener("touchstart", playMusic, { passive: true });

// Tạm dừng nhạc khi ẩn tab / tắt màn hình, phát tiếp khi quay lại
let pausedByHide = false;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (!player.paused) {
      player.pause();
      pausedByHide = true;
    }
  } else if (pausedByHide) {
    pausedByHide = false;
    player.play().catch(() => {});
  }
});

openChk.addEventListener("change", () => {
  if (!openChk.checked) return;
  openChk.disabled = true;
  openedAt = Date.now();
});
readChk.addEventListener("change", () => {
  if (readChk.checked) readChk.disabled = true;
});

function readLetter() {
  if (!openChk.checked || readChk.checked || Date.now() - openedAt < 1500) return;
  readChk.checked = true;
  readChk.disabled = true;
}

// vuốt lên trên điện thoại
const scene = document.getElementById("scene");
let y0 = null;
scene.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
scene.addEventListener("touchend", (e) => {
  if (y0 === null) return;
  const dy = y0 - e.changedTouches[0].clientY;
  y0 = null;
  if (dy > 40) readLetter();
});
// cuộn chuột / phím mũi tên trên máy tính
window.addEventListener("wheel", (e) => { if (e.deltaY > 15) readLetter(); }, { passive: true });
window.addEventListener("keydown", (e) => { if (e.key === "ArrowUp" || e.key === "PageUp") readLetter(); });

// Khung polaroid đổi ảnh mỗi 3 giây
const polaroidImg = document.getElementById("polaroidImg");
let imgIndex = 0;
setInterval(() => {
  if (!readChk.checked) return;
  imgIndex = (imgIndex + 1) % imageList.length;
  polaroidImg.style.opacity = 0;
  setTimeout(() => {
    polaroidImg.src = imageList[imgIndex];
    polaroidImg.style.opacity = 1;
  }, 600);
}, 3000);
