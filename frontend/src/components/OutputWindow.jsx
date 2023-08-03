import {Buffer} from 'buffer';
const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
      let statusId = outputDetails?.status?.id;

      if (statusId === 6) {
        // compilation error
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {Buffer.from(outputDetails?.compile_output, 'base64').toString()}
          </pre>
        );
      } else if (statusId === 3) {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-green-500">
            {Buffer.from(outputDetails.stdout, 'base64').toString() !== null
              ? `${Buffer.from(outputDetails.stdout, 'base64').toString()}`
              : null}
          </pre>
        );
      } else if (statusId === 5) {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {`Time Limit Exceeded`}
          </pre>
        );
      } else {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {Buffer.from(outputDetails?.stderr, 'base64').toString()}
          </pre>
        );
      }
    };
    return (
      <>
        <div className="h-44 md:col-span-2 md:h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
          {outputDetails ? <>{getOutput()}</> : null}
        </div>
      </>
    );
  };

  export default OutputWindow;
