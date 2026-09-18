// 滚动触发入场动画
(function () {
    'use strict';   //严格模式声明

    // 检测用户是否开启了减少动态效果
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 获取所有需要动画的元素
    const animateElements = document.querySelectorAll('.animate');

    // 如果没有需要动画的元素，直接结束
    if (!animateElements.length) return;

    // 如果开启了减少动态效果，跳过动画，直接显示全部
    if (prefersReducedMotion) {
        animateElements.forEach(element => element.classList.add('active'));
        return;
    }

    // 定义 IntersectionObserver 回调
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口 → 添加 active 类触发 CSS 动画
                entry.target.classList.add('active');
                // 动画只播放一次，停止观察该元素
                observer.unobserve(entry.target);
            }
        });
    };

    // 创建观察器 保存到常量 observer
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,    // 触发阈值：元素露出 10% 时才触发
        rootMargin: '0px 0px 30px 0px'     // 底部提前 30px 触发，让动画更自然
    });

    // 开始观察所有元素
    animateElements.forEach(element => {
        observer.observe(element);
    });

    setTimeout(function () {
        document.querySelectorAll('.animate:not(.active)').forEach(function (el) {
            el.classList.add('active');
        });
    }, 10000);

})();


// 导航栏滚动效果
(function () {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
        // 页面滚动超过80px，添加scrolled类
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    })
})();