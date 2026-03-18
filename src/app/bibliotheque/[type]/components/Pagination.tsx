import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
    page: number;
    lastPage: number;
    onPageChange: (newPage: number) => void;
}
export default function Pagination({ page, lastPage, onPageChange }: Props) {
    function getPaginationItems(currentPage: number, lastPage: number): (number | 'ellipsis')[] {
        const items: (number | 'ellipsis')[] = [];
      
        // Premier bloc : 1, 2, 3 (et 4 si on est à la page 4)
        if (currentPage <= 4) {
          for (let i = 1; i <= Math.max(3, currentPage); i++) items.push(i);
        } else {
          items.push(1, 2, 3);
        }
      
        // Début du dernier bloc (3 dernières pages, ou 4 si current = lastPage - 3)
        const lastBlockStart = currentPage >= lastPage - 3 ? currentPage : lastPage - 2;
      
        // Ellipsis + page du milieu si 5 <= current <= lastPage - 3
        if (currentPage > 4 && currentPage < lastPage - 2) {
          items.push('ellipsis');
          items.push(currentPage);
          items.push('ellipsis');
        } else if (lastBlockStart > (currentPage <= 4 ? Math.max(3, currentPage) : 3) + 1) {
          items.push('ellipsis');
        }
      
        // Dernier bloc
        if (lastPage > 3) {
          for (let i = lastBlockStart; i <= lastPage; i++) items.push(i);
        }
      
        return items;
    }

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Previous */}
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="flex items-center gap-1 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base-content/50 disabled:text-base-content/30 text-base-content"
            >
                <ArrowLeft />
                <span>Précédent</span>
            </button>

            <div className="flex items-center gap-2 mx-2">
                {getPaginationItems(page, lastPage).map((item, i) =>
                item === 'ellipsis' ? (
                    <span key={`e-${i}`} className="px-1 text-base-content">...</span>
                ) : (
                    <button
                    key={item}
                    type="button"
                    onClick={() => onPageChange(item)}
                    className={`
                        min-w-[2rem] px-3 py-2 rounded transition-colors
                        ${page === item
                        ? 'bg-accent rounded-[15px] font-medium text-base-content'
                        : 'text-base-content hover:opacity-80'
                        }
                    `}
                    >
                    {item}
                    </button>
                )
                )}
            </div>

            {/* Next */}
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= lastPage}
                className="flex items-center gap-1 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base-content/50 disabled:text-base-content/30 text-base-content"
            >
                <span>Suivant</span>
                <ArrowRight />
            </button>
        </div>
    )
}