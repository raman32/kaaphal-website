import { Radio, Space } from 'antd';
import { useState } from 'react';
import { LoksewaQuestion, } from '../../../gql';
import { Option } from './Option';

export function Question(props: LoksewaQuestion & { questionNumber: number }): JSX.Element {
    const [value, setValue] = useState(null)
    return <div className="my-4 shadow px-4 py-4 ">
        <div className="">
            {props.questionNumber}) &nbsp; {props.title}
        </div>
        <Radio.Group name="radiogroup" value={value} className="w-80 my-2" onChange={(value) => setValue(value)}>
            <Space direction="vertical">
                <Option value={'A'} title={'A.'} isCorrect={props.answer === 'A'}>{props.optionA} </Option>
                <Option value={'B'} title={'B.'} isCorrect={props.answer === 'B'}>{props.optionB} </Option>
                <Option value={'C'} title={'C.'} isCorrect={props.answer === 'C'}>{props.optionC} </Option>
                <Option value={'D'} title={'D.'} isCorrect={props.answer === 'D'}>{props.optionD} </Option>
            </Space>
        </Radio.Group>
        <div className="h-8">
            {value === props.answer ? props.additionalDetails ? props.additionalDetails : '' : ''}
        </div>

    </div>
}