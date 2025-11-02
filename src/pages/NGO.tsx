import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NGOVerificationForm } from "@/components/NGOVerificationForm";
import { NGOGuideModal } from "@/components/NGOGuideModal";
import {
  Users,
  CheckCircle2,
  Clock,
  Package,
  TrendingUp,
  FileText,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NGO() {
  const [verificationFormOpen, setVerificationFormOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-ngo-priority text-ngo-priority-foreground">
            For Verified NGOs
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Priority Access for NGOs
          </h1>
          <p className="text-muted-foreground text-lg">
            Get first access to quality clothing at predictable prices. 
            Streamline procurement for your community programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-ngo-priority hover:bg-ngo-priority/90"
              onClick={() => setVerificationFormOpen(true)}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Apply for Verification
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setGuideModalOpen(true)}
            >
              <FileText className="mr-2 h-5 w-5" />
              NGO Guide
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Partner with ClothCycle?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-ngo-priority-light flex items-center justify-center">
                <Clock className="h-6 w-6 text-ngo-priority" />
              </div>
              <h3 className="text-xl font-semibold">2-Hour Priority Window</h3>
              <p className="text-muted-foreground">
                Get exclusive first access to every new listing. Browse and purchase before public buyers.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Predictable Pricing</h3>
              <p className="text-muted-foreground">
                Fixed prices: ₹50 for Tier B, ₹225 for Tier A. Budget accurately for your programs.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Bulk Procurement Tools</h3>
              <p className="text-muted-foreground">
                Select multiple items, cluster pickups by area, manage orders efficiently in one dashboard.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/bulk-procurement">Try Bulk Procurement</Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* How Priority Works */}
        <div className="mb-16 bg-ngo-priority-light rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">How Priority Access Works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-ngo-priority text-ngo-priority-foreground flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">New Listing Goes Live</h3>
                  <p className="text-muted-foreground">
                    When a seller publishes an item, it's immediately visible in your NGO Priority Feed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-ngo-priority text-ngo-priority-foreground flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Exclusive 2-Hour Window</h3>
                  <p className="text-muted-foreground">
                    Only verified NGOs can purchase during this time. A countdown timer shows remaining priority time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-ngo-priority text-ngo-priority-foreground flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">One-Click Purchase</h3>
                  <p className="text-muted-foreground">
                    Add to cart or buy instantly. If multiple NGOs compete within the window, first confirmed purchase wins.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-ngo-priority text-ngo-priority-foreground flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Public Access Opens</h3>
                  <p className="text-muted-foreground">
                    After 2 hours, if unpurchased, the item becomes available to public buyers at the same fixed price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Verification Process</h2>
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-lg">Submit Organization Details</h3>
                  <p className="text-muted-foreground">
                    Provide your NGO name, registration number, service areas, and upload supporting documents 
                    (registration certificate, 12A/80G if applicable).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-lg">Admin Review (24-48 hours)</h3>
                  <p className="text-muted-foreground">
                    Our team verifies your organization's legitimacy and service focus. 
                    We may reach out for clarifications if needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-primary mt-1" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-lg">Access Granted</h3>
                  <p className="text-muted-foreground">
                    Once approved, you'll receive login credentials and instant access to the NGO Priority Feed 
                    and bulk procurement dashboard.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">NGO Community Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-ngo-priority mb-2">14</div>
              <div className="text-muted-foreground">Verified NGOs</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,971</div>
              <div className="text-muted-foreground">Items Procured</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">1,250+</div>
              <div className="text-muted-foreground">Families Helped</div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-impact-green mb-2">₹2.87L</div>
              <div className="text-muted-foreground">Total Procurement</div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-br from-ngo-priority/10 to-primary-light/50 border-2 border-ngo-priority/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Start procuring quality clothing at predictable prices for your community programs. 
            Verification takes 24-48 hours.
          </p>
          <Button 
            size="lg" 
            className="bg-ngo-priority hover:bg-ngo-priority/90"
            onClick={() => setVerificationFormOpen(true)}
          >
            Apply for NGO Verification
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>

      <NGOVerificationForm 
        open={verificationFormOpen} 
        onOpenChange={setVerificationFormOpen} 
      />
      
      <NGOGuideModal 
        open={guideModalOpen} 
        onOpenChange={setGuideModalOpen} 
      />
    </Layout>
  );
}
