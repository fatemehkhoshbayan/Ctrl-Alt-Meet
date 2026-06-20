import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib';
import { buildPageRange } from '@/utils';
import IconButton from './IconButton';
import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageRange = buildPageRange(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn('gap-stack-gap mt-16 flex items-center justify-center', className)}
    >
      <IconButton
        icon={<ChevronLeft size={20} />}
        aria-label="Previous page"
        disabled={currentPage === 1}
        className={cn(
          'border-surface-variant rounded-full border transition-colors',
          currentPage === 1
            ? 'text-on-surface-variant/30 cursor-not-allowed'
            : 'hover:bg-surface-variant cursor-pointer',
        )}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pageRange.map((page, i) =>
        page === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="text-on-surface-variant flex h-12 w-12 items-center justify-center"
          >
            …
          </span>
        ) : (
          <Button
            key={page}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
            className={cn(
              'border-surface-variant p-5',
              page === currentPage ? 'bg-primary text-on-primary' : 'hover:bg-surface-variant',
            )}
            onClick={() => onPageChange(page)}
            BtnText={page.toString()}
            size="xs"
            variant="outlined"
          />
        ),
      )}

      <IconButton
        icon={<ChevronRight size={20} />}
        aria-label="Next page"
        disabled={currentPage === totalPages}
        className={cn(
          'border-surface-variant rounded-full border transition-colors',
          currentPage === totalPages
            ? 'text-on-surface-variant/30 cursor-not-allowed'
            : 'hover:bg-surface-variant cursor-pointer',
        )}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
