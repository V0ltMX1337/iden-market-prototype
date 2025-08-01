// CategoriesTab.tsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import {
  Category,
  Subcategory,
  FilterDefinition,
  FilterAssignment,
} from "@/lib/types";
import { storeApi } from "@/lib/store";
import * as LucideIcons from "lucide-react";
import { slugify } from "@/lib/slug";
import { Checkbox } from "@/components/ui/checkbox";

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [newSubcategories, setNewSubcategories] = useState<Record<string, string>>({});
  const [newCategory, setNewCategory] = useState({ name: "", icon: "Package" });
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [cats, flts] = await Promise.all([
        storeApi.getCategories(),
        storeApi.getFilters(),
      ]);
      setCategories(cats);
      setFilters(flts);
      setError(null);
    } catch {
      setError("Ошибка при загрузке данных");
    }
  };

  const toggleLoading = (id: string, on = true) => {
    setLoadingIds((prev) => {
      const next = new Set(prev);
      on ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const addCategory = async () => {
    const name = newCategory.name.trim();
    if (!name) return;
    toggleLoading("new");
    try {
      const slug = slugify(name);
      const cat = await storeApi.addCategory({
        name,
        slug,
        icon: newCategory.icon,
        subcategories: [],
      });
      setCategories((prev) => [...prev, cat]);
      setNewCategory({ name: "", icon: "Package" });
    } catch {
      setError("Ошибка добавления категории");
    }
    toggleLoading("new", false);
  };

  const deleteCategory = async (id: string) => {
    toggleLoading(id);
    try {
      await storeApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Ошибка удаления категории");
    }
    toggleLoading(id, false);
  };

  const addSubcategory = async (
    categoryId: string,
    parentSubId: string | null
  ) => {
    const key = parentSubId ?? categoryId;
    const name = newSubcategories[key]?.trim();
    if (!name) return;
    toggleLoading(key);
    try {
      const slug = slugify(name);
      await storeApi.addSubcategoryById(categoryId, parentSubId, {
        id: "", // backend должен генерировать id
        name,
        slug,
        items: [],
        children: [],
        filters: [],
      });
      setNewSubcategories((prev) => ({ ...prev, [key]: "" }));
      await fetchAll();
    } catch {
      setError("Ошибка добавления подкатегории");
    }
    toggleLoading(key, false);
  };

  const updateSubcategory = async (
    categoryId: string,
    subId: string,
    sub: Subcategory,
    newName: string
  ) => {
    const name = newName.trim();
    if (!name || name === sub.name) return;
    toggleLoading(subId);
    try {
      const slug = slugify(name);
      await storeApi.updateSubcategoryById(categoryId, subId, {
        ...sub,
        name,
        slug,
      });
      await fetchAll();
    } catch {
      setError("Ошибка обновления подкатегории");
    }
    toggleLoading(subId, false);
  };

  const deleteSubcategory = async (categoryId: string, subId: string) => {
    toggleLoading(subId);
    try {
      await storeApi.deleteSubcategoryById(categoryId, subId);
      await fetchAll();
    } catch {
      setError("Ошибка удаления подкатегории");
    }
    toggleLoading(subId, false);
  };

  const updateCategoryIcon = async (id: string, icon: string) => {
    toggleLoading(id);
    try {
      await storeApi.updateCategory(id, { icon });
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, icon } : c))
      );
    } catch {
      setError("Ошибка обновления иконки");
    }
    toggleLoading(id, false);
  };

  const toggleFilterForSub = async (
    cat: Category,
    subId: string,
    sub: Subcategory,
    filterId: string
  ) => {
    const existing = sub.filters.find((f) => f.filterId === filterId);
    const updated = existing
      ? sub.filters.filter((f) => f.filterId !== filterId)
      : [...sub.filters, { filterId, required: false }];
    toggleLoading(subId);
    try {
      await storeApi.updateSubcategoryById(cat.id, subId, {
        ...sub,
        filters: updated,
      });
      await fetchAll();
    } catch {
      setError("Ошибка назначения фильтра");
    }
    toggleLoading(subId, false);
  };

  const toggleRequired = async (
    cat: Category,
    subId: string,
    sub: Subcategory,
    fa: FilterAssignment
  ) => {
    toggleLoading(subId);
    try {
      await storeApi.updateSubcategoryById(cat.id, subId, {
        ...sub,
        filters: sub.filters.map((f) =>
          f.filterId === fa.filterId ? { ...f, required: !f.required } : f
        ),
      });
      await fetchAll();
    } catch {
      setError("Ошибка переключения обязательности");
    }
    toggleLoading(subId, false);
  };

  // Рекурсивно рендерим подкатегории с уникальными ключами
  const renderSubcats = (
    cat: Category,
    subs: Subcategory[],
    parentKey: string
  ) => {
    return subs.map((sub) => {
      const key = `${parentKey}-${sub.id}`;
      return (
        <div key={key} className="ml-6 border-l pl-4 mb-4">
          <div className="flex items-center mb-1 gap-2">
            <LucideIcons.Folder className="w-4 h-4" />
            <Input
              defaultValue={sub.name}
              className="flex-grow"
              disabled={loadingIds.has(sub.id)}
              onBlur={(e) =>
                updateSubcategory(cat.id, sub.id, sub, e.target.value)
              }
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteSubcategory(cat.id, sub.id)}
            >
              <Icon name="X" />
            </Button>
          </div>

          <div className="mb-2">
            <div className="text-sm font-semibold">Фильтры:</div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((fd) => {
                const assgn = sub.filters.find((f) => f.filterId === fd.id);
                return (
                  <div key={fd.id} className="flex items-center space-x-1">
                    <Checkbox
                      checked={!!assgn}
                      onCheckedChange={() =>
                        toggleFilterForSub(cat, sub.id, sub, fd.id)
                      }
                    />
                    <span className="text-sm">{fd.name}</span>
                    {assgn && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleRequired(cat, sub.id, sub, assgn)}
                      >
                        <Icon name={assgn.required ? "Star" : "StarOff"} />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Добавить подкатегорию"
              value={newSubcategories[sub.id] || ""}
              onChange={(e) =>
                setNewSubcategories((p) => ({
                  ...p,
                  [sub.id]: e.target.value,
                }))
              }
            />
            <Button onClick={() => addSubcategory(cat.id, sub.id)}>Добавить</Button>
          </div>

          {/* Рекурсивный вызов по children */}
          {sub.children && sub.children.length > 0 &&
            renderSubcats(cat, sub.children, key)}
        </div>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {error && <div className="text-red-600 font-bold">{error}</div>}

      {/* Добавление новой категории */}
      <Card>
        <CardHeader>
          <CardTitle>Добавить категорию</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="Название категории"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={loadingIds.has("new")}
          />
          <Input
            value={newCategory.icon}
            onChange={(e) =>
              setNewCategory((prev) => ({ ...prev, icon: e.target.value }))
            }
            disabled={loadingIds.has("new")}
          />
          <Button onClick={addCategory} disabled={loadingIds.has("new")}>
            Добавить
          </Button>
        </CardContent>
      </Card>

      {/* Список категорий */}
      {categories.map((cat) => (
        <Card key={cat.id}>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {cat.icon.startsWith('http') ? (
                <img 
                  src={cat.icon} 
                  alt={cat.name}
                  className="w-5 h-5 object-cover rounded"
                />
              ) : (
                <span className="text-lg">{cat.icon}</span>
              )}
              <h2 className="text-lg font-semibold">{cat.name}</h2>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteCategory(cat.id)}
              disabled={loadingIds.has(cat.id)}
            >
              Удалить
            </Button>
          </CardHeader>
          <CardContent>
            {/* Иконка категории редактируемая */}
            <div className="mb-4 flex items-center gap-2">
              <span>Иконка категории:</span>
              <Input
                value={cat.icon}
                onChange={(e) => updateCategoryIcon(cat.id, e.target.value)}
                disabled={loadingIds.has(cat.id)}
              />
            </div>

            {/* Подкатегории первого уровня */}
            {renderSubcats(cat, cat.subcategories || [], cat.id)}

            {/* Добавить подкатегорию к корню категории */}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Добавить подкатегорию"
                value={newSubcategories[cat.id] || ""}
                onChange={(e) =>
                  setNewSubcategories((p) => ({ ...p, [cat.id]: e.target.value }))
                }
                disabled={loadingIds.has(cat.id)}
              />
              <Button
                onClick={() => addSubcategory(cat.id, null)}
                disabled={loadingIds.has(cat.id)}
              >
                Добавить
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesTab;