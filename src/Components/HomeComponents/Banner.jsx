import banner from '../../assets/Banner.png';

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat h-screen w-full"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
        
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0">
                <div className="absolute top-8 left-8 w-20 h-20 border-2 border-red-500 animate-bounce"></div>
                <div className="absolute bottom-16 right-16 w-16 h-16 rounded-full border-2 border-white animate-slide"></div>
            </div>

           
            <div className="relative flex flex-col items-center justify-center text-center h-full text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 tracking-widest">
                    Fitness Gym
                </h1>

                <ul className="text-sm md:text-lg space-y-2 mb-6">
                    <li>• Gym with modern equipment</li>
                    <li>• Individual training with a trainer</li>
                    <li>• Group training (aerobics, yoga, Pilates, zumba, etc.)</li>
                </ul>

                <a
                    href="#join"
                    className="bg-red-500 px-6 py-2 text-lg rounded-full font-semibold hover:bg-red-600 transition"
                >
                    JOIN US
                </a>
            </div>
            <style>
                {`
                @keyframes slide {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(20px); }
                }

                .animate-slide {
                    animation: slide 3s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
};

export default Banner;
