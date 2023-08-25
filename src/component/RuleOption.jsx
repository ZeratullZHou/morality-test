import { useState } from 'react';
import { Input, message } from 'antd';

const OptionInput = ({ value = {}, onChange }) => {
    const [name, setName] = useState(value.name);
    const [score, setScore] = useState(value.score);
    const [messageMethod, messageContext] = message.useMessage();
    const triggerChange = changedValue => {
        // console.log(changedValue);
        onChange?.({
            ...value,
            ...changedValue,
        });
    };

    const onScoreChange = e => {
        const newScore = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(score) || newScore <= 0) {
            return setScore(0);
        }
        if (newScore > 100) {
            return messageMethod.error('分数不能超过100分');
        }
        setScore(newScore);
        triggerChange({
            option_score: newScore,
        });
    };
    const onNameChange = e => {
        if (!e.target.value) {
            return setName(null);
        }
        setName(e.target.value);
        triggerChange({
            option_name: e.target.value,
        });
    };

    return (
        <span>
            {messageContext}
            <Input
                style={{ display: 'flex', margin: '12px 8px' }}
                placeholder="选项名称"
                onChange={onNameChange}
                value={name}
            />
            <Input
                style={{ display: 'flex', margin: '12px 8px' }}
                placeholder="选项分数"
                onChange={onScoreChange}
                value={score}
            />
        </span>
    );
};

export default OptionInput;
