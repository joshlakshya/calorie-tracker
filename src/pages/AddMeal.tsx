import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { saveDiaryEntry, saveCustomMeal } from '../utils/storage';
import type { Meal, MealCategory, DiaryEntry } from '../types';

export default function AddMeal() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { category?: MealCategory; date?: string } | null;

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [portion, setPortion] = useState('1');
    const [category, setCategory] = useState<MealCategory>(state?.category || 'breakfast');
    const [saveAsCustom, setSaveAsCustom] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const meal: Meal = {
            id: crypto.randomUUID(),
            name,
            nutrition: {
                calories: parseFloat(calories) || 0,
                protein: parseFloat(protein) || 0,
                carbs: parseFloat(carbs) || 0,
                fats: parseFloat(fats) || 0,
            },
            portion: parseFloat(portion) || 1,
            category,
            isCustom: saveAsCustom,
            createdAt: new Date().toISOString(),
        };

        // Save to diary
        const entry: DiaryEntry = {
            id: crypto.randomUUID(),
            date: state?.date || new Date().toISOString().split('T')[0],
            meal,
            timestamp: new Date().toISOString(),
        };
        saveDiaryEntry(entry);

        // Optionally save as custom meal
        if (saveAsCustom) {
            saveCustomMeal(meal);
        }

        navigate('/diary');
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold gradient-text">Add Meal</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn-icon"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Meal Name */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Meal Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            placeholder="e.g., Chicken Salad"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as MealCategory)}
                            className="input-field"
                        >
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>

                    {/* Nutrition Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Calories
                            </label>
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="input-field"
                                placeholder="0"
                                step="0.1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Portion Size
                            </label>
                            <input
                                type="number"
                                value={portion}
                                onChange={(e) => setPortion(e.target.value)}
                                className="input-field"
                                placeholder="1"
                                step="0.1"
                                min="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Protein (g)
                            </label>
                            <input
                                type="number"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                className="input-field"
                                placeholder="0"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Carbs (g)
                            </label>
                            <input
                                type="number"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                className="input-field"
                                placeholder="0"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Fats (g)
                            </label>
                            <input
                                type="number"
                                value={fats}
                                onChange={(e) => setFats(e.target.value)}
                                className="input-field"
                                placeholder="0"
                                step="0.1"
                            />
                        </div>
                    </div>

                    {/* Save as Custom Meal */}
                    <div className="flex items-center gap-3 glass-card p-4 rounded-xl">
                        <input
                            type="checkbox"
                            id="saveCustom"
                            checked={saveAsCustom}
                            onChange={(e) => setSaveAsCustom(e.target.checked)}
                            className="w-5 h-5 rounded accent-purple-600"
                        />
                        <label htmlFor="saveCustom" className="text-sm text-white/80 cursor-pointer">
                            Save as custom meal for quick access later
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Add to Diary
                    </button>
                </form>
            </div>
        </div>
    );
}
