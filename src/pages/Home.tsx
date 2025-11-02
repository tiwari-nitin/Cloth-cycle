import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/ui/tier-badge";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Recycle,
  Heart,
  TrendingDown,
  Upload,
  Users,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Package,
  Trees,
} from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-muted py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Leaf className="h-4 w-4" />
              <span>List clothes without sign-up. Help communities. Reduce textile waste.</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Give Your Clothes a{" "}
              <span className="text-primary">Second Life</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent marketplace where your old clothes reach those who need them most. 
              NGOs get priority. Everyone wins. No sign up required.
            </p>

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12">
                <Link to="/list">
                  <Upload className="h-5 w-5 mr-2" />
                  List Clothes
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12">
                <Link to="/browse">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Browse
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg h-12">
                <Link to="/donate">
                  <Heart className="h-5 w-5 mr-2" />
                  Donate
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12">
                <Link to="/impact">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Impact
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12">
                <Link to="/trees">
                  <Trees className="h-5 w-5 mr-2" />
                  Trees Planted
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12">
                <Link to="/leaderboard">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Leaderboard
                </Link>
              </Button>
            </div>

            {/* Ad Revenue Transparency Note */}
            <Card className="mt-8 p-4 bg-accent/10 border-accent/30 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <strong>70% of all ad revenue</strong> earned by this platform is donated to NGOs working for forest conservation.
                  </p>
                  <Link 
                    to="/trees" 
                    className="text-sm text-accent hover:underline inline-flex items-center gap-1"
                  >
                    Learn More
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Impact counters */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">2,847</div>
                <div className="text-xs md:text-sm text-muted-foreground">Items Rehomed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-impact-orange">1,420kg</div>
                <div className="text-xs md:text-sm text-muted-foreground">Waste Diverted</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-impact-green">3.2T</div>
                <div className="text-xs md:text-sm text-muted-foreground">CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ClothCycle Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to make an impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 space-y-4 border-2 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">1. List Without Sign Up</h3>
              <p className="text-muted-foreground">
                Choose your tier (B: worn, A: good quality, X: flexible), upload photos, verify via OTP. 
                Get a manage link instantly.
              </p>
              <div className="flex gap-2 pt-2">
                <TierBadge tier="B" />
                <TierBadge tier="A" />
                <TierBadge tier="X" />
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-2 hover:border-ngo-priority/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-ngo-priority-light flex items-center justify-center">
                <Users className="h-6 w-6 text-ngo-priority" />
              </div>
              <h3 className="text-xl font-semibold">2. NGO Priority Window</h3>
              <p className="text-muted-foreground">
                Verified NGOs get first access for 2 hours at fixed prices (₹50 for B, ₹225 for A). 
                Then public buyers can purchase.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ngo-priority-light text-ngo-priority text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Priority Access
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-2 hover:border-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">3. Pickup & Payout</h3>
              <p className="text-muted-foreground">
                Escrow protects everyone. Confirm pickup with QR code, get paid automatically. 
                Track your impact in real-time.
              </p>
              <div className="text-sm font-medium text-primary">
                Secure escrow • Fast payout
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing bands */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fair, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three flexible tiers. Choose fixed pricing or set your own price.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-8 space-y-4 border-2 border-tier-b/30 bg-tier-b-light/50">
              <TierBadge tier="B" />
              <h3 className="text-2xl font-bold">Old / Worn-Out</h3>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-tier-b">₹10-30</span>
                  <span className="text-muted-foreground">You earn</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">₹50</span>
                  <span className="text-muted-foreground">Buyers pay</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-b" />
                  <span>Gently used, minor wear</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-b" />
                  <span>Slight fading or pilling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-b" />
                  <span>Perfect for daily community use</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 border-2 border-tier-a/30 bg-tier-a-light/50 md:-translate-y-2 shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-tier-a text-tier-a-foreground px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <TierBadge tier="A" />
              <h3 className="text-2xl font-bold">Good Quality, Out-of-Trend</h3>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-tier-a">₹50-100</span>
                  <span className="text-muted-foreground">You earn</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">₹225</span>
                  <span className="text-muted-foreground">Buyers pay</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-a" />
                  <span>Excellent condition</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-a" />
                  <span>No visible defects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-a" />
                  <span>Simply out of style</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 border-2 border-tier-x/30 bg-tier-x-light/50">
              <TierBadge tier="X" />
              <h3 className="text-2xl font-bold">Flexible Pricing</h3>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-tier-x">Any Price</span>
                  <span className="text-muted-foreground">You set</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">Custom</span>
                  <span className="text-muted-foreground">Buyers pay</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-x" />
                  <span>Set your own price</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-x" />
                  <span>Premium or unique items</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-tier-x" />
                  <span>7% weekly fee while unsold</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* NGO Partners */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by NGOs Across India</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Partner organizations making real impact in their communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-center">Community Care Foundation</h4>
              <p className="text-sm text-muted-foreground text-center">
                "ClothCycle helps us reach 500+ families monthly with dignity and ease."
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-center">Hope & Harmony Trust</h4>
              <p className="text-sm text-muted-foreground text-center">
                "Priority access lets us procure quality clothing at predictable costs."
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Recycle className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-center">Green Earth Collective</h4>
              <p className="text-sm text-muted-foreground text-center">
                "Perfect platform for circular economy. Transparent and efficient."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Every item listed helps reduce textile waste and support communities. 
              Start today—no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg h-12">
                <Link to="/list">
                  <Upload className="h-5 w-5 mr-2" />
                  List Your Clothes Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/browse">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Browse Listings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
