import { useState } from "react";
import MediaWrappedInputs from "./components/MediaWrappedInputs";
import MediaWrappedOutputs from "./components/MediaWrappedOutputs";
import { Category } from "./types/Category";
import { MediaItem } from "./interfaces/MediaItem";

function App() {
  const [mediaLists, setMediaLists] = useState<Record<Category, MediaItem[]>>({
    movies: [],
    tvShows: [],
    books: [],
    albums: [],
    songs: [],
  });

  return (
    <>
      <MediaWrappedInputs
        mediaLists={mediaLists}
        setMediaLists={setMediaLists}
      />
      <MediaWrappedOutputs mediaLists={mediaLists} />
    </>
  );
}

export default App;
