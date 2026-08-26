'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="تغییر حالت نمایش"
      className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] transition-colors text-[var(--text-primary)] flex items-center gap-2 text-sm font-medium"
    >
      {theme === 'light' ? (
        <>
          <span>🌙</span>
          <span>حالت تاریک</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span>حالت روشن</span>
        </>
      )}
    </button>
  );
}