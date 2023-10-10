import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

import HeaderBar from "@/components/HeaderBar";
import PlayListCard from "@/components/PlayListCard";
import useSongs from "@/hooks/useSongs";

import NewPlayListDialog from "./components/NewPlayListDialog";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-top: 20px;
  }
`;

function App() {
  const { playlists, fetchPlayLists, fetchSongs, listCardsClosed } = useSongs();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  useEffect(() => {
    fetchPlayLists();
    fetchSongs();
  }, [fetchSongs, fetchPlayLists]);

  return (
    <>
      <HeaderBar />
      {!listCardsClosed && (
        <div>
          <Wrapper>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              My Playlists
            </Typography>
            <div className="mx-2">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#32de84", fontWeight: 900 }}
                onClick={() => setNewListDialogOpen(true)}
              >
                Add
              </Button>
            </div>
            {!deleteMode && (
              <div className="mx-2">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#32de84", fontWeight: 900 }}
                  onClick={() => setDeleteMode(true)}
                >
                  Delete
                </Button>
              </div>
            )}
            {deleteMode && (
              <div className="mx-2">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#32de84", fontWeight: 900 }}
                  onClick={() => setDeleteMode(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </Wrapper>
        </div>
      )}
      <NewPlayListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
      />
      <main className="mx-auto flex max-h-full flex-row flex-wrap gap-10 px-12 py-8">
        {playlists.map((list) => (
          <PlayListCard key={list.id} {...list} deleteMode={deleteMode} />
        ))}
      </main>
    </>
  );
}

export default App;
