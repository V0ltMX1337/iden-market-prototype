import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ProductDetailsProps {
  title: string;
  description: string;
  images: string[];
}

const DescriptionCard = ({ description }: { description: string }) => (
  <Card className="mt-6 h-fit">
    <CardContent className="p-4">
      <h2 className="text-xl font-bold mb-4">Описание</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
    </CardContent>
  </Card>
);

const ProductDetails = ({ title, description, images }: ProductDetailsProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!images?.length) {
    return (
      <>
        <Card className="h-fit">
          <CardContent className="p-4">
            <div className="aspect-[4/3] mb-4 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
              Нет изображений
            </div>
          </CardContent>
        </Card>
        <DescriptionCard description={description} />
      </>
    );
  }

  return (
    <>
      <Card className="h-fit">
  <CardContent className="p-4">
    <div className="aspect-[4/3] mb-4">
      <Zoom>
        <img
          src={images[currentImage]}
          alt={title}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          fetchPriority="high"    // Вот тут атрибут!
          loading="eager"         // Убедись, что главный img грузится без задержки
        />
      </Zoom>
    </div>
    <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setCurrentImage(index)}
          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
            currentImage === index
              ? "border-blue-500 scale-105"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <img
            loading="lazy"  // lazy loading для миниатюр — хорошо
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  </CardContent>
</Card>
      <DescriptionCard description={description} />
    </>
  );
};

export default ProductDetails;
