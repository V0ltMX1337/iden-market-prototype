import { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { icons } from "lucide-react";

const iconNames = Object.keys(icons);

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  disabled?: boolean;
  label?: string;
}

const IconPicker = ({ value, onChange, disabled, label }: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  // Типизация: говорим, что это React-компонент SVG
  const SelectedIcon = (LucideIcons as any)[value] as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="relative inline-block w-60" ref={containerRef}>
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 w-full rounded border border-gray-300 px-3 py-2 bg-white text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {SelectedIcon && <SelectedIcon className="w-5 h-5 text-blue-600" />}
        <span className="flex-grow truncate">{value}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            placeholder="Поиск иконок..."
            className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
          <ul role="listbox" tabIndex={-1} className="max-h-52 overflow-auto">
            {filteredIcons.length === 0 && (
              <li className="p-2 text-gray-500 text-sm select-none">Нет иконок</li>
            )}
            {filteredIcons.map((iconName) => {
              const Icon = (LucideIcons as any)[iconName] as React.FC<React.SVGProps<SVGSVGElement>>;
              return (
                <li
                  key={iconName}
                  role="option"
                  aria-selected={iconName === value}
                  tabIndex={0}
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer select-none hover:bg-blue-100 ${
                    iconName === value ? "bg-blue-200 font-semibold" : ""
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                  <span className="truncate">{iconName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
