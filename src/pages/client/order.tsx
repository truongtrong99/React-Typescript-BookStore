import OrderDetail from "@/components/client/order/order.detail";
import Payment from "@/components/client/order/payment";
import { Steps } from "antd";
import { useState } from "react";


const OrderPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const items = [
        {
            title: 'Giỏ hàng',
        },
        {
            title: 'Đặt hàng',
        },
        {
            title: 'Thanh toán',
        },
    ];
    return (
        <>
            <div style={{ padding: 24, background: '#f7f7f7', minHeight: '100vh', margin: '0 auto', maxWidth: '1200px' }}>
                <Steps current={currentStep} items={items} />
                {
                    currentStep === 0 && (
                        <OrderDetail currentStep={currentStep} setCurrentStep={setCurrentStep} />
                    )
                }
                {
                    currentStep === 1 && (
                        <Payment currentStep={currentStep} setCurrentStep={setCurrentStep} />
                    )
                }

            </div>
        </>
    );
}

export default OrderPage;