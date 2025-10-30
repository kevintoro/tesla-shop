import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface NavItem {
  label: string;
  to: string;
  isActive: boolean;
}

interface Props {
  navItems: NavItem[];
}

export const CustomNav = ({ navItems }: Props) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.isActive &&
              "text-primary font-bold underline underline-offset-4"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
