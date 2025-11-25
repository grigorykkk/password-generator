import { useState } from "react";
import { generatePassword } from "./passwordGenerator";

function App() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    try {
      const pwd = generatePassword({
        length,
        lower,
        upper,
        digits,
        symbols,
        excludeSimilar,
      });
      setPassword(pwd);
      setError(null);
      setCopied(false);
    } catch (e: any) {
      setError(e.message ?? "Ошибка");
    }
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="app">
      <h1>Генератор паролей</h1>

      <input
        className="password-field"
        type="text"
        readOnly
        value={password}
        placeholder="Пароль появится здесь"
      />

      <button
        className="copy-btn"
        onClick={handleCopy}
        disabled={!password}
      >
        {copied ? "Скопировано!" : "Копировать"}
      </button>

      {error && <div className="error">{error}</div>}

      <div className="options">
        <label>
          Длина: {length}
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={lower}
            onChange={(e) => setLower(e.target.checked)}
          /> строчные (a-z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={upper}
            onChange={(e) => setUpper(e.target.checked)}
          /> заглавные (A-Z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={digits}
            onChange={(e) => setDigits(e.target.checked)}
          /> цифры (0-9)
        </label>

        <label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          /> символы (!@#$...)
        </label>

        <label>
          <input
            type="checkbox"
            checked={excludeSimilar}
            onChange={(e) => setExcludeSimilar(e.target.checked)}
          /> убирать похожие символы
        </label>
      </div>

      <button className="generate-btn" onClick={handleGenerate}>
        Сгенерировать пароль
      </button>
    </div>
  );
}

export default App;
