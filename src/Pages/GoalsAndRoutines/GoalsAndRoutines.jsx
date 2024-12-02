// import React from 'react';
import { FaUser, FaClock, FaFire, FaTrophy } from 'react-icons/fa';
import SharedTitle from '../../Components/Shared/SharedTitle';

const GoalsAndRoutines = () => {
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      goals: ["Build Muscle", "Lose Weight"],
      routine: ["Weightlifting: 5x/week", "High-protein diet", "Cardio: 1x/week", "Cardio: 5x/week", "Caloric deficit diet", "HIIT: 2x/week"],
      
    },
    {
      id: 2,
      name: "Michael Chen",
      goals: ["Improve Stamina"],
      routine: ["Running: 4x/week", "Cycling: 2x/week", "Swimming: 1x/week"],
     
    },
    {
      id: 3,
      name: "Emma Thompson",
      goals: ["Flexibility"],
      routine: ["Yoga: Daily", "Stretching: 5x/week", "Pilates: 3x/week"],
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
       <SharedTitle heading="All Member Goals and Daily Routines"/>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="relative bg-gray-900 border-2 border-red-800/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-red-900/30 transition-all duration-500 hover:-translate-y-1"
            >
             

              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-red-800 p-3 rounded-lg">
                  <FaUser className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user.name}
                  </h2>
                  {/* <ProgressBar progress={user.progress} /> */}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTrophy className="text-xl text-red-500" />
                    <h3 className="text-lg font-semibold text-white">Goals</h3>
                  </div>
                  <div className="grid gap-2">
                    {user.goals.map((goal, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/30 rounded-lg p-4 text-red-200 flex items-center gap-2 hover:border-red-500/50 transition-colors duration-300"
                      >
                        <FaFire className="text-red-500" />
                        {goal}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-800/50 to-transparent my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FaClock className="text-xl text-red-500" />
                    <h3 className="text-lg font-semibold text-white">Daily Routine</h3>
                  </div>
                  <div className="grid gap-2">
                    {user.routine.map((routine, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/30 rounded-lg p-4 text-red-200 hover:border-red-500/50 transition-colors duration-300"
                      >
                        {routine}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsAndRoutines;