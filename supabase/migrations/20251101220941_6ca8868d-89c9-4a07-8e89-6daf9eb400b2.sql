-- Create clothing_listings table
CREATE TABLE public.clothing_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  fabric TEXT NOT NULL,
  condition_notes TEXT,
  has_defects BOOLEAN DEFAULT false,
  tier TEXT NOT NULL CHECK (tier IN ('A', 'B', 'X')),
  price DECIMAL(10, 2) NOT NULL,
  photos JSONB DEFAULT '[]'::jsonb,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  pickup_availability TEXT,
  contact TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clothing_listings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert listings (since no auth required)
CREATE POLICY "Anyone can create listings"
ON public.clothing_listings
FOR INSERT
WITH CHECK (true);

-- Create policy to allow reading of approved listings only
CREATE POLICY "Anyone can view approved listings"
ON public.clothing_listings
FOR SELECT
USING (status = 'approved');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_clothing_listings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clothing_listings_updated_at
BEFORE UPDATE ON public.clothing_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_clothing_listings_updated_at();

-- Create index for faster queries
CREATE INDEX idx_clothing_listings_status ON public.clothing_listings(status);
CREATE INDEX idx_clothing_listings_created_at ON public.clothing_listings(created_at DESC);