import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recycle, Mail, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ConnectDialog } from "@/components/ConnectDialog";
import { useCart } from "@/contexts/CartContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="text-foreground">ClothCycle</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/browse"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/donate"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Donate
            </Link>
            <Link
              to="/impact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Impact
            </Link>
            <Link
              to="/leaderboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              to="/ngo"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For NGOs
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden sm:flex">
              <Link to="/browse">Browse</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/list">List Clothes</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Recycle className="h-5 w-5 text-primary" />
                <span>ClothCycle</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reducing textile waste, one listing at a time.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-foreground transition-colors">Browse Listings</Link></li>
                <li><Link to="/list" className="hover:text-foreground transition-colors">List Clothes</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors">Donate Clothes</Link></li>
                <li><Link to="/impact" className="hover:text-foreground transition-colors">Impact</Link></li>
                <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">For Organizations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/ngo" className="hover:text-foreground transition-colors">NGO Priority</Link></li>
                <li><Link to="/ngo" className="hover:text-foreground transition-colors">Verification</Link></li>
                <li><Link to="/ngo" className="hover:text-foreground transition-colors">Bulk Procurement</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Connect</h4>
              <ConnectDialog
                trigger={
                  <Button variant="ghost" size="sm" className="h-auto p-0 hover:text-primary">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </Button>
                }
              />
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 ClothCycle Marketplace. Built for sustainable fashion and community impact.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
