// src/components/customcomponent/ProductFeatures.tsx
import { useEffect, useState } from "react";
import { AdFilter, FilterDefinition } from "@/lib/types";
import { storeApi } from "@/lib/store";

interface Props {
  filters: AdFilter[];
}

const ProductFeatures = ({ filters }: Props) => {
  const [filterDefs, setFilterDefs] = useState<Record<string, FilterDefinition>>({});

  useEffect(() => {
    const loadFilters = async () => {
      const defs: Record<string, FilterDefinition> = {};
      for (const f of filters) {
        try {
          const def = await storeApi.getFilterById(f.filterId);
          defs[f.filterId] = def;
        } catch (err) {
          console.error(`Ошибка при загрузке фильтра ${f.filterId}`, err);
        }
      }
      setFilterDefs(defs);
    };

    if (filters.length > 0) {
      loadFilters();
    }
  }, [filters]);

  if (filters.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
      <ul className="space-y-2">
        {filters.map((f) => {
          const def = filterDefs[f.filterId];
          if (!def) return null;
          return (
            <li key={f.filterId} className="flex justify-between border-b pb-1 text-sm text-gray-800">
              <span className="font-medium">{def.name}</span>
              <span>{f.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductFeatures;
