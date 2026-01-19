// ========================================
// LINDA ESTÉTICA - JAVASCRIPT
// ========================================

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Fechar menu ao clicar em um link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(button) {
        button.addEventListener('click', function() {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            const isOpen = !answer.classList.contains('max-h-0');
            
            // Fechar todas as outras FAQs
            document.querySelectorAll('.faq-answer').forEach(function(otherAnswer) {
                if (otherAnswer !== answer) {
                    otherAnswer.classList.remove('max-h-96');
                    otherAnswer.classList.add('max-h-0');
                    const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
                    otherIcon.classList.remove('rotate-180');
                }
            });
            
            // Toggle FAQ atual
            if (isOpen) {
                answer.classList.remove('max-h-96');
                answer.classList.add('max-h-0');
                icon.classList.remove('rotate-180');
            } else {
                answer.classList.remove('max-h-0');
                answer.classList.add('max-h-96');
                icon.classList.add('rotate-180');
            }
        });
    });
    
    // Abrir primeira FAQ por padrão
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
    
    // ========================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // HEADER SCROLL EFFECT (OPCIONAL)
    // ========================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Adicionar sombra no scroll
        if (currentScroll > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // ANIMAÇÃO DE FADE IN AO SCROLL (OPCIONAL)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ter fade in
    const animateElements = document.querySelectorAll('.service-card, .feature-item');
    animateElements.forEach(function(el) {
        observer.observe(el);
    });
    
});

// ========================================
// FORMULÁRIO DE CONTATO (FORMSPREE)
// ========================================
// O formulário usa Formspree/FormSubmit
// Não precisa de JavaScript adicional
// O próprio serviço cuida do envio

// ========================================
// MÁSCARA DE TELEFONE
// ========================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// ========================================
// FORMULÁRIO DE CONTATO (SE IMPLEMENTAR)
// ========================================
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    console.log('Dados do formulário:', data);
    
    // Aqui você pode fazer requisição para API backend
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    
    // Por enquanto, apenas mostra mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}
