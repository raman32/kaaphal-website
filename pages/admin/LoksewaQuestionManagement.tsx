import { Table, Button, Popconfirm } from 'antd';
import { useGetQuestionsQuery } from '../../gql';
import AdminLayout from '../layouts/admin';

export interface User {
    name: string,
    email: string,
    membership: string,
    post: string,
    comments: string,
    flags: boolean,
}

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',

    },
    {
        title: 'Option A',
        dataIndex: 'optionA',
        key: 'optionA',
    },


    {
        title: 'Option B',
        key: 'optionB',
        dataIndex: 'optionB',

    },
    {
        title: 'Option C',
        dataIndex: 'optionC',
        key: 'optionC',
    },


    {
        title: 'Option D',
        key: 'optionD',
        dataIndex: 'optionD',

    },


    {
        title: 'Answer',
        key: 'answer',
        dataIndex: 'answer',

    },
    {
        title: 'Additional Details',
        key: 'additionalDetails',
        dataIndex: 'additionalDetails',

    },

    {
        title: 'Action',
        key: 'action',
        // eslint-disable-next-line react/display-name
        render: (record: { key: React.Key }): JSX.Element =>
        (<div className="flex flex-row flex-wrap ">
            <Popconfirm title="Sure to delete?" >
                <Button type="primary" danger className="mx-2 my-2">Delete</Button>
            </Popconfirm>
            <Button type="primary" className="mx-2 my-2">Edit</Button>
        </div>
        )

    },
];

const UserManagement = (): JSX.Element => {
    const { data, loading, error } = useGetQuestionsQuery({ variables: { first: 20 } })

    return (

        <Table columns={columns} dataSource={data ? data.getQuestions.edges.map(edge => edge.node) : []} />);
}
// eslint-disable-next-line react/display-name
UserManagement.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default UserManagement;