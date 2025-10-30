import { useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomNav } from "./CustomNav";

export const CustomHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get("query") || "";
  const { gender } = useParams();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !inputRef.current) {
      return;
    }

    if (inputRef.current.value.trim() === "") {
      searchParams.delete("query");
      setSearchParams(searchParams);
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", inputRef.current.value);
    setSearchParams(newSearchParams);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <CustomNav
            navItems={[
              {
                label: "Todos",
                to: "/",
                isActive: gender === undefined,
              },
              {
                label: "Hombres",
                to: "/gender/men",
                isActive: gender === "men",
              },
              {
                label: "Mujeres",
                to: "/gender/women",
                isActive: gender === "women",
              },
              {
                label: "Niños",
                to: "/gender/kid",
                isActive: gender === "kid",
              },
            ]}
          />

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  ref={inputRef}
                  onKeyDown={handleOnKeyDown}
                  defaultValue={query}
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/auth/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="destructive" size="sm">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
