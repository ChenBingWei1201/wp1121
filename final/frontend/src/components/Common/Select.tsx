import * as React from "react";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const articleTags = [
  "Life",
  "Evalutaion",
  "ACG",
  "Programming",
  "Tech News",
  "Recruit",
];

function getStyles(
  name: string,
  tagName: readonly (string | null)[],
  theme: Theme,
) {
  return {
    fontWeight:
      tagName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type MultipleSelectChipProps = {
  tags: any;
  setTags?: (tags: any) => void;
};

const MultipleSelectChip = ({ tags, setTags }: MultipleSelectChipProps) => {
  const theme = useTheme();
  // const [tagName, setTagName] = React.useState<string[]>(tags);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    if (setTags)
      setTags(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value,
      );
    // else
    // setTagName(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value,
    // );
  };

  return (
    <>
      <FormControl sx={{ m: 2, width: 300, marginLeft: "15%" }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          disabled={setTags ? false : true}
        >
          {articleTags.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, tags, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default MultipleSelectChip;
