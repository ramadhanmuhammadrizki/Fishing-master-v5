// Cart System
let cartCount = 0;
let currentDiscount = 0;
let voucherApplied = false;

// Game Data
const gameData = {
    mlbb: {
        name: 'Mobile Legends',
        nominals: [
            { value: 50, price: 5000 },
            { value: 100, price: 10000 },
            { value: 250, price: 25000 },
            { value: 500, price: 50000 },
            { value: 1000, price: 100000 }
        ]
    },
    ff: {
        name: 'Free Fire',
        nominals: [
            { value: 70, price: 1000 },
            { value: 140, price: 2000 },
            { value: 355, price: 5000 },
            { value: 720, price: 10000 },
            { value: 1450, price: 20000 }
        ]
    },
    pubg: {
        name: 'PUBG Mobile',
        nominals: [
            { value: 60, price: 10000 },
            { value: 300, price: 50000 },
            { value: 600, price: 100000 },
            { value: 1500, price: 250000 }
        ]
    },
    valo: {
        name: 'Valorant',
        nominals: [
            { value: 475, price: 15000 },
            { value: 1000, price: 30000 },
            { value: 2050, price: 60000 },
            { value: 3650, price: 100000 }
        ]
    },
    genshin: {
        name: 'Genshin Impact',
        nominals: [
            { value: 60, price: 12000 },
            { value: 300, price: 60000 },
            { value: 980, price: 200000 },
            { value: 1980, price: 400000 }
        ]
    },
    codm: {
        name: 'COD Mobile',
        nominals: [
            { value: 80, price: 8000 },
            { value: 400, price: 40000 },
            { value: 800, price: 80000 },
            { value: 2000, price: 200000 }
        ]
    }
};

let currentGame = null;

// Countdown Timer
function startCountdown() {
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    const timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                    document.getElementById('hours').textContent = '00';
                    document.getElementById('minutes').textContent = '00';
                    document.getElementById('seconds').textContent = '00';
                }
            }
        }
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Voucher Function
function applyVoucher() {
    const voucherCode = document.getElementById('voucherCode').value;
    const messageEl = document.getElementById('voucherMessage');
    
    if (voucherCode === 'RizkyggGaming' && !voucherApplied) {
        currentDiscount = 20;
        voucherApplied = true;
        messageEl.innerHTML = '<i class="fas fa-check-circle"></i> Voucher berhasil digunakan! Diskon 20%';
        messageEl.style.color = '#27ae60';
        
        // Update price if modal is open
        if (document.getElementById('orderModal').style.display === 'block') {
            updatePrice();
        }
    } else if (voucherApplied) {
        messageEl.innerHTML = '<i class="fas fa-info-circle"></i> Voucher sudah digunakan sebelumnya';
        messageEl.style.color = '#f39c12';
    } else {
        messageEl.innerHTML = '<i class="fas fa-times-circle"></i> Kode voucher tidak valid';
        messageEl.style.color = '#e74c3c';
    }
}

// Game Detail Modal
function showGameDetail(game) {
    currentGame = game;
    const modal = document.getElementById('orderModal');
    const gameTitle = document.getElementById('modalGameTitle');
    const nominalSelect = document.getElementById('nominal');
    
    gameTitle.textContent = `Pesan ${gameData[game].name}`;
    
    // Populate nominals
    nominalSelect.innerHTML = '<option value="">Pilih nominal</option>';
    gameData[game].nominals.forEach(nom => {
        const option = document.createElement('option');
        option.value = nom.price;
        option.textContent = `${nom.value} ${game === 'mlbb' ? 'Diamonds' : 
                                     game === 'ff' ? 'Diamonds' :
                                     game === 'pubg' ? 'UC' :
                                     game === 'valo' ? 'VP' :
                                     game === 'genshin' ? 'Crystals' : 'CP'} - Rp ${nom.price.toLocaleString()}`;
        nominalSelect.appendChild(option);
    });
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Update Price
function updatePrice() {
    const nominal = document.getElementById('nominal');
    const originalPriceEl = document.getElementById('originalPrice');
    const discountAmountEl = document.getElementById('discountAmount');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (nominal.value) {
        const price = parseInt(nominal.value);
        const discount = Math.floor(price * (currentDiscount / 100));
        const total = price - discount;
        
        originalPriceEl.textContent = `Rp ${price.toLocaleString()}`;
        discountAmountEl.textContent = `-Rp ${discount.toLocaleString()}`;
        totalPriceEl.textContent = `Rp ${total.toLocaleString()}`;
    } else {
        originalPriceEl.textContent = 'Rp 0';
        discountAmountEl.textContent = '-Rp 0';
        totalPriceEl.textContent = 'Rp 0';
    }
}

// Payment Processing
function processPayment() {
    const gameId = document.getElementById('gameId').value;
    const nominal = document.getElementById('nominal');
    const payment = document.querySelector('input[name="payment"]:checked');
    
    if (!gameId) {
        alert('Masukkan ID game terlebih dahulu!');
        return;
    }
    
    if (!nominal.value) {
        alert('Pilih nominal terlebih dahulu!');
        return;
    }
    
    if (!payment) {
        alert('Pilih metode pembayaran!');
        return;
    }
    
    // Calculate total
    const price = parseInt(nominal.value);
    const discount = Math.floor(price * (currentDiscount / 100));
    const total = price - discount;
    
    // Simulate payment process
    alert(`✅ Pesanan berhasil dibuat!\n\n` +
          `Game: ${gameData[currentGame].name}\n` +
          `ID: ${gameId}\n` +
          `Total Bayar: Rp ${total.toLocaleString()}\n` +
          `Metode: ${payment.value.toUpperCase()}\n\n` +
          `Silakan selesaikan pembayaran.`);
    
    // Add to cart
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    
    closeModal();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Active State
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    
    // Nominal change listener
    document.getElementById('nominal').addEventListener('change', updatePrice);
    
    console.log('🎮 TopUp Master - Created by RIZKY');
    console.log('💝 Gunakan kode: RizkyggGaming untuk diskon 20%!');
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}