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

// ✅ Eligible countries based on subclass
const countries417 = [
  "Belgium", "Canada", "Republic of Cyprus", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Hong Kong", "Ireland", "Italy", "Japan", "Republic of Korea",
  "Malta", "Netherlands", "Norway", "Sweden", "Taiwan", "United Kingdom",
];

const countries462 = [
  "Argentina", "Austria", "Brazil", "Chile", "China", "Czech Republic", "Ecuador",
  "Greece", "Hungary", "India", "Indonesia", "Israel", "Luxembourg", "Malaysia",
  "Mongolia", "Papua New Guinea", "Peru", "Poland", "Portugal", "San Marino",
  "Singapore", "Slovak Republic", "Slovenia", "Spain", "Switzerland", "Thailand",
  "Türkiye", "United States of America", "Uruguay", "Vietnam",
];

const getVisaOptions = (nationality: string) => {
  if (countries417.includes(nationality)) {
    return [
      "417 (Working Holiday Visa)",
      "417 Second Year Extension",
      "417 Third Year Extension",
    ];
  }
  if (countries462.includes(nationality)) {
    return [
      "462 (Work and Holiday Visa)",
      "462 Second Year Extension",
      "462 Third Year Extension",
    ];
  }
  return [];
};

const formatDateInput = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length <= 2) return numericValue;
  else if (numericValue.length <= 4)
    return `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
  else
    return `${numericValue.slice(0, 2)}/${numericValue.slice(
      2,
      4
    )}/${numericValue.slice(4, 8)}`;
};

const validateDate = (dateStr: string, isDateOfBirth = false) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(dateStr)) return "Please enter date in DD/MM/YYYY format";

  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return "Please enter a valid date";
  }

  if (isDateOfBirth) {
    const today = new Date();
    const age = today.getFullYear() - year;
    const monthDiff = today.getMonth() - (month - 1);
    const dayDiff = today.getDate() - day;
    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      return "You must be at least 18 years old";
    }
  } else {
    const today = new Date();
    if (date <= today) return "Visa expiry date must be in the future";
  }

  return "";
};

const validatePhoneNumber = (phone: string) => {
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
    suburb: "",
    city: "",
    state: "",
    postCode: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "dateOfBirth" || name === "visaExpiryDate")
      formattedValue = formatDateInput(value);
    if (name === "phoneNumber" || name === "postCode")
      formattedValue = value.replace(/\D/g, "");

    setFormData({ ...formData, [name]: formattedValue });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "nationality") {
      setFormData({
        ...formData,
        nationality: value,
        visaType: "", // reset only when nationality changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.givenName.trim())
      newErrors.givenName = "Given name is required";
    if (!formData.familyName.trim())
      newErrors.familyName = "Family name is required";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    else {
      const dobError = validateDate(formData.dateOfBirth, true);
      if (dobError) newErrors.dateOfBirth = dobError;
    }

    if (!formData.visaExpiryDate)
      newErrors.visaExpiryDate = "Visa expiry date is required";
    else {
      const visaError = validateDate(formData.visaExpiryDate, false);
      if (visaError) newErrors.visaExpiryDate = visaError;
    }

    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    else {
      const phoneError = validatePhoneNumber(formData.phoneNumber);
      if (phoneError) newErrors.phoneNumber = phoneError;
    }

    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";

    const eligibleVisas = getVisaOptions(formData.nationality);
    if (eligibleVisas.length === 0)
      newErrors.nationality =
        "Not eligible for a Working Holiday or Work and Holiday visa";
    else if (!formData.visaType)
      newErrors.visaType = "Visa type is required";

    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.suburb.trim())
      newErrors.suburb = "Suburb is required";
    if (!formData.city.trim())
      newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postCode.trim())
      newErrors.postCode = "Post code is required";
    else if (formData.postCode.length !== 4)
      newErrors.postCode = "Post code must be 4 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("WHV Profile Setup:", formData);
    navigate("/whv/work-preferences");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>

          {/* Header */}
          <div className="px-4 py-5 border-b bg-white flex-shrink-0 mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/whv/email-confirmation")}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">
                Account Set Up
              </h1>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-600">3/6</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Given Name */}
              <div className="space-y-2">
                <Label htmlFor="givenName">
                  Given Name(s) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="givenName"
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.givenName ? "border-red-500" : ""
                  }`}
                />
                {errors.givenName && (
                  <p className="text-red-500 text-sm">{errors.givenName}</p>
                )}
              </div>

              {/* Middle Name */}
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0"
                />
              </div>

              {/* Family Name */}
              <div className="space-y-2">
                <Label htmlFor="familyName">
                  Family Name(s) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="familyName"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.familyName ? "border-red-500" : ""
                  }`}
                />
                {errors.familyName && (
                  <p className="text-red-500 text-sm">{errors.familyName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth (DD/MM/YYYY){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  maxLength={10}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.dateOfBirth ? "border-red-500" : ""
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <Label htmlFor="nationality">
                  Nationality (Country of Passport){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(value) =>
                    handleSelectChange("nationality", value)
                  }
                >
                  <SelectTrigger
                    className={`h-12 bg-gray-100 border-0 ${
                      errors.nationality ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...countries417, ...countries462].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && (
                  <p className="text-red-500 text-sm">{errors.nationality}</p>
                )}
              </div>

              {/* Visa Type */}
              {formData.nationality && (
                <div className="space-y-2">
                  <Label htmlFor="visaType">
                    Visa Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.visaType}
                    onValueChange={(value) =>
                      handleSelectChange("visaType", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-12 bg-gray-100 border-0 ${
                        errors.visaType ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getVisaOptions(formData.nationality).map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.visaType && (
                    <p className="text-red-500 text-sm">{errors.visaType}</p>
                  )}
                </div>
              )}

              {/* Visa Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="visaExpiryDate">
                  Visa Expiry Date (DD/MM/YYYY){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="visaExpiryDate"
                  name="visaExpiryDate"
                  value={formData.visaExpiryDate}
                  onChange={handleInputChange}
                  maxLength={10}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.visaExpiryDate ? "border-red-500" : ""
                  }`}
                />
                {errors.visaExpiryDate && (
                  <p className="text-red-500 text-sm">{errors.visaExpiryDate}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Australian Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Address Line 1 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine1">
                  Address Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.addressLine1 ? "border-red-500" : ""
                  }`}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm">{errors.addressLine1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="h-12 bg-gray-100 border-0"
                />
              </div>

              {/* Suburb */}
              <div className="space-y-2">
                <Label htmlFor="suburb">
                  Suburb <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="suburb"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.suburb ? "border-red-500" : ""
                  }`}
                />
                {errors.suburb && (
                  <p className="text-red-500 text-sm">{errors.suburb}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.city ? "border-red-500" : ""
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange("state", value)}
                >
                  <SelectTrigger
                    className={`h-12 bg-gray-100 border-0 ${
                      errors.state ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Australian Capital Territory">Australian Capital Territory</SelectItem>
                    <SelectItem value="New South Wales">New South Wales</SelectItem>
                    <SelectItem value="Northern Territory">Northern Territory</SelectItem>
                    <SelectItem value="Queensland">Queensland</SelectItem>
                    <SelectItem value="South Australia">South Australia</SelectItem>
                    <SelectItem value="Tasmania">Tasmania</SelectItem>
                    <SelectItem value="Victoria">Victoria</SelectItem>
                    <SelectItem value="Western Australia">Western Australia</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>

              {/* Post Code */}
              <div className="space-y-2">
                <Label htmlFor="postCode">
                  Post Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postCode"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  maxLength={4}
                  className={`h-12 bg-gray-100 border-0 ${
                    errors.postCode ? "border-red-500" : ""
                  }`}
                />
                {errors.postCode && (
                  <p className="text-red-500 text-sm">{errors.postCode}</p>
                )}
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
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


