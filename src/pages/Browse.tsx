import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TierBadge } from "@/components/ui/tier-badge";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

// Mock data for demo
const mockListings = [
  {
    id: "1",
    title: "Cotton T-Shirt - Blue",
    tier: "A" as const,
    sellerPrice: 15,
    buyerPrice: 50,
    city: "Mumbai",
    size: "M",
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    ngoWindow: true,
  },
  {
    id: "2",
    title: "Formal Shirt - White",
    tier: "B" as const,
    sellerPrice: 75,
    buyerPrice: 225,
    city: "Delhi",
    size: "L",
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    ngoWindow: false,
  },
  {
    id: "3",
    title: "Denim Jeans",
    tier: "A" as const,
    sellerPrice: 25,
    buyerPrice: 50,
    city: "Bangalore",
    size: "32",
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    ngoWindow: false,
  },
  {
    id: "4",
    title: "Summer Dress - Floral",
    tier: "B" as const,
    sellerPrice: 80,
    buyerPrice: 225,
    city: "Pune",
    size: "S",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    ngoWindow: true,
  },
  {
    id: "5",
    title: "Casual Hoodie",
    tier: "A" as const,
    sellerPrice: 30,
    buyerPrice: 50,
    city: "Mumbai",
    size: "L",
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    ngoWindow: false,
  },
  {
    id: "6",
    title: "Ethnic Kurta",
    tier: "B" as const,
    sellerPrice: 90,
    buyerPrice: 225,
    city: "Jaipur",
    size: "M",
    category: "Ethnic",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    ngoWindow: false,
  },
];

export default function Browse() {
  const { addToCart } = useCart();

  const handleAddToCart = (listing: typeof mockListings[0]) => {
    addToCart({
      listingId: listing.id,
      title: listing.title,
      tier: listing.tier,
      sellerPrice: listing.sellerPrice,
      buyerPrice: listing.buyerPrice,
      city: listing.city,
      size: listing.size,
      category: listing.category,
      image: listing.image,
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Listings</h1>
          <p className="text-muted-foreground text-lg">
            Discover quality pre-loved clothing at fair prices
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by category, size, or city..."
              className="pl-10"
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="a">Tier B</SelectItem>
              <SelectItem value="b">Tier A</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{mockListings.length}</span> listings
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-ngo-priority-light text-ngo-priority border-ngo-priority/30">
              NGO Priority Available
            </Badge>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <Link to={`/item/${listing.id}`}>
                <div className="relative aspect-square overflow-hidden bg-muted cursor-pointer">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <TierBadge tier={listing.tier} />
                  </div>
                  {listing.ngoWindow && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-ngo-priority text-ngo-priority-foreground">
                        NGO Priority
                      </Badge>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-4 space-y-3">
                <Link to={`/item/${listing.id}`}>
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{listing.city}</span>
                      <span className="mx-2">•</span>
                      <span>Size {listing.size}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-end justify-between pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Buy at</div>
                    <div className="text-2xl font-bold text-primary">
                      ₹{listing.buyerPrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Seller gets</div>
                    <div className="text-sm font-medium">
                      ₹{listing.sellerPrice}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(listing);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Listings
          </Button>
        </div>
      </div>
    </Layout>
  );
}
