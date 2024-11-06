import React from "react";
import { deleteOrder } from "../../services/ordersService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DeleteOrder({ order_id }) {
  const [confrimDelete, setConfirmDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (confrimDelete) {
      deleteOrder(order_id);
    }
    handleClose();
    setConfirmDelete(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        מחק
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"האם אתה בטוח שברצונך למחוק את ההזמנה?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            לא תוכל לשחזר את הפעולה
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול </Button>
          <Button onClick={handleDelete} autoFocus>
            אני רוצה למחוק
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteOrder;
