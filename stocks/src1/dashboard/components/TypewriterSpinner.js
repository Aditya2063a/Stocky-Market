import Typewriter from 'typewriter-effect';

const TypewriterSpinner = (props) => {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin-slow rounded-full h-${props.size} w-${props.size} border-t-4 border-blue-500 border-solid`}></div>
      <div className="mt-4 text-center">
        {/* <p className="text-lg font-semibold text-gray-700">
          Loading site...
        </p> */}
        <h1 className="text-transparent text-xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          <Typewriter
            options={{
              strings: [
                props.text,
              ],
              autoStart: true,
              loop: false,
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default TypewriterSpinner;