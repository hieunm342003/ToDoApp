import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
const TaskListPagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handlePageChange
}) => {

  const renderPages = () => {
    const pages = []

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push("ellipsis-start")
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end")
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePreviousPage()
            }}
          />
        </PaginationItem>

        {renderPages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis-start" || page === "ellipsis-end" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(page)
                }}
                className={
                  currentPage === page
                    ? "bg-primary text-white"
                    : ""
                }
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNextPage()
            }}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

export default TaskListPagination