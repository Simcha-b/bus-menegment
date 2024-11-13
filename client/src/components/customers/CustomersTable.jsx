import React, { useEffect, useState } from "react";
import { getCustomers } from "../../services/customersService";
import { Button, ConfigProvider, Table, Tag, Modal } from "antd";
import heIL from "antd/lib/locale/he_IL";
import AddNewCustomer from "./AddNewCustomer";
import { getOrdersByCustomerId } from "../../services/ordersService";
import OrderDetails from "./OrderDetails";
import { Box } from "@mui/system";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

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
    setSelectedCustomerName(record.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleOrderDetailsClose = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsEditing(true);
  };

  const handleSaveOrder = () => {
    // Implement save logic here, e.g., call an API to save the edited order
    setIsEditing(false);
    setEditingOrder(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      title: "שם",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "אימייל",
      dataIndex: "email",
      key: "email",
      width: "15%",
    },
    {
      title: "טלפון",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
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
      width: "20%",
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
      title: "ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "תאריך",
      dataIndex: "order_date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString("he-IL"),
    },
    {
      title: "פרטי הנסיעה",
      dataIndex: "trip_details",
      key: "trip_details",
    },
    {
      title: "סכום",
      dataIndex: "price_per_bus_customer",
      key: "amount",
    },
    {
      title: "מצב הזמנה",
      dataIndex: "is_paid",
      key: "is_paid",
      render: (is_paid) => (is_paid ? "שולם" : "לא שולם"),
    },
    {
      title: "ערוך",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => handleEditOrder(record)}>ערוך</Button>
      ),
    },
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <Box>
        <Box mb={2}>
          <AddNewCustomer customers={customers} setCustomers={setCustomers} />
        </Box>
        <Table
          dataSource={customers.map((customer, index) => ({
            ...customer,
            key: index,
          }))}
          expandable={{}}
          columns={columns}
          bordered={true}
        />

      <Modal
        title={`פירוט נסיעות - ${selectedCustomerName}`}
        open={open}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            סגור
          </Button>,
        ]}
        width="90%"
      >
        <Table
          dataSource={orders}
          columns={ordersColumns}
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleOrderClick(record),
            style: { cursor: "pointer" },
          })}
        />
      </Modal>

      <Modal
        title="פרטי נסיעה"
        open={showOrderDetails}
        onCancel={handleOrderDetailsClose}
        footer={[
          <Button key="close" onClick={handleOrderDetailsClose}>
            סגור
          </Button>,
        ]}
        width="80%"
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>

      <Modal
        title="ערוך פרטי נסיעה"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={[
          <Button key="save" type="primary" onClick={handleSaveOrder}>
            שמור
          </Button>,
          <Button key="cancel" onClick={() => setIsEditing(false)}>
            בטל
          </Button>,
        ]}
        width="80%"
      >
        {editingOrder && (
          <OrderDetails order={editingOrder} editable={true} setOrder={setEditingOrder} />
        )}
      </Modal>
      </Box>
    </ConfigProvider>
  );
};

export default CustomersTable;
