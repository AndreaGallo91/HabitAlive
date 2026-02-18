import { Calendar, PawPrint, Swords, BarChart3, Trophy } from 'lucide-react';

const TABS = [
  { id: 'oggi', label: 'Oggi', icon: Calendar },
  { id: 'pet', label: 'Pet', icon: PawPrint },
  { id: 'dungeon', label: 'Dungeon', icon: Swords },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'traguardi', label: 'Traguardi', icon: Trophy },
];

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="sticky bottom-0 z-50 glass border-t border-[var(--color-border)]">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-[var(--color-primary)] scale-105'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[var(--color-primary)] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
