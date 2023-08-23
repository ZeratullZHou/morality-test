export default {
    ruleType: [
        {
            name: '出轨',
            subType: [
                {
                    name: '未出轨',
                    vale: 0,
                },
                {
                    name: '有对象出轨',
                    vale: 1,
                },
                {
                    name: '已婚出轨',
                    vale: 2,
                },
            ],
        },
        {
            name: '伴侣数量',
            subType: [
                {
                    name: '1或者1人以内',
                    value: 0,
                },
                {
                    name: '1-5人',
                    value: 10,
                },
                {
                    name: '5人以上（不包含）',
                    value: 20,
                },
            ],
        },
    ],
};
