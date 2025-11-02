import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trees as TreesIcon, MapPin, Calendar, Users, Heart, Sprout } from "lucide-react";

// Mock data for tree planting initiatives
const treePlantingData = {
  totalTrees: 12847,
  totalAcreage: 342,
  ngoPartners: 8,
  lastUpdated: "March 2025"
};

const plantingSites = [
  {
    id: 1,
    name: "Western Ghats Reforestation",
    location: "Karnataka, India",
    coordinates: { lat: 14.5204, lng: 75.7224 },
    treesPlanted: 3250,
    acreage: 85,
    ngo: "Green Earth Collective",
    plantedDate: "January 2025",
    species: ["Teak", "Rosewood", "Sandalwood"]
  },
  {
    id: 2,
    name: "Sundarbans Mangrove Project",
    location: "West Bengal, India",
    coordinates: { lat: 21.9497, lng: 89.1833 },
    treesPlanted: 2890,
    acreage: 72,
    ngo: "Coastal Conservation Trust",
    plantedDate: "December 2024",
    species: ["Sundari Mangrove", "Goran", "Keora"]
  },
  {
    id: 3,
    name: "Aravalli Hills Revival",
    location: "Rajasthan, India",
    coordinates: { lat: 27.5897, lng: 75.1397 },
    treesPlanted: 2140,
    acreage: 58,
    ngo: "Desert Green Foundation",
    plantedDate: "February 2025",
    species: ["Neem", "Acacia", "Khejri"]
  },
  {
    id: 4,
    name: "Eastern Himalayan Forest",
    location: "Sikkim, India",
    coordinates: { lat: 27.5330, lng: 88.5122 },
    treesPlanted: 1875,
    acreage: 45,
    ngo: "Mountain Ecology Society",
    plantedDate: "November 2024",
    species: ["Oak", "Rhododendron", "Pine"]
  },
  {
    id: 5,
    name: "Central India Tribal Belt",
    location: "Madhya Pradesh, India",
    coordinates: { lat: 22.9734, lng: 78.6569 },
    treesPlanted: 1692,
    acreage: 52,
    ngo: "Community Care Foundation",
    plantedDate: "January 2025",
    species: ["Sal", "Mahua", "Bamboo"]
  },
  {
    id: 6,
    name: "Deccan Plateau Initiative",
    location: "Maharashtra, India",
    coordinates: { lat: 19.0760, lng: 75.7139 },
    treesPlanted: 1000,
    acreage: 30,
    ngo: "Hope & Harmony Trust",
    plantedDate: "March 2025",
    species: ["Banyan", "Peepal", "Jamun"]
  }
];

export default function Trees() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-impact-green/10 via-background to-primary-light py-16 md:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-impact-green/10 border border-impact-green/20 text-impact-green text-sm font-medium mb-2">
              <TreesIcon className="h-4 w-4" />
              <span>Forest Conservation Impact</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Trees Planted by Our NGO Partners
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              70% of our ad revenue goes directly to NGOs working on reforestation projects across India
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Card className="p-6 text-center space-y-2">
              <TreesIcon className="h-10 w-10 text-impact-green mx-auto" />
              <div className="text-3xl md:text-4xl font-bold text-impact-green">
                {treePlantingData.totalTrees.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </Card>
            
            <Card className="p-6 text-center space-y-2">
              <MapPin className="h-10 w-10 text-primary mx-auto" />
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {treePlantingData.totalAcreage}
              </div>
              <div className="text-sm text-muted-foreground">Acres Covered</div>
            </Card>
            
            <Card className="p-6 text-center space-y-2">
              <Users className="h-10 w-10 text-accent mx-auto" />
              <div className="text-3xl md:text-4xl font-bold text-accent">
                {treePlantingData.ngoPartners}
              </div>
              <div className="text-sm text-muted-foreground">NGO Partners</div>
            </Card>
            
            <Card className="p-6 text-center space-y-2">
              <Calendar className="h-10 w-10 text-secondary mx-auto" />
              <div className="text-lg md:text-xl font-bold text-secondary">
                {treePlantingData.lastUpdated}
              </div>
              <div className="text-sm text-muted-foreground">Last Updated</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Planting Sites List */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Active Reforestation Projects</h2>
              <p className="text-muted-foreground">
                Detailed view of each tree planting initiative funded by ClothCycle
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {plantingSites.map((site) => (
                <Card key={site.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground">{site.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{site.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-impact-green hover:bg-impact-green/90">
                      <Sprout className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                    <div>
                      <div className="text-2xl font-bold text-impact-green">
                        {site.treesPlanted.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Trees Planted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {site.acreage}
                      </div>
                      <div className="text-xs text-muted-foreground">Acres</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-ngo-priority" />
                      <span className="font-medium text-ngo-priority">{site.ngo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Planted: {site.plantedDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {site.species.map((species, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-primary-foreground">
            <Heart className="h-16 w-16 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Your Impact Grows Trees
            </h2>
            <p className="text-lg opacity-90">
              Every purchase on ClothCycle contributes to reforestation. 70% of our ad revenue directly funds these tree planting initiatives through verified NGO partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/list"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                Start Listing Clothes
              </a>
              <a
                href="/impact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Full Impact
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
