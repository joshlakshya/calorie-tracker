import type { Meal } from '../types';
import { Trash2, Edit, Plus } from 'lucide-react';

interface MealCardProps {
    meal: Meal;
    onEdit?: () => void;
    onDelete?: () => void;
    onAdd?: () => void;
    showActions?: boolean;
}

export default function MealCard({
    meal,
    onEdit,
    onDelete,
    onAdd,
    showActions = true,
}: MealCardProps) {
    const { name, nutrition, portion } = meal;
    const totalCalories = Math.round(nutrition.calories * portion);
    const totalProtein = Math.round(nutrition.protein * portion);
    const totalCarbs = Math.round(nutrition.carbs * portion);
    const totalFats = Math.round(nutrition.fats * portion);

    return (
        <div className="glass-card-hover p-5 animate-scale-in">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="text-sm text-white/60">
                        {portion !== 1 ? `${portion}x serving` : '1 serving'}
                    </p>
                </div>
                {showActions && (
                    <div className="flex items-center gap-2">
                        {onAdd && (
                            <button
                                onClick={onAdd}
                                className="p-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
                                title="Add to diary"
                            >
                                <Plus className="w-4 h-4 text-green-400" />
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="p-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
                                title="Edit meal"
                            >
                                <Edit className="w-4 h-4 text-blue-400" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="p-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
                                title="Delete meal"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">{totalCalories}</span>
                    <span className="text-sm text-white/60">calories</span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                    <div className="text-center">
                        <div className="text-lg font-semibold text-purple-400">{totalProtein}g</div>
                        <div className="text-xs text-white/60">Protein</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-pink-400">{totalCarbs}g</div>
                        <div className="text-xs text-white/60">Carbs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-blue-400">{totalFats}g</div>
                        <div className="text-xs text-white/60">Fats</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
