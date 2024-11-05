import React from "react";
import { deleteOrder } from "../../services/ordersService";
import { Button } from "antd";

function DeleteOrder({ order_id }) {
  return (
    <div>
      <Button
        onClick={() => {
          deleteOrder(order_id);
        }}
      >
        מחק
      </Button>
    </div>
  );
}

export default DeleteOrder;
