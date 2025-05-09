const images = JSON.parse(localStorage.getItem('selectedProducts')) || [];
let currentIndex = 0;

const imgElement = document.getElementById('slide-image');
const backButton = document.getElementById('back-button');
const fullscreenButton = document.getElementById('fullscreen-button');

function showImage(index) {
  if (images.length === 0) {
    alert("No images selected.");
    window.location.href = "index.html";
    return;
  }

  currentIndex = (index + images.length) % images.length;
  const imgSrc = images[currentIndex];

  if (
    imgSrc.startsWith("http") ||
    imgSrc.startsWith("./") ||
    imgSrc.startsWith("/") ||
    imgSrc.startsWith("images/") ||
    /^[\w\-\/\.]+$/.test(imgSrc)
  ) {
    imgElement.src = imgSrc;
  } else {
    console.warn("Blocked suspicious image URL:", imgSrc);
  }
}

showImage(currentIndex);

// Swipe
let touchStartX = 0;
let touchEndX = 0;

imgElement.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

imgElement.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
}, false);

function handleGesture() {
  const dx = touchEndX - touchStartX;
  const threshold = 30;
  if (Math.abs(dx) > threshold) {
    showImage(currentIndex + (dx < 0 ? 1 : -1));
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    showImage(currentIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    showImage(currentIndex - 1);
  } else if (e.key === 'Escape' && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// Fullscreen
function toggleFullscreen() {
  const doc = document.documentElement;

  if (!document.fullscreenElement) {
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Hide all non-slide elements in fullscreen
document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;
  document.querySelectorAll('header, footer, #back-button, #fullscreen-button').forEach(el => {
    el.classList.toggle('hide', isFullscreen);
  });
});

// Back
function goBack() {
  window.location.href = "product-catalog.html";
}
