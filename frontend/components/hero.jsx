import React from "react";



const Hero = ({games_ref,contact_ref}) => {
  const handleGamesScroll=(e)=>{
    games_ref.current.scrollIntoView({ behavior: "smooth" });
  }
  const handleContactScroll=(e)=>{
    contact_ref.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className="relative bg-black text-white h-screen flex items-center justify-center">
      {/* Background Glow */}
      <div className=" absolute inset-0 bg-gradient-to-b from-red-900/30 to-black"></div>

      {/* Content */}
      <div className=" relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide">
          Welcome to{" "}
          <span className="text-red-600 drop-shadow-lg">Begamer Games</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Play. Compete. Conquer. Experience the next generation of gaming.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGamesScroll}
            className="font-bold bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl transition duration-200"
          >
            Explore Games
          </button>
          <button
            onClick={handleContactScroll}
            className="border border-red-600 hover:border-black hover:bg-white hover:text-red-500 px-8 py-3 rounded-xl font-bold transition duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
