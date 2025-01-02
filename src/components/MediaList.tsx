import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/Category";
import { MediaItem } from "@/interfaces/MediaItem";

function MediaList({
  category,
  items,
  onAdd,
}: {
  category: Category;
  items: MediaItem[];
  onAdd: (item: MediaItem) => void;
}) {
  const [newTitle, setNewTitle] = useState("");
  const [author, setAuthor] = useState(""); // For books
  const [loading, setLoading] = useState(false);

  const fetchBookCover = async (title: string, author: string): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        return book.imageLinks?.thumbnail || undefined; // Return the book cover URL
      }
    } catch (error) {
      console.error("Failed to fetch book cover:", error);
    }
    return undefined; // Fallback if no cover is found
  };

  const fetchMovieOrTVShowImage = async (title: string): Promise<string | undefined> => {
    try {
      const apiKey = "YOUR_GOOGLE_API_KEY";
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(title)}&searchType=image&num=1&key=${apiKey}`
      );
      const data = await response.json();
      return data.items?.[0]?.link; // Return the first image URL for movie or TV show
    } catch (error) {
      console.error("Error fetching movie or TV show image:", error);
      return undefined;
    }
  };

  const fetchAlbumCover = async (title: string): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(title)}&type=album`
      );
      const data = await response.json();
      return data.albums?.items[0]?.images[0]?.url; // Return the first album image URL
    } catch (error) {
      console.error("Error fetching album cover:", error);
      return undefined;
    }
  };

  const fetchSongCover = async (title: string): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(title)}&type=track`
      );
      const data = await response.json();
      return data.tracks?.items[0]?.album?.images[0]?.url; // Return the first song cover URL
    } catch (error) {
      console.error("Error fetching song cover:", error);
      return undefined;
    }
  };

  const fetchImage = async (title: string): Promise<string | undefined> => {
    switch (category) {
      case "books":
        return await fetchBookCover(title, author);
      case "movies":
      case "tvShows":
        return await fetchMovieOrTVShowImage(title);
      case "albums":
        return await fetchAlbumCover(title);
      case "songs":
        return await fetchSongCover(title);
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle) {
      setLoading(true);

      let imageUrl: string | undefined;

      imageUrl = await fetchImage(newTitle);

      onAdd({
        title: newTitle,
        image: imageUrl,
        ...(category === "books" && author ? { author } : {}),
      });
      setNewTitle("");
      setAuthor(""); // Reset author input
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 flex justify-between items-center gap-4"
      >
        <Input
          placeholder={`${category === "books" ? "Book Title" : `${category.slice(0, -1)} Title`}*`}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="capitalize py-2"
          required
        />
        {category === "books" && (
          <Input
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="capitalize py-2"
          />
        )}
        <Button type="submit" disabled={items.length >= 4 || loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default MediaList;
