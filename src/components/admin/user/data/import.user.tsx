
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Table, Upload } from 'antd';
import { Modal } from 'antd';

interface IProps {
    isOpenModalImport: boolean;
    setIsOpenModalImport: (isOpen: boolean) => void;
}

const { Dragger } = Upload;


const ImportUser = (props: IProps) => {
    const { isOpenModalImport, setIsOpenModalImport } = props;
    ;

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        customRequest({ file, onSuccess }) {
            // Simulate a file upload
            setTimeout(() => {
                if (onSuccess) onSuccess("ok");
            }, 1000);
        },
        accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    };

    return (
        <Modal
            title="Upload File"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpenModalImport}
            onOk={() => setIsOpenModalImport(false)}
            onCancel={() => {
                setIsOpenModalImport(false);
            }}
            okText="Import Data"
            okButtonProps={{
                disabled: true
            }}
            maskClosable={false}
        >
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <div style={{ paddingTop: 20 }}>
                <Table
                    title={() => <span>Preview Data</span>}
                    columns={[
                        {
                            title: 'Full Name',
                            dataIndex: 'fullName',
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                        },
                        {
                            title: 'Address',
                            dataIndex: 'address'
                        },
                    ]}
                />
            </div>
        </Modal>

    );
};

export default ImportUser;