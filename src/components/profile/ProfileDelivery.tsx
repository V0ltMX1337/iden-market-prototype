import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface DeliveryProfile {
  id: number;
  address: string;
  contact: string;
}

const ProfileDelivery = () => {
  const [profiles, setProfiles] = useState<DeliveryProfile[]>([
    {
      id: 1,
      address: "Россия, Нижегородская обл., г. Дзержинск, ул. Гайдара, д. 35",
      contact: "Данил Пугин +79050129454",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<DeliveryProfile | null>(
    null,
  );
  const [formData, setFormData] = useState({
    address: "",
    contact: "",
  });

  const handleSaveProfile = () => {
    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id ? { ...editingProfile, ...formData } : p,
        ),
      );
    } else {
      const newProfile: DeliveryProfile = {
        id: Date.now(),
        ...formData,
      };
      setProfiles([...profiles, newProfile]);
    }

    setIsDialogOpen(false);
    setEditingProfile(null);
    setFormData({
      address: "",
      contact: "",
    });
  };

  const handleEditProfile = (profile: DeliveryProfile) => {
    setEditingProfile(profile);
    setFormData({
      address: profile.address,
      contact: profile.contact,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Профили доставки</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
            >
              Добавить адрес доставки
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProfile ? "Редактировать профиль" : "Добавить профиль"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Введите адрес доставки"
                />
              </div>
              <div>
                <Label htmlFor="contact">Контактная информация</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  placeholder="Имя и телефон получателя"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveProfile} className="flex-1">
                  {editingProfile ? "Сохранить" : "Добавить"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profiles List */}
      <div className="space-y-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="border rounded-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-1">
                    {profile.address}
                  </p>
                  <p className="text-sm text-gray-600">{profile.contact}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Icon
                        name="MoreHorizontal"
                        size={16}
                        className="text-gray-400"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditProfile(profile)}
                    >
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="text-red-600"
                    >
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {profiles.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <Icon name="MapPin" size={48} className="mx-auto text-gray-400" />
              <p className="text-gray-600">У вас пока нет профилей доставки</p>
              <p className="text-sm text-gray-500">Добавьте первый профиль</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileDelivery;
