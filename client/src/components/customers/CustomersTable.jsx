import React, { useEffect, useState } from "react";
import { addNewCustomer, getCustomers } from "../../services/customersService";
import { Button, ConfigProvider, Table, Tag, Modal } from "antd";
import heIL from "antd/lib/locale/he_IL";
import AddNewCustomer from "./AddNewCustomer";
import { getOrdersByCustomerId } from "../../services/ordersService";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const customers = await getCustomers();
      setCustomers(
        customers.map((customer, index) => ({ ...customer, key: index }))
      );
      console.log(customers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const handleShowOrders = async (record) => {
    const res = await getOrdersByCustomerId(record.customer_id);
    setOrders(res);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      title: "שם",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "פעולות",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleShowOrders(record)}
          key={`action-${record.key}`}
        >
          הצג פירוט נסיעות
        </Button>
      ),
    },
    {
      title: "סטטוס",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <Tag color={"red"} key={`tag-red-${record.key}`}>
            חוב פתוח
          </Tag>
          <Tag color={"green"} key={`tag-green-${record.key}`}>
            שולם
          </Tag>
        </>
      ),
    },
  ];

  const ordersColumns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Date",
      dataIndex: "order_date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "price_per_bus_customer",
      key: "amount",
    },
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <AddNewCustomer customers={customers} setCustomers={setCustomers} />
      <Table
        dataSource={customers.map((customer, index) => ({
          ...customer,
          key: index,
        }))}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <span
                style={{
                  display: "block",
                  marginBottom: 16,
                  color: "black",
                }}
              >
                אימייל : {record.email}
              </span>
              <span>מספר טלפון: {record.phone}</span>
            </>
          ),
        }}
        columns={columns}
        bordered={true}
      />
      <Modal
        title="פירוט נסיעות"
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            סגור
          </Button>,
        ]}
      >
        <Table dataSource={orders} columns={ordersColumns} pagination={false} />
      </Modal>
    </ConfigProvider>
  );
};

export default CustomersTable;
