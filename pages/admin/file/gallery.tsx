import React, { useState } from 'react';
import { File, useDeleteFileMutation, useGetFilesQuery } from '../../../gql';
import AdminLayout from '../../layouts/admin';
import LazyLoad from 'react-lazyload';
import { Button, Modal, Popconfirm, Spin } from 'antd';
import { host } from '../../../utils/GlobalConstants';

function Gallery(): JSX.Element {
    const { data, refetch } = useGetFilesQuery({ variables: { first: 10 } })
    const [deleteFile] = useDeleteFileMutation();
    const [selected, setSelected] = useState<File>(null);
    return <div className="flex flex-row flex-wrap">
        {data && data.getFiles.edges.map(edge => <div key={edge.node.id} className="mx-4 my-4 border hover:shadow cursor-pointer" onClick={() => setSelected(edge.node as File)}>
            <LazyLoad height={200} resize={false} once placeholder={<Spin className="px-4 py-4" />}>
                <img src={host + '/assets/' + edge.node.preview} alt={edge.node.name} />
            </LazyLoad>
        </div>)}
        <Modal
            title={selected && selected.name}
            onCancel={() => setSelected(null)}
            visible={!!selected} footer={[
                <Popconfirm key="link" title="Are you sure you want to delete?" onConfirm={() => deleteFile({ variables: { fileId: selected.id } }).then(() => refetch({ first: 10 }).then(() => setSelected(null)))}>
                    <Button
                        type="primary"
                        danger
                        loading={false}
                    >
                        Delete
                    </Button>
                </Popconfirm>,
                <Button key="back" onClick={() => setSelected(null)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={() => { }}>
                    Submit
                </Button>,

            ]}
        >
            <div>
                {selected && <LazyLoad height={selected.height} resize={false} placeholder={<Spin className="px-4 py-4" />}>
                    <img src={host + '/assets/' + selected.source} />
                </LazyLoad>}
            </div>
        </Modal>
    </div>
}

// eslint-disable-next-line react/display-name
Gallery.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default Gallery;