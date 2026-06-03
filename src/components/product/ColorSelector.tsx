interface ColorOption {
  name: string;
  hex: string;
}

interface Props {
  colors: ColorOption[];
  value?: string;
  onChange: (name: string) => void;
}

export function ColorSelector({ colors, value, onChange }: Props) {
  const active = colors.find((c) => c.name === value);
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Color
        </span>
        {active && (
          <span className="text-[11px] uppercase tracking-[0.22em] text-foreground">
            — {active.name}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => {
          const isActive = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              aria-pressed={isActive}
              onClick={() => onChange(c.name)}
              className={`h-10 w-10 rounded-full border-2 transition ${
                isActive ? "border-primary" : "border-border hover:border-primary/50"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}
