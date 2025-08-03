import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Subcategory {
  name: string;
  slug: string;
}

interface CategoryStepProps {
  categories: Category[];
  subcategoryLevels: Subcategory[][];
  selectedCategory: string;
  subcategoryPath: string[];
  onCategoryChange: (value: string) => void;
  onSubcategorySelect: (levelIndex: number, value: string) => void;
}

export const CategoryStep = ({
  categories,
  subcategoryLevels,
  selectedCategory,
  subcategoryPath,
  onCategoryChange,
  onSubcategorySelect,
}: CategoryStepProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-base md:text-lg flex items-center space-x-2">
          <Icon name="FileText" className="w-4 h-4 md:w-5 md:h-5" />
          <span>Выберите категорию</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm md:text-base font-medium">
            Категория *
          </Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange} required>
            <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory &&
          subcategoryLevels.length > 0 &&
          subcategoryLevels.map((levelSubcats, idx) => (
            <div key={idx} className="space-y-2">
              <Label className="text-sm md:text-base font-medium">
                Подкатегория (уровень {idx + 1})
              </Label>
              <Select
                value={subcategoryPath[idx] || ""}
                onValueChange={(value) => onSubcategorySelect(idx, value)}
              >
                <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                  <SelectValue placeholder="Выберите подкатегорию" />
                </SelectTrigger>
                <SelectContent>
                  {levelSubcats.map((subcat) => (
                    <SelectItem key={subcat.slug} value={subcat.slug}>
                      {subcat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};