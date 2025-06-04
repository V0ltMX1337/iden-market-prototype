import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  name: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  type: "pickup" | "delivery";
  isDefault?: boolean;
}

const ProfileDelivery = () => {
  const [profiles, setProfiles] = useState<DeliveryProfile[]>([
    {
      id: 1,
      name: "Основной адрес",
      fullName: "Иванов Иван Иванович",
      phone: "+7 (999) 123-45-67",
      email: "ivan@example.com",
      address: "г. Москва, ул. Тверская, д. 15, кв. 42",
      type: "delivery",
      isDefault: true,
    },
    {
      id: 2,
      name: "Офис",
      fullName: "Иванов Иван Иванович",
      phone: "+7 (999) 123-45-67",
      email: "ivan@example.com",
      address: "г. Москва, БЦ Центр, ул. Садовая, д. 10",
      type: "pickup",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<DeliveryProfile | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
    type: "delivery" as "pickup" | "delivery",
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
      name: "",
      fullName: "",
      phone: "",
      email: "",
      address: "",
      type: "delivery",
    });
  };

  const handleEditProfile = (profile: DeliveryProfile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      fullName: profile.fullName,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      type: profile.type,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  const openMapDialog = () => {
    setIsMapOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Профили доставки</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить профиль
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
                <Label htmlFor="name">Название профиля</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Например: Домой"
                />
              </div>
              <div>
                <Label htmlFor="fullName">ФИО получателя</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <Label htmlFor="address">Адрес</Label>
                <div className="flex gap-2">
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Введите адрес"
                  />
                  <Button variant="outline" onClick={openMapDialog}>
                    <Icon name="MapPin" size={16} />
                  </Button>
                </div>
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

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <Icon
                  name={profile.type === "pickup" ? "MapPin" : "Truck"}
                  size={20}
                  className="text-green-600"
                />
                <h3 className="font-medium">{profile.name}</h3>
                {profile.isDefault && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    По умолчанию
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditProfile(profile)}>
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
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p className="font-medium">{profile.fullName}</p>
                <p className="text-gray-600">{profile.phone}</p>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              <div className="text-sm text-gray-600">
                <Icon name="MapPin" size={14} className="inline mr-1" />
                {profile.address}
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                {profile.type === "pickup"
                  ? "Пункт выдачи"
                  : "Доставка курьером"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Selection Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Выберите пункт выдачи</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Поиск" className="flex-1" />
              <Button variant="outline">
                <Icon name="Search" size={16} />
              </Button>
            </div>
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://cdn.poehali.dev/files/37696be7-806b-405b-84eb-826004a15e0d.png"
                alt="Карта пунктов выдачи"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
                <p className="text-sm font-medium">Выберите пункт выдачи</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsMapOpen(false)} className="flex-1">
                Выбрать
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsMapOpen(false)}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
