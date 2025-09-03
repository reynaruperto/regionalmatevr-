// Utility functions for employer profile management

export interface EmployerProfile {
  companyName: string;
  abn: string;
  businessTagline: string;
  yearsInBusiness: string;
  employeeCount: string;
  industry: string;
  rolesOffered: string[];
  customRole?: string;
  jobType: string[];
  payRange: string;
  facilitiesAndExtras: string[];
  customFacility?: string;
  businessPhone: string;
  website?: string;
  addressLine1: string;
  addressLine2?: string;
  suburbCity: string;
  state: string;
  postCode: string;
}

const STORAGE_KEY = 'employerProfile';

// Get employer profile from localStorage
export const getEmployerProfile = (): EmployerProfile | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting employer profile:', error);
    return null;
  }
};

// Save/update employer profile in localStorage
export const updateEmployerProfile = (profile: EmployerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving employer profile:', error);
  }
};

// Clear employer profile from localStorage
export const clearEmployerProfile = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing employer profile:', error);
  }
};