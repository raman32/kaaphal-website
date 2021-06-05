import { Rate } from 'antd';

import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Difficulty } from '../../../gql';
import { useEffect, useState } from 'react';
export function DifficultyRater(props: React.ComponentProps<typeof Rate>): JSX.Element {
    const [value, setValue] = useState(props.value ? props.value : 3)
    useEffect(() => props.onChange(customLabels[value]), [value])
    const customIcons = {
        1: <SmileOutlined />,
        2: <SmileOutlined />,
        3: <MehOutlined />,
        4: <FrownOutlined />,
        5: <FrownOutlined />,
    };
    const customLabels = {
        1: Difficulty.VeryEasy,
        2: Difficulty.Easy,
        3: Difficulty.Medium,
        4: Difficulty.Hard,
        5: Difficulty.VeryHard,
    };
    return <Rate   {...props} value={value} character={({ index }) => customIcons[index + 1]} onChange={setValue} />
}