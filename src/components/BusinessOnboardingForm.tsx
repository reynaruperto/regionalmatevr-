import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// --- Schema ---
const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  abn: z.string().min(11, { message: "Please enter a valid ABN." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  roles: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  availability: z.array(z.string()).min(1, { message: "Select at least one availability option." }),
  pay: z.object({
    min: z.number().min(1, { message: "Enter minimum pay." }),
    max: z.number().min(1, { message: "Enter maximum pay." }),
    unit: z.string().min(1, { message: "Select pay unit." }),
  }),
  facilities: z.array(z.string()).optional(),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

// --- Industry → Roles Map ---
const INDUSTRY_ROLES: Record<string, string[]> = {
  "Plant & Animal Cultivation": [
    "Fruit Picker",
    "Packer",
    "Pruner",
    "Farm Hand",
    "Dairy Worker",
  ],
  "Fishing & Pearling": ["Deckhand", "Pearl Diver", "Aquaculture Worker"],
  "Tree Farming & Felling": ["Tree Planter", "Logger", "Transport Worker"],
  "Construction": ["Labourer", "Scaffolder", "Painter", "Site Cleaner"],
  "Tourism & Hospitality": [
    "Chef",
    "Waiter",
    "Hotel Staff",
    "Tour Guide",
    "Bartender",
  ],
  "Healthcare & Medical": ["Nurse", "Aged Care Worker", "Cleaner"],
  "Disaster Recovery": ["Rebuilder", "Wildlife Carer", "Community Support"],
};

const INDUSTRY_OPTIONS = Object.keys(INDUSTRY_ROLES);

const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Casual", "Seasonal", "Piecework"];

const PAY_UNITS = ["hourly", "daily", "weekly", "piecework"];

const FACILITIES_OPTIONS = [
  "Accommodation Provided",
  "Transport to Site",
  "Meals",
  "Training/Certification",
  "Overtime Available",
  "Equipment/Uniform Provided",
];

const BusinessOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      abn: "",
      industry: "",
      roles: [],
      availability: [],
      pay: { min: 0, max: 0, unit: "" },
      facilities: [],
      businessPhone: "",
      website: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Business form submitted:", data);
    toast({
      title: "Business information saved!",
      description: "Proceeding to next step",
    });
    navigate("/business-address");
  };

  const selectedRoles = watch("roles");
  const selectedFacilities = watch("facilities");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Main Content */}
          <div className="w-full h-full flex flex-col relative bg-white">
            {/* Header */}
            <div className="px-6 pt-16 pb-6">
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                  onClick={() => navigate("/business-registration")}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Business Details</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">4/6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Name */}
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Kangafarm"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {/* ABN */}
                <div>
                  <Label htmlFor="abn">ABN *</Label>
                  <Input
                    id="abn"
                    placeholder="11 222 333 444"
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                    {...register("abn")}
                  />
                  {errors.abn && (
                    <p className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value, { shouldValidate: true });
                      setSelectedIndustry(value);
                      setValue("roles", []); // reset roles when industry changes
                    }}
                  >
                    <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>

                {/* Roles (checkboxes) */}
                {selectedIndustry && (
                  <div>
                    <Label>Roles *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {INDUSTRY_ROLES[selectedIndustry].map((role) => (
                        <label
                          key={role}
                          className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={role}
                            checked={selectedRoles?.includes(role) || false}
                            onChange={(e) => {
                              const newRoles = e.target.checked
                                ? [...(selectedRoles || []), role]
                                : selectedRoles?.filter((r) => r !== role) || [];
                              setValue("roles", newRoles, { shouldValidate: true });
                            }}
                          />
                          <span>{role}</span>
                        </label>
                      ))}
                    </div>
                    {errors.roles && (
                      <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>
                    )}
                  </div>
                )}

                {/* Availability */}
                <div>
                  <Label>Job Availability *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e) => {
                            const current = watch("availability") || [];
                            const updated = e.target.checked
                              ? [...current, option]
                              : current.filter((a) => a !== option);
                            setValue("availability", updated, { shouldValidate: true });
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availability && (
                    <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
                  )}
                </div>

                {/* Pay */}
                <div>
                  <Label>Pay *</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                      onChange={(e) =>
                        setValue("pay.min", Number(e.target.value), { shouldValidate: true })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      className="h-14 text-base bg-gray-100 border-0 rounded-xl"
                      onChange={(e) =>
                        setValue("pay.max", Number(e.target.value), { shouldValidate: true })
                      }
                    />
                    <Select
                      onValueChange={(val) =>
                        setValue("pay.unit", val, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger className="h-14 text-base bg-gray-100 border-0 rounded-xl w-32">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAY_UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.pay && (
                    <p className="text-red-500 text-sm mt-1">{errors.pay.message}</p>
                  )}
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Extras</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {FACILITIES_OPTIONS.map((facility) => (
                      <label
                        key={facility}
                        className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={facility}
                          checked={selectedFacilities?.includes(facility) || false}
                          onChange={(e) => {
                            const current = selectedFacilities || [];
                            const updated = e.target.checked
                              ? [...current, facility]
                              : current.filter((f) => f !== facility);
                            setValue("facilities", updated);
                          }}
                        />
                        <span>{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Continue */}
            <div className="px-6 pb-8 mt-4">
              <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboardingForm;
