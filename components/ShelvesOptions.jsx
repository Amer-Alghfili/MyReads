import React from "react";
import Dialog from "./Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { GiBookshelf } from "react-icons/gi";

const SHELVES = [
  { name: "Read", value: "read" },
  { name: "Want to read", value: "wantToRead" },
  { name: "Reading", value: "currentlyReading" },
];

export default function ShelvesOptions({ shelf, open, onClose }) {
  const [newShelf, setShelf] = React.useState(shelf);

  const optionsComponent = SHELVES.map(({ name, value }) => {
    return (
      <div
        key={value}
        className="hover:bg-green-400 transition duration-300 ease-in-out relative bg-green-300 px-8 py-4 m-4 rounded-lg"
      >
        <div className="relative flex flex-col items-center mb-5">
          <GiBookshelf className="text-5xl text-lime-800" />
          <div>{name}</div>
        </div>
        <FormControlLabel
          className="!m-0 absolute top-0 bottom-0 left-0 w-full flex !items-end justify-center"
          value={value}
          control={<Radio color="success" size="small" />}
        />
      </div>
    );
  });

  return (
    <div>
      <Dialog
        title="Select shelf"
        open={open}
        onClose={() => onClose(newShelf)}
      >
        <FormControl className="!p-8">
          <FormLabel id="shelf-control-options">Shelves options</FormLabel>
          <RadioGroup
            row
            aria-labelledby="shelf-control-options"
            name="position"
            defaultValue={shelf}
            onChange={(_, value) => setShelf(value)}
          >
            {optionsComponent}
          </RadioGroup>
        </FormControl>
      </Dialog>
    </div>
  );
}
