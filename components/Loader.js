import capitalize from '@/utils/capitalize';

const Loader = ({ progress }) => {
  console.log(progress);
  return (
    <div className="flex-grow flex flex-col justify-center items-center space-y-6 bg-bg">
      {Object.entries(progress).map(([endpoint, progress]) => (
        <ProgressBar key={endpoint} endpoint={endpoint} progress={progress} />
      ))}
    </div>
  );
};

const ProgressBar = ({ endpoint, progress }) => {
  return (
    <div className="relative max-w-sm w-full h-10 px-6 flex justify-between items-center rounded-full bg-gray-300 overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 bg-blue"
        style={{ width: `${progress * 100}%` }}
      />
      <span className="text-gray-1 font-medium z-10">
        {capitalize(endpoint)}
      </span>
      <span className="text-gray-1 font-medium z-10">
        {(progress * 100).toFixed() + '%'}
      </span>
    </div>
  );
};

export default Loader;
