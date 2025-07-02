import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { storeApi } from "@/lib/store";
import { User, UserRole, UserStatus } from "@/lib/types";

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.USER]: "Пользователь",
  [UserRole.MODERATOR]: "Модератор",
  [UserRole.ADMINISTRATOR]: "Администратор",
};

const STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Активен",
  [UserStatus.BLOCKED]: "Заблокирован",
};

type UserEditTabProps = {
  userId: string;
  onCancel: () => void;
};

const UserEditTab: React.FC<UserEditTabProps> = ({ userId, onCancel }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editFields, setEditFields] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    password: string;
    photoFile: File | null;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    password: "",
    photoFile: null,
  });

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    storeApi
      .getUserById(userId)
      .then((data) => {
        setUser(data);
        setEditFields({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          status: data.status,
          password: "",
          photoFile: null,
        });
      })
      .catch(() => setError("Ошибка загрузки пользователя"))
      .finally(() => setLoading(false));
  }, [userId]);

  const onChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]:
        name === "role"
          ? (value as UserRole)
          : name === "status"
          ? (value as UserStatus)
          : value,
    }));
  };

  const onChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditFields((prev) => ({
        ...prev,
        photoFile: e.target.files![0],
      }));
    }
  };

  const saveUserChanges = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const updateData: Partial<User> & { password?: string; photoFile?: File } = {
        firstName: editFields.firstName.trim(),
        lastName: editFields.lastName.trim(),
        email: editFields.email.trim(),
        role: editFields.role,
        status: editFields.status,
      };

      if (editFields.password.trim()) {
        updateData.password = editFields.password.trim();
      }

      if (editFields.photoFile) {
        updateData.photoFile = editFields.photoFile;
      }

      await storeApi.updateUser(user.id, updateData);
      onCancel(); // возвращаемся назад в список пользователей
    } catch {
      setError("Ошибка сохранения изменений");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Редактирование пользователя</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Имя</label>
              <input
                type="text"
                name="firstName"
                value={editFields.firstName}
                onChange={onChangeField}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={editFields.lastName}
                onChange={onChangeField}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={editFields.email}
                onChange={onChangeField}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Роль</label>
              <select
                name="role"
                value={editFields.role}
                onChange={onChangeField}
                className="w-full border rounded px-2 py-1"
              >
                {Object.entries(ROLE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Статус</label>
              <select
                name="status"
                value={editFields.status}
                onChange={onChangeField}
                className="w-full border rounded px-2 py-1"
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Пароль (новый)</label>
              <input
                type="password"
                name="password"
                value={editFields.password}
                onChange={onChangeField}
                placeholder="Оставьте пустым, если не менять"
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">Фото</label>
              <input type="file" onChange={onChangePhoto} />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={saveUserChanges} disabled={loading}>
              Сохранить
            </Button>
            <Button variant="outline" onClick={onCancel} disabled={loading}>
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEditTab;
