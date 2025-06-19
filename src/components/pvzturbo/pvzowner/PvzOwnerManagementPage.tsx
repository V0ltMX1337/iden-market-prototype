import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PvzOwnerManagementPage = () => {
    const [staff, setStaff] = useState([
    { id: '1', firstName: 'Иван', lastName: 'Иванов', inn: '1234567890', shifts: 45, preferred: 'СМС', status: 'active' },
    { id: '2', firstName: 'Ольга', lastName: 'Петрова', inn: '0987654321', shifts: 12, preferred: 'Email', status: 'pending' },
  ]);

  const handleConfirm = (id: string) => {
    setStaff(s => s.map(u => u.id === id ? { ...u, status: 'active' } : u));
  };
  const handleFire = (id: string) => {
    setStaff(s => s.filter(u => u.id !== id));
  };

  const navigation = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Управление ПВЗ</h2>

      {/* Время работы */}
      <Card>
        <CardHeader>
          <CardTitle>Время работы</CardTitle>
          <CardDescription>Настройка режима, выходных, праздников</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <label>Режим по умолчанию</label>
          <Input placeholder="Например, Пн-Пт 10:00–20:00" />
          <label>Исключения (праздники)</label>
          <Textarea placeholder="Например, 1 января — выходной" />
        </CardContent>
      </Card>

      {/* Сотрудники */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Сотрудники и роли</CardTitle>
          <Button size="sm" onClick={() => navigation('/pvzturboowner/staff/create')}>Добавить сотрудника</Button>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['Имя Фамилия','ИНН','Смен','Пред.способ','Действия'].map(h => <th key={h} className="text-left p-2">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {staff.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.firstName} {u.lastName}</td>
                  <td className="p-2">{u.inn}</td>
                  <td className="p-2">{u.shifts}</td>
                  <td className="p-2">{u.preferred}</td>
                  <td className="p-2 space-x-2">
                    <Button size="xs" onClick={() => navigation(`/pvzturboowner/staff/overview/${u.id}`)}>Управлять</Button>
                    {u.status === 'pending' && (
                      <Button size="xs" variant="outline" onClick={() => handleConfirm(u.id)}>Подтвердить</Button>
                    )}
                    <Button size="xs" variant="destructive" onClick={() => handleFire(u.id)}>Уволить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Уведомления */}
      <Card>
        <CardHeader>
          <CardTitle>SMS / Уведомления</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <span>Уведомления клиенту об отправке</span>
          <Switch defaultChecked />
        </CardContent>
      </Card>

      {/* Привязка к логистам */}
      <Card>
        <CardHeader>
          <CardTitle>Службы доставки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Привязанные логисты:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Boxberry</li>
            <li>СДЭК</li>
          </ul>
          <Button size="sm" variant="outline">Изменить</Button>
        </CardContent>
      </Card>

      {/* KPI */}
      <Card>
        <CardHeader>
          <CardTitle>KPI</CardTitle>
          <CardDescription>Скорость, ошибки, задержки</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Средняя скорость приёма</p>
            <p className="font-medium">3 мин</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ошибки выдачи</p>
            <p className="font-medium">2%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Задержки</p>
            <p className="font-medium">5 посылок</p>
          </div>
        </CardContent>
      </Card>

      {/* Условия хранения */}
      <Card>
        <CardHeader>
          <CardTitle>Условия хранения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <label>Срок хранения</label>
          <Input placeholder="Например, 7 дней" />
          <label>Напоминания</label>
          <Switch defaultChecked />
        </CardContent>
      </Card>

      {/* Лог активности */}
      <Card>
        <CardHeader>
          <CardTitle>История действий</CardTitle>
          <CardDescription>Последние изменения и действия</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li>Иван Иванов изменил режим работы – 12.06.2025</li>
            <li>Добавлен сотрудник: Ольга Петрова – 10.06.2025</li>
            <li>Изменены условия хранения – 05.06.2025</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PvzOwnerManagementPage;
