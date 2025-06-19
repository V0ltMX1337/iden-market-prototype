import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PvzOwnerCreateStaff() {
  const navigation = useNavigate();
  const [data, setData] = useState({ firstName:'', lastName:'', inn:'', preferred:'', shifts:0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call тут...
    navigation(1);
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Добавить сотрудника</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Имя" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} />
        <Input placeholder="Фамилия" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} />
        <Input placeholder="ИНН" value={data.inn} onChange={e => setData({ ...data, inn: e.target.value })} />
        <Input placeholder="Предпочтительный способ (СМС/Email)" value={data.preferred} onChange={e => setData({ ...data, preferred: e.target.value })} />
        <Input type="number" placeholder="Смен отработано" value={data.shifts} onChange={e => setData({ ...data, shifts: +e.target.value })} />
        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
