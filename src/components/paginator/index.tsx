import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FunctionComponent } from "react";
import ReactPaginate from "react-paginate";

interface Props {
  resultsPerPage: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator: FunctionComponent<Props> = ({ resultsPerPage, totalCount, currentPage, totalPages, onPageChange }) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    // selected is 0 based
    onPageChange(selected + 1);
  };

  const toResultHint = currentPage * resultsPerPage < totalCount ? currentPage * resultsPerPage : totalCount;
  const fromResultHint = currentPage > 1 ? (currentPage - 1) * resultsPerPage + 1 : 1;

  return (
    <>
      <div className="bg-white px-4 py-3 flex items-center justify-center lg:justify-between border-t border-gray-200 sm:px-6 ">
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 py-4 md:py-0">
              Showing <span className="font-medium">{fromResultHint}</span> to <span className="font-medium">{toResultHint}</span> of{" "}
              <span className="font-medium">{totalCount}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0  rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <ReactPaginate
                initialPage={currentPage - 1}
                breakLabel="..."
                nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
                onPageChange={handlePageClick}
                pageCount={totalPages}
                previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
                renderOnZeroPageCount={() => null}
                pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                previousLinkClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                nextLinkClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
