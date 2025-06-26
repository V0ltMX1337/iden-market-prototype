"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  action?: () => void;
  content?: React.ReactNode; // dropdown or any custom content
  path?: string; // добавил путь для удобства
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  action?: never;
  content?: never;
  path?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  defaultTabId?: string;
  activeIndex?: number | null;              // новый проп для контроля активного таба
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

const ExpandableTabsAvito = React.forwardRef<HTMLDivElement, ExpandableTabsProps>(
  (
    { tabs, className, activeColor = "#00A046", activeIndex, onChange },
    ref,
  ) => {
    // Локальный стейт только если activeIndex не контролируется снаружи
    const [selected, setSelected] = React.useState<number | null>(null);
    const divRef = React.useRef<HTMLDivElement>(null);

    useOnClickOutside(divRef, () => {
      onChange?.(null);
      if (activeIndex === undefined) {
        setSelected(null);
      }
    });

    const currentSelected = activeIndex !== undefined ? activeIndex : selected;

    const handleTabClick = (index: number, tab: TabItem) => {
  if (tab.type === "separator") return;

  if (currentSelected === index) {
    // клик по открытому табу - закрыть
    onChange?.(null);
    if (activeIndex === undefined) setSelected(null);
  } else {
    if (tab.action) tab.action();
    // НЕ вызываем onChange(null), а вызываем onChange(index)
    onChange?.(index);
    if (activeIndex === undefined) setSelected(index);
  }
};



    return (
      <div className="relative">
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

            const isSelected = currentSelected === index;
            const IconComponent = tab.icon;

            return (
              <motion.button
                key={index}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                custom={isSelected}
                onClick={() => handleTabClick(index, tab)}
                style={{ color: isSelected ? activeColor : undefined }}
                className={cn(
                  "relative flex items-center rounded-md p-2 text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                type="button"
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

        {/* Dropdown Content */}
        <AnimatePresence>
          {currentSelected !== null && tabs[currentSelected]?.content && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 z-50"
            >
              {tabs[currentSelected]?.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

ExpandableTabsAvito.displayName = "ExpandableTabsAvito";

export { ExpandableTabsAvito };
