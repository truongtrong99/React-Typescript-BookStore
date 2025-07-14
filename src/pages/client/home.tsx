import { getBooksAPI, getCategoryAPI } from "@/services/book.api";
import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Card, Spin } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
interface ICategory {
    label: string;
    value: string;
}
const HomePage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const [books, setBooks] = useState<IBookTable[]>([]);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '2',
            label: 'Hàng Mới',
            children: <></>,
        },
        {
            key: '3',
            label: 'Giá Thấp Đến Cao',
            children: <></>,
        },
        {
            key: '4',
            label: 'Giá Cao Đến Thấp',
            children: <></>,
        },
    ];
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>("sort=-sold");

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            const response = await getCategoryAPI();
            if (response && response.data) {
                const categories = response.data.map((category) => ({
                    label: category,
                    value: category
                }));
                setCategories(categories);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {

        fetchBooks();
    }, [meta.current, meta.pageSize, filter, sortQuery]);

    const fetchBooks = async () => {
        setIsLoading(true);
        let query = `current=${meta.current}&pageSize=${meta.pageSize}`;
        if (filter) {
            query += `&filter=${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await getBooksAPI(query);
        if (res.data) {
            setMeta({
                current: res.data?.meta.current,
                pageSize: res.data?.meta.pageSize,
                pages: res.data?.meta.pages,
                total: res.data?.meta.total,
            });
            setBooks(res.data?.result ?? []);
        }
        setIsLoading(false);
    };
    const handleOnChangePage = (pagination: { current: number; pageSize: number; }) => {
        if (pagination && pagination.current !== meta.current) {
            setMeta({
                ...meta,
                current: pagination.current,
            });
        }
        if (pagination && pagination.pageSize !== meta.pageSize) {
            setMeta({
                ...meta,
                pageSize: pagination.pageSize,
            });
        }
    }
    return (
        <>
            <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
                <Row gutter={[24, 20]}>
                    <Col
                        lg={2}
                        md={4}
                        sm={0}
                        xs={0}
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                            padding: "20px 16px",
                            minWidth: 240,
                            marginRight: 24,
                        }}
                    >
                        <div style={{ justifyContent: "space-between", display: "flex", alignItems: "center", marginBottom: 16 }}>
                            <span style={{ fontWeight: 600, fontSize: 18 }}><FilterTwoTone /> Bộ lọc tìm kiếm</span>
                            <ReloadOutlined style={{ fontSize: "20px", color: "#1890ff", cursor: "pointer" }} />
                        </div>
                        <Form>
                            <Form.Item label="Danh mục sản phẩm" name="category" labelCol={{ span: 24 }}>
                                <Checkbox.Group>
                                    <Row>
                                        {categories.map((category, index) => (
                                            <Col span={24} key={index} style={{ marginBottom: 8 }}>
                                                <Checkbox value={category.value}>{category.label}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider />
                            <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                                    <Form.Item name={["range", "from"]}>
                                        <InputNumber style={{ width: "100%" }} placeholder="đ TỪ" min={0} formatter={value =>
                                            value
                                                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        } />
                                    </Form.Item>
                                    <span style={{ alignSelf: "center" }}>-</span>
                                    <Form.Item name={["range", "to"]}>
                                        <InputNumber style={{ width: "100%" }} placeholder="đ ĐẾN" min={0} formatter={value =>
                                            value
                                                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        } />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Button type="primary" style={{ width: "100%" }}>
                                        Áp dụng
                                    </Button>
                                </div>
                            </Form.Item>
                            <Divider />
                            <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <div key={rating} style={{ marginBottom: 8, cursor: "pointer", padding: "4px 0" }}>
                                        <Rate value={rating} disabled style={{ color: "#ffce3d", fontSize: 14 }} />
                                        <span style={{ marginLeft: 8, fontSize: 14 }}>{rating === 5 ? "trở lên" : ""}</span>
                                    </div>
                                ))}
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col
                        lg={18}
                        md={20}
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                            padding: 24,
                        }}
                    >
                        <Spin spinning={isLoading} tip="Loading...">
                            <Row>
                                <Tabs defaultActiveKey="1" items={items}>
                                </Tabs>
                            </Row>
                            <Row>
                                {books.map((book) => (
                                    <Col key={book._id} xs={24} sm={12} md={8} lg={6} xl={4.8}>
                                        <div style={{
                                            border: "1px solid #e8e8e8",
                                            borderRadius: 8,
                                            padding: 16,
                                            background: "#fff",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            transition: "transform 0.2s, box-shadow 0.2s",
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                            }}
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/images/book/${book.thumbnail}`}
                                                alt={book.mainText}
                                                style={{
                                                    width: 120,
                                                    height: 160,
                                                    objectFit: "cover",
                                                    marginBottom: 16,
                                                    borderRadius: 4,
                                                    border: "1px solid #f0f0f0"
                                                }}
                                            />
                                            <div style={{
                                                fontWeight: 500,
                                                fontSize: 14,
                                                marginBottom: 8,
                                                textAlign: "center",
                                                lineHeight: "1.4",
                                                height: "2.8em",
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                color: "#333"
                                            }}>
                                                {book.mainText}
                                            </div>
                                            <div style={{
                                                fontWeight: 600,
                                                fontSize: 16,
                                                color: "#ff424e",
                                                marginBottom: 8
                                            }}>
                                                {new Intl.NumberFormat('vi-VN').format(book.price)} ₫
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    value={5}
                                                    style={{ color: "#ffce3d", fontSize: 12 }}
                                                />
                                            </div>
                                            <div style={{ fontSize: 12, color: "#888" }}>
                                                Đã bán {book.sold}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <Divider />
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination
                                    defaultCurrent={meta.current}
                                    total={meta.total}
                                    pageSize={meta.pageSize}
                                    responsive
                                    onChange={(page, pageSize) => {
                                        handleOnChangePage({ current: page, pageSize });
                                    }}
                                />
                            </Row>
                        </Spin>

                    </Col>

                </Row>
            </div>
        </>
    );
}
export default HomePage;