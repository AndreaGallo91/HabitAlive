import { useState } from 'react';
import { HabitProvider, useHabitContext } from './context/HabitContext';
import { PetProvider } from './context/PetContext';
import { DungeonProvider } from './context/DungeonContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HabitList from './components/habits/HabitList';
import PetDisplay from './components/pet/PetDisplay';
import DungeonList from './components/dungeon/DungeonList';
import StatsOverview from './components/stats/StatsOverview';
import MonthlyCalendar from './components/stats/MonthlyCalendar';
import AchievementGrid from './components/achievements/AchievementGrid';
import ThemeSelector from './components/themes/ThemeSelector';
import AchievementToast from './components/gamification/AchievementToast';

function AppContent() {
  const [activeTab, setActiveTab] = useState('oggi');
  const { newAchievements, dismissAchievement } = useHabitContext();

  const renderTab = () => {
    switch (activeTab) {
      case 'oggi':
        return <HabitList />;
      case 'pet':
        return <PetDisplay />;
      case 'dungeon':
        return <DungeonList />;
      case 'stats':
        return (
          <div className="space-y-4">
            <StatsOverview />
            <MonthlyCalendar />
          </div>
        );
      case 'traguardi':
        return (
          <div className="space-y-6">
            <AchievementGrid />
            <ThemeSelector />
          </div>
        );
      default:
        return <HabitList />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Header />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-20">
        {renderTab()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {newAchievements.length > 0 && (
        <AchievementToast
          achievement={newAchievements[0]}
          onDismiss={dismissAchievement}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <PetProvider>
          <DungeonProvider>
            <AppContent />
          </DungeonProvider>
        </PetProvider>
      </HabitProvider>
    </ThemeProvider>
  );
}
