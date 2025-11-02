-- Create enum for application status
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Create NGO applications table
CREATE TABLE public.ngo_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_name TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  service_area TEXT NOT NULL,
  operational_details TEXT NOT NULL,
  status verification_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ngo_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create an application
CREATE POLICY "Anyone can create NGO applications"
ON public.ngo_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Applicants can view their own applications
CREATE POLICY "Applicants can view their own applications"
ON public.ngo_applications
FOR SELECT
TO public
USING (true);

-- Policy: Only authenticated users can update applications (for admin approval)
CREATE POLICY "Authenticated users can update applications"
ON public.ngo_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('ngo-documents', 'ngo-documents', false);

-- Storage policies for NGO documents
CREATE POLICY "Anyone can upload verification documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'ngo-documents');

CREATE POLICY "Anyone can view their uploaded documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ngo-documents');

CREATE POLICY "Authenticated users can view all NGO documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'ngo-documents');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ngo_application_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ngo_applications_updated_at
BEFORE UPDATE ON public.ngo_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_ngo_application_updated_at();