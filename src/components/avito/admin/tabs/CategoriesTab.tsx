import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Category } from "@/lib/types";
import { storeApi } from "@/lib/store";

import * as LucideIcons from "lucide-react";
import { slugify } from "@/lib/slug";

const iconNames = Object.keys(LucideIcons);

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "Package", subcategory: "" });
  const [editedSubcategories, setEditedSubcategories] = useState<Record<string, Record<string, string>>>({});
  const [editedCategoryIcons, setEditedCategoryIcons] = useState<Record<string, string>>({});

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const cats = await storeApi.getCategories();
      setCategories(cats);
      const subsState: Record<string, Record<string, string>> = {};
      const iconsState: Record<string, string> = {};
      cats.forEach(cat => {
        subsState[cat.id] = {};
        cat.subcategories.forEach(sub => {
          subsState[cat.id][sub.name] = sub.name;
        });
        iconsState[cat.id] = cat.icon || "Package";
      });
      setEditedSubcategories(subsState);
      setEditedCategoryIcons(iconsState);
    } catch (err) {
      setError("Ошибка загрузки категорий");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await storeApi.addCategory({
        name: newCategory.name,
        icon: newCategory.icon,
        slug: slugify(newCategory.name), // ✅ добавили slug
        subcategories: [],
      });
      await fetchCategories();
      setNewCategory({ name: "", icon: "Package", subcategory: "" });
    } catch {
      setError("Ошибка добавления категории");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    try {
      await storeApi.deleteCategory(categoryId);
      await fetchCategories();
    } catch {
      setError("Ошибка удаления категории");
    } finally {
      setLoading(false);
    }
  };

  const addSubcategory = async (categoryId: string) => {
    const subcatName = newCategory.subcategory.trim();
    if (!subcatName) return;
    setLoading(true);
    setError(null);
    try {
      await storeApi.addSubcategory(categoryId, {
        name: subcatName,
        slug: slugify(subcatName), // ✅ добавили slug
        items: [],
      });
      await fetchCategories();
      setNewCategory((prev) => ({ ...prev, subcategory: "" }));
    } catch {
      setError("Ошибка добавления подкатегории");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubcategory = async (categoryId: string, subName: string) => {
    setLoading(true);
    setError(null);
    try {
      await storeApi.deleteSubcategory(categoryId, subName);
      await fetchCategories();
    } catch {
      setError("Ошибка удаления подкатегории");
    } finally {
      setLoading(false);
    }
  };

  const updateSubcategory = async (categoryId: string, oldName: string) => {
    const newName = editedSubcategories[categoryId]?.[oldName]?.trim();
    if (!newName) {
      setError("Имя подкатегории не может быть пустым");
      return;
    }
    if (newName === oldName) return;

    setLoading(true);
    setError(null);
    try {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) throw new Error("Категория не найдена");

      const newSubcats = category.subcategories.map((sub) =>
        sub.name === oldName
          ? { ...sub, name: newName, slug: slugify(newName) } // ✅ обновили slug
          : sub
      );

      await storeApi.updateCategory(categoryId, {
        subcategories: newSubcats,
      });

      setEditedSubcategories((prev) => {
        const catSubs = { ...prev[categoryId] };
        delete catSubs[oldName];
        catSubs[newName] = newName;
        return { ...prev, [categoryId]: catSubs };
      });

      await fetchCategories();
    } catch {
      setError("Ошибка обновления подкатегории");
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryIcon = async (categoryId: string, newIcon: string) => {
    setLoading(true);
    setError(null);
    try {
      await storeApi.updateCategory(categoryId, { icon: newIcon });
      setEditedCategoryIcons((prev) => ({ ...prev, [categoryId]: newIcon }));
      await fetchCategories();
    } catch {
      setError("Ошибка обновления иконки категории");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="text-red-600 font-bold mb-2">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Добавить категорию</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Название категории"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              disabled={loading}
            />
            <select
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              disabled={loading}
              className="border rounded p-1"
            >
              {iconNames.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
            <Button onClick={addCategory} disabled={loading}>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {loading && <div>Загрузка...</div>}

        {!loading &&
          categories.map((category) => {
            const CategoryIcon = (LucideIcons as any)[
              editedCategoryIcons[category.id] || "Package"
            ];

            return (
              <Card key={category.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    {CategoryIcon && <CategoryIcon className="w-5 h-5" />}
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={editedCategoryIcons[category.id] || category.icon}
                      onChange={(e) =>
                        updateCategoryIcon(category.id, e.target.value)
                      }
                      disabled={loading}
                      className="border rounded p-1"
                    >
                      {iconNames.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                      disabled={loading}
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <Badge key={sub.name} variant="secondary" className="flex items-center gap-1">
                          <Input
                            size={20}
                            className="bg-transparent border-0 p-0 text-sm max-w-[120px]"
                            value={editedSubcategories[category.id]?.[sub.name] || sub.name}
                            onChange={(e) =>
                              setEditedSubcategories((prev) => ({
                                ...prev,
                                [category.id]: {
                                  ...prev[category.id],
                                  [sub.name]: e.target.value,
                                },
                              }))
                            }
                            onBlur={() => updateSubcategory(category.id, sub.name)}
                            disabled={loading}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteSubcategory(category.id, sub.name)}
                            disabled={loading}
                          >
                            <Icon name="X" className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Добавить подкатегорию"
                        value={newCategory.subcategory}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            subcategory: e.target.value,
                          })
                        }
                        disabled={loading}
                      />
                      <Button
                        size="sm"
                        onClick={() => addSubcategory(category.id)}
                        disabled={loading}
                      >
                        Добавить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default CategoriesTab;
