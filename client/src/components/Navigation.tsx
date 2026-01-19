import { Link, useLocation } from "wouter";
import { Activity, History, Info, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Assessment", icon: Activity },
    { href: "/history", label: "History", icon: History },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-8 flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Stethoscope className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            MediPredict<span className="text-secondary">CKD</span>
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-center md:space-x-8">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {link.label}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden md:flex w-[140px] justify-end">
          {/* Placeholder for right-side items if needed */}
        </div>
      </div>
    </nav>
  );
}
