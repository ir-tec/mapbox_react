import { makeStyles, useMediaQuery } from "@material-ui/core";

const drawerWidth = 320;
export const styles = makeStyles((theme) => ({
  Autocomplete: {
    fontSize: 14,
  },
  RadioLabel: {
    fontSize: 14,
  },
  checkLabel: {
    fontSize: 14,
  },
  rootAvatar: {
    backgroundColor: "#F6F8FC",
    color: "black",
    fontSize: "13px",
  },
  Drawer: {
    width: drawerWidth,
  },
  LayoutRoot: {
    display: "flex",
    minHeight: "100vh",
  },
  LayoutChildren: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#ECF5FF",
  },
  Avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: "5px",
  },
  dropBox: {
    color: theme.palette.text.secondary,
    fontSize: "16px",
  },
  DropzoneArea: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  customDropzoneClass: {
    borderRadius: "16px",
  },
  DropzoneAreaRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  usSelectedContentType: {
    color: "#6c31e8",
    backgroundColor: "#e7defa",
    cursor: "pointer",
    borderRadius: "50px",
  },
  selectedContentType: {
    borderRadius: "50px",
    color: "#e7defa",
    backgroundColor: "#6c31e8",
    cursor: "pointer",
  },
  tableContainer: {
    Width: "100%",
    backgroundColor: "white",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  TableRow: {
    // width: "100%",
    // display: "flex",
    // justifyContent: "space-between",
    borderBottom: "unset",
    borderTop: "unset",
  },
  TableCell: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // padding: "0",
    // overflow: "hidden",
    borderBottom: "unset",
    borderTop: "unset",
  },
  tabsIndicator: { width: "20%" },
  TextField: {
    fontSize: "50px",
  },
  buttonLabel: {
    textTransform: "capitalize",
  },
  ckeckbox: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  gender: {
    padding: "6px",
    marginLeft: "10px",
    backgroundColor: "blue",
  },
  searchTextField: {
    border: "unset",
  },
}));
export let DashboardWidth = () => {
  let width;
  let sm = useMediaQuery("(min-width : 600px)");
  let md = useMediaQuery("(min-width : 900px)");
  let lg = useMediaQuery("(min-width : 1200px)");
  let xl = useMediaQuery("(min-width : 1500px)");
  if (xl) {
    width = "xl";
  } else if (lg) {
    width = "lg";
  } else if (md) {
    width = "md";
  } else if (md) {
    width = "md";
  } else if (sm) {
    width = "sm";
  }

  return { width };
};
