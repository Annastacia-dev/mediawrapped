import { Category } from "@/types/Category";
import { MediaItem } from "@/interfaces/MediaItem";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

const MediaWrappedOutputs = ({
  mediaLists,
}: {
  mediaLists: Record<Category, MediaItem[]>;
}) => {
  const [media, setMedia] = useState(mediaLists);

  const handleRemoveItem = (category: Category, index: number) => {
    const updatedMediaLists = { ...media };
    updatedMediaLists[category].splice(index, 1);
    setMedia(updatedMediaLists);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Media Wrapped</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(media)
            .filter(([_, items]) => items.length > 0)
            .map(([category, items]) => (
              <div key={category} className="bg-background text-foreground py-2">
                <h3 className="text-md font-semibold capitalize mb-4">{category}</h3>
                <div className="grid grid-cols-4 gap-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="relative text-center border rounded shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveItem(category as Category, index)}
                        className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaWrappedOutputs;
