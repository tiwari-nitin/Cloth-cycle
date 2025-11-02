-- Create storage bucket for clothing item photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('clothing-images', 'clothing-images', true);

-- Create RLS policies for clothing images bucket
CREATE POLICY "Anyone can view clothing images"
ON storage.objects FOR SELECT
USING (bucket_id = 'clothing-images');

CREATE POLICY "Anyone can upload clothing images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'clothing-images');

CREATE POLICY "Users can update their clothing images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'clothing-images');

CREATE POLICY "Users can delete their clothing images"
ON storage.objects FOR DELETE
USING (bucket_id = 'clothing-images');