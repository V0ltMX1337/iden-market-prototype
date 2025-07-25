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
import { FilterDefinition, FilterType } from "@/lib/types";
import { storeApi } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FiltersTab = () => {
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newFilter, setNewFilter] = useState<Omit<FilterDefinition, "id">>({
    name: "",
    values: [],
    type: FilterType.SELECT,
  });

  const [valueInput, setValueInput] = useState("");

  const fetchFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storeApi.getFilters();
      setFilters(data);
    } catch {
      setError("Ошибка загрузки фильтров");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const addFilter = async () => {
    if (!newFilter.name.trim() || newFilter.values.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      await storeApi.addFilter(newFilter);
      setNewFilter({ name: "", values: [], type: FilterType.SELECT });
      setValueInput("");
      await fetchFilters();
    } catch {
      setError("Ошибка добавления фильтра");
    } finally {
      setLoading(false);
    }
  };

  const deleteFilter = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await storeApi.deleteFilter(id);
      await fetchFilters();
    } catch {
      setError("Ошибка удаления фильтра");
    } finally {
      setLoading(false);
    }
  };

  const addValueToFilter = () => {
    if (valueInput.trim()) {
      setNewFilter({
        ...newFilter,
        values: [...newFilter.values, valueInput.trim()],
      });
      setValueInput("");
    }
  };

  const removeValueFromFilter = (value: string) => {
    setNewFilter({
      ...newFilter,
      values: newFilter.values.filter((v) => v !== value),
    });
  };

  const [editingFilterId, setEditingFilterId] = useState<string | null>(null);
  const [editedFilter, setEditedFilter] = useState<FilterDefinition | null>(
    null
  );
  const [newValue, setNewValue] = useState("");

  const startEditing = (filter: FilterDefinition) => {
    setEditingFilterId(filter.id);
    setEditedFilter({ ...filter });
    setNewValue("");
  };

  const cancelEditing = () => {
    setEditingFilterId(null);
    setEditedFilter(null);
    setNewValue("");
  };

  const saveEditedFilter = async () => {
    if (!editedFilter) return;
    setLoading(true);
    try {
      await storeApi.updateFilter(editedFilter.id, {
        name: editedFilter.name,
        type: editedFilter.type,
        values: editedFilter.values,
      });
      cancelEditing();
      await fetchFilters();
    } catch {
      setError("Ошибка сохранения фильтра");
    } finally {
      setLoading(false);
    }
  };

  const addValueToEdited = () => {
    if (editedFilter && newValue.trim() && !editedFilter.values.includes(newValue.trim())) {
      setEditedFilter({
        ...editedFilter,
        values: [...editedFilter.values, newValue.trim()],
      });
      setNewValue("");
    }
  };

  const removeValueFromEdited = (value: string) => {
    if (!editedFilter) return;
    setEditedFilter({
      ...editedFilter,
      values: editedFilter.values.filter((v) => v !== value),
    });
  };

  return (
    <div className="space-y-6">
      {error && <div className="text-red-600 font-bold mb-2">{error}</div>}

      {/* --- ADD NEW FILTER --- */}
      <Card>
        <CardHeader>
          <CardTitle>Добавить фильтр</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Название фильтра"
            value={newFilter.name}
            onChange={(e) =>
              setNewFilter({ ...newFilter, name: e.target.value })
            }
            disabled={loading}
          />

          <div className="grid grid-cols-2 gap-4 items-end">
            <Input
              placeholder="Новое значение"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              disabled={loading}
            />
            <Button onClick={addValueToFilter} disabled={loading}>
              <Icon name="Plus" className="w-4 h-4 mr-2" />
              Добавить значение
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {newFilter.values.map((val) => (
              <div
                key={val}
                className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2 text-sm"
              >
                {val}
                <button onClick={() => removeValueFromFilter(val)}>
                  <Icon name="X" className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          <Select
            value={newFilter.type}
            onValueChange={(val) =>
              setNewFilter({ ...newFilter, type: val as FilterType })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Тип фильтра" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FilterType.SELECT}>Выбор (select)</SelectItem>
              <SelectItem value={FilterType.CHECKBOX}>Чекбокс</SelectItem>
              <SelectItem value={FilterType.RANGE}>Диапазон</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={addFilter} disabled={loading}>
            <Icon name="Plus" className="h-4 w-4 mr-2" />
            Добавить фильтр
          </Button>
        </CardContent>
      </Card>

      {/* --- FILTER LIST --- */}
      <Card>
        <CardHeader>
          <CardTitle>Список фильтров</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Значения</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filters.map((filter) => (
                <TableRow key={filter.id}>
                  <TableCell>
                    {editingFilterId === filter.id ? (
                      <Input
                        value={editedFilter?.name || ""}
                        onChange={(e) =>
                          setEditedFilter(
                            editedFilter
                              ? { ...editedFilter, name: e.target.value }
                              : null
                          )
                        }
                      />
                    ) : (
                      filter.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingFilterId === filter.id ? (
                      <Select
                        value={editedFilter?.type}
                        onValueChange={(val) =>
                          setEditedFilter(
                            editedFilter
                              ? { ...editedFilter, type: val as FilterType }
                              : null
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={FilterType.SELECT}>SELECT</SelectItem>
                          <SelectItem value={FilterType.CHECKBOX}>CHECKBOX</SelectItem>
                          <SelectItem value={FilterType.RANGE}>RANGE</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      filter.type
                    )}
                  </TableCell>
                  <TableCell>
                    {editingFilterId === filter.id && editedFilter ? (
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Новое значение"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                          />
                          <Button size="sm" onClick={addValueToEdited}>
                            <Icon name="Plus" className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editedFilter.values.map((val) => (
                            <div
                              key={val}
                              className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2 text-sm"
                            >
                              {val}
                              <button onClick={() => removeValueFromEdited(val)}>
                                <Icon name="X" className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <ul className="text-sm list-disc ml-4">
                        {filter.values.map((val) => (
                          <li key={val}>{val}</li>
                        ))}
                      </ul>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {editingFilterId === filter.id ? (
                      <>
                        <Button size="sm" onClick={saveEditedFilter}>
                          <Icon name="Check" className="w-4 h-4 mr-1" />
                          Сохранить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          <Icon name="X" className="w-4 h-4 mr-1" />
                          Отмена
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => startEditing(filter)}
                        >
                          <Icon name="Pencil" className="w-4 h-4 mr-1" />
                          Редактировать
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteFilter(filter.id)}
                          disabled={loading}
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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

export default FiltersTab;
