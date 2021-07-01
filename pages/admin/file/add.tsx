import { Button, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/admin';
import { UploadOutlined, ReloadOutlined, InboxOutlined, CopyOutlined } from '@ant-design/icons';
import { useCreateAssetMutation } from '../../../gql';
import { useApolloClient } from '@apollo/client';
import Dragger from 'antd/lib/upload/Dragger';
import { host } from '../../../utils/GlobalConstants';
function CreateBlob(): JSX.Element {
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);
    const [createAssest, { data, loading, error }] = useCreateAssetMutation()
    const apolloClient = useApolloClient();
    const [uploaded, setUploaded] = useState(false);
    useEffect(() => {
        if (data) {
            message.success('Succesfully created file of id: ' + data?.createAsset.id);
        }
        if (error) {
            message.error('Something went wrong while creating file');
            console.log(error.message)
        }
    }, [data, error])
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
        console.log(img)
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false;
        }
        getBase64(file, imageUrl => {
            setImageUrl(imageUrl);
        });
        setFile(file);

        return false;
    }
    const handleRemove = () => {
        setFile(null);
        setImageUrl('');
        setUploaded(false);
    }
    const handleUpload = async () => {
        if (file) {
            createAssest({ variables: { file: file, } }).then(() => { apolloClient.resetStore(); }).then(() => setUploaded(true))
        }
        else {
            message.error('Please select an image to upload');
        }
    }
    return <div>
        <div className="text-lg">Upload Image Blob</div>
        <div className="flex flex-row justify-center mx-4 my-4 " >
            {!!imageUrl && <img src={imageUrl} alt="avatar" style={{ width: '100%' }} className="max-w-xs border-4 border-gray-500 rounded-sm" />}
        </div>
        <Dragger
            showUploadList={false}
            beforeUpload={beforeUpload}
            onRemove={handleRemove}
            accept="image/*"
            multiple={false}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to this area to upload</p>
            <p className="ant-upload-hint">
                Support only single upload. Strictly prohibit from uploading company data or other
                band files. Please ensure that the name of the file is relevant to the post for SEO purpose.
            </p>
        </Dragger>
        <div className="flex flex-row justify-center mx-4 my-4 " >
            <Button icon={<UploadOutlined />} onClick={handleUpload} loading={loading} disabled={uploaded} className="mx-4">Upload</Button>
            <Button icon={<ReloadOutlined />} onClick={handleRemove} loading={loading} htmlType="reset" className="mx-4">Reset</Button>
        </div>

        {data && <div className="mx-4">
            File Info:
            <div className="my-4">
                <span className="mr-4">Source: </span>
                <span className="bg-gray-50 font-mono border border-gray-500 px-4 py-2">{host + '/assets/' + data?.createAsset.source}</span>
                <CopyOutlined className=" px-4 py-2 cursor-pointer" onClick={async () => {
                    await navigator.clipboard.writeText(host);
                    message.success('Copied to Clipboard')
                }} />
            </div>
            <div className="my-4">
                <span className="mr-4">Preview: </span>
                <span className="bg-gray-50 font-mono border border-gray-500 px-4 py-2">{host + '/assets/' + data?.createAsset.preview}</span>
                <CopyOutlined className=" px-4 py-2 cursor-pointer" onClick={async () => {
                    await navigator.clipboard.writeText(host);
                    message.success('Copied to Clipboard')
                }} />
            </div>
            <div className="my-4">
                <span className="mr-4">HTML img tag: </span>
                <span className="bg-gray-50 font-mono border border-gray-500 px-4 py-2">{`<img src="${host + '/assets/' + data?.createAsset.source}" alt="${data.createAsset.name}" />`}</span>
                <CopyOutlined className=" px-4 py-2 cursor-pointer" onClick={async () => {
                    await navigator.clipboard.writeText(host);
                    message.success('Copied to Clipboard')
                }} />
            </div>
        </div>}

    </div>
}

// eslint-disable-next-line react/display-name
CreateBlob.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateBlob;

