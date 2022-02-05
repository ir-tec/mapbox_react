import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { delete_project, get_projects } from "../api/map_api";
import { IconButton } from "@material-ui/core";
import { Delete, VisibilityRounded } from "@material-ui/icons";
import moment from "moment";
import Store from "../redux/Store";
import { set_route_to_edit } from "../redux/actions";
import { connect } from "react-redux";
import EditProjectName from "./EditProjectName";
const ProjectTable = ({
  set_open,
  set_routes,
  set_coordinates,
  set_add_project,
  set_routeCounter,
  set_edit_open,
  set_editing,
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
      field: "country",
      headerName: "Country",
      flex: 0.5,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
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
                  // set_draw(false);
                  res();
                  set_add_project((pre) => {
                    return {
                      ...pre,
                      project_type: props.row.routes[0].type,
                      project_mode: props.row.routes[0].mode,
                      is_add: true,
                    };
                  });
                  set_routes(props.row.routes[0].points);
                  Store.dispatch(set_route_to_edit(props.row._id));
                }).then(() => {
                  set_coordinates(props.row.routes[0].coordinates);
                  set_editing(true);
                  set_open(false);
                });
              }}
            >
              <VisibilityRounded />
            </IconButton>
            <IconButton
              onClick={() => {
                const { editRoute } = Store.getState();
                delete_project(props.row._id).then((res) => {
                  if (!res) return;
                  set_data((pre) =>
                    pre.filter((item) => item._id !== props.row._id)
                  );
                  if (editRoute === props.row._id) {
                    set_routeCounter(0);
                    set_coordinates([[]]);
                    Store.dispatch(set_route_to_edit(""));
                    set_add_project({ is_add: false });
                    set_editing(false);
                    set_routes([[]]);
                  }
                });
              }}
            >
              <Delete />
            </IconButton>
            <EditProjectName
              set_data={set_data}
              data={props.row}
              id={props.row._id}
            />
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
