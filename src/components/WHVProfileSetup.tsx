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

// ✅ 417 Eligible Countries
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

// ✅ 462 Eligible Countries
const countries462First = [
  "Argentina", "Austria", "Brazil", "Chile", "China", "Czech Republic",
  "Ecuador", "Greece", "Hungary", "India", "Indonesia", "Israel",
  "Luxembourg", "Malaysia", "Mongolia", "Papua New Guinea", "Peru",
  "Poland", "Portugal", "San Marino", "Singapore", "Slovak Republic",
  "Slovenia", "Spain", "Switzerland", "Thailand", "Türkiye",
  "Uruguay", "United States of America", "Vietnam",
];

const countries462SecondThird = [
  "Argentina", "Austria", "Brazil", "Chile", "China", "Czech Republic",
  "Ecuador", "Greece", "Hungary", "India", "Indonesia", "Israel",
  "Luxembourg", "Malaysia", "Mongolia", "Papua New Guinea", "Peru",
  "Poland", "Portugal", "San Marino", "Singapore", "Slovak Republic",
  "Slovenia", "Spain", "Switzerland", "Thailand", "Türkiye",
  "Uruguay", "United States of America", "Vietnam",
];

// ✅ Visa options by nationality
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
        visaType: "", // reset visa when nationality changes
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

    // ✅ Pass visaType + visaStage via router state
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
      {/* ... keep your JSX form as before ... */}
      {/* continue button triggers handleSubmit */}
    </div>
  );
};

export default WHVProfileSetup;




