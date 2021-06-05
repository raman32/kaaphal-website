import { Button, message, Upload, Image } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useCreateAssetMutation } from '../../../gql';
import { useApolloClient } from '@apollo/client';
export default function UploadAvatarImage(props): JSX.Element {
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState();
    const [createAssest, { data, loading, error }] = useCreateAssetMutation()
    const apolloClient = useApolloClient();
    useEffect(() => {
        if (data) {
            message.success('Succesfully created file of id: ' + data.createAsset.id);
            props.onChange(data.createAsset.id);
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
    }
    const handleUpload = async () => {
        if (file) {
            createAssest({ variables: { file: file, } }).then(() => { apolloClient.resetStore(); })
        }
        else {
            message.error('Please select an image to upload');
        }
    }


    return <>
        <ImgCrop rotate shape="round">
            <Upload listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Choose image</div>
                </div>}
            </Upload>
        </ImgCrop>
        <Button icon={<UploadOutlined />} onClick={handleUpload} loading={loading}>Upload</Button>
    </>

}