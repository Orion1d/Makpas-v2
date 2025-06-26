
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeToggle = ({ isDarkMode, toggleDarkMode }: ThemeToggleProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      className={`h-9 w-9 ${isDarkMode ? 'bg-secondary/20 border-secondary/30 hover:bg-secondary/30' : 'bg-background/80 border-primary/20 hover:bg-background'}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4 text-secondary-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-primary" />
      )}
    </Button>
  );
};
