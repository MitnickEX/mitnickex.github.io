// ==============================
// 页面加载完成后执行
// ==============================
document.addEventListener('DOMContentLoaded', function() {
  // 初始化粒子背景
  initParticles();

  // 初始化滚动动画
  initScrollAnimations();

  // 初始化平滑滚动
  initSmoothScroll();

  // 初始化导航栏滚动效果
  initNavbarScroll();

  // 初始化打字效果（可选）
  initTypingEffect();

  // 添加滚动进度条
  initScrollProgress();
});

// ==============================
// 粒子背景效果
// ==============================
function initParticles() {
  // 创建粒子容器
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles-js';
  document.body.insertBefore(particlesContainer, document.body.firstChild);

  // 配置粒子效果
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#00f5ff", "#8a2be2", "#ffffff"]
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00f5ff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
}

// ==============================
// 滚动动画效果
// ==============================
function initScrollAnimations() {
  // 为所有需要动画的元素添加fade-in类
  const animatedElements = document.querySelectorAll('.glass-card, .section-header, .hero-text, .hero-visual');

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
  });

  // 观察元素是否进入视口
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// ==============================
// 平滑滚动
// ==============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // 获取导航栏高度
        const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==============================
// 导航栏滚动效果
// ==============================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(20, 26, 40, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(20, 26, 40, 0.8)';
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    }

    lastScrollTop = scrollTop;
  });
}

// ==============================
// 打字效果
// ==============================
function initTypingEffect() {
  const subtitleElement = document.querySelector('.subtitle');
  if (!subtitleElement) return;

  const originalText = subtitleElement.textContent;
  const texts = [
    "测试工程师 · 摄影爱好者 · 技术探索者",
    "专注软件质量保障 · 热爱摄影与旅行",
    "在这里分享技术见解与生活感悟"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      subtitleElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitleElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // 暂停2秒
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // 暂停0.5秒
    }

    setTimeout(type, typeSpeed);
  }

  // 页面加载完成后3秒开始打字效果
  setTimeout(type, 3000);
}

// ==============================
// 滚动进度条
// ==============================
function initScrollProgress() {
  // 创建进度条元素
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00f5ff 0%, #8a2be2 100%);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ==============================
// 3D卡片悬停效果
// ==============================
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - cardCenterX;
    const deltaY = e.clientY - cardCenterY;

    // 只对鼠标附近的卡片应用效果
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance < 200) {
      const rotateX = (deltaY / (rect.height / 2)) * -5;
      const rotateY = (deltaX / (rect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  });
});

// 鼠标离开卡片区域时重置
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==============================
// 主题切换功能（可选）
// ==============================
function initThemeToggle() {
  // 创建主题切换按钮
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '<i class="fa fa-moon"></i>';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-gradient);
    border: none;
    color: var(--bg-primary);
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: var(--shadow-lg), var(--shadow-glow);
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fa fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fa fa-sun"></i>';
    }
  });

  themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1)';
  });

  themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1)';
  });

  document.body.appendChild(themeToggle);
}

// 性能优化：节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 性能优化：防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
