import  { useState } from 'react';
import { FaDumbbell, FaRunning } from 'react-icons/fa';
import { BiDumbbell } from "react-icons/bi";
import { GrYoga } from "react-icons/gr";
import { MdAdd, MdClose, MdSave } from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

const WorkoutPlannerModal = ({ isOpen, onClose, onSave }) => {
    const { user } = useAuth();
    const DAILY_GOAL = 500;
    const currentDay = 'Wednesday';

    const [todayWorkout, setTodayWorkout] = useState({
        email: user.email,
        name: user.name,
        day: currentDay,
        exercises: [],
        totalCalories: 0,
        status: 'Not Started',
        completed: false,
    });
    console.log(todayWorkout);
    

    const [selectedCategory, setSelectedCategory] = useState("");

    const exerciseData = {
        "exercise_categories": [
            {
                "category": "Cardio",
                "exercises": [
                    {
                        "name": "Running",
                        "times": "30 minutes",
                        "calories_gain": "300 kcal"
                    },
                    {
                        "name": "Cycling",
                        "times": "45 minutes",
                        "calories_gain": "400 kcal"
                    },
                    {
                        "name": "Jumping Rope",
                        "times": "20 minutes",
                        "calories_gain": "250 kcal"
                    }
                ]
            },
            {
                "category": "Strength Training",
                "exercises": [
                    {
                        "name": "Push-Ups",
                        "times": "15 reps",
                        "calories_gain": "50 kcal"
                    },
                    {
                        "name": "Squats",
                        "times": "20 reps",
                        "calories_gain": "70 kcal"
                    },
                    {
                        "name": "Deadlifts",
                        "times": "10 reps",
                        "calories_gain": "100 kcal"
                    }
                ]
            },
            {
                "category": "Flexibility",
                "exercises": [
                    {
                        "name": "Yoga",
                        "times": "30 minutes",
                        "calories_gain": "150 kcal"
                    },
                    {
                        "name": "Stretching",
                        "times": "15 minutes",
                        "calories_gain": "50 kcal"
                    },
                    {
                        "name": "Pilates",
                        "times": "30 minutes",
                        "calories_gain": "180 kcal"
                    }
                ]
            }
        ]
    };

    const getTotalCalories = (exercises) => {
        return exercises.reduce((total, exercise) => {
            const calories = parseInt(exercise.calories_gain);
            return total + (isNaN(calories) ? 0 : calories);
        }, 0);
    };

    const addExercise = (exercise) => {
        setTodayWorkout(prev => {
            const updatedExercises = [...prev.exercises, {
                ...exercise,
                category: selectedCategory,
            }];
            const totalCalories = getTotalCalories(updatedExercises);

            return {
                ...prev,
                exercises: updatedExercises,
                totalCalories: totalCalories, 
                status: 'In Progress',
            };
        });
    };

    const completeExercise = (exerciseIndex) => {
        setTodayWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            updatedExercises.splice(exerciseIndex, 1);

            const totalCalories = getTotalCalories(updatedExercises);

            return {
                ...prev,
                exercises: updatedExercises,
                totalCalories: totalCalories, 
                status: updatedExercises.length === 0 ? 'Not Started' : prev.status,
            };
        });
    };

    const toggleDayCompletion = () => {
        setTodayWorkout(prev => ({
            ...prev,
            status: prev.status === 'Completed' ? 'In Progress' : 'Completed',
            exercises: prev.exercises.map(exercise => ({
                ...exercise,
                completed: prev.status !== 'Completed'
            }))
        }));
    };

    const formatDataForBackend = () => {
        const exercises = todayWorkout.exercises;
        return {
            day: currentDay,
            exercises: {
                name: exercises.map(ex => ex.name),
                times: exercises.map(ex => ex.times),
                calories_gain: exercises.map(ex => ({ [ex.calories_gain]: ex.calories_gain })),
                category: exercises.map(ex => ex.category),
                completed: exercises.map(ex => ex.completed || false)
            }
        };
    };

    const saveWorkoutData = async () => {
        try {
            const formattedData = formatDataForBackend();
            const response = axios.post(`http://localhost:9000/workOut`, todayWorkout);
            console.log(response);
            onSave(formattedData);
            onClose();
        } catch (error) {
            console.error('Error saving workout data:', error);
            alert('Failed to save workout data. Please try again.');
        }
    };

    const canCompleteDay = (exercises) => {
        return getTotalCalories(exercises) >= DAILY_GOAL;
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Cardio':
                return <FaRunning className="text-red-500" />;
            case 'Strength Training':
                return <FaDumbbell className="text-red-500" />;
            case 'Flexibility':
                return <GrYoga className="text-red-500" />;
            default:
                return <BiDumbbell className="text-red-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-red-500';
            case 'In Progress': return 'text-red-300';
            default: return 'text-gray-500';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 w-full max-w-2xl mx-4 rounded-lg shadow-xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Add Workout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <MdClose className="text-xl" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <select
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 sticky top-0"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {exerciseData.exercise_categories.map(category => (
                            <option key={category.category} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                    </select>

                    {selectedCategory && (
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            {exerciseData.exercise_categories
                                .find(cat => cat.category === selectedCategory)
                                ?.exercises.map((exercise, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <div className="text-white font-medium">{exercise.name}</div>
                                            <div className="text-gray-400 text-sm">
                                                {exercise.times} • {exercise.calories_gain}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addExercise(exercise)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium">Selected Exercises</h3>
                            <span className={`${getStatusColor(todayWorkout.status)}`}>
                                {todayWorkout.totalCalories} / {DAILY_GOAL} kcal
                            </span>
                        </div>

                        <div className="space-y-2">
                            {todayWorkout.exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="bg-gray-800 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(exercise.category)}
                                            <span className="text-white">
                                                {exercise.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => completeExercise(exerciseIndex)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <MdClose />
                                        </button>
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        {exercise.times} • {exercise.calories_gain}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-800 flex justify-end gap-4 bg-gray-900">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveWorkoutData}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        <MdSave className="inline mr-2" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlannerModal;
