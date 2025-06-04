import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const ProfileMain = () => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const user = {
    firstName: "Анна",
    lastName: "Покупатель",
    email: "anna@example.com",
    avatar: "",
    birthDate: "15.03.1990",
    gender: "Женский",
    phone: "+7 912 345-67-89",
    phoneVerified: true,
    username: "anna_buyer",
    accountId: "237157",
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
    <Card>
      <CardHeader>
        <CardTitle>Личная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-lg">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{user.email}</p>
            <Button variant="outline" size="sm">
              Изменить фото
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ID аккаунта
            </label>
            <div className="flex items-center space-x-2">
              <span className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 flex-1 text-gray-600">
                ID: {user.accountId}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(user.accountId)}
              >
                <Icon name="Copy" size={14} />
              </Button>
            </div>
          </div>
          {renderEditableField("Имя", user.firstName, "firstName")}
          {renderEditableField("Фамилия", user.lastName, "lastName")}
          {renderEditableField("Имя пользователя", user.username, "username")}
          {renderEditableField("Дата рождения", user.birthDate, "birthDate")}
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
        <Button>Сохранить изменения</Button>
      </CardContent>
    </Card>
  );
};

export default ProfileMain;
