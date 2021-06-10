import { Radio, Space } from 'antd';
import { useState } from 'react';
import { LoksewaQuestion, } from '../../../gql';
import { Option } from './Option';

export function Question(props: LoksewaQuestion & { questionNumber: number }): JSX.Element {
    const [value, setValue] = useState('')
    return <div className="my-4 shadow px-4 py-4 ">
        <div className="">
            {props.questionNumber}) &nbsp; <span dangerouslySetInnerHTML={{ __html: props.title }} />
        </div>
        <Radio.Group value={value} className="w-80 my-2" onChange={(value) => setValue(value.target.value)}  >
            <Space direction="vertical">
                <Option value={'A'} title={'A.'} isCorrect={props.answer === 'A'}><span dangerouslySetInnerHTML={{ __html: props.optionA }} /> </Option>
                <Option value={'B'} title={'B.'} isCorrect={props.answer === 'B'}><span dangerouslySetInnerHTML={{ __html: props.optionB }} /> </Option>
                <Option value={'C'} title={'C.'} isCorrect={props.answer === 'C'}><span dangerouslySetInnerHTML={{ __html: props.optionC }} /> </Option>
                <Option value={'D'} title={'D.'} isCorrect={props.answer === 'D'}><span dangerouslySetInnerHTML={{ __html: props.optionD }} /> </Option>
            </Space>
        </Radio.Group>
        <div className="h-8">
            {value === props.answer ? props.additionalDetails ? props.additionalDetails : '' : ''}
        </div>

    </div>
}