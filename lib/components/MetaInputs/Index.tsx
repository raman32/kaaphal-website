import { Button } from 'antd'
import MetaInput from './MetaInput'
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


export type MetaType = {
    name: string;
    content: string;
}

interface MetaInputsProps {
    value?: MetaType[];
    onChange?: (metas: MetaType[]) => void;
}

const MetaInputs: React.FC<MetaInputsProps> = ({ onChange, value: values }) => {
    const [showNewMetaInput, setShowNewMetaInput] = useState(false);
    const handleChange = ({ name, content, index }: MetaType & { index: number }) => {
        const values_ = [...values]
        values_[index] = { name, content }
        onChange(values_)
    }
    const handleRemove = (index: number) => {
        const values_ = [...values]
        values_.splice(index, 1)
        onChange(values_)
    }
    return <>
        {values.map((value, index) => <MetaInput key={index} initialValue={value} onChange={({ name, content }) => handleChange({ name, content, index })} onRemove={() => handleRemove(index)} />)}
        { showNewMetaInput && <MetaInput onChange={({ name, content }) => {
            onChange([...values, { name, content }])
            setShowNewMetaInput(false)
        }} onRemove={() => setShowNewMetaInput(false)} />}
        <Button type="dashed" onClick={() => setShowNewMetaInput(true)} block icon={<PlusOutlined />} className="w-80" >
            Add Meta
        </Button>
    </>
}

export default MetaInputs;