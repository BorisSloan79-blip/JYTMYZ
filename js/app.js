/* js/app.js */

const App = {
    state: {
        loveCoins: parseInt(localStorage.getItem('love_coins') || 100)
        dayProgress: parseInt(localStorage.getItem('day_progress') || 0)，
    },

    init() {
        this.updateLoveUI();
        this.renderMenu();
        this.renderTimeline();
        this.bindEvents();
    },

    bindEvents() {
        // Tab 切换
        document.querySelectorAll('.tab-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // 移除所有 active
                document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
                
                // 添加当前 active
                e.currentTarget.classList.add('active');
                const tabId = e.currentTarget.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });

        // 赚取爱心
        document.getElementById('earn-love-btn').addEventListener('click', () => {
            this.showEarnModal();
        });

        // 提交订单
        document.getElementById('submit-order').addEventListener('click', () => {
            this.submitOrder();
        });

        // 抽卡点击
        document.getElementById('draw-card-btn').addEventListener('click', () => {
            this.drawCard();
        });
    },

    // --- 爱心系统 ---
    updateLoveUI() {
        document.getElementById('love-balance').textContent = this.state.loveCoins;
        localStorage.setItem('love_coins', this.state.loveCoins);
    },

    showEarnModal() {
        const action = LOVE_ACTIONS;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-box">
                <h3>💖 赚取爱心任务</h3>
                <p style="margin: 15px 0; color: #666;">${action.text}</p>
                <button class="btn" onclick="App.completeTask(${action.value}, this)">我完成啦 (+${action.value})</button>
                <div style="margin-top:10px; font-size:12px; color:#999;" onclick="this.closest('.modal-overlay').remove()">暂不完成</div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    completeTask(value, btnElement) {
        this.state.loveCoins += value;
        this.updateLoveUI();
        btnElement.closest('.modal-overlay').remove();
        alert(`爱心到账！马永哲感受到了彤彤的爱意~`);
    },

    // --- 点餐系统 ---
    renderMenu() {
        const container = document.getElementById('menu-list');
        container.innerHTML = MENU_DATA.map(item => `
            <div class="menu-item">
                <div class="dish-img">${item.img.includes('jpg')? '🥘' : '🍹'}</div>
                <div class="dish-info">
                    <div class="dish-name">${item.name}</div>
                    <div class="dish-desc">${item.desc}</div>
                    <div class="dish-price">❤ ${item.price}</div>
                </div>
                <div class="add-btn" onclick="App.addToCart('${item.id}', ${item.price})">+</div>
            </div>
        `).join('');
    },

    addToCart(id, price) {
        if (this.state.loveCoins < price) {
            alert("哎呀，爱心不够啦！快去和马永哲互动赚取爱心吧~");
            return;
        }
        const item = MENU_DATA.find(d => d.id === id);
        this.state.cart.push(item);
        this.state.loveCoins -= price;
        this.updateLoveUI();
        
        const countSpan = document.getElementById('cart-count');
        countSpan.textContent = `已选 ${this.state.cart.length} 份`;
        // 简单震动反馈
        if(navigator.vibrate) navigator.vibrate(50);
    },

    submitOrder() {
        if (this.state.cart.length === 0) return alert("彤彤还没选菜呢~");
        
        const names = this.state.cart.map(i => i.name).join(' + ');
        const total = this.state.cart.reduce((sum, i) => sum + i.price, 0);
        const date = new Date().toLocaleString('zh-CN', { hour12: false });
        
        const orderText = `📅 时间：${date}\n👩 彤彤点单：${names}\n💰 消耗爱心：${total}\n👨‍🍳 马永哲收到！马上准备食材去~ ❤`;
        
        // 复制到剪贴板
        const textarea = document.createElement('textarea');
        textarea.value = orderText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        alert("点单成功！\n\n订单内容已复制，快去发给马永哲吧~");
        this.state.cart =;
        document.getElementById('cart-count').textContent = "";
    },

    // --- 一天模拟 ---
    renderTimeline() {
        const container = document.getElementById('timeline-box');
        let html = '';
        
        DAY_STORY.forEach((step, index) => {
            const isLocked = index > this.state.dayProgress;
            const isDone = index < this.state.dayProgress;
            
            html += `
                <div class="timeline-step ${isLocked? 'locked' : ''}">
                    <div style="font-size:12px; color:#999;">${step.time}</div>
                    <h3 style="margin:5px 0;">${step.title}</h3>
                    <p style="font-size:14px; color:#555; line-height:1.6;">${step.text}</p>
                    ${!isLocked &&!isDone? `<button class="btn" style="margin-top:10px; font-size:12px; padding:5px 15px;" onclick="App.nextStep()">${step.btn}</button>` : ''}
                </div>
            `;
        });
        
        if (this.state.dayProgress >= DAY_STORY.length) {
            html += `<div style="text-align:center; padding:20px; color:var(--primary);">❤ 完美的一天结束了，马永哲永远爱彤彤。</div>`;
        }

        container.innerHTML = html;
    },

    nextStep() {
        this.state.dayProgress++;
        localStorage.setItem('day_progress', this.state.dayProgress);
        this.renderTimeline();
    },

    // --- 抽卡系统 ---
    drawCard() {
        const cardFace = document.querySelector('.card-back');
        const card = document.querySelector('.topic-card');
        const topic = TOPICS;
        
        // 简单的翻转动画逻辑
        card.style.transform = "rotateY(90deg)";
        
        setTimeout(() => {
            cardFace.innerHTML = `
                <div style="font-size:12px; color:#999; margin-bottom:10px;">${topic.type}话题</div>
                <div style="font-size:18px; line-height:1.5;">${topic.content}</div>
                <div style="margin-top:20px; font-size:12px; color:var(--primary);">请马永哲和彤彤轮流回答哦</div>
            `;
            card.style.display = 'none'; // 隐藏封面
            
            // 这里其实应该用 CSS class 控制翻转，为了简化代码直接替换内容演示
            // 实际代码中，建议结构不动，只改文字
            const resultArea = document.getElementById('card-result');
            resultArea.innerHTML = cardFace.innerHTML;
            resultArea.style.display = 'block';
            document.getElementById('draw-card-btn').textContent = "再抽一张";
        }, 300);
    }
};

window.App = App; // 暴露给全局以便 HTML 调用 onclick

document.addEventListener('DOMContentLoaded', () => App.init());



