import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  MonthlyItemsChart,
  CO2SavingsChart,
  TierDistributionChart,
  RegionalHeatmapChart,
} from "@/components/ImpactCharts";
import {
  Recycle,
  TrendingDown,
  Users,
  Heart,
  Package,
  Leaf,
  Award,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function Impact() {
  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-impact-green/10 border border-impact-green/20 text-impact-green text-sm font-medium mb-4">
            <Leaf className="h-4 w-4" />
            <span>Real-Time Impact Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Collective Impact
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every listing, every purchase contributes to reducing textile waste and supporting communities across India.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 text-center space-y-4 border-2 border-primary/20 bg-primary-light/30">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground font-medium">Items Rehomed</div>
            </div>
            <Progress value={65} className="h-2" />
            <p className="text-sm text-muted-foreground">
              2,153 to reach 5,000 milestone
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4 border-2 border-impact-orange/20 bg-secondary/10">
            <div className="h-16 w-16 rounded-full bg-impact-orange/20 flex items-center justify-center mx-auto">
              <TrendingDown className="h-8 w-8 text-impact-orange" />
            </div>
            <div>
              <div className="text-5xl font-bold text-impact-orange mb-2">1,420<span className="text-3xl">kg</span></div>
              <div className="text-muted-foreground font-medium">Waste Diverted</div>
            </div>
            <Progress value={71} className="h-2" />
            <p className="text-sm text-muted-foreground">
              580kg to reach 2,000kg target
            </p>
          </Card>

          <Card className="p-8 text-center space-y-4 border-2 border-impact-green/20 bg-impact-green/10">
            <div className="h-16 w-16 rounded-full bg-impact-green/20 flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8 text-impact-green" />
            </div>
            <div>
              <div className="text-5xl font-bold text-impact-green mb-2">3.2<span className="text-3xl">T</span></div>
              <div className="text-muted-foreground font-medium">CO₂e Saved</div>
            </div>
            <Progress value={64} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Equivalent to 640 trees planted
            </p>
          </Card>
        </div>

        {/* NGO Impact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">NGO Impact Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Community Care Foundation</h3>
                  <p className="text-sm text-muted-foreground">
                    "Thanks to ClothCycle's priority access, we've procured 847 quality items this quarter 
                    at predictable costs, helping 500+ families maintain dignity."
                  </p>
                  <div className="flex gap-4 pt-2">
                    <div>
                      <div className="text-2xl font-bold text-primary">847</div>
                      <div className="text-xs text-muted-foreground">Items Procured</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-muted-foreground">Families Helped</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Hope & Harmony Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    "The bulk procurement tools save us hours every week. We've built consistent 
                    supply chains with ClothCycle, ensuring our beneficiaries always have access."
                  </p>
                  <div className="flex gap-4 pt-2">
                    <div>
                      <div className="text-2xl font-bold text-secondary">1,124</div>
                      <div className="text-xs text-muted-foreground">Items Procured</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">750+</div>
                      <div className="text-xs text-muted-foreground">Families Helped</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Charts Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <BarChart3 className="h-4 w-4" />
              <span>Interactive Analytics</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Impact Visualized</h2>
            <p className="text-muted-foreground">
              Explore detailed sustainability metrics through interactive charts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <MonthlyItemsChart />
            <CO2SavingsChart />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <TierDistributionChart />
            <RegionalHeatmapChart />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Impact Breakdown</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tier B Items</span>
                <Award className="h-5 w-5 text-tier-b" />
              </div>
              <div className="text-3xl font-bold">1,642</div>
              <Progress value={58} className="h-2" />
              <p className="text-sm text-muted-foreground">58% of total</p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tier A Items</span>
                <Award className="h-5 w-5 text-tier-a" />
              </div>
              <div className="text-3xl font-bold">1,205</div>
              <Progress value={42} className="h-2" />
              <p className="text-sm text-muted-foreground">42% of total</p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">NGO Purchases</span>
                <Users className="h-5 w-5 text-ngo-priority" />
              </div>
              <div className="text-3xl font-bold">1,971</div>
              <Progress value={69} className="h-2" />
              <p className="text-sm text-muted-foreground">69% by NGOs</p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Public Purchases</span>
                <Heart className="h-5 w-5 text-accent" />
              </div>
              <div className="text-3xl font-bold">876</div>
              <Progress value={31} className="h-2" />
              <p className="text-sm text-muted-foreground">31% public</p>
            </Card>
          </div>
        </div>

        {/* Transparency */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Monthly Transparency Report</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Platform Fees Collected</div>
              <div className="text-2xl font-bold">₹1,42,380</div>
              <p className="text-sm text-muted-foreground">7.5% of buyer transactions</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Seller Payouts</div>
              <div className="text-2xl font-bold">₹1,86,540</div>
              <p className="text-sm text-muted-foreground">Average ₹65 per item</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">NGO Procurement Spend</div>
              <div className="text-2xl font-bold">₹2,87,125</div>
              <p className="text-sm text-muted-foreground">Across 14 verified NGOs</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">How Platform Fees Work</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>7.5% platform fee on buyer purchase price funds operations, logistics, and verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>2% payout fee covers payment processing and escrow management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>All fees are clearly displayed before transaction confirmation</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
