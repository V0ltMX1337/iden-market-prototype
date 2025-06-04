import { LucideIcon, icons } from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon = ({
  name,
  size = 16,
  className = "",
  fallback = "CircleAlert",
}: IconProps) => {
  const IconComponent =
    icons[name as keyof typeof icons] || icons[fallback as keyof typeof icons];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;
