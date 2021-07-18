import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLating,
} from "react-places-autocomplete";

const Search = () => {
  const [address, setAdress] = useState("");
  const handleSelect = async (value) => {};
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAdress}
        onSelect={handleSelect}
      ></PlacesAutocomplete>
    </div>
  );
};

export default Search;
