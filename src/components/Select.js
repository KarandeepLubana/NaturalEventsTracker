import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GlobalContext from "../context/globalContext"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    backgroundColor: "white",
    position: "absolute",
    // top: "20px",
    // left: "0px"
    // padding: "1px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const {setSelectedEvent} = useContext(GlobalContext)

  const classes = useStyles();
  const [selected, setSelected] = React.useState(8);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setSelectedEvent(event.target.value);
  };

  return (
    <div className="select">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
        <Select
          value={selected}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={8}>Wildfires</MenuItem>
          <MenuItem value={12}>Volcanoes</MenuItem>
          <MenuItem value={15}>Sea And Lake Ice</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
