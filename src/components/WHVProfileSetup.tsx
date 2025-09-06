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

// ==========================
// Eligible Countries
// ==========================
const countries417FirstSecond = [
  "Belgium", "Canada", "Republic of Cyprus", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Hong Kong Special Administrative Region",
  "Republic of Ireland", "Italy", "Japan", "Republic of Korea",
  "Malta", "Netherlands", "Norway", "Sweden", "Taiwan",
  "United Kingdom of Great Britain and Northern Ireland",
];

const countries417Third = [
  "Republic of Cyprus", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Hong Kong Special Administrative Region",
  "Republic of Ireland", "Italy", "Japan", "Republic of Korea",
  "Malta", "Netherlands", "Norway", "Sweden", "Taiwan",
  "United Kingdom of Great Britain and Northern Ireland",
];

const countries462First = [
  "Argentina", "Austria", "Brazil", "Chile", "China", "Czech Republic",
  "Ecuador", "Greece", "Hungary", "India", "Indonesia", "Israel",
  "Luxembourg", "Malaysia", "Mongolia", "Papua New Guinea", "Peru",
  "Poland", "Portugal", "San Marino", "Singapore", "Slovak Republic",
  "Slovenia", "Spain", "Switzerland", "Thailand", "Türkiye",
  "Uruguay", "United States of America", "Vietnam",
];

const countries462SecondThird = [...countries462First];

// ==========================
// Helpers
// ==========================
const getVisaOptions = (nationality: string) => {
  if (countries417FirstSecond.includes(nationality)) {
    return [
      "417 (First Working Holiday Visa)",
      "417 (Second Working Holiday Visa)",
      ...(countries417Third.includes(nationality)
        ? ["417 (Third Working Holiday Visa)"]
        : []),
    ];
  }
  if (countries462First.includes(nationality)) {
    return [
      "462 (First Work and Holiday Visa)",
      "462 (Second Work and Holiday Visa)",
      ...(countries462SecondThird.includes(nationality)
        ? ["462 (Third Work and Holiday Visa)"]
        : []),
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
  if (!dateRegex.test(dateStr)) return "Please enter DD/MM/YYYY";

  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return "Invalid date";
  }

  if (isDateOfBirth) {
    const today = new Date();
    const age = today.getFullYear() - year;
    if (age < 18) return "You must be at least 18 years old";
  } else {
    const today = new Date();
    if (date <= today) return "Visa expiry must be in the future";
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

// ==========================
// Component
// ==========================
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
      setFormData({ ...formData, nationality: value, visaType: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.givenName.trim()) newErrors.givenName = "Required";
    if (!formData.familyName.trim()) newErrors.familyName = "Required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required";
    else {
      const dobError = validateDate(formData.dateOfBirth, true);
      if (dobError) newErrors.dateOfBirth = dobError;
    }
    if (!formData.visaExpiryDate) newErrors.visaExpiryDate = "Required";
    else {
      const visaError = validateDate(formData.visaExpiryDate, false);
      if (visaError) newErrors.visaExpiryDate = visaError;
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    else {
      const phoneError = validatePhoneNumber(formData.phoneNumber);
      if (phoneError) newErrors.phoneNumber = phoneError;
    }
    if (!formData.nationality) newErrors.nationality = "Required";

    const eligibleVisas = getVisaOptions(formData.nationality);
    if (eligibleVisas.length === 0)
      newErrors.nationality = "Not eligible for WHV";
    else if (!formData.visaType) newErrors.visaType = "Required";

    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Required";
    if (!formData.suburb.trim()) newErrors.suburb = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.postCode.trim()) newErrors.postCode = "Required";
    else if (formData.postCode.length !== 4)
      newErrors.postCode = "Must be 4 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Pass visaType + visaStage to Work Preferences
    navigate("/whv/work-preferences", {
      state: {
        visaType: formData.visaType.startsWith("417") ? "417" : "462",
        visaStage: formData.visaType.includes("First")
          ? "1st"
          : formData.visaType.includes("Second")
          ? "2nd"
          : "3rd",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Header */}
          <div className="px-4 py-5 border-b bg-white flex-shrink-0 mb-4">
            <div className="flex items-center justify-between">
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
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields (GivenName, FamilyName, DOB, Nationality, Visa, Address, etc.) */}
              {/* ... paste all inputs from earlier version ... */}

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



