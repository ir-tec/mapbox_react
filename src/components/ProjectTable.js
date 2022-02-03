import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { delete_project, get_projects } from "../api/map_api";
import { IconButton } from "@material-ui/core";
import { Delete, VisibilityRounded } from "@material-ui/icons";
import moment from "moment";
import Store from "../redux/Store";
import { set_route_to_edit } from "../redux/actions";
import { connect } from "react-redux";
const ProjectTable = ({
  set_open,
  set_routes,
  set_coordinates,
  set_add_project,
  editRoute,
  set_edit_open,
}) => {
  const [data, set_data] = React.useState([]);

  React.useEffect(() => {
    get_projects().then((res) => {
      if (!res) return;

      set_data(res);
    });
  }, []);

  const columns = [
    { field: "project_name", headerName: "Name", minWidth: 200, flex: 0.5 },
    {
      field: "mode",
      headerName: "Mode",
      flex: 0.5,

      renderCell: (props) => {
        return props.row.routes[0].mode;
      },
      sortable: false,
    },
    {
      field: "type",
      headerName: "Type",

      flex: 0.5,

      renderCell: (props) => {
        return props.row.routes[0].type === "directions/v5"
          ? "Directions"
          : "Optimized";
      },
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      minWidth: 200,
      flex: 0.5,
      renderCell: (props) => moment(props.value).format("YYYY / MMM / D"),
      sortable: false,
    },
    {
      field: "_id",
      headerName: "Actions",
      width: 200,
      renderCell: (props) => {
        return (
          <>
            <IconButton
              onClick={() => {
                set_edit_open(false);
                new Promise((res, rej) => {
                  set_coordinates([[]]);
                  res();
                  set_routes(props.row.routes[0].points);
                  Store.dispatch(set_route_to_edit(props.row._id));
                }).then(() => {
                  set_coordinates(props.row.routes[0].coordinates);
                  set_add_project((pre) => {
                    return {
                      ...pre,
                      project_type: props.row.routes[0].type,
                    };
                  });
                  set_open(false);
                });
              }}
            >
              <VisibilityRounded />
            </IconButton>
            <IconButton
              onClick={() => {
                delete_project(props.row._id).then((res) => {
                  if (!res) return;
                  set_data((pre) =>
                    pre.filter((item) => item._id !== props.row._id)
                  );
                  set_coordinates([[]]);
                  if (editRoute === props.row._id) {
                    Store.dispatch(set_route_to_edit(""));
                  }
                  set_routes([[]]);
                });
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
      sortable: false,
    },
  ];

  return (
    <DataGrid
      rows={data}
      disableColumnMenu
      disableSelectionOnClick
      columns={columns}
      hideFooter
      getRowId={(row) => row._id}
      style={{ height: "70vh" }}
    />
  );
};
const mapStateToProps = ({ editRoute }) => {
  return { editRoute };
};
export default connect(mapStateToProps)(ProjectTable);
