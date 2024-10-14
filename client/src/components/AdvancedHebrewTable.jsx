import React, { useState, useRef } from "react";
import { Table, Input, Button, Space, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import heIL from "antd/lib/locale/he_IL";
import moment from "moment";

function AdvancedHebrewTable(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null); // פוקוס לשדה החיפוש

  const data = props.data;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`חיפוש ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            חיפוש
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            איפוס
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          // יש להוסיף כאן לוגיקה לפוקוס על שדה הקלט אם נדרש
        }, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "reservation_id",
      key: "reservation_id",
      ...getColumnSearchProps("reservation_id"),
    },
    {
      title: "תאריך",
      dataIndex: "reservation_date",
      key: "reservation_date",
      ...getColumnSearchProps("reservation_date"),
      sorter: (a, b) =>
        moment(a.reservation_date, "YYYY-MM-DD").unix() -
        moment(b.reservation_date, "YYYY-MM-DD").unix(),
      render: (text) => moment(text).format("DD/MM/YYYY"), // מציג את התאריך בפורמט יום/חודש/שנה
    },
    {
      title: "שם",
      dataIndex: "institution_name",
      key: "institution_name",
      ...getColumnSearchProps("institution_name"),
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
      ...getColumnSearchProps("bus_quantity"),
    },
    {
      title: "פרטי נסיעה",
      dataIndex: "trip_details",
      key: "trip_details",
      ...getColumnSearchProps("trip_details"),
    },
    {
      title: "חברת אוטובוסים",
      dataIndex: "company_name",
      key: "company_name",
      ...getColumnSearchProps("company_name"),
    },
  ];

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <Table columns={columns} dataSource={data} />
    </ConfigProvider>
  );
}

export default AdvancedHebrewTable;
