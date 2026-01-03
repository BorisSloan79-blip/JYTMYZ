/* js/data.js */

// 1. 菜品数据 (无猪肉，适合家庭制作)
const MENU_DATA = [
    {
        id: 'd1',
        name: '宫保鸡丁 (特制版)',
        desc: '马永哲记得彤彤喜欢多放花生，少放花椒。',
        price: 50,
        type: 'dish',
        img: 'assets/images/chicken.jpg'
    },
    {
        id: 'd2',
        name: '西红柿炖牛腩',
        desc: '炖得软烂入味，暖胃又暖心。',
        price: 60,
        type: 'dish',
        img: 'assets/images/beef.jpg'
    },
    {
        id: 'd3',
        name: '清炒荷兰豆',
        desc: '清清爽爽，补充维生素，彤彤要多吃菜。',
        price: 30,
        type: 'dish',
        img: 'assets/images/veg.jpg'
    },
    {
        id: 'd4',
        name: '红糖冰粉',
        desc: '多加葡萄干和山楂片，解腻神器。',
        price: 20,
        type: 'snack',
        img: 'assets/images/jelly.jpg'
    },
    {
        id: 'd5',
        name: '鲜榨橙汁',
        desc: '马永哲手剥鲜榨，绝不加一滴水。',
        price: 25,
        type: 'drink',
        img: 'assets/images/juice.jpg'
    },
    {
        id: 'd6',
        name: '爱心果切拼盘',
        desc: '去皮切块，插好牙签，只等彤彤张嘴。',
        price: 40,
        type: 'fruit',
        img: 'assets/images/fruit.jpg'
    }
];

// 2. 互动获取爱心的方式
const LOVE_ACTIONS = [
    { text: "给马永哲一个大大的拥抱", value: 20 },
    { text: "夸马永哲今天真帅", value: 15 },
    { text: "给马永哲发一张自拍", value: 30 },
    { text: "亲马永哲一下 (脸颊也算)", value: 50 }
];

// 3. 一天模拟剧情
const DAY_STORY = [
    {
        time: "08:00 AM",
        title: "早安，彤彤",
        text: "阳光透过窗帘洒在床上。马永哲轻手轻脚地起床，厨房里传来煎蛋的香味。他希望彤彤能多睡一会儿。",
        btn: "起床吃早餐"
    },
    {
        time: "12:30 PM",
        title: "忙碌的午间",
        text: "工作可能有点累，但马永哲发来了午餐打卡照片。他希望彤彤也能按时吃饭，不要饿坏了胃。",
        btn: "回复：想你啦"
    },
    {
        time: "19:00 PM",
        title: "温馨晚餐",
        text: "终于下班了。家里灯光暖黄，马永哲正在厨房忙碌，桌上摆着彤彤最爱吃的菜。这一刻，世界很安静，只属于你们。",
        btn: "抱住他的后背"
    },
    {
        time: "22:00 PM",
        title: "晚安，我的女孩",
        text: "洗漱完毕，钻进温暖的被窝。马永哲帮彤彤掖好被角，在你额头落下一个吻。",
        btn: "结束美好的一天"
    }
];

// 4. 话题卡池
const TOPICS = [
    { type: "甜蜜", content: "如果不考虑现实，彤彤最想和马永哲去哪里隐居？" },
    { type: "日常", content: "马永哲做的哪道菜，是彤彤心里的 No.1？" },
    { type: "深度", content: "最近有什么让彤彤感到焦虑的小事吗？马永哲想分担。", emoji: "👂" },
    { type: "未来", content: "想象一下，五年后的今天，我们在做什么？" },
    { type: "回忆", content: "第一次见到马永哲时，彤彤的第一印象是什么？" },
    { type: "甜蜜", content: "马永哲做过最让彤彤感动的一件小事是什么？" }
];