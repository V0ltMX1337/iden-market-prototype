"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  action?: () => void;
  content?: React.ReactNode; // dropdown or any custom content
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  action?: never;
  content?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  defaultTabId?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: (isSelected: boolean) => ({
    width: isSelected ? "auto" : 0,
    opacity: isSelected ? 1 : 0,
  }),
};

const ExpandableTabs = React.forwardRef<HTMLDivElement, ExpandableTabsProps>(
  (
    { tabs, className, activeColor = "#00A046", defaultTabId, onChange },
    ref,
  ) => {
    const [selected, setSelected] = React.useState<number | null>(null);
    const divRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useOnClickOutside(divRef, () => {
      setSelected(null);
      onChange?.(null);
    });

    const handleTabClick = (index: number, tab: TabItem) => {
      if (tab.type === "separator") return;

      if (selected === index) {
        setSelected(null);
        onChange?.(null);
      } else {
        setSelected(index);
        onChange?.(index);
        if (tab.action) {
          tab.action();
        }
      }
    };

    return (
      <div
        ref={divRef}
        className={cn(
          "flex h-fit items-center rounded-lg border border-white/20 bg-white/10 p-1 shadow-sm backdrop-blur-sm",
          className,
        )}
      >
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return (
              <div
                key={`separator-${index}`}
                className="mx-1 h-6 w-px bg-white/20"
              />
            );
          }

          const isSelected = selected === index;
          const IconComponent = tab.icon;

          return (
            <motion.button
              key={index}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={isSelected}
              onClick={() => handleTabClick(index, tab)}
              className={cn(
                "relative flex items-center rounded-md p-2 text-sm font-medium transition-colors",
                isSelected
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <IconComponent size={16} />
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    custom={isSelected}
                    className="overflow-hidden whitespace-nowrap text-sm"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    );
  },
);

ExpandableTabs.displayName = "ExpandableTabs";

export { ExpandableTabs };
