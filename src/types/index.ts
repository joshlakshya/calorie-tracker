export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export interface Meal {
    id: string;
    name: string;
    nutrition: NutritionInfo;
    portion: number; // serving size multiplier
    category: MealCategory;
    isCustom: boolean;
    createdAt: string;
}

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DiaryEntry {
    id: string;
    date: string; // ISO date string
    meal: Meal;
    timestamp: string; // ISO timestamp
}

export interface UserProfile {
    dailyCalorieGoal: number;
    proteinGoal: number; // grams
    carbsGoal: number; // grams
    fatsGoal: number; // grams
    units: 'metric' | 'imperial';
    theme: 'light' | 'dark';
}

export interface DailyStats {
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    mealsCount: number;
}
