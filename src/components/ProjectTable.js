import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { get_projects } from "../api/map_api";
import { IconButton } from "@material-ui/core";
import { VisibilityRounded } from "@material-ui/icons";
import moment from "moment";
const ProjectTable = ({
  set_open,
  set_routes,
  set_coordinates,
  set_add_project,
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
          <IconButton
            onClick={() => {
              set_routes(props.row.routes[0].points);
              set_coordinates(props.row.routes[0].coordinates);
              set_open(false);
              set_add_project((pre) => {
                return { ...pre, project_type: props.row.routes[0].type };
              });
            }}
          >
            <VisibilityRounded />
          </IconButton>
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

export default ProjectTable;
