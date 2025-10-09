export default function LanguageSelector() {
  const currentLanguage = { code: "pt", name: "Português", flag: "🇵🇹" };

  return (
    <div className="flex items-center gap-2 text-gray-300 px-3 py-2">
      <span className="text-lg">{currentLanguage.flag}</span>
      <span className="hidden md:inline text-sm font-medium">PT</span>
    </div>
  );
}
