import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FilterType } from "@/lib/types";
import Icon from "@/components/ui/icon";

interface Filter {
  id: string;
  name: string;
  type: FilterType;
  values: string[];
}

interface DetailsStepProps {
  title: string;
  description: string;
  price: string;
  condition: string;
  conditions: string[];
  filters: Filter[];
  selectedFilters: Record<string, any>;
  onInputChange: (field: string, value: string) => void;
  onFilterChange: (filterId: string, value: any) => void;
}

export const DetailsStep = ({
  title,
  description,
  price,
  condition,
  conditions,
  filters,
  selectedFilters,
  onInputChange,
  onFilterChange,
}: DetailsStepProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg flex items-center space-x-2">
            <Icon name="FileText" className="w-4 h-4 md:w-5 md:h-5" />
            <span>Основная информация</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm md:text-base font-medium">
              Название *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => onInputChange("title", e.target.value)}
              placeholder="Например: iPhone 13 Pro Max 128GB"
              className="text-sm md:text-base h-10 md:h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm md:text-base font-medium">
              Описание *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Опишите товар: состояние, особенности, почему продаете..."
              className="text-sm md:text-base min-h-[80px] md:min-h-[100px] resize-none"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm md:text-base font-medium">
              Цена *
            </Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => onInputChange("price", e.target.value)}
                placeholder="0"
                className="text-sm md:text-base h-10 md:h-11 pr-12"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-sm md:text-base font-medium">
              Состояние *
            </Label>
            <Select
              value={condition}
              onValueChange={(value) => onInputChange("condition", value)}
              required
            >
              <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                <SelectValue placeholder="Выберите состояние" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filters.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg flex items-center space-x-2">
              <Icon name="Settings" className="w-4 h-4 md:w-5 md:h-5" />
              <span>Дополнительные фильтры</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            {filters.map((filter) => {
              switch (filter.type) {
                case FilterType.SELECT:
                  return (
                    <div key={filter.id} className="space-y-2">
                      <Label className="text-sm md:text-base font-medium">
                        {filter.name}
                      </Label>
                      <Select
                        value={selectedFilters[filter.id]?.toString() || ""}
                        onValueChange={(val) => onFilterChange(filter.id, val)}
                      >
                        <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                          <SelectValue placeholder={`Выберите ${filter.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.values.map((val) => (
                            <SelectItem key={val} value={val}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                case FilterType.CHECKBOX:
                  return (
                    <div key={filter.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`filter-${filter.id}`}
                        checked={!!selectedFilters[filter.id]}
                        onChange={(e) =>
                          onFilterChange(filter.id, e.target.checked)
                        }
                      />
                      <Label htmlFor={`filter-${filter.id}`}>{filter.name}</Label>
                    </div>
                  );

                case FilterType.RANGE:
                  return (
                    <div key={filter.id} className="space-y-2">
                      <Label className="text-sm md:text-base font-medium">
                        {filter.name}
                      </Label>
                      <Input
                        type="number"
                        value={selectedFilters[filter.id]?.toString() || ""}
                        onChange={(e) =>
                          onFilterChange(filter.id, Number(e.target.value))
                        }
                        className="text-sm md:text-base h-10 md:h-11"
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};