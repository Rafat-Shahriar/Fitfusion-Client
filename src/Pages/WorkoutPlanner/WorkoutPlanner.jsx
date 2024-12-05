import { useEffect, useState } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import WorkoutPlannerModal from './WorkoutPlannerModal';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const WorkoutPlanner = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    day: '',
    exercises: [],
    totalCalories: 0,
    status: 'Not Started'
  });

  const DAILY_GOAL = 500;

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    try {
      const response = await axios(`http://localhost:9000/workout/${user?.email}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.put(`http://localhost:9000/workout/${user?.email}`, {
        status: 'Completed',
        completed: true
      });
      getData(); // Refresh data after updating
    } catch (error) {
      console.error("Error completing workout:", error);
    }
  };

  const handleSaveWorkout = async (newWorkoutData) => {
    try {
      await getData();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={handleComplete}
            disabled={data.status === 'Completed'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              data.status === 'Completed'
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <MdCheck className="text-xl" />
            Complete Workout
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={data.status === 'Completed'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              data.status === 'Completed'
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            <MdAdd className="text-xl" />
            Add Exercise
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 ring-2 ring-red-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {data.day}
              <span className="ml-2 text-sm font-normal text-red-500">(Today)</span>
            </h2>
            <span className={`font-medium ${
              data.status === 'Completed' ? 'text-red-500' :
              data.status === 'In Progress' ? 'text-red-300' : 
              'text-gray-500'
            }`}>
              {data.status}
            </span>
          </div>

          <div className="mb-4 h-2 bg-gray-800 rounded">
            <div
              className="h-2 bg-red-600 rounded"
              style={{
                width: `${Math.min(100, (data.totalCalories / DAILY_GOAL) * 100)}%`
              }}
            ></div>
          </div>

          <div className="text-right text-sm text-gray-400 mb-4">
            {data.totalCalories} / {DAILY_GOAL} kcal
          </div>

          <div className="space-y-2">
            {data?.exercises?.map((exercise, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white">
                      {exercise.name}
                    </span>
                  </div>
                  <span className="text-red-500 text-sm">
                    {exercise.category}
                  </span>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {exercise.times} • {exercise.calories_gain}
                </div>
              </div>
            ))}
          </div>
        </div>

        <WorkoutPlannerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveWorkout}
        />
      </div>
    </div>
  );
};

export default WorkoutPlanner;