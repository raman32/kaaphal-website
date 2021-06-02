import { Select } from 'antd';
import React from 'react';
import { ScholarshipLevel } from '../../gql';

export const scholarshipLevels = [
    { value: ScholarshipLevel.K12, name: 'K-12' },
    { value: ScholarshipLevel.Bachelors, name: 'Bachelors' },
    { value: ScholarshipLevel.Masters, name: 'Masters' },
    { value: ScholarshipLevel.Phd, name: 'Phd' },
    { value: ScholarshipLevel.Postgrad, name: 'Postgrad' },
    { value: ScholarshipLevel.Research, name: 'Research' },
    { value: ScholarshipLevel.Language, name: 'Language' },
    { value: ScholarshipLevel.Training, name: 'Training' },
];

export default function ScholarshipLevelPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    return <Select
        placeholder="Select Level"
        {...props}
    >
        {scholarshipLevels.map((postType, index) => <Select.Option value={postType.value} key={index}>{postType.name}</Select.Option>)}
    </Select>
}
