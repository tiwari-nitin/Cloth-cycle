import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NGOVerificationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NGOVerificationForm({ open, onOpenChange }: NGOVerificationFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    ngoName: "",
    registrationNumber: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    serviceArea: "",
    operationalDetails: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload documents first
      const uploadedDocuments: string[] = [];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${formData.registrationNumber}-${Date.now()}.${fileExt}`;
        const filePath = `${formData.registrationNumber}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('ngo-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        uploadedDocuments.push(filePath);
      }

      // Submit application
      const { error: insertError } = await supabase
        .from('ngo_applications')
        .insert({
          ngo_name: formData.ngoName,
          registration_number: formData.registrationNumber,
          contact_person: formData.contactPerson,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          service_area: formData.serviceArea,
          operational_details: formData.operationalDetails,
        });

      if (insertError) throw insertError;

      toast({
        title: "Application Submitted Successfully!",
        description: "Your verification application has been submitted. We'll review it within 3-5 business days and notify you via email.",
      });

      // Reset form
      setFormData({
        ngoName: "",
        registrationNumber: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        serviceArea: "",
        operationalDetails: "",
      });
      setFiles([]);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for NGO Verification</DialogTitle>
          <DialogDescription>
            Complete this form to get verified as an NGO partner. Verification gives you priority access to listed items.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ngoName">NGO Name *</Label>
              <Input
                id="ngoName"
                required
                value={formData.ngoName}
                onChange={(e) => setFormData({ ...formData, ngoName: e.target.value })}
                placeholder="Enter your NGO's registered name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                required
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                placeholder="Enter registration/tax ID number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Full name of primary contact"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@ngo.org"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceArea">Service Area *</Label>
              <Input
                id="serviceArea"
                required
                value={formData.serviceArea}
                onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                placeholder="Cities/regions you serve (e.g., Mumbai, Maharashtra)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operationalDetails">Operational Details *</Label>
              <Textarea
                id="operationalDetails"
                required
                value={formData.operationalDetails}
                onChange={(e) => setFormData({ ...formData, operationalDetails: e.target.value })}
                placeholder="Describe your NGO's mission, activities, and how you'll use ClothCycle..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Verification Documents *</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="documents"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="flex-1"
                  />
                  <Button type="button" size="icon" variant="outline" onClick={() => document.getElementById('documents')?.click()}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload registration certificate, tax exemption papers, or other verification documents (PDF, JPG, PNG)
                </p>
                
                {files.length > 0 && (
                  <Card className="p-3">
                    <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                          <span className="truncate flex-1">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || files.length === 0}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
