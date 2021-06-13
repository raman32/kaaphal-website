import { Table, Button, Popconfirm, Select, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { LoksewaQuestion, McqAnswer, UpdateLoksewaQuestionInput, useGetQuestionsQuery, useUpdateQuestionMutation } from '../../../gql';
import AdminLayout from '../../layouts/admin';
import { ColumnsType } from 'antd/es/table';
import LoksewaCategoryPicker from '../../../lib/components/atomic/LoksewaCategoryPicker';
import { useEffect, useState } from 'react';


const UserManagement = (): JSX.Element => {
    const [categoryId, setCategoryId] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const { data, loading, error, refetch } = useGetQuestionsQuery({ variables: { first: 20, categoryId } })
    const [updateQuestion] = useUpdateQuestionMutation();
    const [editIndex, setEditIndex] = useState(null);
    const [editRowRecord, setEditRowRecord] = useState({})
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        setTableData(data && data.getQuestions.edges ?
            data.getQuestions.edges.map(({ node: { id, title, optionA, optionB, optionC, optionD, answer, additionalDetails } }) =>
                ({ id, title, optionA, optionB, optionC, optionD, answer, additionalDetails })
            ) : []);
    }, [data])
    const TableCellArea = ({ record, dataIndex, isEditing }: { record: any, dataIndex: string, isEditing: boolean }) => {
        return <TextArea defaultValue={isEditing ? editRowRecord[dataIndex] : record[dataIndex]} bordered={isEditing} onPressEnter={({ currentTarget: { value } }) => setEditRowRecord((prev) => ({ ...prev, [dataIndex]: value }))} />
    }
    const TableCellSelect = ({ record, dataIndex, isEditing, ...props }: React.ComponentProps<typeof Select> & { record: any, dataIndex: string, isEditing: boolean }) => {
        return <Select {...props} defaultValue={isEditing ? editRowRecord[dataIndex] : record[dataIndex]} disabled={!isEditing} onChange={(value) => setEditRowRecord((prev) => ({ ...prev, [dataIndex]: value }))} />
    }
    const columns: ColumnsType<LoksewaQuestion> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="title" />

        },
        {
            title: 'Option A',
            dataIndex: 'optionA',
            key: 'optionA',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="optionA" />
        },


        {
            title: 'Option B',
            key: 'optionB',
            dataIndex: 'optionB',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="optionB" />

        },
        {
            title: 'Option C',
            dataIndex: 'optionC',
            key: 'optionC',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="optionC" />
        },


        {
            title: 'Option D',
            key: 'optionD',
            dataIndex: 'optionD',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="optionD" />

        },


        {
            title: 'Answer',
            key: 'answer',
            dataIndex: 'answer',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => <TableCellSelect isEditing={editIndex === index} record={record} dataIndex="answer" >
                <Select.Option value={McqAnswer.A}>A</Select.Option>
                <Select.Option value={McqAnswer.B}>B</Select.Option>
                <Select.Option value={McqAnswer.C}>C</Select.Option>
                <Select.Option value={McqAnswer.D}>D</Select.Option>
            </TableCellSelect>

        },
        {
            title: 'Additional Details',
            key: 'additionalDetails',
            dataIndex: 'additionalDetails',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element => < TableCellArea isEditing={editIndex === index} record={record} dataIndex="additionalDetails" />

        },

        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any, index): JSX.Element =>
            (<div className="flex flex-row flex-wrap " onKeyUp={({ key }) => {
                if (key === 'Escape') setEditIndex(-1)
            }}>
                <Popconfirm title="Sure to delete?" onConfirm={() => { }}>
                    <Button type="primary" danger className="mx-2 my-2">Delete</Button>
                </Popconfirm>
                {index !== editIndex ? <Button type='default' className={'mx-2 my-2'} onClick={() => { setEditIndex(index); setEditRowRecord(record) }} >Edit</Button>
                    : <Button type="primary" className="m-2 my-2"
                        onClick={() =>
                            updateQuestion({ variables: { question: editRowRecord as UpdateLoksewaQuestionInput } })
                                .then(() => setTableData(prev => prev.map((row, index_) => index_ === index ? editRowRecord : row)))
                                .then(() => setEditRowRecord({}))
                                .then(() => setEditIndex(-1))
                                .then(() => message.success('Succesfully Edited Question'))
                                .catch((err) => {
                                    message.error('Somethin went Wront while updateing question')
                                    console.log(err)
                                }
                                )}> Save </Button >}
            </div >
            )

        },
    ];

    return (
        <div>
            <div className="flex flex-row flex-wrap mx-4">
                <div className="mx-4 shadow text-center my-4">
                    <div>Filter</div>
                    <Input className="w-56 my-4 mx-4" value={searchText} onChange={({ target: { value } }) => setSearchText(value)} placeholder="Enter Text to search"></Input>
                    <Button type="primary" className="mx-4" onClick={() => {
                        refetch({ categoryId, first: 20, })
                        setEditIndex(-1)
                        setEditRowRecord
                    }}>Search</Button>

                    <LoksewaCategoryPicker onChange={(value) => setCategoryId(value)} className="w-80 my-4 mx-4" allowClear />
                </div>
            </div>

            <Table columns={columns} dataSource={tableData} loading={loading} />
        </div >);
}
// eslint-disable-next-line react/display-name
UserManagement.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default UserManagement;