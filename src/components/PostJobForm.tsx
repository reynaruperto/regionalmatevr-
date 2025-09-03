import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { getEmployerProfile } from "@/utils/employerProfile";

interface PostJobFormProps {
  onBack: () => void;
  editingJob?: {
    id: string;
    title: string;
    status: "Active" | "Inactive";
  } | null;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onBack, editingJob }) => {
  const { toast } = useToast();

  const employerProfile = getEmployerProfile();
  const employerIndustry = employerProfile?.industry || "Agriculture & Farming";

  const [formData, setFormData] = useState({
    jobRole: editingJob?.title || "",
    jobDescription: "",
    industryType: employerIndustry,
    jobType: "Casual / Seasonal",
    payRateMin: "",
    payRateMax: "",
    payType: "/hour",
    experienceRequired: false,
    yearsOfExperience: "",
    requiredTickets: [] as string[],
    otherTicket: "",
    suburb: "",
    state: "Queensland",
    postCode: "",
    status: editingJob?.status || "Active",
  });

  const payOptions = ["$25", "$30", "$35", "$40", "$45", "$50+"];
  const yearsOptions = ["<1 year", "1-2 years", "3-5 years", "6-10 years", "10+ years"];
  const jobTypes = ["Casual / Seasonal", "Part-time", "Full-time", "Contract"];
  const commonTickets = [
    "White Card (Construction)",
    "RSA (Responsible Service of Alcohol)",
    "RSG (Responsible Service of Gaming)",
    "Food Safety Supervisor",
    "First Aid Certificate",
    "Driver's License",
    "Forklift License",
    "Working at Heights",
    "Manual Handling",
    "Chemical Handling",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketToggle = (ticket: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredTickets: prev.requiredTickets.includes(ticket)
        ? prev.requiredTickets.filter((t) => t !== ticket)
        : [...prev.requiredTickets, ticket],
    }));
  };

  const handleSaveAndPost = () => {
    toast({
      title: editingJob ? "Job Updated" : "Job Posted",
      description: editingJob
        ? "Job has been successfully updated"
        : "Job has been successfully posted",
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          <div className="w-full h-full flex flex-col relative bg-gray-200">
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 bg-white rounded-xl shadow-sm mr-4"
                  onClick={onBack}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">
                  {editingJob ? "Edit Job" : "Post Job"}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto pb-24">
              {/* Job Info */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
                  Job Information
                </h2>

                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Job Role
                    </label>
                    <Input
                      value={formData.jobRole}
                      onChange={(e) => handleInputChange("jobRole", e.target.value)}
                      placeholder="e.g., Fruit Picker"
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Job Description
                    </label>
                    <Textarea
                      value={formData.jobDescription}
                      onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                      placeholder="Describe the role, duties, and work environment..."
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm min-h-[60px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Industry
                    </label>
                    <Input
                      value={formData.industryType}
                      disabled
                      className="bg-gray-100 border-gray-200 rounded-xl text-sm h-9 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Job Type */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Job Type</h2>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pay Information */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
                  Pay Information
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Min
                    </label>
                    <Select
                      value={formData.payRateMin}
                      onValueChange={(value) => handleInputChange("payRateMin", value)}
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                        <SelectValue placeholder="$25" />
                      </SelectTrigger>
                      <SelectContent>
                        {payOptions.map((rate) => (
                          <SelectItem key={rate} value={rate}>
                            {rate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Max
                    </label>
                    <Select
                      value={formData.payRateMax}
                      onValueChange={(value) => handleInputChange("payRateMax", value)}
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                        <SelectValue placeholder="$30" />
                      </SelectTrigger>
                      <SelectContent>
                        {payOptions.map((rate) => (
                          <SelectItem key={rate} value={rate}>
                            {rate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Type
                    </label>
                    <Select
                      value={formData.payType}
                      onValueChange={(value) => handleInputChange("payType", value)}
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="/hour">/hour</SelectItem>
                        <SelectItem value="/day">/day</SelectItem>
                        <SelectItem value="/week">/week</SelectItem>
                        <SelectItem value="/piece">/piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">Experience</h2>
                <div className="space-y-2">
                  <Select
                    value={formData.experienceRequired ? "Yes" : "No"}
                    onValueChange={(value) =>
                      handleInputChange("experienceRequired", value === "Yes")
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>

                  {formData.experienceRequired && (
                    <Select
                      value={formData.yearsOfExperience}
                      onValueChange={(value) =>
                        handleInputChange("yearsOfExperience", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearsOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Tickets & Licenses */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
                  Tickets & Licenses
                </h2>
                <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                  {commonTickets.map((ticket) => (
                    <div key={ticket} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ticket}
                        checked={formData.requiredTickets.includes(ticket)}
                        onChange={() => handleTicketToggle(ticket)}
                        className="rounded text-[#1E293B] focus:ring-[#1E293B]"
                      />
                      <label
                        htmlFor={ticket}
                        className="text-xs text-gray-600 cursor-pointer"
                      >
                        {ticket}
                      </label>
                    </div>
                  ))}
                  <Input
                    placeholder="Other..."
                    value={formData.otherTicket}
                    onChange={(e) => handleInputChange("otherTicket", e.target.value)}
                    className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9 mt-2"
                  />
                </div>
              </div>

              {/* Job Location */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
                  Job Location
                </h2>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={formData.suburb}
                      onChange={(e) => handleInputChange("suburb", e.target.value)}
                      placeholder="Suburb / City"
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                    />
                    <Input
                      value={formData.postCode}
                      onChange={(e) => handleInputChange("postCode", e.target.value)}
                      placeholder="Post Code"
                      className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9"
                    />
                  </div>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Queensland">Queensland</SelectItem>
                      <SelectItem value="New South Wales">New South Wales</SelectItem>
                      <SelectItem value="Victoria">Victoria</SelectItem>
                      <SelectItem value="South Australia">South Australia</SelectItem>
                      <SelectItem value="Western Australia">Western Australia</SelectItem>
                      <SelectItem value="Tasmania">Tasmania</SelectItem>
                      <SelectItem value="Northern Territory">Northern Territory</SelectItem>
                      <SelectItem value="Australian Capital Territory">
                        Australian Capital Territory
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Status */}
              <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1E293B] mb-3">
                  Job Status
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Active / Inactive
                  </span>
                  <Switch
                    checked={formData.status === "Active"}
                    onCheckedChange={(checked) =>
                      handleInputChange("status", checked ? "Active" : "Inactive")
                    }
                    className="data-[state=checked]:bg-[#1E293B]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pb-6">
                <Button
                  onClick={handleSaveAndPost}
                  className="w-full bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl h-12 text-base font-medium"
                >
                  {editingJob ? "Update Job" : "Post Job"}
                </Button>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white">
              <BottomNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
