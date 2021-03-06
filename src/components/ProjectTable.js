import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { delete_project, get_projects } from "../api/map_api";
import { IconButton } from "@material-ui/core";
import { Delete, VisibilityRounded } from "@material-ui/icons";
import exel from "../asset/img/excel-logo-974BFF9CB9-seeklogo.com.png";
import json from "../asset/img/json.png";
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
      width: 250,
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
                      lat: props.row.lat,
                      lng: props.row.lng,
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
            <IconButton
              onClick={() => {
                exportData(props.row, "csv", props.row.project_name);
              }}
            >
              <img src={exel} alt="" width={20} height={20} />
            </IconButton>
            <IconButton
              onClick={() => {
                exportData(props.row, "json", props.row.project_name);
              }}
            >
              <img src={json} alt="" width={20} height={20} />
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
const exportData = (data, type, name) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${name}.${type}`;

  link.click();
};
