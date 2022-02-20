import React from "react";
import {
  Dialog,
  Typography,
  Grid,
  Slide,
  Divider,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Close, Delete } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

import { delete_user, get_users } from "../../api/users_api";

const ManageUSers = () => {
  const [open, setOpen] = React.useState(false);
  const [data, set_data] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
    get_users().then((res) => {
      if (!res) return;
      set_data(res);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "username",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
      renderCell: (prop) => {
        return (
          <Grid container alignItems="center">
            <Avatar src={prop.row.photo} />
            <Typography style={{ marginLeft: 16 }} variant="body1">
              {prop.value}
            </Typography>
          </Grid>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone number",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 200,

      renderCell: (props) => moment(props.value).format("YYYY / MMM / D"),
      sortable: false,
    },
    {
      field: "_id",
      headerName: "Actions",
      width: 250,
      renderCell: (props) => {
        return (
          <>
            {JSON.parse(localStorage.user_info).email !== props.row.email ? (
              <IconButton
                onClick={() => {
                  delete_user(props.row._id).then((res) => {
                    if (!res) return;
                    set_data((pre) =>
                      pre.filter((item) => item._id !== props.row._id)
                    );
                  });
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              <Typography variant="body2">Admin</Typography>
            )}
          </>
        );
      },
      sortable: false,
    },
  ];
  return (
    <>
      <Typography variant="body1" onClick={handleOpen}>
        Users Management
      </Typography>

      <Dialog
        fullWidth={true}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container style={{}}>
          <Grid container spacing={5} style={{ margin: "0px auto" }}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">User Management</Typography>
              <IconButton onClick={handleClose}>
                <Close color="primary" fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} container>
              <Grid item container>
                <Typography variant="h4">Users</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <DataGrid
              rows={data}
              disableColumnMenu
              disableSelectionOnClick
              columns={columns}
              hideFooter
              getRowId={(row) => row._id}
              style={{ height: "70vh" }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ManageUSers;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
