import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { PhotoUpload, UploadedPhoto } from "@/components/PhotoUpload";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Donate() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const [formData, setFormData] = useState({
    category: "",
    size: "",
    fabric: "",
    condition: "",
    defects: false,
    conditionNotes: "",
    photos: [] as UploadedPhoto[],
    city: "",
    pincode: "",
    pickupAvailability: "",
    contactMethod: "email",
    contactValue: "",
    ngoPreference: "",
  });

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Donation Submitted!",
      description: "Thank you for your generosity. An NGO partner will contact you shortly for pickup.",
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            <span>Donate directly to verified NGOs</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Donate Clothes</h1>
          <p className="text-muted-foreground">
            No sign up required. Donate clothes directly to NGOs helping communities.
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

        {/* NGO Partner Info Banner */}
        <Card className="mb-8 p-6 bg-primary-light/30 border-primary/20">
          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-lg">Your donation helps verified NGOs</h3>
              <p className="text-sm text-muted-foreground">
                Partner NGOs like Community Care Foundation, Hope & Harmony Trust, and Green Earth Collective 
                will receive your donated items to support families and communities across India.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  Verified NGOs Only
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  Free Pickup
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  Direct Impact
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 1: Item Details */}
        {step === 1 && (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Item Details</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tops">Tops / Shirts</SelectItem>
                    <SelectItem value="bottoms">Bottoms / Pants</SelectItem>
                    <SelectItem value="dresses">Dresses / Sarees</SelectItem>
                    <SelectItem value="outerwear">Outerwear / Jackets</SelectItem>
                    <SelectItem value="traditional">Traditional Wear</SelectItem>
                    <SelectItem value="kids">Kids Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) => setFormData({ ...formData, size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="free">Free Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fabric">Fabric *</Label>
                  <Select
                    value={formData.fabric}
                    onValueChange={(value) => setFormData({ ...formData, fabric: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="silk">Silk</SelectItem>
                      <SelectItem value="wool">Wool</SelectItem>
                      <SelectItem value="blend">Blend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Overall Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new</SelectItem>
                    <SelectItem value="good">Good - Gently used</SelectItem>
                    <SelectItem value="fair">Fair - Some wear visible</SelectItem>
                    <SelectItem value="worn">Worn - Daily use marks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="defects"
                  checked={formData.defects}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, defects: checked as boolean })
                  }
                />
                <Label htmlFor="defects" className="text-sm cursor-pointer">
                  Item has visible defects (tears, stains, broken zippers, etc.)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionNotes">Condition Notes (Optional)</Label>
                <Textarea
                  id="conditionNotes"
                  placeholder="Describe the item's condition, any defects, or special features..."
                  value={formData.conditionNotes}
                  onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} size="lg">
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Upload Photos</h2>
              <p className="text-sm text-muted-foreground">
                Add 1-6 clear photos of your item. Include front, back, and any defects.
              </p>
            </div>

            <PhotoUpload
              onPhotosChange={(photos) => setFormData({ ...formData, photos })}
              maxPhotos={6}
              minPhotos={1}
            />

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" size="lg">
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                size="lg"
                disabled={formData.photos.length < 1}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Location & Contact */}
        {step === 3 && (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Pickup Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 400001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Availability *</Label>
                <Select
                  value={formData.pickupAvailability}
                  onValueChange={(value) => setFormData({ ...formData, pickupAvailability: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekday">Weekdays (9 AM - 6 PM)</SelectItem>
                    <SelectItem value="weekend">Weekends Only</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="evening">Evenings (6 PM - 9 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>NGO Preference (Optional)</Label>
                <Select
                  value={formData.ngoPreference}
                  onValueChange={(value) => setFormData({ ...formData, ngoPreference: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any verified NGO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Verified NGO</SelectItem>
                    <SelectItem value="community-care">Community Care Foundation</SelectItem>
                    <SelectItem value="hope-harmony">Hope & Harmony Trust</SelectItem>
                    <SelectItem value="green-earth">Green Earth Collective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold">Contact Details</h3>
                <p className="text-sm text-muted-foreground">
                  We'll send a verification code and pickup coordination details.
                </p>

                <div className="space-y-2">
                  <Label>Preferred Contact Method *</Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone / SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.contactMethod === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.contactValue}
                        onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10"
                        value={formData.contactValue}
                        onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card className="p-4 bg-accent/5 border-accent/20">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">What happens next?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Verify your contact via OTP</li>
                    <li>• NGO reviews and accepts donation</li>
                    <li>• Pickup scheduled within 3-7 days</li>
                    <li>• Track impact on your dashboard</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" size="lg">
                Back
              </Button>
              <Button onClick={handleSubmit} size="lg" className="bg-accent hover:bg-accent/90">
                <Heart className="mr-2 h-4 w-4" />
                Submit Donation
              </Button>
            </div>
          </Card>
        )}

        {/* Donation Guidelines */}
        <Card className="mt-8 p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Donation Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                We Accept
              </h4>
              <ul className="space-y-1 ml-6">
                <li>• Clean, wearable clothing</li>
                <li>• All sizes and styles</li>
                <li>• Traditional and western wear</li>
                <li>• Items with minor wear</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Please Note
              </h4>
              <ul className="space-y-1 ml-6">
                <li>• All donations are tax-deductible</li>
                <li>• Free pickup from your location</li>
                <li>• Items go directly to verified NGOs</li>
                <li>• Get impact reports monthly</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
