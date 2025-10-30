import { Link } from "react-router";

interface Props {
  subtitle?: string;
}

export const CustomLogo = ({ subtitle = "Shop" }: Props) => {
  return (
    <Link to="/" className="flex items-center whitespace-nowrap">
      <span className="font-bold text-xl tracking-tight">TESLO |</span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">
        {subtitle}
      </p>
    </Link>
  );
};
