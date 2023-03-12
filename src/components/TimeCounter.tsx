export const TimeCounter: React.FC = () => {


    return (
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*  @ts-ignore */}
          <span style={{ "--value": 10 }} />
        </span>
          minutes
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
           {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <span style={{ "--value": 2 }} />
        </span>
          seconds
        </div>
      </div>

    );
  }
;