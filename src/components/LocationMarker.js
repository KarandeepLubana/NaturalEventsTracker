import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import fireIcon from "@iconify/icons-mdi/fire-alert";
import volcanoIcon from "@iconify-icons/fxemoji/volcano"
import iceIcon from "@iconify/icons-emojione/snowflake"
import GlobalContext from "../context/globalContext";


// Memoizing LocationMarker is important here. If its it not here then
// it will cause infinite rendering loop causing the app to crash
// The google-maps-react api re-renders everything where zoom or something else is
// changed on the map causing it to renderer to be unable to keep up with the renders
const LocationMarker = React.memo(({ lat, lng, $hover, title }) => {
  const {selectedEvent} = useContext(GlobalContext)
  let icon = null;
  if (selectedEvent === 8){
    icon = fireIcon
  } else if (selectedEvent === 12) {
    icon = volcanoIcon
  } else if (selectedEvent === 15) {
    icon = iceIcon
  }

  return (
    <div className="location-marker" data-tooltip={title}>
      {/* {$hover ? console.log("On Hover") : console.log("No hover")} */}
      <Icon icon={icon} className={"location-icon"} />
    </div>
  );
});

export default LocationMarker;
