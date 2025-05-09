// Splash screen logic
window.onload = function() {
    setTimeout(function() {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').classList.remove('hidden'); // Show app after splash
    }, 3000); // 3 seconds splash screen
};

// Show Doctor List when the button is clicked
document.getElementById('show-doctor-list').addEventListener('click', function() {
    document.getElementById('doctor-section').classList.toggle('hidden');
    document.getElementById('product-section').classList.add('hidden'); // Hide product list if doctor list is shown
});

// Show Product List when the button is clicked
document.getElementById('show-product-list').addEventListener('click', function() {
    document.getElementById('product-section').classList.toggle('hidden');
    document.getElementById('doctor-section').classList.add('hidden'); // Hide doctor list if product list is shown
});

let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

function selectProduct(imagePath) {
    if (!selectedProducts.includes(imagePath)) {
        selectedProducts.push(imagePath);  // maintain selection order
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }
}
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
        const imagePath = this.getAttribute('data-image'); // or from image tag inside
        selectProduct(imagePath);
    });
});
