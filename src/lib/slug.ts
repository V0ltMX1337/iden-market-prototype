const cyrillicToLatinMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
};

const transliterate = (text: string): string =>
  text
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      const latin = cyrillicToLatinMap[lower] || lower;
      return char === char.toUpperCase() ? latin.toUpperCase() : latin;
    })
    .join("");

export const slugify = (text: string): string =>
  transliterate(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
