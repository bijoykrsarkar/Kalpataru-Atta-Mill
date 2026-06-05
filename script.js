// =============================================
// KALPATARU ATTA MILL - JAVASCRIPT
// =============================================

// --- MOBILE MENU TOGGLE ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show-menu');
            const isExpanded = navLinks.classList.contains('show-menu');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show-menu');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            });
        });
    }

    // --- SCROLL REVEAL ANIMATION ---
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach((element) => {
            const top = element.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Trigger once on load

    // --- MODAL FUNCTIONALITY ---
    setupModal();
});

function setupModal() {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(type) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    let content = '';

    switch(type) {
        case 'privacy':
            content = `
                <h2>Privacy Policy</h2>
                <h4>1. Data Collection Framework</h4>
                <p>In full compliance with the Information Technology Act, 2000, <strong>Kalpataru Atta Mill</strong> collects essential personal identification data including names, contact phone numbers, and physical shipping addresses to facilitate seamless business functions.</p>
                
                <h4>2. Core Purpose of Processing</h4>
                <p>The information we collect is strictly applied to process orders, arrange mill deliveries across local Siliguri routes, and communicate product status notifications through the WhatsApp interface.</p>
                
                <h4>3. Data Security & Storage Controls</h4>
                <p>Your records are secured with zero exposure to unverified staff. We enforce strict internal protocols ensuring your details are never exposed, traded, or shared with third-party marketing companies.</p>
                
                <h4>4. Cookie and Track Usage</h4>
                <p>Our website utilizes lightweight, non-invasive technical cookies solely to improve browsing speeds and gather anonymous operational performance data.</p>
                
                <h4>5. User Rights and Erasure</h4>
                <p>Under Indian digital data security mandates, all consumers retain absolute transparency options regarding their files. You may submit requests to modify, view, or completely erase your registration records.</p>
            `;
            break;

        case 'terms':
            content = `
                <h2>Terms & Conditions</h2>
                <h4>1. Absolute Purity Guarantees</h4>
                <p><strong>Kalpataru Atta Mill</strong> binds our operations to strict purity specifications. We declare our production lots entirely free from commercial starch agents, dye substances, or adulterants.</p>
                
                <h4>2. WhatsApp Communication</h4>
                <p>Our digital infrastructure leverages WhatsApp messaging to coordinate orders. By submitting an order query, you acknowledge that prices and logistics details are finalized through chat streams.</p>
                
                <h4>3. Local Shipping and Delivery</h4>
                <p>Orders are dispatched within twenty-four to forty-eight hours. Distribution remains limited to Siliguri and adjacent zones based on current logistics capabilities.</p>
                
                <h4>4. Payment Protocols</h4>
                <p>We accept Cash on Delivery (COD) and UPI online payment. Goods are transferred exclusively upon complete payment verification.</p>
                
                <h4>5. Transit Damage Accountability</h4>
                <p>Replacement considerations are exclusively for damaged packages. Any discrepancies must be submitted within twenty-four hours with photographic evidence.</p>
                
                <h4>6. Legal Jurisdiction</h4>
                <p>These agreements remain defined under Indian business laws. Any disputes remain restricted to courts in Siliguri, West Bengal.</p>
            `;
            break;

        case 'refund':
            content = `
                <h2>Refund & Cancellation Policy</h2>
                <h4>1. Cancellations</h4>
                <p>Orders can be cancelled prior to dispatch. Once dispatched, cancellations are not permitted.</p>
                
                <h4>2. Returns & Refunds</h4>
                <p>Due to the consumable nature of spices, we only accept returns if the package arrives damaged. Please provide photographic evidence within 24 hours of delivery.</p>
                
                <h4>3. Refund Processing</h4>
                <p>Approved refunds will be processed within 5-7 business days to the original payment method.</p>
                
                <h4>4. Quality Guarantee</h4>
                <p>We guarantee 100% pure products. If you're unsatisfied with the quality, contact us within 24 hours for resolution.</p>
            `;
            break;

        default:
            return;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- SMOOTH SCROLL FOR NAVIGATION ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- FORM VALIDATION (If you add a contact form) ---
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    // Email validation
    const emailInput = formElement.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
        }
    }

    return isValid;
}

// --- LAZY LOADING FOR IMAGES ---
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// --- PAGE PERFORMANCE TRACKING ---
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// --- WHATSAPP MESSAGE TEMPLATING ---
function openWhatsAppWithMessage(productName) {
    const phoneNumber = '919474090441';
    const message = `I am interested in ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// --- ANALYTICS EVENT TRACKING (Optional - Google Analytics) ---
function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// --- ACCESSIBILITY IMPROVEMENTS ---
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal on Escape
    if (e.key === 'Escape') {
        const modal = document.getElementById('infoModal');
        if (modal && modal.style.display === 'block') {
            closeModal();
        }
    }
});

// --- NOTIFICATION SYSTEM (Optional) ---
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// --- CONSOLE LOG FOR DEBUGGING ---
console.log('Kalpataru Atta Mill Website Loaded Successfully');
console.log('Version: 2.0 (Improved)');
console.log('For support: +91 94740 90441');

window.addEventListener('load',()=>{
const c=document.getElementById('cookieConsent');
if(c && !localStorage.getItem('cookieConsent')) c.style.display='block';
});
function acceptCookies(){localStorage.setItem('cookieConsent','accepted');document.getElementById('cookieConsent').style.display='none';}
function declineCookies(){localStorage.setItem('cookieConsent','declined');document.getElementById('cookieConsent').style.display='none';}
