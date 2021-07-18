import { useState } from "react";
import GlobalContext from "./globalContext";

// provider
export const GlobalProvider = (props) => {
  // All of the data from NASA api
  const [eventData, setEventData] = useState([]);
  // Store the event that the user wants to see
  const [selectedEvent, setSelectedEvent] = useState(8);

  const value = {
    eventData,
    setEventData,
    selectedEvent,
    setSelectedEvent,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
