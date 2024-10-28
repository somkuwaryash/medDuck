import Image from 'next/image';

const GroqBanner = () => {
  return (
    <div className="flex justify-center mb-16">
      <div className="flex items-center space-x-4 bg-gray-900/50 rounded-full px-8 py-4 border border-gray-800 hover:bg-gray-900/70 transition-all duration-300">
        <span className="text-gray-400 text-lg">Powered by</span>
        <Image
          src="/groq.svg"
          alt="Powered by Groq"
          width={150}
          height={150}
          className="h-12 w-auto"
          priority
        />
      </div>
    </div>
  );
};

export default GroqBanner;