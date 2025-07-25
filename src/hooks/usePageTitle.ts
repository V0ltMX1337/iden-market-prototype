import { useEffect, useState } from "react";
import { SystemSettings } from "@/lib/types";
import { storeApi } from "@/lib/store";

export type TemplateKeys = keyof Pick<
  SystemSettings,
  | "mainPageTitle"
  | "adTitle"
  | "userProfile"
  | "categoryTitle"
  | "authTitle"
  | "registerTitle"
  | "profileMain"
  | "profileAds"
  | "profileMessages"
  | "profileFavorites"
  | "profileGame"
  | "profileSettings"
  | "profileNewAd"
>;

type TemplateValues = Record<string, string>;

export function useSystemSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  useEffect(() => {
    storeApi.getSystemSettings().then(setSettings).catch(console.error);
  }, []);

  return settings;
}

export function usePageTitle() {
  const settings = useSystemSettings();

  const getPageTitle = (templateKey: TemplateKeys, values: TemplateValues): string => {
    if (!settings) return "";

    const template = settings[templateKey];
    const merged: Record<string, string> = {
      ...values,
      sitename: settings.siteName,
    };

    return template.replace(/%(\w+)%/g, (_, key) => merged[key] ?? "");
  };

  return { getPageTitle, settings };
}
