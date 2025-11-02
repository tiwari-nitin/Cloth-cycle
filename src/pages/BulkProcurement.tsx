import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TierBadge } from "@/components/ui/tier-badge";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ShoppingCart, MapPin, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for bulk procurement
const mockListings = [
  {
    id: "1",
    title: "Cotton T-Shirt - Blue",
    tier: "A" as const,
    buyerPrice: 50,
    city: "Mumbai",
    size: "M",
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Formal Shirt - White",
    tier: "B" as const,
    buyerPrice: 225,
    city: "Mumbai",
    size: "L",
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Denim Jeans",
    tier: "A" as const,
    buyerPrice: 50,
    city: "Mumbai",
    size: "32",
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Summer Dress - Floral",
    tier: "B" as const,
    buyerPrice: 225,
    city: "Delhi",
    size: "S",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Casual Hoodie",
    tier: "A" as const,
    buyerPrice: 50,
    city: "Bangalore",
    size: "L",
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
];

export default function BulkProcurement() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(mockListings.map((item) => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const totalCost = mockListings
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.buyerPrice, 0);

  const handleAddToCart = () => {
    toast({
      title: "Added to Bulk Cart",
      description: `${selectedItems.length} items added. Total: ₹${totalCost}`,
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-ngo-priority text-ngo-priority-foreground">
            NGO Bulk Procurement
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Bulk Purchase Interface
          </h1>
          <p className="text-muted-foreground text-lg">
            Select multiple items across categories for efficient bulk ordering
          </p>
        </div>

        {/* Selection Controls */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold">
                {selectedItems.length} items selected
              </span>
              {selectedItems.length > 0 && (
                <span className="text-muted-foreground">
                  Total: ₹{totalCost}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0}
                className="bg-ngo-priority hover:bg-ngo-priority/90"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Bulk Cart ({selectedItems.length})
              </Button>
            </div>
          </div>
        </Card>

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
              <SelectItem value="a">Tier B (₹50)</SelectItem>
              <SelectItem value="b">Tier A (₹225)</SelectItem>
              <SelectItem value="x">Tier X (Flexible)</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Items Grid with Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockListings.map((listing) => (
            <Card
              key={listing.id}
              className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                selectedItems.includes(listing.id)
                  ? "ring-2 ring-ngo-priority bg-ngo-priority-light/20"
                  : "hover:shadow-lg"
              }`}
              onClick={() => toggleItem(listing.id)}
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-3 left-3">
                  <TierBadge tier={listing.tier} />
                </div>
                <div className="absolute top-3 right-3">
                  <div
                    className={`h-6 w-6 rounded border-2 flex items-center justify-center ${
                      selectedItems.includes(listing.id)
                        ? "bg-ngo-priority border-ngo-priority"
                        : "bg-background border-border"
                    }`}
                  >
                    {selectedItems.includes(listing.id) && (
                      <Checkbox checked className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{listing.city}</span>
                    <span className="mx-2">•</span>
                    <span>Size {listing.size}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-2xl font-bold text-ngo-priority">
                    ₹{listing.buyerPrice}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {listing.category}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <Card className="p-6 sticky bottom-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-foreground">
                ₹{totalCost}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedItems.length} items selected
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Export Selection
              </Button>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0}
                className="bg-ngo-priority hover:bg-ngo-priority/90"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Proceed to Bulk Cart
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
