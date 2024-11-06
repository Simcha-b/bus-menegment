import { Table, ConfigProvider, Button, } from "antd";
import heIL from "antd/lib/locale/he_IL";
import {
  formatDate,
  getFutureOrders,
  getOrders,
  getOrdersByDate,
  updateOrderStatus,
} from "../../services/ordersService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Select, FormControl, InputLabel, MenuItem } from "@mui/material";

const statusColors = {
  "הושלם": "green",
  "בתהליך": "orange",
  "בוטל": "red",
  "חסר שיבוץ": "gray",
};

function OrderTable({ past, future, year, month }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    console.log(data);
    try {
      if (past) {
        const orders = await getOrdersByDate(year, month);
        setData(orders);
      } else if (future) {
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
  }, [past, future, year, month]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      // לאחר עדכון הסטטוס בשרת, רענן את הנתונים מהשרת
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

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

  // const names =
  //   dataSource.map((item) => {
  //     return {
  //       text: item.name,
  //       value: item.name,
  //     };
  //   });

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
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "שעת התחלה",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "שעת סיום",
      dataIndex: "end_time",
      key: "end_time",
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
    },
    {
      title: "סטטוס",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record) => (
        <FormControl fullWidth>
        <InputLabel id="status">סטטוס</InputLabel>
        <Select
          labelId="status"
          value={text}
          label="status"
          onChange={(event) => handleStatusChange(record.order_id, event.target.value)}
        >
          {Object.keys(statusColors).map((status) => (
            <MenuItem key={status} value={status} style={{ color: statusColors[status] }}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ),
    },
    {
      title: "פעולות",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => {
              navigate(`/orders/:${record.order_id}`, {
                state: {
                  order: record,
                },
              });
            }}
          >
            ערוך
          </Button>
          <Button>מחק</Button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <Table columns={columns} dataSource={dataSource} bordered={true} />
    </ConfigProvider>
  );
}

export default OrderTable;
