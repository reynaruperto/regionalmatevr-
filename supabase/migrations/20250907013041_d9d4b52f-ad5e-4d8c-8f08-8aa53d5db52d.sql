-- Enable RLS
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create user_type enum
CREATE TYPE user_type AS ENUM ('whv_maker', 'employer');

-- Create country table
CREATE TABLE public.country (
  country_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  scheme TEXT NOT NULL CHECK (scheme IN ('417', '462'))
);

-- Create visa_stage table  
CREATE TABLE public.visa_stage (
  stage_id SERIAL PRIMARY KEY,
  sub_class TEXT NOT NULL CHECK (sub_class IN ('417', '462')),
  stage INTEGER NOT NULL,
  label TEXT NOT NULL
);

-- Create industry table
CREATE TABLE public.industry (
  industry_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Create whv_maker table
CREATE TABLE public.whv_maker (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  given_name TEXT NOT NULL,
  middle_name TEXT,
  family_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  nationality TEXT NOT NULL,
  mobile_num TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  suburb TEXT,
  state TEXT,
  postcode TEXT,
  is_profile_visible BOOLEAN DEFAULT true,
  profile_photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create maker_visa table
CREATE TABLE public.maker_visa (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  visa_type TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  PRIMARY KEY (user_id, visa_type)
);

-- Enable RLS on all tables
ALTER TABLE public.country ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_stage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whv_maker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maker_visa ENABLE ROW LEVEL SECURITY;

-- RLS Policies for country table (readable by all authenticated users)
CREATE POLICY "Countries are viewable by authenticated users" 
ON public.country 
FOR SELECT 
TO authenticated
USING (true);

-- RLS Policies for visa_stage table (readable by all authenticated users)
CREATE POLICY "Visa stages are viewable by authenticated users" 
ON public.visa_stage 
FOR SELECT 
TO authenticated
USING (true);

-- RLS Policies for industry table (readable by all authenticated users)
CREATE POLICY "Industries are viewable by authenticated users" 
ON public.industry 
FOR SELECT 
TO authenticated
USING (true);

-- RLS Policies for whv_maker table
CREATE POLICY "Users can view their own WHV profile" 
ON public.whv_maker 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own WHV profile" 
ON public.whv_maker 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WHV profile" 
ON public.whv_maker 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for maker_visa table
CREATE POLICY "Users can view their own visa info" 
ON public.maker_visa 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own visa info" 
ON public.maker_visa 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visa info" 
ON public.maker_visa 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Insert sample countries with their visa schemes
INSERT INTO public.country (name, scheme) VALUES
('Germany', '417'),
('France', '417'),
('Ireland', '417'),
('Italy', '417'),
('Japan', '417'),
('South Korea', '417'),
('Taiwan', '417'),
('United Kingdom', '417'),
('Canada', '417'),
('Belgium', '417'),
('Cyprus', '417'),
('Denmark', '417'),
('Estonia', '417'),
('Finland', '417'),
('Hong Kong', '417'),
('Malta', '417'),
('Netherlands', '417'),
('Norway', '417'),
('Sweden', '417'),
('Argentina', '462'),
('Austria', '462'),
('Chile', '462'),
('Czech Republic', '462'),
('Hungary', '462'),
('Indonesia', '462'),
('Israel', '462'),
('Luxembourg', '462'),
('Malaysia', '462'),
('Peru', '462'),
('Poland', '462'),
('Portugal', '462'),
('San Marino', '462'),
('Singapore', '462'),
('Slovakia', '462'),
('Slovenia', '462'),
('Spain', '462'),
('Thailand', '462'),
('Turkey', '462'),
('United States', '462'),
('Uruguay', '462'),
('Vietnam', '462');

-- Insert visa stages
INSERT INTO public.visa_stage (sub_class, stage, label) VALUES
('417', 1, 'Working Holiday Visa (Subclass 417) - First'),
('417', 2, 'Working Holiday Visa (Subclass 417) - Second'),
('417', 3, 'Working Holiday Visa (Subclass 417) - Third'),
('462', 1, 'Work and Holiday Visa (Subclass 462) - First'),
('462', 2, 'Work and Holiday Visa (Subclass 462) - Second');

-- Insert sample industries
INSERT INTO public.industry (name, description) VALUES
('Agriculture', 'Farming, livestock, crops, and agricultural services'),
('Hospitality', 'Hotels, restaurants, cafes, and tourism services'),
('Construction', 'Building, renovation, and infrastructure projects'),
('Healthcare', 'Medical services, aged care, and health support'),
('Retail', 'Shops, stores, and customer service'),
('Education', 'Schools, tutoring, and educational services'),
('Manufacturing', 'Production, assembly, and industrial work'),
('Mining', 'Resource extraction and related services'),
('Transport', 'Logistics, delivery, and transportation services'),
('Technology', 'IT, software, and digital services');