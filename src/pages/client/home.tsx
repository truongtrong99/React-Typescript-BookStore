import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';

const HomePage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Popular',
            children: <></>,
        },
        {
            key: '2',
            label: 'New',
            children: <></>,
        },
        {
            key: '3',
            label: 'Price: Low to High',
            children: <></>,
        },
        {
            key: '4',
            label: 'Price: High to Low',
            children: <></>,
        },
    ];
    return (
        <>
            <div style={{ padding: "20px" }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0} style={{ border: "1px solid green", padding: "10px" }}>
                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                            <span><FilterTwoTone /> Filter</span>
                            <ReloadOutlined style={{ fontSize: "20px", color: "blue" }} />
                        </div>
                        <Form>
                            <Form.Item label="Category" name="category" labelCol={{ span: 24 }}>
                                <Checkbox.Group>
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="A">A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="B">B</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="C">C</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="D">D</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider />
                            <Form.Item label="Price Range" labelCol={{ span: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item name={["range", "from"]}>
                                        <InputNumber style={{ width: "100%" }} placeholder="Min" min={0} formatter={value =>
                                            value
                                                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        } />
                                    </Form.Item>
                                    <span>-</span>
                                    <Form.Item name={["range", "to"]}>
                                        <InputNumber style={{ width: "100%" }} placeholder="Max" min={0} formatter={value =>
                                            value
                                                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''
                                        } />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Button type="primary" style={{ width: "100%" }}>
                                        Apply
                                    </Button>
                                </div>
                            </Form.Item>
                            <Divider />
                            <Form.Item label="Rating" labelCol={{ span: 24 }}>
                                <div>
                                    <Rate value={5} disabled style={{ color: "#ffce3d" }} />
                                    <span></span>
                                </div>
                                <div>
                                    <Rate value={4} disabled style={{ color: "#ffce3d" }} />
                                    <span></span>
                                </div>
                                <div>
                                    <Rate value={3} disabled style={{ color: "#ffce3d" }} />
                                    <span></span>
                                </div>
                                <div>
                                    <Rate value={2} disabled style={{ color: "#ffce3d" }} />
                                    <span></span>
                                </div>
                                <div>
                                    <Rate value={1} disabled style={{ color: "#ffce3d" }} />
                                    <span></span>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col md={20} xs={24} style={{ border: "1px solid red", padding: 16, }}>
                        <Row>
                            <Tabs defaultActiveKey="1" items={items}>
                            </Tabs>
                        </Row>
                        <Row>
                            {[1, 2, 3, 4, 5].map((id) => (
                                <Col key={id} xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 20 }}>
                                    <div style={{
                                        border: "1px solid #e8e8e8",
                                        borderRadius: 8,
                                        padding: 16,
                                        background: "#fff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}>
                                        <img
                                            src={`https://placehold.co/120x160?text=Book+${id}`}
                                            alt={`Book ${id}`}
                                            style={{ width: 120, height: 160, objectFit: "cover", marginBottom: 16, borderRadius: 4 }}
                                        />
                                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, textAlign: "center" }}>
                                            Book Title {id}
                                        </div>
                                        <div style={{ color: "#888", fontSize: 14, marginBottom: 8, textAlign: "center" }}>
                                            Author Name
                                        </div>
                                        <div style={{ fontWeight: 500, fontSize: 16, color: "#1890ff", marginBottom: 8 }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((10 + id * 5) * 1000)}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <Rate allowHalf disabled defaultValue={4.5 - (id % 5) * 0.5} style={{ color: "#ffce3d", fontSize: 16 }} />
                                            <span style={{ fontSize: 13, color: "#888" }}>{(100 + id * 7)} sold</span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Divider />
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                defaultCurrent={6}
                                total={500}
                                showSizeChanger
                                responsive
                                pageSizeOptions={[10, 20, 30]}
                                onChange={(page, pageSize) => {
                                    console.log(page, pageSize);
                                }}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default HomePage;