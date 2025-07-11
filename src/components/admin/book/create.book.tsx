import { getCategoryAPI } from '@/services/book.api';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { App, Button, Col, Image, InputNumber, Modal, Row, Select } from 'antd';
import { Form, Input } from 'antd';
import type { FormProps, UploadProps, GetProp } from 'antd';
import { Upload } from "antd";
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
interface IProps {
    isOpenCreate: boolean;
    setIsOpenCreate: (isOpen: boolean) => void;
    refreshTable: () => void;
}

type FieldType = {
    mainText?: string;
    author?: string;
    price?: number;
    category?: string;
    quantity?: number;
    thumbnail?: any;
    slider?: any;
}
interface ICategory {
    label: string;
    value: string;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const CreateBook = (props: IProps) => {
    const { isOpenCreate, setIsOpenCreate, refreshTable } = props;
    const [form] = Form.useForm();
    const [listCategories, setListCategories] = useState<ICategory[]>([]);
    // Component logic for creating a book
    const { notification } = App.useApp();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [loadingThumbnail, setLoadingThumbnail] = useState(false);
    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            const response = await getCategoryAPI();
            if (response && response.data) {
                const categories = response.data.map((category) => ({
                    label: category,
                    value: category
                }));
                setListCategories(categories);
            }
        };
        fetchCategories();
    }, []);
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        console.log('Creating book with values:', values);
    };
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notification.error({
                message: 'Invalid file type',
                description: 'You can only upload JPG/PNG file!',
            })
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.error({
                message: 'File too large',
                description: 'Image must be smaller than 2MB!',
            });
        }
        return isJpgOrPng && isLt2M;
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange = (info: UploadChangeParam, type: 'thumbnail' | 'slider') => {
        if (info.file.status === 'uploading') {
            // Handle file change for thumbnail or slider
            type === 'thumbnail' ? setLoadingThumbnail(true) : setLoadingSlider(true);
            return;
        }

        if (info.file.status === 'done') {
            type === 'thumbnail' ? setLoadingThumbnail(false) : setLoadingSlider(false);
        }
    }

    const handleUploadFile: UploadProps['customRequest'] = ({ file, onSuccess, onError }) => {
        // Simulate an upload process
        setTimeout(() => {
            if (onSuccess) {
                onSuccess(file);
            }
        }, 1000);
    };

    const handleOnCancel = () => {
        form.resetFields();
        setIsOpenCreate(false);

    }
    return (
        <>
            <Modal
                width={"60vw"}
                title="Create Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpenCreate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    handleOnCancel();
                }}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Book Name" name="mainText"
                                rules={[{ required: true, message: 'Please input the book name!' }]}>
                                <Input placeholder="Enter book name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Author" name="author"
                                rules={[{ required: true, message: 'Please input the author name!' }]}>
                                <Input placeholder="Enter author name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input the book price!' }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Enter book price"
                                    min={0}
                                    formatter={value =>
                                        value
                                            ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            : ''
                                    }
                                // replace(/[₫,\s]/g, '') 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Category" name="category"
                                rules={[{ required: true, message: 'Please select a category!' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    options={listCategories}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Quantity" name="quantity"
                                rules={[{ required: true, message: 'Please input the book quantity!' }]}>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Thumbnail"
                                name="thumbnail"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    multiple={false}
                                    maxCount={1}
                                    accept=".jpg,.jpeg,.png"
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={(info) => handleChange(info, 'thumbnail')}>
                                    <div>
                                        {loadingThumbnail ? <UploadOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Slider Images"
                                name="slider"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Please upload slider images!' }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    multiple
                                    accept=".jpg,.jpeg,.png"
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={(info) => handleChange(info, 'slider')}
                                >
                                    <div>
                                        {loadingSlider ? <UploadOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Modal>
        </>
    );
}

export default CreateBook;