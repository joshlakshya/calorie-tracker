import { useState } from 'react';
import { Settings, User as UserIcon, Save } from 'lucide-react';
import { getUserProfile, saveUserProfile } from '../utils/storage';

export default function Profile() {
    const [profile, setProfile] = useState(getUserProfile());
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        saveUserProfile(profile);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl">
                        <UserIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Profile & Settings</h1>
                        <p className="text-white/60 mt-1">Customize your goals and preferences</p>
                    </div>
                </div>
            </div>

            {/* Daily Goals */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-purple-400" />
                    Daily Goals
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Daily Calorie Goal
                        </label>
                        <input
                            type="number"
                            value={profile.dailyCalorieGoal}
                            onChange={(e) => setProfile({ ...profile, dailyCalorieGoal: parseInt(e.target.value) || 0 })}
                            className="input-field"
                            placeholder="2000"
                            step="50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Protein Goal (g)
                            </label>
                            <input
                                type="number"
                                value={profile.proteinGoal}
                                onChange={(e) => setProfile({ ...profile, proteinGoal: parseInt(e.target.value) || 0 })}
                                className="input-field"
                                placeholder="150"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Carbs Goal (g)
                            </label>
                            <input
                                type="number"
                                value={profile.carbsGoal}
                                onChange={(e) => setProfile({ ...profile, carbsGoal: parseInt(e.target.value) || 0 })}
                                className="input-field"
                                placeholder="200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Fats Goal (g)
                            </label>
                            <input
                                type="number"
                                value={profile.fatsGoal}
                                onChange={(e) => setProfile({ ...profile, fatsGoal: parseInt(e.target.value) || 0 })}
                                className="input-field"
                                placeholder="65"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Preferences</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Units
                        </label>
                        <select
                            value={profile.units}
                            onChange={(e) => setProfile({ ...profile, units: e.target.value as 'metric' | 'imperial' })}
                            className="input-field"
                        >
                            <option value="metric">Metric (kg, cm)</option>
                            <option value="imperial">Imperial (lbs, in)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Theme
                        </label>
                        <select
                            value={profile.theme}
                            onChange={(e) => setProfile({ ...profile, theme: e.target.value as 'light' | 'dark' })}
                            className="input-field"
                        >
                            <option value="dark">Dark Mode</option>
                            <option value="light">Light Mode (Coming Soon)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className={`btn-primary w-full flex items-center justify-center gap-2 ${saved ? 'bg-green-600' : ''
                    }`}
            >
                <Save className="w-5 h-5" />
                {saved ? 'Saved!' : 'Save Changes'}
            </button>

            {/* About */}
            <div className="glass-card p-8 text-center">
                <h3 className="text-xl font-bold gradient-text mb-2">Lakshya</h3>
                <p className="text-white/60 text-sm">Stick to Your Goal</p>
                <p className="text-white/40 text-xs mt-4">
                    Based on OpenNutriTracker • Built with React & Vite
                </p>
            </div>
        </div>
    );
}
