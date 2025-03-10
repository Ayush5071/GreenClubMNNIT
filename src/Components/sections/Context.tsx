import Image from "next/image";

const Context = () => {
  return (
    <div
    id="about"
      className="w-full h-full bg-zinc-950 bg-cover bg-center px-6 py-8"
      style={{ backgroundImage: `url('/Elements/grid.png')` }} 
    >
      <div className="w-full mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-bebas text-white">
          Inaugurated by Ram Nath Kovind, Ex-President of India
        </h1>
      </div>
      <div className="flex flex-col md:flex-row font-Sfpro items-center md:justify-between gap-8">
        {/* Content Section */}
        <div className="w-full md:w-[50%] text-white font-medium text-lg leading-relaxed">
          <p>
          </p>
          <p className="mt-4 md:block hidden">
            Our efforts aim to reduce plastic usage by educating the community on alternatives and advocating for the installation of more dustbins throughout the campus. Additionally, we have initiated several programs that care for stray animals, providing water for their survival, and plant pots around the campus for a greener and healthier environment.
          </p>
          <p className="mt-4">
            Join us in our mission to promote sustainability and work towards making MNNIT a cleaner, greener, and more environmentally-friendly institution for future generations.
          </p>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-64 md:h-96 lg:h-[28rem] border-white border-2 rounded-lg overflow-hidden shadow-lg relative">
          <Image
            src="/Images/About.webp"
            alt="Green Club Initiatives"
            layout="fill" 
            objectFit="cover" 
            priority // Optional: Loads this image first
          />
        </div>
      </div>
    </div>
  );
};

export default Context;
