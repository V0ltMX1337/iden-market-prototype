import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { City } from "@/lib/types";
import { storeApi } from "@/lib/store";

const CitiesTab = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newCity, setNewCity] = useState({ name: "", region: "" });

  // Загрузка городов из API
  const fetchCities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storeApi.getCities();
      setCities(data);
    } catch {
      setError("Ошибка загрузки городов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Добавление города через API
  const addCity = async () => {
    if (!newCity.name.trim() || !newCity.region.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await storeApi.addCity({ name: newCity.name, region: newCity.region });
      setNewCity({ name: "", region: "" });
      await fetchCities();
    } catch {
      setError("Ошибка добавления города");
    } finally {
      setLoading(false);
    }
  };

  // Удаление города через API
  const deleteCity = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await storeApi.deleteCity(id);
      await fetchCities();
    } catch {
      setError("Ошибка удаления города");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-600 font-bold mb-2">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Добавить город</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Название города"
              value={newCity.name}
              onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
              disabled={loading}
            />
            <Input
              placeholder="Область/регион"
              value={newCity.region}
              onChange={(e) => setNewCity({ ...newCity, region: e.target.value })}
              disabled={loading}
            />
          </div>
          <Button onClick={addCity} disabled={loading}>
            <Icon name="Plus" className="h-4 w-4 mr-2" />
            Добавить город
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список городов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Город</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.region}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteCity(city.id)}
                      disabled={loading}
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <div className="mt-2">Загрузка...</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default CitiesTab;
