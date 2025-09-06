import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client"; // ✅ keep Lovable path

const WHVProfileSetup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    dateOfBirth: "",
    nationality: "",
    visaType: "",
    visaExpiry: "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [visaStages, setVisaStages] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Load countries + visa stages from Supabase
  useEffect(() => {
    const loadData = async () => {
      // Countries
      const { data: countryData, error: cErr } = await supabase
        .from("country")
        .select("country_id, name, scheme")
        .order("name");
      if (cErr) {
        console.error("Error loading countries:", cErr);
      } else {
        setCountries(countryData || []);
      }

      // Visa stages
      const { data: stageData, error: vErr } = await supabase
        .from("visa_stage")
        .select("stage_id, scheme, stage, label")
        .order("stage");
      if (vErr) {
        console.error("Error loading visa stages:", vErr);
      } else {
        setVisaStages(stageData || []);
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.givenName) newErrors.givenName = "Required";
    if (!formData.familyName) newErrors.familyName = "Required";
    if (!formData.nationality) newErrors.nationality = "Required";
    if (!formData.visaType) newErrors.visaType = "Required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // ✅ Save WHV maker profile
    await supabase.from("whv_maker").upsert({
      user_id: user.id,
      given_name: formData.givenName,
      family_name: formData.familyName,
      birth_date: formData.dateOfBirth || null,
      nationality: formData.nationality,
      mobile_num: formData.phone,
      address_line1: formData.address1,
      city: formData.city,
      state: formData.state,
      postcode: formData.postcode,
    });

    // ✅ Save visa info
    await supabase.from("maker_visa").upsert({
      user_id: user.id,
      visa_type: formData.visaType,
      expiry_date: formData.visaExpiry || null,
    });

    // ✅ Extract scheme + stage for navigation
    const chosenStage = visaStages.find((v) => v.label === formData.visaType);
    navigate("/whv/work-preferences", {
      state: {
        visaType: chosenStage?.scheme || "",
        visaStage: chosenStage?.stage?.toString() || "",
      },
    });
  };

  // ✅ Filter visa stages by scheme of selected nationality
  const selectedCountry = countries.find(
    (c) => c.name === formData.nationality
  );
  const filteredStages = selectedCountry
    ? visaStages.filter((v) => v.scheme === selectedCountry.scheme)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-4 border-b flex items-center justify-between">
            <button
              onClick={() => navigate("/whv/email-confirmation")}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium">Account Set Up</h1>
            <span className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-sm">
              3/6
            </span>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Given Name */}
              <div>
                <Label>Given Name *</Label>
                <Input
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleChange}
                />
                {errors.givenName && (
                  <p className="text-red-500">{errors.givenName}</p>
                )}
              </div>

              {/* Family Name */}
              <div>
                <Label>Family Name *</Label>
                <Input
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleChange}
                />
                {errors.familyName && (
                  <p className="text-red-500">{errors.familyName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <Label>Date of Birth</Label>
                <Input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* Nationality */}
              <div>
                <Label>Nationality *</Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(v) => handleSelect("nationality", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.country_id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && (
                  <p className="text-red-500">{errors.nationality}</p>
                )}
              </div>

              {/* Visa Type */}
              {filteredStages.length > 0 && (
                <div>
                  <Label>Visa Type *</Label>
                  <Select
                    value={formData.visaType}
                    onValueChange={(v) => handleSelect("visaType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStages.map((v) => (
                        <SelectItem key={v.stage_id} value={v.label}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.visaType && (
                    <p className="text-red-500">{errors.visaType}</p>
                  )}
                </div>
              )}

              {/* Visa Expiry */}
              <div>
                <Label>Visa Expiry</Label>
                <Input
                  name="visaExpiry"
                  value={formData.visaExpiry}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* Phone */}
              <div>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div>
                <Label>Address</Label>
                <Input
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Postcode</Label>
                <Input
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  maxLength={4}
                />
              </div>

              {/* Continue */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-14 bg-orange-500 text-white rounded-xl"
                >
                  Continue →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVProfileSetup;




