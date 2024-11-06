import React from "react";
import { deleteOrder } from "../../services/ordersService";
import { Button } from "@mui/material";

function DeleteOrder({ order_id }) {
  return (
    <div>
      <Button
      variant="outlined"
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
