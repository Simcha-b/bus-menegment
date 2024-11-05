import { Table, ConfigProvider, Button } from "antd";
import heIL from "antd/lib/locale/he_IL";
import DeleteOrder from "./DeleteOrder";
import { formatDate, getOrders } from "../../services/ordersService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

 function OrderTable(props) {
  const navigate = useNavigate();
  const { isLoading, error, data } =  useQuery({
    queryKey: ["repoData"],
    queryFn: () => getOrders(),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const dataSource = data.map((item) => ({
    ...item,
    key: item.order_id,
  }));

  const names = dataSource.map((item) => {
    return {
      text: item.name,
      value: item.name,
    };
  });

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
      filters: names,
      filterMode: "tree",
      filterSearch: true,
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

          <DeleteOrder order={record} />
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
