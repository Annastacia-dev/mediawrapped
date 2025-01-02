import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Category } from "@/types/Category";
import { MediaItem } from "@/interfaces/MediaItem";
import MediaList from "./MediaList";

const MediaWrappedInputs = ({
  mediaLists,
  setMediaLists,
}: {
  mediaLists: Record<Category, MediaItem[]>;
  setMediaLists: (mediaLists: Record<Category, MediaItem[]>) => void;
}) => {
 
  const addItem = (category: Category, item: MediaItem) => {
    if (mediaLists[category].length < 4) {
      // @ts-ignore
      setMediaLists((prev: Record<Category, MediaItem[]>) => {
        const updatedLists: Record<Category, MediaItem[]> = {
          ...prev,
          [category]: [...prev[category], item],
        };
        return updatedLists;
      });
    }
  };
  

  return (
    <div className="bg-background text-foreground py-8">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardDescription>Add your top 4 in each category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="movies">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="tvShows">TV Shows</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="songs">Songs</TabsTrigger>
              </TabsList>
              <TabsContent value="movies">
                <MediaList
                  category="movies"
                  items={mediaLists.movies}
                  onAdd={(item) => addItem("movies", item)}
                />
              </TabsContent>
              <TabsContent value="tvShows">
                <MediaList
                  category="tvShows"
                  items={mediaLists.tvShows}
                  onAdd={(item) => addItem("tvShows", item)}
                />
              </TabsContent>
              <TabsContent value="books">
                <MediaList
                  category="books"
                  items={mediaLists.books}
                  onAdd={(item) => addItem("books", item)}
                />
              </TabsContent>
              <TabsContent value="albums">
                <MediaList
                  category="albums"
                  items={mediaLists.albums}
                  onAdd={(item) => addItem("albums", item)}
                />
              </TabsContent>
              <TabsContent value="songs">
                <MediaList
                  category="songs"
                  items={mediaLists.songs}
                  onAdd={(item) => addItem("songs", item)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MediaWrappedInputs;
