import React from "react";
import { Card, Descriptions } from "antd";

const OrderDetails = ({ order }) => {
  return (
    <Card>
      <Descriptions bordered column={1} dir="rtl">
        <Descriptions.Item label="מזהה הזמנה">
          {order.order_id}
        </Descriptions.Item>
        <Descriptions.Item label="תאריך">
          {new Date(order.order_date).toLocaleDateString("he-IL")}
        </Descriptions.Item>
        <Descriptions.Item label="פרטי הנסיעה">
          {order.trip_details}
        </Descriptions.Item>
        <Descriptions.Item label="מספר אוטבוסים ">
          {order.bus_quantity}
        </Descriptions.Item>
        <Descriptions.Item label="מחיר">
          {order.price_per_bus_customer}
        </Descriptions.Item>
        <Descriptions.Item label="מצב הזמנה">
          {order.is_paid ? "שולם" : "לא שולם"}
        </Descriptions.Item>
        <Descriptions.Item label="מבצע הנסיעה">
          {order.bus_company}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrderDetails;
