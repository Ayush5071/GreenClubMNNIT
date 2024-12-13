import Image from "next/image";

const Context = () => {
  return (
    <div
      className="w-full h-full bg-zinc-950 bg-cover bg-center px-6 py-8"
      style={{ backgroundImage: `url('/Elements/grid.png')` }} // Background image from public folder
    >
      <div className="w-full mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
        {/* Content Section */}
        <div className="w-full md:w-[50%] text-white font-medium text-lg leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde ea quae fugit quo, optio omnis repellendus. Iusto sequi libero repudiandae aut nihil magnam inventore. Quia quas enim illum quos dolore.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero neque accusantium saepe fuga provident cupiditate commodi, eum eveniet asperiores aliquid eos! Repellendus fuga culpa nostrum debitis vero quidem cupiditate earum.
          </p>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-64 md:h-96 lg:h-[28rem] border-white border-2 rounded-lg overflow-hidden shadow-lg relative">
          <Image
            src="/Images/About.webp" // Path to the image in the public folder
            alt="Green Club Illustration"
            layout="fill" // Ensures the image fills the parent container
            objectFit="cover" // Makes the image cover the container without distortion
            priority // Optional: Loads this image first
          />
        </div>
      </div>
    </div>
  );
};

export default Context;
