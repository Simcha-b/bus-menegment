import { Table, ConfigProvider, Button } from "antd";
import heIL from "antd/lib/locale/he_IL";
import {
  formatDate,
  getFutureOrders,
  getOrders,
  getOrdersByDate,
  updateOrderStatus,
} from "../../services/ordersService";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import ChangeStatus from "../order-actions/ChangeStatus";
import DeleteOrder from "../order-actions/DeleteOrder";
import EditOrder from "../order-actions/EditOrder";
import ChooseYearAndMonth from "./ChooseYearAndMonth";

const statusColors = {
  הושלם: "green",
  בתהליך: "orange",
  בוטל: "red",
  "חסר שיבוץ": "gray",
};

function OrderTable({ tableType, year, month }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (tableType === "past") {
        const orders = await getOrdersByDate(year, month);
        setData(orders);
      } else if (tableType === "future") {
        const orders = await getFutureOrders();
        setData(orders);
      } else {
        const orders = await getOrders();
        setData(orders);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tableType, year, month]);

  const updateTags = () => {
    let tags = [];
    if (!data.company_id) tags.push("חסר שיבוץ");
    if (!data.paid) tags.push("לא שולם");
    if (!data.invoice) tags.push("לא הוגש חשבונית");
    if (!data.total_paid_customer) tags.push("שולם חלקית");
  };

  useEffect(() => {
    updateTags();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const dataSource = data.map((item) => ({
    ...item,
    key: item.order_id,
  }));

  const columns = [
    {
      title: "מספר הזמנה",
      dataIndex: "order_id",
      key: "order_id",
      sorter: (a, b) => a.order_id - b.order_id,
      width: "5%",
    },
    {
      title: "תאריך",
      dataIndex: "order_date",
      key: "order_date",
      sorter: (a, b) => new Date(a.order_date) - new Date(b.order_date),
      render: (text) => formatDate(text),
    },
    {
      title: "שם המזמין",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "שעת התחלה",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => text.slice(0, 5),
    },
    {
      title: "שעת סיום",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => text.slice(0, 5),
    },
    {
      title: "כמות אוטבוסים",
      dataIndex: "bus_quantity",
      key: "bus_quantity",
      width: "5%",
    },
    {
      title: "פרטי נסיעה",
      dataIndex: "trip_details",
      key: "trip_details",
    },
    {
      title: "מבצע",
      dataIndex: "company_name",
      key: "company_name",
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      render: (text) => text || "לא שובץ",
    },
    {
      title: "מצב הזמנה",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "פעולות",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <ChangeStatus
              order_id={record.order_id}
              fetchOrders={fetchOrders}
            /> */}

          <EditOrder order={record} fetchOrders={fetchOrders} />

          <DeleteOrder order_id={record.order_id} fetchOrders={fetchOrders} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      {tableType === "past" && (
        <>
          <h1>{`הזמנות חודש ${month}/${year}`}</h1>
        </>
      )}
      <ConfigProvider direction="rtl" locale={heIL}>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered={true}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
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
                  פרטי הנסיעה: {record.trip_details}
                </span>
                <span>סכום כולל: {record.total_price_customer}</span>
              </>
            ),
          }}
        />
      </ConfigProvider>
    </div>
  );
}

export default OrderTable;
