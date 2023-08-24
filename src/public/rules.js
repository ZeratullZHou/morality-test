export default {
    data: [
        {
            key: '1',
            type: '出轨',
            score: '--',
            description: '出轨大类',
            children: [
                {
                    key: '1.1',
                    type: '未出轨',
                    score: 0,
                    description: '从未出轨过',
                },
                {
                    key: '1.2',
                    type: '有出轨',
                    score: 40,
                    description: '婚姻期间出轨1人',
                },
                {
                    key: '1.3',
                    type: '多人出轨',
                    score: 60,
                    description: '婚姻期间出轨超过1人',
                },
            ],
        },
        {
            key: '2',
            type: '劈腿',
            score: '--',
            description: '劈腿大类',
            children: [
                {
                    key: '2.1',
                    type: '未劈腿',
                    score: 0,
                    description: '单身或者恋爱期间未劈腿',
                },
                {
                    key: '2.2',
                    type: '少量劈腿',
                    score: 30,
                    description: '在谈恋爱有3个以内劈腿对象',
                },
                {
                    key: '2.3',
                    type: '大量劈腿',
                    score: 50,
                    description: '在谈恋爱有超过3个以内劈腿对象',
                },
            ],
        },
        {
            key: '3',
            type: '伴侣数量',
            score: '--',
            description: '发生过关系的伴侣人数',
            children: [
                {
                    key: '3.1',
                    type: '0或者1人',
                    score: 0,
                    description: '从未发生过关系或者只有1人',
                },
                {
                    key: '3.2',
                    type: '多人但都是对象',
                    score: 5,
                    description: '在恋爱或者交往期间同对象发生关系但未走到最后',
                },
                {
                    key: '3.3',
                    type: '多人无恋爱关系',
                    score: 20,
                    description: '与非恋爱关系对象发生了关系',
                },
            ],
        },
        {
            key: '4',
            type: '违法行为',
            score: '--',
            description: '例如嫖娼等行为',
            children: [
                {
                    key: '4.1',
                    type: '无嫖娼或擦边性行为',
                    score: 0,
                    description: '擦边性行为包含帮打飞机，脱衣舞等',
                },
                {
                    key: '4.2',
                    type: '做过擦边性行为',
                    score: 20,
                    description: '技师打飞机或者拔龙筋等',
                },
                {
                    key: '4.3',
                    type: '嫖娼过',
                    score: 60,
                    description: '发生过口交、性交等嫖娼行为',
                },
            ],
        },
    ]
};
