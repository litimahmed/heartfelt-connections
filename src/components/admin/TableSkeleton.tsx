import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  showAvatar?: boolean;
  columnWidths?: string[];
}

export function TableSkeleton({ 
  columns = 5, 
  rows = 5, 
  showAvatar = true,
  columnWidths = []
}: TableSkeletonProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20 hover:bg-muted/20">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead 
                key={i} 
                className="font-semibold"
                style={columnWidths[i] ? { width: columnWidths[i] } : undefined}
              >
                <Skeleton className="h-4 w-16 bg-muted-foreground/10" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="group">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 0 && showAvatar ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-lg bg-muted-foreground/10" />
                      <Skeleton className="h-4 w-24 bg-muted-foreground/10" />
                    </div>
                  ) : colIndex === columns - 1 ? (
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-8 rounded-lg bg-muted-foreground/10" />
                      <Skeleton className="h-8 w-8 rounded-lg bg-muted-foreground/10" />
                    </div>
                  ) : (
                    <Skeleton 
                      className="h-4 bg-muted-foreground/10" 
                      style={{ 
                        width: `${Math.floor(Math.random() * 40) + 60}%`,
                        animationDelay: `${rowIndex * 100 + colIndex * 50}ms`
                      }} 
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface StatCardSkeletonProps {
  count?: number;
}

export function StatCardsSkeleton({ count = 3 }: StatCardSkeletonProps) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-${count} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="relative overflow-hidden border border-border/50 bg-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-muted-foreground/10" />
              <Skeleton className="h-8 w-12 bg-muted-foreground/10" />
            </div>
            <Skeleton className="h-11 w-11 rounded-xl bg-muted-foreground/10" />
          </div>
          <Skeleton 
            className="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/10" 
            style={{ animationDelay: `${i * 100}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

export function ListPageSkeleton({ 
  columns = 6, 
  rows = 5,
  statCards = 3,
  showAvatar = true 
}: { 
  columns?: number; 
  rows?: number;
  statCards?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className="space-y-6 animate-pulse">
      <StatCardsSkeleton count={statCards} />
      <TableSkeleton columns={columns} rows={rows} showAvatar={showAvatar} />
    </div>
  );
}