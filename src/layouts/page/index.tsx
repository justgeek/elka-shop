import { FunctionComponent } from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

// Any Global functionality, or behavior that affects only pages can be handled here

export const Page: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <>
      <div className="min-h-full">
        {title && (
          <header className="bg-white shadow title-header">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
          </header>
        )}

        <main>
          <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</section>
        </main>
      </div>
    </>
  );
};
