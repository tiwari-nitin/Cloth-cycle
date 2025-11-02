import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  CheckCircle2,
  Package,
  Shield,
  TrendingUp,
  Clock,
  HelpCircle,
  Leaf,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NGOGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NGOGuideModal({ open, onOpenChange }: NGOGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-ngo-priority" />
            NGO Guide
          </DialogTitle>
          <DialogDescription>
            Complete guide for verified NGOs to maximize their impact on ClothCycle
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Overview & Purpose</h3>
              </div>
              <Card className="p-4 bg-accent/5 border-accent/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The ClothCycle NGO program empowers verified organizations with priority access 
                  to quality clothing at fixed, predictable prices. Our mission is to support your 
                  community programs with reliable procurement tools, enabling you to focus on 
                  impact rather than logistics.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>2-hour priority window</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Fixed transparent pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Bulk procurement tools</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Sustainability impact tracking</span>
                  </div>
                </div>
              </Card>
            </section>

            <Separator />

            {/* Getting Verified */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-ngo-priority" />
                <h3 className="text-lg font-semibold">Getting Verified</h3>
              </div>
              <div className="space-y-3">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ngo-priority text-ngo-priority-foreground text-xs font-bold">1</span>
                    Submit Application
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Click "Apply for Verification" and provide your NGO details, registration number, 
                    service areas, and contact information.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ngo-priority text-ngo-priority-foreground text-xs font-bold">2</span>
                    Upload Documents
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Required: Registration certificate. Optional but helpful: 12A/80G certificates, 
                    annual reports, or impact documentation.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ngo-priority text-ngo-priority-foreground text-xs font-bold">3</span>
                    Verification Review (24-48 hours)
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Our team verifies your organization's legitimacy. You'll receive email updates 
                    on your application status.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ngo-priority text-ngo-priority-foreground text-xs font-bold">4</span>
                    Access Granted
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Once approved, you'll receive login credentials and instant access to priority listings 
                    and bulk procurement tools.
                  </p>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Using Platform Features */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Platform Features</h3>
              </div>
              <div className="space-y-3">
                <Card className="p-4 border-l-4 border-l-ngo-priority">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-ngo-priority mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Priority Feed</h4>
                      <p className="text-sm text-muted-foreground">
                        Access all new listings immediately with a 2-hour exclusive purchase window 
                        before public buyers. Real-time countdown timers show remaining priority time.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Fixed Pricing</h4>
                      <p className="text-sm text-muted-foreground">
                        Tier B items: ₹50 each | Tier A items: ₹225 each. No bidding, no surprises. 
                        Budget accurately for your programs.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-accent">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Bulk Procurement</h4>
                      <p className="text-sm text-muted-foreground">
                        Select multiple items, filter by location, cluster pickups by area, 
                        and manage all orders in one centralized dashboard.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-impact-green">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-impact-green mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Impact Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        View CO₂ emissions saved, water conserved, and families helped through 
                        your procurement activities on your dashboard.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            <Separator />

            {/* FAQs */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-3">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">What if multiple NGOs want the same item?</h4>
                  <p className="text-sm text-muted-foreground">
                    Within the 2-hour priority window, the first NGO to complete purchase gets the item. 
                    We recommend checking the feed regularly for new listings.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">How is clothing quality verified?</h4>
                  <p className="text-sm text-muted-foreground">
                    All items are pre-screened by sellers with detailed condition reports and multiple photos. 
                    Tier A = excellent/like new, Tier B = good/gently used.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">Can we cancel or return items?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sales are final once confirmed. However, if items significantly differ from description, 
                    contact support within 24 hours for resolution.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">How do pickups work for bulk orders?</h4>
                  <p className="text-sm text-muted-foreground">
                    The bulk procurement tool clusters items by location. You can coordinate with sellers 
                    for combined pickups or schedule separate pickups through the dashboard.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">Is there a minimum purchase requirement?</h4>
                  <p className="text-sm text-muted-foreground">
                    No minimum. Purchase single items or bulk quantities based on your program needs.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2 text-sm">What payment methods are accepted?</h4>
                  <p className="text-sm text-muted-foreground">
                    UPI, debit/credit cards, net banking, and organization account invoicing (for verified NGOs).
                  </p>
                </Card>
              </div>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
