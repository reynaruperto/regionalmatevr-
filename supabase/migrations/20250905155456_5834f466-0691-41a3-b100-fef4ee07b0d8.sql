-- Fix security issues by updating functions with proper search_path

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profile (user_id, user_type, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'whv_maker')::public.user_type,
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the get_profile_photo_url function
CREATE OR REPLACE FUNCTION get_profile_photo_url(path TEXT)
RETURNS TEXT AS $$
BEGIN
    IF path IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN 'https://xiymsnmlwffikkhwatcp.supabase.co/storage/v1/object/public/' || path;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path = '';