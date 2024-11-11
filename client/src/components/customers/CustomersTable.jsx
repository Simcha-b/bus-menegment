import React, { useEffect, useState } from "react";
import { addNewCustomer, getCustomers } from "../../services/customersService";
import { Button, ConfigProvider, Table, Tag } from "antd";
import heIL from "antd/lib/locale/he_IL";
import AddNewCustomer from "./AddNewCustomer";
import { getOrdersByCustomerId } from "../../services/ordersService";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
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
  
// const hendleShowOrders = async (record) => {
//     const res = await getOrdersByCustomerId(record.customer_id);
//     console.log(res);

//   }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // handleClose

  const columns = [
    {
      title: "שם",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   key: "phone",
    // },
    {
      title: "פעולות",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          // onClick={}
        >
          הצג פירוט נסיעות
        </Button>
      ),
    },
    {
      title: "סטטוס",
      dataIndex: "status",
      key: "status",
      render: () => (
        <>
          <Tag color={"red"}>חוב פתוח</Tag> <Tag color={"green"}>שולם</Tag>
        </>
      ),
    },
  ];
  const title = "Customers";
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
    </ConfigProvider>
  );
};

export default CustomersTable;
