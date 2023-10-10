import * as React from "react";
import { useState } from "react";

import imageURL from "../images/music.jpg";
import type { CreateSongPayload } from "@lib/shared_types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import useSongs from "@/hooks/useSongs";
import { deleteSong } from "@/utils/client";

import OnlyTable from "./OnlyTable.tsx";
import type { SongProps } from "./Song.tsx";
import SongDialog from "./SongDialog";

type SongData = Omit<CreateSongPayload, "playListID">;

function stableSort<T>(array: readonly T[]) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof SongData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "singer",
    disablePadding: true,
    label: "Singer",
  },
  {
    id: "link",
    disablePadding: true,
    label: "Link",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      }
    </Toolbar>
  );
}

type PlayListTableProps = {
  id: string;
  name: string;
  description: string;
  songs: SongProps[];
  open: boolean;
  onClose: () => void;
  setListCardsClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PlayListTable({
  id,
  songs,
  open,
  name,
  description,
  onClose,
  setListCardsClosed,
}: PlayListTableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const { fetchSongs } = useSongs();
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = songs.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (row: SongProps) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    // console.log(newSelected);
    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const visibleRows = stableSort(songs).slice(0, 100);

  const finishViewing = (): void => {
    onClose();
    setListCardsClosed(false);
  };

  const handleDelete = async (selectedId: string[]) => {
    try {
      selectedId.forEach(async (id) => {
        await deleteSong(id); // bug
        await fetchSongs();
      });
      setSelected([]);
    } catch (error) {
      alert("Error: Failed to delete card");
    }
  };

  return (
    open && (
      <>
        <div className="flex w-screen flex-col">
          <div className="felx-row m-5 flex">
            <Box
              component="img"
              sx={{
                height: 300,
                width: 300,
                borderRadius: "12%",
              }}
              alt="muisc-image"
              src={imageURL}
            />
            <div className="max-w-8xl">
              <div className=" mb-0 ml-8 text-6xl text-slate-200">
                <Box
                  component="div"
                  sx={{
                    height: 50,
                    maxWidth: 1200,
                    minWidth: 200,
                  }}
                >
                  {name}
                </Box>
              </div>
              <div className="m-5 p-5 text-xl text-slate-200">
                <Box
                  component="div"
                  sx={{
                    height: 200,
                    maxWidth: 1200,
                    minWidth: 200,
                  }}
                >
                  {description}
                </Box>
              </div>
            </div>
          </div>
          <div className="m-0 flex flex-row-reverse p-1">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#32de84", fontWeight: 900, margin: 1 }}
              onClick={finishViewing}
            >
              Quit
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#32de84", fontWeight: 900, margin: 1 }}
              onClick={() => handleDelete(selected)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#32de84", fontWeight: 900, margin: 1 }}
              onClick={() => setOpenNewCardDialog(true)}
            >
              Add
            </Button>
          </div>
        </div>

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 500 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={songs.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => (
                    <OnlyTable
                      key={index}
                      row={row}
                      index={index}
                      isSelected={isSelected}
                      handleClick={handleClick}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <SongDialog
          variant="new"
          open={openNewCardDialog}
          onClose={() => setOpenNewCardDialog(false)}
          playListId={id}
        />
      </>
    )
  );
}
