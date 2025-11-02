import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TierBadge } from "@/components/ui/tier-badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhotoUpload, type UploadedPhoto } from "@/components/PhotoUpload";
import { CheckCircle2, Info, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "listClothes_formData";

export default function ListClothes() {
  const [step, setStep] = useState(1);
  
  // Step 1: Item Details
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [fabric, setFabric] = useState("");
  const [conditionNotes, setConditionNotes] = useState("");
  const [hasDefects, setHasDefects] = useState(false);
  
  // Step 2: Tier & Price
  const [tier, setTier] = useState<"A" | "B" | "X" | null>(null);
  const [tierXPrice, setTierXPrice] = useState<number>(0);
  const [tierAPrice, setTierAPrice] = useState<number>(0);
  const [tierBPrice, setTierBPrice] = useState<number>(0);
  
  // Step 3: Photos
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  
  // Step 4: Location & Contact
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pickupAvailability, setPickupAvailability] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStep(data.step || 1);
        setCategory(data.category || "");
        setSize(data.size || "");
        setFabric(data.fabric || "");
        setConditionNotes(data.conditionNotes || "");
        setHasDefects(data.hasDefects || false);
        setTier(data.tier || null);
        setTierXPrice(data.tierXPrice || 0);
        setTierAPrice(data.tierAPrice || 0);
        setTierBPrice(data.tierBPrice || 0);
        setPhotos(data.photos || []);
        setCity(data.city || "");
        setPincode(data.pincode || "");
        setPickupAvailability(data.pickupAvailability || "");
        setContact(data.contact || "");
      } catch (e) {
        console.error("Failed to load saved form data", e);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const formData = {
      step,
      category,
      size,
      fabric,
      conditionNotes,
      hasDefects,
      tier,
      tierXPrice,
      tierAPrice,
      tierBPrice,
      photos,
      city,
      pincode,
      pickupAvailability,
      contact,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [step, category, size, fabric, conditionNotes, hasDefects, tier, tierXPrice, tierAPrice, tierBPrice, photos, city, pincode, pickupAvailability, contact]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    // Validate photos on step 3
    if (step === 3 && photos.length < 1) {
      toast({
        title: "Photos required",
        description: "Please upload at least 1 photo to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePhotosChange = (updatedPhotos: UploadedPhoto[]) => {
    setPhotos(updatedPhotos);
  };

  const handleTierBPriceChange = (value: string) => {
    const numValue = Number(value);
    if (numValue > 30) {
      setTierBPrice(30);
      toast({
        title: "Price adjusted",
        description: "Price exceeds maximum for Tier B; adjusted to ₹30",
        variant: "default",
      });
    } else {
      setTierBPrice(numValue);
    }
  };

  const handleTierAPriceChange = (value: string) => {
    const numValue = Number(value);
    if (numValue > 100) {
      setTierAPrice(100);
      toast({
        title: "Price adjusted",
        description: "Price exceeds maximum for Tier A; adjusted to ₹100",
        variant: "default",
      });
    } else {
      setTierAPrice(numValue);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!tier) {
      toast({
        title: "Error",
        description: "Please select a tier for your listing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine the price based on the selected tier
      let finalPrice = 0;
      if (tier === "A") finalPrice = tierAPrice;
      else if (tier === "B") finalPrice = tierBPrice;
      else if (tier === "X") finalPrice = tierXPrice;

      // Insert the listing into the database
      const { error } = await supabase
        .from("clothing_listings")
        .insert({
          category,
          size,
          fabric,
          condition_notes: conditionNotes,
          has_defects: hasDefects,
          tier,
          price: finalPrice,
          photos: photos.map(p => ({ url: p.url, file: p.file.name })),
          city,
          pincode,
          pickup_availability: pickupAvailability,
          contact,
          status: "pending",
        });

      if (error) throw error;

      // Show success notification
      toast({
        title: "Listing Submitted Successfully!",
        description: "Your listing request is under process. You will be notified via email about the result.",
        duration: 5000,
      });

      // Clear saved form data after successful submission
      localStorage.removeItem(STORAGE_KEY);

      // Reset form to initial state
      setStep(1);
      setCategory("");
      setSize("");
      setFabric("");
      setConditionNotes("");
      setHasDefects(false);
      setTier(null);
      setTierXPrice(0);
      setTierAPrice(0);
      setTierBPrice(0);
      setPhotos([]);
      setCity("");
      setPincode("");
      setPickupAvailability("");
      setContact("");
    } catch (error) {
      console.error("Error submitting listing:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">List Your Clothes</h1>
          <p className="text-muted-foreground">
            No sign up required. Just verify via OTP and get your manage link instantly.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Step 1: Item Details */}
        {step === 1 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
              <p className="text-muted-foreground mb-6">
                Tell us about the clothing item you're listing
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tshirts">T-Shirts</SelectItem>
                    <SelectItem value="shirts">Shirts</SelectItem>
                    <SelectItem value="jeans">Jeans</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="hoodies">Hoodies</SelectItem>
                    <SelectItem value="ethnic">Ethnic Wear</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fabric">Fabric *</Label>
                  <Select value={fabric} onValueChange={setFabric}>
                    <SelectTrigger id="fabric">
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="denim">Denim</SelectItem>
                      <SelectItem value="silk">Silk</SelectItem>
                      <SelectItem value="blend">Blend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition Notes</Label>
                <Textarea
                  id="condition"
                  placeholder="Describe the condition, any wear patterns, etc."
                  className="min-h-24"
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="defects" 
                  checked={hasDefects}
                  onCheckedChange={(checked) => setHasDefects(checked === true)}
                />
                <Label htmlFor="defects" className="text-sm cursor-pointer">
                  Item has visible defects (stains, tears, missing buttons, etc.)
                </Label>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              Next: Choose Tier
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        )}

        {/* Step 2: Tier & Price */}
        {step === 2 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Choose Tier & Set Price</h2>
              <p className="text-muted-foreground mb-6">
                Select the tier that matches your item's condition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setTier("B")}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  tier === "B"
                    ? "border-tier-b bg-tier-b-light"
                    : "border-border hover:border-tier-b/50"
                }`}
              >
                <TierBadge tier="B" className="mb-3" />
                <h3 className="font-semibold text-lg mb-2">Old / Worn-Out</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Gently used with minor wear, slight fading or pilling
                </p>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Your price range</div>
                  <div className="text-2xl font-bold text-tier-b">₹10 - ₹30</div>
                  <div className="text-sm text-muted-foreground mt-2">Buyers pay: <span className="font-semibold text-foreground">₹50</span></div>
                </div>
              </button>

              <button
                onClick={() => setTier("A")}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  tier === "A"
                    ? "border-tier-a bg-tier-a-light"
                    : "border-border hover:border-tier-a/50"
                }`}
              >
                <TierBadge tier="A" className="mb-3" />
                <h3 className="font-semibold text-lg mb-2">Good Quality</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Excellent condition, no defects, simply out-of-trend
                </p>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Your price range</div>
                  <div className="text-2xl font-bold text-tier-a">₹50 - ₹100</div>
                  <div className="text-sm text-muted-foreground mt-2">Buyers pay: <span className="font-semibold text-foreground">₹225</span></div>
                </div>
              </button>

              <button
                onClick={() => setTier("X")}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  tier === "X"
                    ? "border-tier-x bg-tier-x-light"
                    : "border-border hover:border-tier-x/50"
                }`}
              >
                <TierBadge tier="X" className="mb-3" />
                <h3 className="font-semibold text-lg mb-2">Flexible Pricing</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Set your own price, ideal for premium or unique items
                </p>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Your custom price</div>
                  <div className="text-2xl font-bold text-tier-x">Any amount</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <span className="font-semibold text-destructive">7% weekly fee</span> while unsold
                  </div>
                </div>
              </button>
            </div>

            {tier === "B" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="price-b">Your Price (₹) *</Label>
                  <Input
                    id="price-b"
                    type="number"
                    placeholder="10-30"
                    min={10}
                    max={30}
                    value={tierBPrice || ""}
                    onChange={(e) => handleTierBPriceChange(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    <Info className="inline h-3 w-3 mr-1" />
                    Platform fee (7.5%) and payout fee (2%) will be deducted. Maximum: ₹30
                  </p>
                </div>
              </div>
            )}

            {tier === "A" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="price-a">Your Price (₹) *</Label>
                  <Input
                    id="price-a"
                    type="number"
                    placeholder="50-100"
                    min={50}
                    max={100}
                    value={tierAPrice || ""}
                    onChange={(e) => handleTierAPriceChange(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    <Info className="inline h-3 w-3 mr-1" />
                    Platform fee (7.5%) and payout fee (2%) will be deducted. Maximum: ₹100
                  </p>
                </div>
              </div>
            )}

            {tier === "X" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="price-x">Your Custom Price (₹) *</Label>
                  <Input
                    id="price-x"
                    type="number"
                    placeholder="Enter any amount"
                    min={1}
                    value={tierXPrice || ""}
                    onChange={(e) => setTierXPrice(Number(e.target.value))}
                  />
                  <div className="bg-tier-x-light border border-tier-x/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-tier-x">
                      Tier X Weekly Fee Structure
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You will be charged <span className="font-semibold text-foreground">7% of your set price</span> every week 
                      as long as your item remains unsold on the platform.
                    </p>
                    {tierXPrice > 0 && (
                      <p className="text-sm font-semibold text-foreground">
                        Weekly charge: ₹{(tierXPrice * 0.07).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <Info className="inline h-3 w-3 mr-1" />
                    No platform fee at sale. Weekly fee stops once sold.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleBack} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!tier} size="lg" className="flex-1">
                Next: Upload Photos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upload Photos</h2>
              <p className="text-muted-foreground mb-6">
                Add 1-6 clear photos of your item. Images will be auto-compressed and optimized.
              </p>
            </div>

            <PhotoUpload 
              onPhotosChange={handlePhotosChange}
              maxPhotos={6}
              minPhotos={1}
            />

            <div className="bg-muted border border-border rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Photo Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Take photos in good lighting</li>
                <li>• Show multiple angles and any defects</li>
                <li>• First photo will be the main listing image</li>
                <li>• Images are automatically compressed for faster loading</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleBack} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={photos.length < 1}
                size="lg" 
                className="flex-1"
              >
                Next: Location & Contact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Location & Verification */}
        {step === 4 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location & Contact</h2>
              <p className="text-muted-foreground mb-6">
                We'll verify your contact via OTP and send you a manage link
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city" 
                  placeholder="e.g., Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pin Code *</Label>
                <Input 
                  id="pincode" 
                  placeholder="e.g., 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Pickup Availability</Label>
                <Select value={pickupAvailability} onValueChange={setPickupAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time window" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact (Email or Phone) *</Label>
                <Input 
                  id="contact" 
                  placeholder="email@example.com or +91 9876543210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  We'll send an OTP to verify and provide your manage link
                </p>
              </div>
            </div>

            <div className="bg-ngo-priority-light border border-ngo-priority/20 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-ngo-priority mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">NGO Priority Window</p>
                  <p className="text-sm text-muted-foreground">
                    Your listing will be exclusive to verified NGOs for the first 2 hours. 
                    After that, public buyers can purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleBack} 
                variant="outline" 
                size="lg" 
                className="flex-1"
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                size="lg" 
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Publish Listing
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
