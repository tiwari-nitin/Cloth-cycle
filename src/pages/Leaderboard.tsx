import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Leaf } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Priya Sharma",
    co2Saved: 45.8,
    itemsSold: 127,
    badge: "gold"
  },
  {
    id: 2,
    rank: 2,
    name: "Rajesh Kumar",
    co2Saved: 38.2,
    itemsSold: 95,
    badge: "silver"
  },
  {
    id: 3,
    rank: 3,
    name: "Anita Desai",
    co2Saved: 32.5,
    itemsSold: 78,
    badge: "bronze"
  },
  {
    id: 4,
    rank: 4,
    name: "Vikram Singh",
    co2Saved: 28.9,
    itemsSold: 64,
    badge: null
  },
  {
    id: 5,
    rank: 5,
    name: "Meera Patel",
    co2Saved: 25.3,
    itemsSold: 59,
    badge: null
  },
  {
    id: 6,
    rank: 6,
    name: "Arjun Menon",
    co2Saved: 22.7,
    itemsSold: 52,
    badge: null
  },
  {
    id: 7,
    rank: 7,
    name: "Kavita Reddy",
    co2Saved: 19.8,
    itemsSold: 47,
    badge: null
  },
  {
    id: 8,
    rank: 8,
    name: "Sanjay Gupta",
    co2Saved: 17.4,
    itemsSold: 41,
    badge: null
  },
  {
    id: 9,
    rank: 9,
    name: "Neha Kapoor",
    co2Saved: 15.6,
    itemsSold: 38,
    badge: null
  },
  {
    id: 10,
    rank: 10,
    name: "Rahul Verma",
    co2Saved: 13.2,
    itemsSold: 32,
    badge: null
  }
];

const RankBadge = ({ rank, badge }: { rank: number; badge: string | null }) => {
  if (badge === "gold") {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
        <Trophy className="h-6 w-6 text-white" />
      </div>
    );
  }
  if (badge === "silver") {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500">
        <Medal className="h-6 w-6 text-white" />
      </div>
    );
  }
  if (badge === "bronze") {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
        <Award className="h-6 w-6 text-white" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground font-bold text-lg">
      {rank}
    </div>
  );
};

export default function Leaderboard() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light via-background to-muted py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
              <Leaf className="h-4 w-4" />
              <span>Top Climate Heroes</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Community Leaderboard
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating contributors making the biggest impact by reducing textile waste and saving CO₂ emissions
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Top 10 Contributors</h2>
              <p className="text-muted-foreground">
                Rankings based on total CO₂ emissions saved through sales and donations
              </p>
            </div>

            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {leaderboardData.slice(0, 3).map((contributor) => (
                <Card
                  key={contributor.id}
                  className={`p-6 text-center space-y-4 border-2 ${
                    contributor.rank === 1
                      ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                      : contributor.rank === 2
                      ? "border-gray-400 bg-gray-50 dark:bg-gray-900/20"
                      : "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                  }`}
                >
                  <div className="flex justify-center">
                    <RankBadge rank={contributor.rank} badge={contributor.badge} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{contributor.name}</h3>
                    {contributor.rank === 1 && (
                      <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                        Top Contributor
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-impact-green">
                      {contributor.co2Saved}kg
                    </div>
                    <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {contributor.itemsSold} items sold
                  </div>
                </Card>
              ))}
            </div>

            {/* Remaining Rankings */}
            <Card className="overflow-hidden">
              <div className="divide-y divide-border">
                {leaderboardData.slice(3).map((contributor) => (
                  <div
                    key={contributor.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <RankBadge rank={contributor.rank} badge={contributor.badge} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {contributor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {contributor.itemsSold} items sold
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-impact-green">
                        {contributor.co2Saved}kg
                      </div>
                      <div className="text-xs text-muted-foreground">CO₂ Saved</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Call to Action */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 text-center">
              <h3 className="text-xl font-bold mb-2">Join the Movement!</h3>
              <p className="text-muted-foreground mb-4">
                Start listing your clothes today and see your name on the leaderboard while making a real environmental impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/list"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  List Your Clothes
                </a>
                <a
                  href="/impact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  View Impact Dashboard
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
