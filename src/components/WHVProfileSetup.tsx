import React, { useState } from "react";
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

// ✅ Eligible countries
const countries417 = [
  "Belgium","Canada","Republic of Cyprus","Denmark","Estonia","Finland","France",
  "Germany","Hong Kong","Ireland","Italy","Japan","Republic of Korea","Malta",
  "Netherlands","Norway","Sweden","Taiwan","United Kingdom",
];

const countries462 = [
  "Argentina","Austria","Brazil","Chile","China","Czech Republic","Ecuador",
  "Greece","Hungary","India","Indonesia","Israel","Luxembourg","Malaysia",
  "Mongolia","Papua New Guinea","Peru","Poland","Portugal","San Marino",
  "Singapore","Slovak Republic","Slovenia","Spain","Switzerland","Thailand",
  "Türkiye","United States of America","Uruguay","Vietnam",
];

const getVisaOptions = (nationality: string) => {
  if (countries417.includes(nationality)) {
    return ["417 (Working Holiday Visa)","417 Second Year Extension","417 Third Year Extension"];
  }
  if (countries462.includes(nationality)) {
    return ["462 (Work and Holiday Visa)","462 Second Year Extension","462 Third Year Extension"];
  }
  return [];
};

// Australian states
const australianStates = [
  "Australian Capital Territory","New South Wales","Northern Territory","Queensland",
  "South Australia","Tasmania","Victoria","Western Australia"
];

// Helpers
const formatDateInput = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length <= 2) return numericValue;
  else if (numericValue.length <= 4) return `${numericValue.slice(0,2)}/${numericValue.slice(2)}`;
  else return `${numericValue.slice(0,2)}/${numericValue.slice(2,4)}/${numericValue.slice(4,8)}`;
};

const validateDate = (dateStr: string, isDOB = false) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(dateStr)) return "Use DD/MM/YYYY format";
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    return "Invalid date";
  }
  if (isDOB) {
    const today = new Date();
    const age = today.getFullYear() - year;
    if (age < 18) return "Must be at least 18 years old";
  } else {
    if (date <= new Date()) return "Visa expiry must be in the future";
  }
  return "";
};

const validatePhone = (phone: string) => {
  const numericPhone = phone.replace(/\D/g, "");
  if (!/^0\d{9}$/.test(numericPhone) && !/^61\d{9}$/.test(numericPhone)) {
    return "Enter a valid Australian phone number";
  }
  return "";
};

const WHVProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    dateOfBirth: "",
    nationality: "",
    visaType: "",
    visaExpiryDate: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    suburbCity: "",
    state: "",
    postCode: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "dateOfBirth" || name === "visaExpiryDate") formatted = formatDateInput(value);
    if (name === "phoneNumber" || name === "postCode") formatted = value.replace(/\D/g, "");
    setFormData({ ...formData, [name]: formatted });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value, ...(name === "nationality" && { visaType: "" }) });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [k: string]: string } = {};

    if (!formData.givenName.trim()) newErrors.givenName = "Required";
    if (!formData.familyName.trim()) newErrors.familyName = "Required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required";
    else {
      const err = validateDate(formData.dateOfBirth, true);
      if (err) newErrors.dateOfBirth = err;
    }

    if (!formData.visaExpiryDate) newErrors.visaExpiryDate = "Required";
    else {
      const err = validateDate(formData.visaExpiryDate);
      if (err) newErrors.visaExpiryDate = err;
    }

    if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    else {
      const err = validatePhone(formData.phoneNumber);
      if (err) newErrors.phoneNumber = err;
    }

    if (!formData.nationality) newErrors.nationality = "Required";
    else if (getVisaOptions(formData.nationality).length === 0)
      newErrors.nationality = "Not eligible for WHV";
    if (!formData.visaType) newErrors.visaType = "Required";

    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Required";
    if (!formData.suburbCity.trim()) newErrors.suburbCity = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.postCode.trim() || formData.postCode.length !== 4)
      newErrors.postCode = "Postcode must be 4 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("WHV Profile Setup:", formData);
    navigate("/whv/work-preferences");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <button
              onClick={() => navigate("/whv/email-confirmation")}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">Account Set Up</h1>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              <span className="text-sm font-medium text-gray-600">3/6</span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div>
                <Label>Given Name(s) <span className="text-red-500">*</span></Label>
                <Input name="givenName" value={formData.givenName} onChange={handleInputChange} />
                {errors.givenName && <p className="text-red-500 text-sm">{errors.givenName}</p>}
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input name="middleName" value={formData.middleName} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Family Name(s) <span className="text-red-500">*</span></Label>
                <Input name="familyName" value={formData.familyName} onChange={handleInputChange} />
                {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
              </div>

              {/* DOB */}
              <div>
                <Label>Date of Birth (DD/MM/YYYY) <span className="text-red-500">*</span></Label>
                <Input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} maxLength={10} />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              {/* Nationality */}
              <div>
                <Label>Nationality <span className="text-red-500">*</span></Label>
                <Select value={formData.nationality} onValueChange={(v) => handleSelectChange("nationality", v)}>
                  <SelectTrigger><SelectValue placeholder="Select nationality" /></SelectTrigger>
                  <SelectContent>
                    {[...countries417, ...countries462].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
              </div>

              {/* Visa Type */}
              {formData.nationality && (
                <div>
                  <Label>Visa Type <span className="text-red-500">*</span></Label>
                  <Select value={formData.visaType} onValueChange={(v) => handleSelectChange("visaType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select visa type" /></SelectTrigger>
                    <SelectContent>
                      {getVisaOptions(formData.nationality).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.visaType && <p className="text-red-500 text-sm">{errors.visaType}</p>}
                </div>
              )}

              {/* Visa Expiry */}
              <div>
                <Label>Visa Expiry Date (DD/MM/YYYY) <span className="text-red-500">*</span></Label>
                <Input name="visaExpiryDate" value={formData.visaExpiryDate} onChange={handleInputChange} maxLength={10} />
                {errors.visaExpiryDate && <p className="text-red-500 text-sm">{errors.visaExpiryDate}</p>}
              </div>

              {/* Phone */}
              <div>
                <Label>Australian Phone Number <span className="text-red-500">*</span></Label>
                <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>

              {/* Address */}
              <div>
                <Label>Address Line 1 <span className="text-red-500">*</span></Label>
                <Input name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
                {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
              </div>
              <div>
                <Label>Address Line 2</Label>
                <Input name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Suburb / City <span className="text-red-500">*</span></Label>
                <Input name="suburbCity" value={formData.suburbCity} onChange={handleInputChange} />
                {errors.suburbCity && <p className="text-red-500 text-sm">{errors.suburbCity}</p>}
              </div>
              <div>
                <Label>State <span className="text-red-500">*</span></Label>
                <Select value={formData.state} onValueChange={(v) => handleSelectChange("state", v)}>
                  <SelectTrigger><SelectValue placeholder="Select a state" /></SelectTrigger>
                  <SelectContent>
                    {australianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
              <div>
                <Label>Postcode <span className="text-red-500">*</span></Label>
                <Input name="postCode" value={formData.postCode} onChange={handleInputChange} maxLength={4} />
                {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
              </div>

              <div className="pt-8">
                <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white">
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




