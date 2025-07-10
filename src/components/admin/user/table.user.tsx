import { getUsersAPI } from '@/services/api';
import { dateRangeValidate } from '@/services/helper';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import DetailUser from './detail.user';
import CreateUser from './create.user';
import ImportUser from './data/import.user';


type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: string;
}
const TableUser = () => {
    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '_id',
            dataIndex: '_id',
            hideInSearch: true,
            render(dom, entity) {
                return (
                    <div>
                        <a href='#' onClick={() => showUserDetail(entity)}>{entity._id}</a>
                    </div>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Action',
            copyable: true,
            ellipsis: true,
            hideInSearch: true,
            render(dom, entity) {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800"
                            style={{ cursor: 'pointer', marginRight: 15 }} />
                        <DeleteTwoTone
                            twoToneColor="#f57800"
                            style={{ cursor: 'pointer' }} />
                    </>
                )
            },
        },
    ];

    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<IUserTable | null>(null);
    const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
    const [isOpenModalImport, setIsOpenModalImport] = useState<boolean>(false);
    const showUserDetail = (record: IUserTable) => {
        setUserDetail(record);
        setIsOpenDetail(true);
    };

    const refreshTable = () => {
        actionRef.current?.reload();
    }


    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    // console.log(params, sort, filter);
                    let query = '';
                    if (params) {
                        query += `current=${params.current ?? 1}&pageSize=${params.pageSize ?? 5}`;
                        if (params.fullName) {
                            query += `&fullName=/${params.fullName}/i`;
                        }
                        if (params.email) {
                            query += `&email=/${params.email}/i`;
                        }
                        const createdAtRange = dateRangeValidate(params.createdAtRange);
                        if (createdAtRange) {
                            query += `&createdAt>=${createdAtRange[0]}&createdAt<=${createdAtRange[1]}`;
                        }
                    }
                    //default sort by createdAt

                    if (sort && sort.createdAt) {
                        query += `&sort=${sort.createdAt == 'ascend' ? 'createdAt' : '-createdAt'}`;
                    } else query += `&sort=-createdAt`;

                    const res = await getUsersAPI(query);
                    if (res.data) {
                        setMeta({
                            current: res.data?.meta.current,
                            pageSize: res.data?.meta.pageSize,
                            pages: res.data?.meta.pages,
                            total: res.data?.meta.total,
                        });
                    }
                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total,
                    }

                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]}-{range[1]} of {total} items
                            </div>
                        )
                    },
                    // onChange: (page) => console.log(page),
                    showSizeChanger: true,
                }}
                dateFormatter="string"
                headerTitle="Table user"
                toolBarRender={() => [
                    <>
                        <Button type="primary" icon={<ExportOutlined />} onClick={() => { }}>
                            Export
                        </Button>
                        <Button type="primary" icon={<CloudUploadOutlined />} onClick={() => setIsOpenModalImport(true)}>
                            Upload File
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpenCreate(true)}>
                            New User
                        </Button>
                    </>

                ]}
            />
            <DetailUser
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                userDetail={userDetail}
                setUserDetail={setUserDetail}
            />
            <CreateUser
                isOpenCreate={isOpenCreate}
                setIsOpenCreate={setIsOpenCreate}
                refreshTable={refreshTable}
            />
            <ImportUser
                isOpenModalImport={isOpenModalImport}
                setIsOpenModalImport={setIsOpenModalImport}
                refreshTable={refreshTable}
            />
        </>
    );
};

export default TableUser;