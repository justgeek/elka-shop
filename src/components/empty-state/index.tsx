import { FunctionComponent } from "react";

interface Props {
  artWorkPath: string;
  message: string;
  cta?: { message: string; action: () => void };
}

export const EmptyState: FunctionComponent<Props> = ({ artWorkPath, message, cta }) => {
  return (
    <div className="max-w-sm mx-auto py-10">
      <img className="mx-auto" src={artWorkPath} />
      <h2 className="text-center text-3xl font-extrabold sm:text-4xl py-8">
        <span className="block text-disabled">{message}</span>
      </h2>
      {cta && (
        <div className="flex justify-center">
          <button onClick={cta.action} type="button" className="font-medium text-primary hover:opacity-75">
            {cta.message}
          </button>
        </div>
      )}
    </div>
  );
};
