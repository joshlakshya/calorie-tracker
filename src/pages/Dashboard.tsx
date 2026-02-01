import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Flame, Activity } from 'lucide-react';
import ProgressRing from '../components/ProgressRing';
import { getUserProfile, calculateDailyStats, getWeeklyStats } from '../utils/storage';
import type { DailyStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [profile, setProfile] = useState(getUserProfile());
    const [todayStats, setTodayStats] = useState<DailyStats | null>(null);
    const [weeklyData, setWeeklyData] = useState<DailyStats[]>([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stats = calculateDailyStats(today);
        setTodayStats(stats);
        setWeeklyData(getWeeklyStats(new Date()));
    }, []);

    if (!todayStats) return null;

    const calorieProgress = Math.min((todayStats.totalCalories / profile.dailyCalorieGoal) * 100, 100);
    const remaining = Math.max(profile.dailyCalorieGoal - todayStats.totalCalories, 0);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-2 py-8">
                <h1 className="text-5xl font-bold gradient-text text-glow">Lakshya</h1>
                <p className="text-xl text-white/60">Stick to Your Goal</p>
            </div>

            {/* Today's Progress */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-400" />
                    Today's Progress
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                    <div className="text-center">
                        <ProgressRing
                            progress={calorieProgress}
                            value={`${todayStats.totalCalories}`}
                            label="calories"
                            size={220}
                        />
                        <div className="mt-4 space-y-1">
                            <p className="text-lg text-white/80">
                                <span className="font-semibold text-purple-400">{remaining}</span> remaining
                            </p>
                            <p className="text-sm text-white/60">
                                Goal: {profile.dailyCalorieGoal} cal
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400">{Math.round(todayStats.totalProtein)}g</div>
                            <div className="text-sm text-white/60 mt-1">Protein</div>
                            <div className="text-xs text-white/40 mt-1">of {profile.proteinGoal}g</div>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-pink-400">{Math.round(todayStats.totalCarbs)}g</div>
                            <div className="text-sm text-white/60 mt-1">Carbs</div>
                            <div className="text-xs text-white/40 mt-1">of {profile.carbsGoal}g</div>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-blue-400">{Math.round(todayStats.totalFats)}g</div>
                            <div className="text-sm text-white/60 mt-1">Fats</div>
                            <div className="text-xs text-white/40 mt-1">of {profile.fatsGoal}g</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card-hover p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-green-500/20 rounded-xl">
                            <Activity className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Meals Logged</h3>
                    </div>
                    <div className="text-4xl font-bold gradient-text">{todayStats.mealsCount}</div>
                    <p className="text-sm text-white/60 mt-2">Today</p>
                </div>

                <div className="glass-card-hover p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Weekly Avg</h3>
                    </div>
                    <div className="text-4xl font-bold gradient-text">
                        {Math.round(weeklyData.reduce((acc, day) => acc + day.totalCalories, 0) / 7)}
                    </div>
                    <p className="text-sm text-white/60 mt-2">Calories/day</p>
                </div>

                <Link to="/diary" className="glass-card-hover p-6 group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Add Meal</h3>
                    </div>
                    <p className="text-white/60">Log your next meal</p>
                </Link>
            </div>

            {/* Weekly Trend */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    Weekly Trend
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={weeklyData}>
                        <defs>
                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.3)"
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                        />
                        <YAxis stroke="rgba(255,255,255,0.3)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                backdropFilter: 'blur(10px)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalCalories"
                            stroke="#a855f7"
                            strokeWidth={2}
                            fill="url(#colorCalories)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
