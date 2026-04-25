/* ==============================
   赛博朋克风格交互脚本
   ============================== */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有效果
  initScrollAnimations();
  initSmoothScroll();
  initCountUpAnimation();
  initCodeRainBackground();
  initNavbarScrollEffect();
  initTerminalUptime();
  initScrollProgress();
  initCard3DEffect();
  initSkillProgressAnimation();
});

/* ==============================
   滚动动画效果
   ============================== */
function initScrollAnimations() {
  // 为所有需要动画的元素添加fade-in类
  const animatedElements = document.querySelectorAll(
    '.skill-category-card, .project-card, .timeline-content, .article-card, .photo-item, .contact-method, .section-header'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
  });

  // 观察元素是否进入视口
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // 如果是技能卡片，触发技能条动画
        if (entry.target.classList.contains('skill-category-card')) {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            bar.style.animationPlayState = 'running';
          });
        }
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

/* ==============================
   平滑滚动
   ============================== */
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

/* ==============================
   数字增长动画
   ============================== */
function initCountUpAnimation() {
  const countElements = document.querySelectorAll('.stat-number');

  const countUp = (element, target, duration = 2000) => {
    let startTime = null;
    const startValue = 0;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const currentValue = Math.floor(progress * (target - startValue) + startValue);

      element.textContent = currentValue + '+';

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.dataset.target);
        countUp(entry.target, target);
        entry.target.classList.add('counted');
      }
    });
  });

  countElements.forEach(el => {
    observer.observe(el);
  });
}

/* ==============================
   技能条动画
   ============================== */
function initSkillProgressAnimation() {
  const progressBars = document.querySelectorAll('.skill-progress');

  // 初始暂停动画
  progressBars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
}

/* ==============================
   代码雨背景效果
   ============================== */
function initCodeRainBackground() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const matrixBg = document.querySelector('.matrix-bg');

  if (!matrixBg) return;

  // 插入canvas到背景层
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.15';
  matrixBg.appendChild(canvas);

  // 设置canvas尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 代码雨字符
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = '15px "JetBrains Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 35);
}

/* ==============================
   导航栏滚动效果
   ============================== */
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(20, 26, 40, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(20, 26, 40, 0.8)';
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    }

    lastScrollTop = scrollTop;
  });
}

/* ==============================
   运行时间计算
   ============================== */
function initTerminalUptime() {
  const uptimeElement = document.querySelector('.live-uptime');
  if (!uptimeElement) return;

  // 站点上线时间 - 可根据实际情况修改
  const launchDate = new Date('2016-01-01');

  function updateUptime() {
    const now = new Date();
    const diff = now - launchDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    uptimeElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes`;
  }

  updateUptime();
  setInterval(updateUptime, 60000); // 每分钟更新一次
}

/* ==============================
   滚动进度条
   ============================== */
function initScrollProgress() {
  // 创建进度条元素
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00ff88 0%, #00f5ff 100%);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ==============================
   3D卡片悬停效果
   ============================== */
function initCard3DEffect() {
  const cards = document.querySelectorAll(
    '.skill-category-card, .project-card, .timeline-content, .article-card, .glass-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ==============================
   终端打字效果
   ============================== */
function typeText(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';

  return new Promise((resolve) => {
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

/* ==============================
   故障艺术效果
   ============================== */
function addGlitchEffect(element, duration = 1000) {
  element.classList.add('glitching');

  setTimeout(() => {
    element.classList.remove('glitching');
  }, duration);
}

// 随机触发名字故障效果
setInterval(() => {
  const nameElement = document.querySelector('.glitch-name');
  if (nameElement && Math.random() > 0.7) {
    addGlitchEffect(nameElement, 500);
  }
}, 5000);

/* ==============================
   快捷键支持
   ============================== */
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K 快速搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // 可在此添加搜索功能
  }

  // ESC 关闭弹窗等
  if (e.key === 'Escape') {
    // 可在此添加关闭功能
  }
});

/* ==============================
   性能优化：节流函数
   ============================== */
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

/* ==============================
   性能优化：防抖函数
   ============================== */
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

/* ==============================
   访客统计（模拟）
   ============================== */
function updateVisitorCount() {
  const visitorElement = document.querySelector('.visitor-count');
  if (!visitorElement) return;

  // 模拟访客数
  const baseCount = 100000;
  const randomIncrease = Math.floor(Math.random() * 1000);
  visitorElement.textContent = (baseCount + randomIncrease).toLocaleString() + '+';
}

// 页面加载时更新
updateVisitorCount();

/* ==============================
   打印友好样式
   ============================== */
window.addEventListener('beforeprint', () => {
  document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('print-mode');
});
