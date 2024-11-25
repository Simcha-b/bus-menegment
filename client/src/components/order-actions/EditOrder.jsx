import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditOrderModal from '../Orders/EditOrderModal';

function EditOrder({ order, fetchOrders }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        icon={<EditOutlined />}
        size="small"
      />
      <EditOrderModal 
        open={open} 
        onClose={() => {
          setOpen(false);
          fetchOrders();
        }}
        orderId={order.order_id}
      />
    </>
  );
}

export default EditOrder;
