import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const ProfileMain = () => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const user = {
    firstName: "Данил",
    lastName: "Пугин",
    email: "danil@example.com",
    avatar:
      "https://cdn.poehali.dev/files/740b36f9-7256-4953-8183-09393e3212d0.png",
    birthDate: "15.03.1990",
    gender: "Мужской",
    phone: "+7 912 345-67-89",
    phoneVerified: true,
    username: "danil_pugin",
    accountId: "297137",
  };

  const renderEditableField = (
    label: string,
    value: string,
    fieldKey: string,
    isPhone = false,
  ) => {
    const isEditing = editingField === fieldKey;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Input type="text" defaultValue={value} className="flex-1" />
              <Button size="sm" onClick={() => setEditingField(null)}>
                Сохранить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingField(null)}
              >
                Отмена
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1 flex items-center space-x-2">
                <span className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 flex-1">
                  {value}
                </span>
                {isPhone && user.phoneVerified && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Подтвержден
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingField(fieldKey)}
              >
                <Icon name="Edit2" size={14} />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <Avatar className="w-20 h-20 bg-blue-600">
              <AvatarFallback className="text-white text-2xl font-bold bg-blue-600">
                ДП
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm">ID: {user.accountId}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1"
                onClick={() => navigator.clipboard.writeText(user.accountId)}
              >
                <Icon name="Copy" size={14} className="text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Личная информация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderEditableField("Имя", user.firstName, "firstName")}
              {renderEditableField("Фамилия", user.lastName, "lastName")}
              {renderEditableField(
                "Имя пользователя",
                user.username,
                "username",
              )}
              {renderEditableField(
                "Дата рождения",
                user.birthDate,
                "birthDate",
              )}
              {renderEditableField("Пол", user.gender, "gender")}
              {renderEditableField("Номер телефона", user.phone, "phone", true)}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email адрес
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline">
              <Icon name="Camera" size={16} className="mr-2" />
              Изменить фото
            </Button>
            <Button>Сохранить изменения</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileMain;
