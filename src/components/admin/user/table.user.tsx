import { getUsersAPI } from '@/services/api';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';


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
                    <a href='#'>{entity._id}</a>
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
        dataIndex: 'createdAt',
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

const TableUser = () => {
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });
    return (
        <>
            <ProTable<IUserTable>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    const res = await getUsersAPI();
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
                    onChange: (page) => console.log(page),
                    showSizeChanger: true,
                }}
                dateFormatter="string"
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { }}>
                        New User
                    </Button>

                ]}
            />
        </>
    );
};

export default TableUser;