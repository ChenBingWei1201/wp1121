import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import type { SongProps } from "./Song.tsx";
// import CardDialog from "./CardDialog.tsx";
import SongDialog from "./SongDialog.tsx";

type RowProps = {
  row: SongProps;
  index: number;
  isSelected: (name: string) => boolean;
  handleClick: (row: SongProps) => void;
};

export default function OnlyTable({
  row,
  index,
  isSelected,
  handleClick,
}: RowProps) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const isItemSelected = isSelected(row.id);
  const labelId = `${index}`;
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell onClick={() => handleClick(row)} padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell
          onClick={() => setOpenEdit(true)}
          component="th"
          id={labelId}
          key={labelId}
          scope="row"
          padding="normal"
        >
          {row.name}
        </TableCell>
        <TableCell onClick={() => setOpenEdit(true)} align="left">
          {row.singer}
        </TableCell>
        <TableCell align="left">
          <a href={row.link} target="_blank">
            {row.link}
          </a>
        </TableCell>
      </TableRow>
      <SongDialog
        variant="edit"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        name={row.name}
        singer={row.singer}
        link={row.link}
        playListId={row.playListID}
        songId={row.id}
      />
    </>
  );
}
