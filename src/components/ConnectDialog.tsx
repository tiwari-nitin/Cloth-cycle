import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface ConnectDialogProps {
  trigger?: React.ReactNode;
}

export function ConnectDialog({ trigger }: ConnectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">Connect</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect With Us</DialogTitle>
          <DialogDescription>
            Get in touch with the ClothCycle team
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Phone</h4>
                <a
                  href="tel:+919876543210"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 98765 43210
                </a>
                <br />
                <a
                  href="tel:+918765432109"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 87654 32109
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Email</h4>
                <a
                  href="mailto:hello@clothcycle.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@clothcycle.com
                </a>
                <br />
                <a
                  href="mailto:support@clothcycle.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  support@clothcycle.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/clothcycle"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/clothcycle"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/clothcycle"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/clothcycle"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
