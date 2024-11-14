import React, { useEffect, useState } from "react";
import { getCustomers } from "../../services/customersService";
import { Button, ConfigProvider, Table, Tag, Modal, Form, Input, List, Space } from "antd";
import heIL from "antd/lib/locale/he_IL";
import AddNewCustomer from "./AddNewCustomer";
import { getOrdersByCustomerId } from "../../services/ordersService";
import OrderDetails from "./OrderDetails";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { title } from "framer-motion/client";
import AddPaymentForm from "../payments/AddPaymentForm";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  //function to fetch customers from the server
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

  //function to handle the show orders button
  const handleShowOrders = async (record) => {
    const res = await getOrdersByCustomerId(record.customer_id);
    setOrders(res);
    setSelectedCustomerName(record.name);
    setOpen(true);
  };
  //function to handle the close button
  const handleClose = () => {
    setOpen(false);
  };
  //function to handle the order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  //function to handle the close order details
  const handleOrderDetailsClose = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };
  //function to handle the edit order
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsEditing(true);
  };
//function to handle the save order
  const handleSaveOrder = () => {
    // Implement save logic here, e.g., call an API to save the edited order
    setIsEditing(false);
    setEditingOrder(null);
  };

  //function to handle the edit customer
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setContacts(customer.contacts || []);
    setIsCustomerModalOpen(true);
  };

  //function to handle the save customer
  const handleSaveCustomer = () => {
    form.validateFields().then((values) => {
      // Implement save logic here, e.g., call an API to save the edited customer
      setIsCustomerModalOpen(false);
      setSelectedCustomer(null);
    });
  };

  //function to handle the close customer modal
  const handleCustomerModalClose = () => {
    setIsCustomerModalOpen(false);
    setSelectedCustomer(null);
  };

  //function to handle adding a new contact
  const handleAddContact = () => {
    setContacts([...contacts, newContact]);
    setNewContact({ name: "", phone: "" });
  };

  //function to handle removing a contact
  const handleRemoveContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleAddPayment = (order) => {
    setSelectedOrderForPayment(order);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
    setSelectedOrderForPayment(null);
  };

  const handlePaymentAdded = () => {
    // Refresh orders or perform any other necessary actions
    setIsPaymentModalOpen(false);
    setSelectedOrderForPayment(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  //columns for the main table
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
  {
    title:"מצב תשלומים",
    dataIndex:"payment_status",
    key:"payment_status",

  },
    {
      title: "ערוך פרטים",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => handleEditCustomer(record)}>
          ערוך
        </Button>
      ),
    }
  ];
  //columns for the orders table
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
    {
      title: "הוסף תשלום",
      key: "add_payment",
      render: (_, record) => (
        <Button onClick={() => handleAddPayment(record)}>הוסף תשלום</Button>
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
        title="ערוך פרטי לקוח"
        open={isCustomerModalOpen}
        onCancel={handleCustomerModalClose}
        onOk={handleSaveCustomer}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="שם" rules={[{ required: true, message: 'נא להזין שם' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="אימייל" rules={[{ required: true, message: 'נא להזין אימייל' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="טלפון" rules={[{ required: true, message: 'נא להזין טלפון' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="אנשי קשר">
            <List
              dataSource={contacts}
              renderItem={(contact, index) => (
                <List.Item
                  actions={[
                    <Button onClick={() => handleRemoveContact(index)}>מחק</Button>
                  ]}
                >
                  {contact.name} - {contact.phone}
                </List.Item>
              )}
            />
            <Space>
              <Input
                placeholder="שם"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <Input
                placeholder="טלפון"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
              <Button onClick={handleAddContact}>הוסף איש קשר</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="הוסף תשלום"
        open={isPaymentModalOpen}
        onCancel={handlePaymentModalClose}
        footer={null}
      >
        {selectedOrderForPayment && (
          <AddPaymentForm
            visible={isPaymentModalOpen}
            onClose={handlePaymentModalClose}
            onPaymentAdded={handlePaymentAdded}
            order={selectedOrderForPayment} // Pass the selected order
          />
        )}
      </Modal>
      </Box>
    </ConfigProvider>
  );
};

export default CustomersTable;
