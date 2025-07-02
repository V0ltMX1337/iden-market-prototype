import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

type UsersTabProps = {
  onEditUser: (userId: string) => void;
};

const UsersTab: React.FC<UsersTabProps> = ({ onEditUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.USER);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await storeApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Ошибка загрузки пользователей", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async () => {
    if (!selectedUserId) return;

    setLoading(true);
    try {
      await storeApi.updateUser(selectedUserId, { role: newUserRole });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId ? { ...user, role: newUserRole } : user
        )
      );
      setSelectedUserId("");
    } catch (error) {
      console.error("Ошибка обновления роли", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    setLoading(true);
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const newStatus =
        user.status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;

      await storeApi.updateUser(userId, { status: newStatus });

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    } catch (error) {
      console.error("Ошибка смены статуса", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление ролями</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              disabled={loading}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Выберите пользователя" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={newUserRole}
              onValueChange={(value) => setNewUserRole(value as UserRole)}
              disabled={loading}
            >
              <SelectTrigger className="w-48">
                <SelectValue>{ROLE_LABELS[newUserRole]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserRole).map((role) => (
                  <SelectItem key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={updateUserRole} disabled={loading || !selectedUserId}>
              Обновить роль
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === UserRole.ADMINISTRATOR ? "default" : "secondary"}
                    >
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === UserStatus.ACTIVE ? "default" : "destructive"}
                    >
                      {STATUS_LABELS[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      disabled={loading}
                    >
                      {user.status === UserStatus.ACTIVE ? "Заблокировать" : "Разблокировать"}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditUser(user.id)}
                      disabled={loading}
                    >
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;
