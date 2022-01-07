import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncFilteredHistoricalData } from "../redux/slices/historicalDataSlice";
import { fetchAsyncFilteredForecastData } from "../redux/slices/forecastDataSlice";
import { getPlaces } from "../redux/slices/placesSlice";

export default function DropdownMenu() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const places = useSelector(getPlaces);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filterData = async (event) => {
    dispatch(fetchAsyncFilteredHistoricalData(event.target.innerText));
    dispatch(fetchAsyncFilteredForecastData(event.target.innerText));
    handleClose(event);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Place filter
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.keys(places).length !== 0
          ? places.map((item, id) => {
              return (
                <MenuItem key={id} onClick={filterData}>
                  {item}
                </MenuItem>
              );
            })
          : null}
      </Menu>
    </div>
  );
}
