import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { getCustomMeals, deleteCustomMeal, saveDiaryEntry } from '../utils/storage';
import type { Meal, DiaryEntry } from '../types';
import MealCard from '../components/MealCard';

export default function Meals() {
    const navigate = useNavigate();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = () => {
        setMeals(getCustomMeals());
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this custom meal?')) {
            deleteCustomMeal(id);
            loadMeals();
        }
    };

    const handleAddToDiary = (meal: Meal) => {
        const entry: DiaryEntry = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            meal: { ...meal, id: crypto.randomUUID() },
            timestamp: new Date().toISOString(),
        };
        saveDiaryEntry(entry);
        navigate('/diary');
    };

    const filteredMeals = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Custom Meals</h1>
                    <p className="text-white/60 mt-1">Your saved meals for quick logging</p>
                </div>
                <button
                    onClick={() => navigate('/add-meal')}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create Meal
                </button>
            </div>

            {/* Search */}
            <div className="glass-card p-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-12"
                        placeholder="Search meals..."
                    />
                </div>
            </div>

            {/* Meals Grid */}
            {filteredMeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMeals.map((meal) => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            onAdd={() => handleAddToDiary(meal)}
                            onDelete={() => handleDelete(meal.id)}
                            showActions={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="glass-card p-16 text-center">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-semibold text-white/80 mb-2">
                        {searchQuery ? 'No meals found' : 'No custom meals yet'}
                    </h3>
                    <p className="text-white/60 mb-6">
                        {searchQuery
                            ? 'Try a different search term'
                            : 'Create your first custom meal for quick logging'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => navigate('/add-meal')}
                            className="btn-primary"
                        >
                            Create Your First Meal
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
