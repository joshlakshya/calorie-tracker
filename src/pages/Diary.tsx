import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { getDiaryEntriesByDate, deleteDiaryEntry, calculateDailyStats } from '../utils/storage';
import type { DiaryEntry, DailyStats } from '../types';
import MealCard from '../components/MealCard';

export default function Diary() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [stats, setStats] = useState<DailyStats | null>(null);

    useEffect(() => {
        loadEntries();
    }, [selectedDate]);

    const loadEntries = () => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const dayEntries = getDiaryEntriesByDate(dateStr);
        setEntries(dayEntries);
        setStats(calculateDailyStats(dateStr));
    };

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this meal entry?')) {
            deleteDiaryEntry(id);
            loadEntries();
        }
    };

    const categorizeEntries = () => {
        const categories = {
            breakfast: entries.filter(e => e.meal.category === 'breakfast'),
            lunch: entries.filter(e => e.meal.category === 'lunch'),
            dinner: entries.filter(e => e.meal.category === 'dinner'),
            snack: entries.filter(e => e.meal.category === 'snack'),
        };
        return categories;
    };

    const categorized = categorizeEntries();
    const isToday = selectedDate.toDateString() === new Date().toDateString();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Date Navigation */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevDay}
                        className="btn-icon"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold gradient-text">
                            {isToday ? 'Today' : selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h2>
                        <p className="text-sm text-white/60 mt-1">
                            {selectedDate.toLocaleDateString('en-US', { year: 'numeric' })}
                        </p>
                    </div>

                    <button
                        onClick={handleNextDay}
                        className="btn-icon"
                        disabled={isToday}
                    >
                        <ChevronRight className={`w-5 h-5 ${isToday ? 'opacity-30' : ''}`} />
                    </button>
                </div>

                {stats && (
                    <div className="mt-6 grid grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold gradient-text">{Math.round(stats.totalCalories)}</div>
                            <div className="text-xs text-white/60">Calories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{Math.round(stats.totalProtein)}g</div>
                            <div className="text-xs text-white/60">Protein</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-400">{Math.round(stats.totalCarbs)}g</div>
                            <div className="text-xs text-white/60">Carbs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{Math.round(stats.totalFats)}g</div>
                            <div className="text-xs text-white/60">Fats</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Meal Categories */}
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((category) => (
                <div key={category} className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold capitalize">{category}</h3>
                        <button
                            onClick={() => navigate('/add-meal', { state: { category, date: selectedDate.toISOString().split('T')[0] } })}
                            className="btn-icon"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {categorized[category].length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categorized[category].map((entry) => (
                                <MealCard
                                    key={entry.id}
                                    meal={entry.meal}
                                    onDelete={() => handleDelete(entry.id)}
                                    showActions={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center text-white/40">
                            No {category} logged
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
