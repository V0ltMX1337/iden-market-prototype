import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Photo {
  file: File;
  preview: string;
  isMain: boolean;
}

interface PhotoStepProps {
  photos: Photo[];
  isDragActive: boolean;
  getRootProps: () => any;
  getInputProps: () => any;
  onRemovePhoto: (index: number) => void;
  onSetAsMain: (index: number) => void;
}

export const PhotoStep = ({
  photos,
  isDragActive,
  getRootProps,
  getInputProps,
  onRemovePhoto,
  onSetAsMain,
}: PhotoStepProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-base md:text-lg flex items-center space-x-2">
          <Icon name="Camera" className="w-4 h-4 md:w-5 md:h-5" />
          <span>Добавьте фотографии</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <Icon
            name="Upload"
            className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 text-gray-400"
          />
          <p className="text-sm md:text-base text-gray-600">
            {isDragActive
              ? "Отпустите файлы здесь..."
              : "Перетяните фото или нажмите"}
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
            Максимум 10 фото, JPG/PNG
          </p>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4">
            {photos.map((p, i) => (
              <div key={i} className="relative group">
                <img
                  src={p.preview}
                  className={`w-full h-24 md:h-32 object-cover rounded-lg transition-all ${
                    p.isMain
                      ? "ring-2 md:ring-4 ring-green-500 ring-offset-1"
                      : ""
                  }`}
                  alt="Фото объявления"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                <Button
                  size="sm"
                  variant={p.isMain ? "default" : "outline"}
                  className={`absolute bottom-1 md:bottom-2 left-1 md:left-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                    p.isMain
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white/90 hover:bg-white"
                  }`}
                  onClick={() => onSetAsMain(i)}
                  type="button"
                >
                  {p.isMain ? (
                    <span className="flex items-center space-x-1">
                      <Icon name="Star" className="w-3 h-3" />
                      <span className="hidden md:inline">Главное</span>
                    </span>
                  ) : (
                    <span className="md:hidden">Главное</span>
                  )}
                  <span className="hidden md:inline">
                    {p.isMain ? "Главное" : "Сделать главным"}
                  </span>
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1 text-white bg-black/50 hover:bg-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemovePhoto(i)}
                >
                  <Icon name="X" className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};