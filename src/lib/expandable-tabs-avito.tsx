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
  activeIndex?: number | null;
  onChange?: (index: number | null) => void;
  isGuest?: boolean;
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: (show: boolean) => ({
    width: show ? "auto" : 0,
    opacity: show ? 1 : 0,
  }),
};

const ExpandableTabsAvito = React.forwardRef<HTMLDivElement, ExpandableTabsProps>(
  (
    {
      tabs,
      className,
      activeColor = "#00A046",
      activeIndex,
      onChange,
      isGuest = false,
    },
    ref
  ) => {
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

      if (tab.action) tab.action();

      if (currentSelected === index) {
        onChange?.(null);
        if (activeIndex === undefined) setSelected(null);
      } else {
        onChange?.(index);
        if (activeIndex === undefined) setSelected(index);
      }
    };

    return (
      <div className="relative" ref={ref}>
        <div
          ref={divRef}
          className={cn(
            "flex h-fit items-center rounded-lg border border-white/20 bg-white/10 p-1 shadow-sm backdrop-blur-sm",
            className
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

            // Для гостей: всегда показываем текст, увеличиваем padding и gap
            const showText = isGuest || isSelected;
            const paddingLR = isGuest || isSelected ? "1.25rem" : ".5rem";
            const gapSize = isGuest || isSelected ? ".75rem" : 0;

            return (
              <motion.button
                key={index}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    gap: gapSize,
                    paddingLeft: paddingLR,
                    paddingRight: paddingLR,
                  },
                  animate: {
                    gap: gapSize,
                    paddingLeft: paddingLR,
                    paddingRight: paddingLR,
                  },
                }}
                onClick={() => handleTabClick(index, tab)}
                style={{ color: isSelected ? activeColor : undefined }}
                className={cn(
                  "relative flex items-center rounded-md p-2 text-sm font-medium transition-colors",
                  isSelected || isGuest
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
                type="button"
              >
                <IconComponent size={16} />
                <AnimatePresence>
                  {showText && (
                    <motion.span
                      variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      custom={showText}
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

        {/* Dropdown Content (только для не-гостей) */}
        <AnimatePresence>
          {!isGuest &&
            currentSelected !== null &&
            tabs[currentSelected]?.content && (
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
  }
);

ExpandableTabsAvito.displayName = "ExpandableTabsAvito";

export { ExpandableTabsAvito };
