-- Drop trigger first, then recreate function with proper search_path
DROP TRIGGER IF EXISTS update_ngo_applications_updated_at ON public.ngo_applications;

DROP FUNCTION IF EXISTS public.update_ngo_application_updated_at() CASCADE;

-- Recreate function with proper search_path
CREATE OR REPLACE FUNCTION public.update_ngo_application_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_ngo_applications_updated_at
BEFORE UPDATE ON public.ngo_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_ngo_application_updated_at();