// components/customcomponent/Breadcrumbs.tsx
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface CategoryPathItem {
  name: string;
  slug: string;
  fullSlug: string;
}

interface BreadcrumbsProps {
  categoryPath: CategoryPathItem[];
  fullSlug: string;
}

const Breadcrumbs = ({ categoryPath}: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <button
        onClick={() => navigate("/")}
        className="hover:text-blue-600 transition-colors"
      >
        Главная
      </button>

      {categoryPath.map((item, idx) => {
        const path = categoryPath.slice(0, idx + 1).map(p => p.slug).join("/");
        return (
          <span key={idx} className="flex items-center">
            <Icon name="ChevronRight" size={16} />
            <button
              onClick={() => navigate(`/category/${path}`)}
              className="ml-1 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </button>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
