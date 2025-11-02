-- Create storage bucket for donation photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('donation-images', 'donation-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to upload to donation-images bucket
CREATE POLICY "Anyone can upload donation images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'donation-images');

-- Allow public to view donation images
CREATE POLICY "Anyone can view donation images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'donation-images');