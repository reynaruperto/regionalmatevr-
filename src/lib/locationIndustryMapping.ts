// Location-Industry mapping for Working Holiday Visa holders
// Based on Department of Home Affairs specified work areas and seasonal availability

export interface IndustryInfo {
  name: string;
  seasonal?: {
    peak: string[];
    available: string[];
  };
  demandLevel: 'High' | 'Medium' | 'Low';
  description?: string;
}

export interface RegionalArea {
  code: string;
  name: string;
  state: string;
  industries: IndustryInfo[];
  postcodes: string[];
}

export const REGIONAL_AREAS_WITH_INDUSTRIES: RegionalArea[] = [
  // Queensland
  {
    code: 'QLD_BUNDABERG',
    name: 'QLD - Bundaberg',
    state: 'Queensland',
    postcodes: ['4670', '4671', '4672', '4673'],
    industries: [
      {
        name: 'Sugar Cane Farming',
        seasonal: {
          peak: ['May', 'June', 'July', 'August', 'September'],
          available: ['April', 'May', 'June', 'July', 'August', 'September', 'October']
        },
        demandLevel: 'High',
        description: 'Cane cutting and harvesting work'
      },
      {
        name: 'Fruit and Vegetable Picking',
        seasonal: {
          peak: ['March', 'April', 'May', 'October', 'November'],
          available: ['February', 'March', 'April', 'May', 'October', 'November', 'December']
        },
        demandLevel: 'High',
        description: 'Tomatoes, capsicum, zucchini, and other vegetables'
      },
      {
        name: 'Agriculture & Farming',
        demandLevel: 'High',
        description: 'General farm work and maintenance'
      }
    ]
  },
  {
    code: 'QLD_CAIRNS',
    name: 'QLD - Cairns',
    state: 'Queensland',
    postcodes: ['4870', '4871', '4872', '4873'],
    industries: [
      {
        name: 'Tourism and Hospitality',
        demandLevel: 'High',
        description: 'Hotels, restaurants, tour operators'
      },
      {
        name: 'Fruit and Vegetable Picking',
        seasonal: {
          peak: ['May', 'June', 'July', 'August'],
          available: ['April', 'May', 'June', 'July', 'August', 'September']
        },
        demandLevel: 'Medium',
        description: 'Tropical fruits including bananas and mangoes'
      },
      {
        name: 'Aquaculture',
        demandLevel: 'Medium',
        description: 'Prawn and barramundi farming'
      }
    ]
  },
  {
    code: 'QLD_TOWNSVILLE',
    name: 'QLD - Townsville',
    state: 'Queensland',
    postcodes: ['4810', '4811', '4812', '4814'],
    industries: [
      {
        name: 'Mining',
        demandLevel: 'High',
        description: 'Support services for mining operations'
      },
      {
        name: 'Construction',
        demandLevel: 'Medium',
        description: 'Building and infrastructure projects'
      },
      {
        name: 'Tourism and Hospitality',
        demandLevel: 'Medium',
        description: 'Gateway to Magnetic Island'
      }
    ]
  },
  
  // New South Wales
  {
    code: 'NSW_TAMWORTH',
    name: 'NSW - Tamworth',
    state: 'New South Wales',
    postcodes: ['2340', '2341', '2342'],
    industries: [
      {
        name: 'Beef Cattle Farming',
        demandLevel: 'High',
        description: 'Cattle mustering and station work'
      },
      {
        name: 'Cotton Farming',
        seasonal: {
          peak: ['February', 'March', 'April', 'May'],
          available: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        demandLevel: 'High',
        description: 'Cotton picking and processing'
      },
      {
        name: 'Agriculture & Farming',
        demandLevel: 'High',
        description: 'Mixed farming operations'
      }
    ]
  },
  {
    code: 'NSW_ORANGE',
    name: 'NSW - Orange',
    state: 'New South Wales',
    postcodes: ['2800', '2801', '2802'],
    industries: [
      {
        name: 'Fruit and Vegetable Picking',
        seasonal: {
          peak: ['February', 'March', 'April', 'May'],
          available: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        demandLevel: 'High',
        description: 'Apples, cherries, and stone fruits'
      },
      {
        name: 'Wine Production',
        seasonal: {
          peak: ['February', 'March', 'April'],
          available: ['January', 'February', 'March', 'April', 'May']
        },
        demandLevel: 'Medium',
        description: 'Grape picking and winery work'
      },
      {
        name: 'Agriculture & Farming',
        demandLevel: 'Medium',
        description: 'Mixed farming and livestock'
      }
    ]
  },
  
  // Victoria
  {
    code: 'VIC_MILDURA',
    name: 'VIC - Mildura',
    state: 'Victoria',
    postcodes: ['3500', '3501', '3502'],
    industries: [
      {
        name: 'Fruit and Vegetable Picking',
        seasonal: {
          peak: ['January', 'February', 'March', 'October', 'November', 'December'],
          available: ['All year']
        },
        demandLevel: 'High',
        description: 'Grapes, citrus fruits, almonds, and vegetables'
      },
      {
        name: 'Wine Production',
        seasonal: {
          peak: ['February', 'March', 'April'],
          available: ['January', 'February', 'March', 'April', 'May']
        },
        demandLevel: 'High',
        description: 'Major wine region with harvest work'
      },
      {
        name: 'Agriculture & Farming',
        demandLevel: 'High',
        description: 'Irrigation and farming operations'
      }
    ]
  },
  
  // Western Australia
  {
    code: 'WA_KARRATHA',
    name: 'WA - Karratha',
    state: 'Western Australia',
    postcodes: ['6714', '6715', '6716'],
    industries: [
      {
        name: 'Mining',
        demandLevel: 'High',
        description: 'Iron ore mining and processing'
      },
      {
        name: 'Oil and Gas Extraction',
        demandLevel: 'High',
        description: 'LNG and petroleum operations'
      },
      {
        name: 'Construction',
        demandLevel: 'High',
        description: 'Mining infrastructure and maintenance'
      }
    ]
  },
  {
    code: 'WA_BROOME',
    name: 'WA - Broome',
    state: 'Western Australia',
    postcodes: ['6725', '6726'],
    industries: [
      {
        name: 'Pearling',
        demandLevel: 'Medium',
        description: 'Pearl farming and aquaculture'
      },
      {
        name: 'Tourism and Hospitality',
        seasonal: {
          peak: ['April', 'May', 'June', 'July', 'August', 'September'],
          available: ['April', 'May', 'June', 'July', 'August', 'September', 'October']
        },
        demandLevel: 'High',
        description: 'Resort and tourism services'
      },
      {
        name: 'Aquaculture',
        demandLevel: 'Medium',
        description: 'Pearl and seafood farming'
      }
    ]
  },
  
  // South Australia
  {
    code: 'SA_MOUNT_GAMBIER',
    name: 'SA - Mount Gambier',
    state: 'South Australia',
    postcodes: ['5290', '5291'],
    industries: [
      {
        name: 'Forestry',
        demandLevel: 'High',
        description: 'Pine plantation and logging'
      },
      {
        name: 'Agriculture & Farming',
        demandLevel: 'Medium',
        description: 'Mixed farming and livestock'
      },
      {
        name: 'Dairy Farming',
        demandLevel: 'Medium',
        description: 'Dairy operations and processing'
      }
    ]
  },
  
  // Tasmania
  {
    code: 'TAS_HOBART',
    name: 'TAS - Hobart',
    state: 'Tasmania',
    postcodes: ['7000', '7001', '7004', '7005'],
    industries: [
      {
        name: 'Fruit and Vegetable Picking',
        seasonal: {
          peak: ['January', 'February', 'March', 'April'],
          available: ['December', 'January', 'February', 'March', 'April', 'May']
        },
        demandLevel: 'High',
        description: 'Apples, berries, and stone fruits'
      },
      {
        name: 'Tourism and Hospitality',
        demandLevel: 'Medium',
        description: 'Accommodation and food services'
      },
      {
        name: 'Aquaculture',
        demandLevel: 'High',
        description: 'Salmon and seafood farming'
      }
    ]
  },
  
  // Northern Territory
  {
    code: 'NT_DARWIN',
    name: 'NT - Darwin',
    state: 'Northern Territory',
    postcodes: ['0800', '0801', '0810', '0820'],
    industries: [
      {
        name: 'Tourism and Hospitality',
        seasonal: {
          peak: ['May', 'June', 'July', 'August', 'September'],
          available: ['April', 'May', 'June', 'July', 'August', 'September', 'October']
        },
        demandLevel: 'High',
        description: 'Dry season tourism peak'
      },
      {
        name: 'Construction',
        demandLevel: 'Medium',
        description: 'Infrastructure and building projects'
      },
      {
        name: 'Aquaculture',
        demandLevel: 'Medium',
        description: 'Barramundi and prawn farming'
      }
    ]
  }
];

// Helper functions
export const getIndustriesForLocation = (locationCode: string): IndustryInfo[] => {
  const area = REGIONAL_AREAS_WITH_INDUSTRIES.find(area => area.code === locationCode);
  return area?.industries || [];
};

export const getLocationsForIndustry = (industryName: string): RegionalArea[] => {
  return REGIONAL_AREAS_WITH_INDUSTRIES.filter(area => 
    area.industries.some(industry => industry.name === industryName)
  );
};

export const getSeasonalAvailability = (locationCode: string, month: string): IndustryInfo[] => {
  const industries = getIndustriesForLocation(locationCode);
  return industries.filter(industry => 
    !industry.seasonal || 
    industry.seasonal.available.includes(month) ||
    industry.seasonal.available.includes('All year')
  );
};

export const getAllUniqueIndustries = (): string[] => {
  const industries = new Set<string>();
  REGIONAL_AREAS_WITH_INDUSTRIES.forEach(area => {
    area.industries.forEach(industry => {
      industries.add(industry.name);
    });
  });
  return Array.from(industries).sort();
};