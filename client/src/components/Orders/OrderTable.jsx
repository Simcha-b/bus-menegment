import { Table, ConfigProvider } from "antd";
import heIL from "antd/lib/locale/he_IL";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
import { formatDate } from "../../services/ordersService";

function OrderTable(props) {

  
  const data = props.data;
  const names = data.map((item) => {
    return {
      text: item.institution_name,
      value: item.institution_name,
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
      sorter: (a, b) => a.order_date - b.order_date,
      render: (text) => formatDate(text),
    },
    {
      title: "שם המזמין",
      dataIndex: "institution_name",
      key: "institution_name",
      sorter: (a, b) => a.institution_name.localeCompare(b.institution_name),
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
          <EditOrder order={record} />
          <DeleteOrder order={record} />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <Table columns={columns} dataSource={data} bordered={true} />
    </ConfigProvider>
  );
}

export default OrderTable;
