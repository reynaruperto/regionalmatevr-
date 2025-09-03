import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// ---------------------- Validation Schema ----------------------
const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  businessTagline: z.string().min(10, { message: "Business tagline must be at least 10 characters." }).max(200),
  industryType: z.string().min(1, { message: "Please select an industry type." }),
  customIndustry: z.string().optional(),
  rolesOffered: z.array(z.string()).min(1, { message: "Please select at least one role." }),
  customRole: z.string().optional(),
  jobAvailability: z.array(z.string()).min(1, { message: "Please select at least one job type." }),
  payMin: z.string().min(1, { message: "Enter minimum hourly rate." }),
  payMax: z.string().min(1, { message: "Enter maximum hourly rate." }),
  facilitiesAndExtras: z.array(z.string()).min(1, { message: "Please select at least one facility or extra." }),
  yearsInBusiness: z.string().min(1, { message: "Please select years in business." }),
  employeeCount: z.string().min(1, { message: "Please select employee count." }),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional().or(z.literal("")),
  addressLine1: z.string().min(2, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  suburbCity: z.string().min(2, { message: "Suburb/City is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  postCode: z.string().min(4).max(4, { message: "Postcode must be 4 digits." })
});

type FormData = z.infer<typeof formSchema>;

// ---------------------- Options ----------------------
const INDUSTRY_OPTIONS = [
  "Agriculture & Farming",
  "Tourism & Hospitality", 
  "Construction & Building",
  "Mining & Resources",
  "Healthcare & Aged Care",
  "Education & Training",
  "Retail & Sales",
  "Manufacturing",
  "Transport & Logistics",
  "Other"
];

const roles = [
  "Farm Worker", "Fruit Picker", "Kitchen Hand", "Waitstaff",
  "Cleaner", "Construction Worker", "Labourer", "Driver",
  "Sales Assistant", "Other"
];

const jobAvailabilityOptions = ["Full-time", "Part-time", "Casual", "Seasonal", "Contract"];

const facilitiesExtras = [
  "Accommodation provided", "Meals included", "Transport provided",
  "Training provided", "Equipment provided", "Flexible hours",
  "Career progression", "Team environment"
];

const yearsOptions = [
  'Less than 1 year','1 year','2 years','3 years','4 years','5 years',
  '6-10 years','11-15 years','16-20 years','20+ years'
];

const employeeCountOptions = [
  '1 employee','2-5 employees','6-10 employees','11-20 employees',
  '21-50 employees','51-100 employees','100+ employees'
];

const AUSTRALIAN_STATES = [
  'Australian Capital Territory','New South Wales','Northern Territory',
  'Queensland','South Australia','Tasmania','Victoria','Western Australia'
];

// ---------------------- Component ----------------------
const EditBusinessProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rolesOffered: [],
      jobAvailability: [],
      facilitiesAndExtras: []
    }
  });

  const watchedRoles = watch("rolesOffered");
  const watchedIndustry = watch("industryType");

  const onSubmit = (data: FormData) => {
    console.log("Business profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your business profile has been successfully updated"
    });
    navigate("/employer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Main Content */}
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center justify-between">
                <button onClick={() => navigate('/employer/dashboard')} className="text-[#1E293B] font-medium underline">
                  Cancel
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
                <button type="submit" form="business-profile-form" className="flex items-center text-[#1E293B] font-medium underline">
                  <Check size={16} className="mr-1"/> Save
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 overflow-y-auto pb-20">
              <form id="business-profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* ABN (non-editable) */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">ABN (non-editable)</Label>
                  <div className="h-14 bg-gray-100 rounded-xl flex items-center px-4 text-gray-500 text-base">11 222 333 444</div>
                  <p className="text-sm text-gray-500 mt-1">Contact support to change ABN</p>
                </div>

                {/* Business Name */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Business Name</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("businessName")} />
                  {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
                </div>

                {/* Business Tagline */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Business Tagline</Label>
                  <Input placeholder="Quality produce, sustainable farming" maxLength={200} className="h-14 bg-gray-100 rounded-xl text-base" {...register("businessTagline")} />
                  <p className="text-sm text-gray-500 mt-1">Shown under profile photo (max 200 chars)</p>
                  {errors.businessTagline && <p className="text-red-500 text-sm mt-1">{errors.businessTagline.message}</p>}
                </div>

                {/* Years in Business */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Years in Business</Label>
                  <Select onValueChange={(v) => setValue("yearsInBusiness", v)}>
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>{yearsOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                  {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>}
                </div>

                {/* Employee Count */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Number of Employees</Label>
                  <Select onValueChange={(v) => setValue("employeeCount", v)}>
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>{employeeCountOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                  {errors.employeeCount && <p className="text-red-500 text-sm mt-1">{errors.employeeCount.message}</p>}
                </div>

                {/* Industry */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Industry</Label>
                  <Controller name="industryType" control={control} render={({ field }) => (
                    <Select onValueChange={(v) => { field.onChange(v); setSelectedIndustry(v); }} value={field.value}>
                      <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>{INDUSTRY_OPTIONS.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
                    </Select>
                  )}/>
                  {watchedIndustry === "Other" && (
                    <Input placeholder="Custom industry" className="mt-2 h-14 bg-gray-100 rounded-xl text-base" {...register("customIndustry")} />
                  )}
                  {errors.industryType && <p className="text-red-500 text-sm mt-1">{errors.industryType.message}</p>}
                </div>

                {/* Roles Offered */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Roles Offered</Label>
                  <Controller name="rolesOffered" control={control} render={({ field }) => (
                    <>
                      <Select onValueChange={(v) => !field.value.includes(v) && field.onChange([...field.value, v])}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                          <SelectValue placeholder="Select roles" />
                        </SelectTrigger>
                        <SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                      </Select>
                      {watchedRoles?.includes("Other") && (
                        <Input placeholder="Custom role" className="mt-2 h-14 bg-gray-100 rounded-xl text-base" {...register("customRole")} />
                      )}
                      {field.value.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">{field.value.map((r,i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {r}
                            <button type="button" onClick={() => field.onChange(field.value.filter((_,idx)=>idx!==i))} className="ml-2">×</button>
                          </span>
                        ))}</div>
                      )}
                    </>
                  )}/>
                  {errors.rolesOffered && <p className="text-red-500 text-sm mt-1">{errors.rolesOffered.message}</p>}
                </div>

                {/* Job Availability */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Job Availability</Label>
                  <Controller name="jobAvailability" control={control} render={({ field }) => (
                    <>
                      <Select onValueChange={(v) => !field.value.includes(v) && field.onChange([...field.value, v])}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                          <SelectValue placeholder="Select job types" />
                        </SelectTrigger>
                        <SelectContent>{jobAvailabilityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                      {field.value.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">{field.value.map((o,i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {o}
                            <button type="button" onClick={() => field.onChange(field.value.filter((_,idx)=>idx!==i))} className="ml-2">×</button>
                          </span>
                        ))}</div>
                      )}
                    </>
                  )}/>
                  {errors.jobAvailability && <p className="text-red-500 text-sm mt-1">{errors.jobAvailability.message}</p>}
                </div>

                {/* Pay */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Hourly Pay Range</Label>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Min $" className="h-14 bg-gray-100 rounded-xl text-base" {...register("payMin")} />
                    <Input type="number" placeholder="Max $" className="h-14 bg-gray-100 rounded-xl text-base" {...register("payMax")} />
                  </div>
                  {errors.payMin && <p className="text-red-500 text-sm mt-1">{errors.payMin.message}</p>}
                  {errors.payMax && <p className="text-red-500 text-sm mt-1">{errors.payMax.message}</p>}
                </div>

                {/* Facilities */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Facilities & Extras</Label>
                  <Controller name="facilitiesAndExtras" control={control} render={({ field }) => (
                    <>
                      <Select onValueChange={(v) => !field.value.includes(v) && field.onChange([...field.value, v])}>
                        <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                          <SelectValue placeholder="Select facilities" />
                        </SelectTrigger>
                        <SelectContent>{facilitiesExtras.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                      </Select>
                      {field.value.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">{field.value.map((f,i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            {f}
                            <button type="button" onClick={() => field.onChange(field.value.filter((_,idx)=>idx!==i))} className="ml-2">×</button>
                          </span>
                        ))}</div>
                      )}
                    </>
                  )}/>
                  {errors.facilitiesAndExtras && <p className="text-red-500 text-sm mt-1">{errors.facilitiesAndExtras.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Business Phone</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("businessPhone")} />
                  {errors.businessPhone && <p className="text-red-500 text-sm mt-1">{errors.businessPhone.message}</p>}
                </div>

                {/* Website (Optional) */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Website (Optional)</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("website")} />
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Address Line 1</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("addressLine1")} />
                  {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>}
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Address Line 2 (Optional)</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("addressLine2")} />
                </div>

                {/* Suburb/City */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Suburb / City</Label>
                  <Input className="h-14 bg-gray-100 rounded-xl text-base" {...register("suburbCity")} />
                  {errors.suburbCity && <p className="text-red-500 text-sm mt-1">{errors.suburbCity.message}</p>}
                </div>

                {/* State */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">State</Label>
                  <Select onValueChange={(v) => setValue("state", v)}>
                    <SelectTrigger className="h-14 bg-gray-100 rounded-xl text-base">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>{AUSTRALIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* Postcode */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2 block">Postcode</Label>
                  <Input maxLength={4} className="h-14 bg-gray-100 rounded-xl text-base" {...register("postCode")} />
                  {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode.message}</p>}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;
