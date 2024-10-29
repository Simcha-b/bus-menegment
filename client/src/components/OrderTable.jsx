import { Table, ConfigProvider } from "antd";
import heIL from "antd/lib/locale/he_IL";
import moment from "moment";
  
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
      title: "ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "תאריך",
      dataIndex: "reservation_date",
      key: "reservation_date",
      sorter: (a, b) =>
        moment(a.reservation_date, "YYYY-MM-DD").unix() -
        moment(b.reservation_date, "YYYY-MM-DD").unix(),
      render: (text) => moment(text).format("DD/MM/YYYY"), // מציג את התאריך בפורמט יום/חודש/שנה
    },
    {
      title: "שם",
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
      title: "חברת אוטובוסים",
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
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <Table columns={columns} dataSource={data} />
    </ConfigProvider>
  );
}

export default OrderTable;
