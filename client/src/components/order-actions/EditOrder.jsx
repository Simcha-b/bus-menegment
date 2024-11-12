import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function EditOrder({ order }) {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/orders/:${order.order_id}`, {
            state: {
              order: order,
            },
          });
        }}
      >
        עדכן פרטים
      </Button>
    </div>
  );
}

export default EditOrder;
