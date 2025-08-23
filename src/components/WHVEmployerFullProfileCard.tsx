import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmployerFullProfile {
  id: string;
  name: string;
  employerName: string;
  description: string;
  location: string;
  industry: string;
  rolesOffered: string[];
  jobAvailability: string;
  payBenefits: string;
  facilities: string;
  profileImage: string;
  contactEmail: string;
  contactPhone: string;
  companySize: string;
  establishedYear: string;
  certifications: string[];
  workEnvironment: string;
}

const WHVEmployerFullProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [showLikeModal, setShowLikeModal] = useState(false);

  // Mock employer data with full details for mutual matches
  const employerProfiles: { [key: string]: EmployerFullProfile } = {
    '1': {
      id: '1',
      name: 'KANGAFARM',
      employerName: 'John Doe',
      description: 'Family-run farm in regional Queensland, offering seasonal work in fruit picking and packing. We pride ourselves on creating a supportive work environment for international workers. Our farm has been operating for over 25 years and we specialize in premium citrus fruits and seasonal vegetables. We provide comprehensive training and support for all our workers.',
      location: 'Clontarf, QLD 4017',
      industry: 'Agriculture and Farming',
      rolesOffered: ['Fruit Picker', 'Farm Hand', 'Tractor Driver', 'Packing Assistant', 'Quality Control'],
      jobAvailability: 'Ongoing, September 2025 - March 2026',
      payBenefits: '$28/hour + super + performance bonuses + overtime rates',
      facilities: 'Meals included, On-site accommodation available, Transportation provided, Equipment and safety gear provided, Recreation facilities',
      profileImage: '/lovable-uploads/b18ec59d-46ed-4c8c-95cb-65e60d9aea25.png',
      contactEmail: 'john.doe@kangafarm.com.au',
      contactPhone: '+61 7 3123 4567',
      companySize: '25-40 employees (seasonal)',
      establishedYear: '1995',
      certifications: ['Organic Certification Australia', 'Fair Trade Certified', 'Safe Work Australia Compliance', 'HACCP Certified'],
      workEnvironment: 'Outdoor work in beautiful rural Queensland. Modern facilities with all necessary equipment provided. We maintain high safety standards and provide comprehensive training for all roles. Flexible working hours during peak season.'
    },
    '2': {
      id: '2',
      name: 'SUNNY WINES',
      employerName: 'Maria Santos',
      description: 'Boutique winery on the Sunshine Coast, offering wine production and farm supervision roles. Join our passionate team in creating premium wines from our sustainable vineyard. We focus on small-batch, high-quality wine production and offer unique learning opportunities in viticulture and wine-making processes.',
      location: 'Sunshine Coast, QLD 4551',
      industry: 'Wine Production & Viticulture',
      rolesOffered: ['Farm Supervisor', 'Wine Production Assistant', 'Cellar Hand', 'Vineyard Worker', 'Tasting Room Assistant'],
      jobAvailability: 'Seasonal, October 2025 - April 2026',
      payBenefits: '$30/hour + super + wine allowance + harvest bonuses + professional development opportunities',
      facilities: 'Shared accommodation provided, Training included, Wine tasting experience, Use of company vehicles, Meals during harvest season',
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png',
      contactEmail: 'maria.santos@sunnywines.com.au',
      contactPhone: '+61 7 5432 1098',
      companySize: '12-18 employees (seasonal)',
      establishedYear: '2008',
      certifications: ['Sustainable Winegrowing Australia', 'Organic Wine Certification', 'ISO 22000 Food Safety', 'Queensland Wine Industry Association Member'],
      workEnvironment: 'Beautiful vineyard setting with modern facilities and equipment. Climate-controlled cellars and state-of-the-art wine-making equipment. Opportunity to learn traditional and modern wine-making techniques in a supportive environment.'
    },
    '3': {
      id: '3',
      name: 'OAKRIDGE FARM',
      employerName: 'Dave Wilson',
      description: 'Modern dairy farm in Toowoomba, specializing in sustainable farming practices and high-quality dairy production. We operate a state-of-the-art dairy facility with advanced technology and maintain the highest animal welfare standards. Our farm is committed to environmental sustainability and innovative farming techniques.',
      location: 'Toowoomba, QLD 4350',
      industry: 'Dairy Farming & Agriculture',
      rolesOffered: ['Dairy Farm Assistant', 'Farm Maintenance', 'Livestock Handler', 'Equipment Operator', 'Feed Management Specialist'],
      jobAvailability: 'Full-time, Ongoing positions available from October 2025',
      payBenefits: '$32/hour + super + accommodation allowance + performance incentives + career development opportunities',
      facilities: 'On-site accommodation available, Equipment and training provided, Health and safety programs, Modern amenities, Staff recreational areas',
      profileImage: '/lovable-uploads/5672fb16-6ddf-42ed-bddd-ea2395f6b999.png',
      contactEmail: 'dave.wilson@oakridgefarm.com.au',
      contactPhone: '+61 7 4632 8901',
      companySize: '20-35 employees',
      establishedYear: '1987',
      certifications: ['Australian Dairy Excellence Awards', 'Animal Welfare Certified', 'Environmental Management System ISO 14001', 'Safe Food Australia Certification'],
      workEnvironment: 'Modern dairy operation with automated milking systems and comfortable working conditions. Early morning starts (4:30 AM) but excellent work-life balance. Opportunity to work with cutting-edge dairy technology and learn sustainable farming practices.'
    },
    '4': {
      id: '4',
      name: 'GREEN HARVEST FARMS',
      employerName: 'Sarah Mitchell',
      description: 'Progressive organic farm in Northern NSW, dedicated to sustainable agriculture and environmental stewardship. We grow a diverse range of organic vegetables and herbs for premium markets. Our farm is a leader in regenerative agriculture practices and offers exceptional learning opportunities for those interested in sustainable farming.',
      location: 'Northrivers, NSW 2470',
      industry: 'Organic Agriculture & Farming',
      rolesOffered: ['Farm Assistant', 'Organic Crop Specialist', 'Greenhouse Worker', 'Harvest Coordinator', 'Farm Equipment Operator'],
      jobAvailability: 'Seasonal, August 2025 - December 2025',
      payBenefits: '$29/hour + super + organic produce allowance + accommodation subsidy + skills development bonus',
      facilities: 'Shared accommodation available, Organic meals provided, Transportation to town, Equipment and training provided, Recreational facilities',
      profileImage: '/lovable-uploads/3961a45e-fda8-48f4-97cc-a5573079e6ac.png',
      contactEmail: 'sarah.mitchell@greenharvest.com.au',
      contactPhone: '+61 2 6628 5432',
      companySize: '15-25 employees (seasonal)',
      establishedYear: '2010',
      certifications: ['Australian Certified Organic', 'Regenerative Organic Certified', 'Carbon Neutral Certification', 'Biodynamic Agriculture Certified'],
      workEnvironment: 'Beautiful rural setting with diverse crops and modern sustainable farming practices. Opportunity to learn cutting-edge organic farming techniques and contribute to environmental conservation. Flexible working arrangements and strong focus on work-life balance.'
    },
    '5': {
      id: '5',
      name: 'COASTAL BREEZE RESORT',
      employerName: 'James Thompson',
      description: 'Luxury beachfront resort on the Gold Coast, offering exceptional hospitality experiences and career development opportunities in the tourism industry. We pride ourselves on delivering world-class service and creating memorable experiences for our guests while providing excellent working conditions for our team.',
      location: 'Coolangatta, QLD 4225',
      industry: 'Hospitality and Tourism',
      rolesOffered: ['Barista', 'Wait Staff', 'Housekeeping', 'Front Desk', 'Kitchen Hand', 'Maintenance Assistant'],
      jobAvailability: 'Full-time and Part-time, September 2025 onwards',
      payBenefits: '$27/hour + super + tips + staff discounts + career progression opportunities + training programs',
      facilities: 'Staff accommodation available, Meals provided during shifts, Uniform provided, Staff recreation facilities, Professional development programs',
      profileImage: '/lovable-uploads/07a3f593-64d9-4f5c-871d-4d9114963942.png',
      contactEmail: 'james.thompson@coastalbreeze.com.au',
      contactPhone: '+61 7 5536 7890',
      companySize: '80-120 employees',
      establishedYear: '2002',
      certifications: ['Tourism Industry Council Certified', 'EarthCheck Environmental Certification', 'AAA Tourism 5-Star Rating', 'Safe Food Australia Certified'],
      workEnvironment: 'Dynamic beachfront resort environment with modern facilities and equipment. Fast-paced hospitality setting with opportunities for skill development and career advancement. Flexible rostering and excellent team culture with staff from around the world.'
    }
  };

  const employer = employerProfiles[id || '1'];

  const handleBackNavigation = () => {
    const fromPage = searchParams.get('from');
    const tab = searchParams.get('tab');
    
    if (fromPage === 'whv-matches') {
      navigate(`/whv/matches?tab=${tab || 'matches'}`);
    } else {
      navigate('/whv/matches?tab=matches');
    }
  };

  const handleContactEmployer = (method: 'email' | 'phone' | 'message') => {
    if (method === 'email') {
      window.location.href = `mailto:${employer.contactEmail}`;
    } else if (method === 'phone') {
      window.location.href = `tel:${employer.contactPhone}`;
    } else {
      // Handle messaging functionality
      console.log('Open messaging with employer');
    }
  };

  if (!employer) {
    return <div>Employer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 flex-shrink-0">
            <button onClick={handleBackNavigation}>
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Match Badge */}
            <div className="text-center mb-4">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                It's a Match! 🎉
              </span>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-orange-500 text-white p-4 text-center">
                <h1 className="text-xl font-bold">{employer.name}</h1>
                <p className="text-sm opacity-90">Employer: {employer.employerName}</p>
              </div>

              {/* Profile Image */}
              <div className="flex justify-center mt-6 mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden bg-white shadow-lg">
                  <img
                    src={employer.profileImage}
                    alt={employer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="px-4 mb-6">
                <p className="text-center text-gray-700 text-sm leading-relaxed">
                  {employer.description}
                </p>
              </div>

              {/* Full Details - Available because it's a match */}
              <div className="px-4 space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-gray-900">Location: </span>
                  <span className="text-gray-700">{employer.location}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Industry: </span>
                  <span className="text-gray-700">{employer.industry}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Roles Offered: </span>
                  <span className="text-gray-700">{employer.rolesOffered.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Job Availability: </span>
                  <span className="text-gray-700">{employer.jobAvailability}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Pay & Benefits: </span>
                  <span className="text-gray-700">{employer.payBenefits}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Facilities / Extras: </span>
                  <span className="text-gray-700">{employer.facilities}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Company Size: </span>
                  <span className="text-gray-700">{employer.companySize}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Established: </span>
                  <span className="text-gray-700">{employer.establishedYear}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Certifications: </span>
                  <span className="text-gray-700">{employer.certifications.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Work Environment: </span>
                  <span className="text-gray-700">{employer.workEnvironment}</span>
                </div>
              </div>

              {/* Contact Information - Available because it's a match */}
              <div className="px-4 mb-6 bg-green-50 rounded-lg p-4 mx-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Email: </span>
                    <span className="text-blue-600">{employer.contactEmail}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Phone: </span>
                    <span className="text-blue-600">{employer.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* Contact Action Buttons */}
              <div className="px-4 pb-6 space-y-3">
                <Button
                  onClick={() => handleContactEmployer('email')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Send Email
                </Button>
                <Button
                  onClick={() => handleContactEmployer('phone')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Now
                </Button>
                <Button
                  onClick={() => handleContactEmployer('message')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-12 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVEmployerFullProfileCard;