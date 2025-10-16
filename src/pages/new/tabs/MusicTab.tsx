import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MusicTab = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Музыка</h2>
        <p className="text-purple-100">Слушайте любимые треки и открывайте новую музыку</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((track) => (
          <Card key={track} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Music" size={40} className="text-white" />
              </div>
              <h3 className="font-semibold mb-1 line-clamp-1">Название трека {track}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">Исполнитель</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="sticky bottom-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Icon name="Music" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Сейчас играет</div>
              <div className="text-sm text-gray-600">Исполнитель — Название</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Play" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="SkipForward" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Volume2" size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicTab;
