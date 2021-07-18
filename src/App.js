import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import GlobalContext from "./context/globalContext"

function App() {
  const { eventData, setEventData, selectedEvent } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
      );

      setEventData(response.data.events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Set up geo-features
  const temp = eventData.map((e) => {
    if (e.categories[0].id === selectedEvent) {
      return {
        type: "Feature",
        properties: {
          cluster: false,
          eventId: e.id,
          category: e.categories[0].title,
          title: e.title,
        },
        geometry: { type: "Point", coordinates: e.geometries[0].coordinates },
      };
    }
    return null
  });

  const points = temp.filter((point) => point !== null)



  return (
    <div className="App">
      {!loading ? <Map points={points} /> : <Loader />}
    </div>
  );
}

export default App;
