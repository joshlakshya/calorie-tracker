import { DiaryEntry, Meal, UserProfile, DailyStats } from '../types';

const STORAGE_KEYS = {
    DIARY: 'lakshya_diary',
    MEALS: 'lakshya_meals',
    PROFILE: 'lakshya_profile',
} as const;

// Diary Entry Storage
export const saveDiaryEntry = (entry: DiaryEntry): void => {
    const entries = getDiaryEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(entries));
};

export const getDiaryEntries = (): DiaryEntry[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DIARY);
    return data ? JSON.parse(data) : [];
};

export const getDiaryEntriesByDate = (date: string): DiaryEntry[] => {
    const entries = getDiaryEntries();
    return entries.filter(entry => entry.date === date);
};

export const deleteDiaryEntry = (id: string): void => {
    const entries = getDiaryEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(filtered));
};

export const updateDiaryEntry = (id: string, updatedEntry: DiaryEntry): void => {
    const entries = getDiaryEntries();
    const index = entries.findIndex(entry => entry.id === id);
    if (index !== -1) {
        entries[index] = updatedEntry;
        localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(entries));
    }
};

// Custom Meals Storage
export const saveCustomMeal = (meal: Meal): void => {
    const meals = getCustomMeals();
    meals.push(meal);
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
};

export const getCustomMeals = (): Meal[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MEALS);
    return data ? JSON.parse(data) : [];
};

export const deleteCustomMeal = (id: string): void => {
    const meals = getCustomMeals();
    const filtered = meals.filter(meal => meal.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(filtered));
};

export const updateCustomMeal = (id: string, updatedMeal: Meal): void => {
    const meals = getCustomMeals();
    const index = meals.findIndex(meal => meal.id === id);
    if (index !== -1) {
        meals[index] = updatedMeal;
        localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
    }
};

// User Profile Storage
export const saveUserProfile = (profile: UserProfile): void => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : getDefaultProfile();
};

const getDefaultProfile = (): UserProfile => ({
    dailyCalorieGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 200,
    fatsGoal: 65,
    units: 'metric',
    theme: 'dark',
});

// Statistics Calculation
export const calculateDailyStats = (date: string): DailyStats => {
    const entries = getDiaryEntriesByDate(date);

    const stats: DailyStats = {
        date,
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        mealsCount: entries.length,
    };

    entries.forEach(entry => {
        const { nutrition, portion } = entry.meal;
        stats.totalCalories += nutrition.calories * portion;
        stats.totalProtein += nutrition.protein * portion;
        stats.totalCarbs += nutrition.carbs * portion;
        stats.totalFats += nutrition.fats * portion;
    });

    return stats;
};

export const getWeeklyStats = (endDate: Date): DailyStats[] => {
    const stats: DailyStats[] = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(endDate);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        stats.push(calculateDailyStats(dateStr));
    }

    return stats;
};
