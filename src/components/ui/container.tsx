
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4", className)}>
      {children}
    </div>
  );
};
