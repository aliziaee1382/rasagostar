export type PageId = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

export type ServiceCategory = 'mold_making' | 'stamping' | 'plastic_injection' | 'laser_cutting';

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  capacities: string[];
  features: string[];
  materials: string[];
  equipmentList: string[];
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  image: string;
  description: string;
  material: string;
  dimensions: string;
  application: string;
  productionCapacity: string;
  tags: string[];
}

export interface CompanyStat {
  value: string;
  numericValue: number;
  label: string;
  sublabel: string;
  icon: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface PartnerCompany {
  id: string;
  name: string;
  latinName: string;
  sector: string;
  cooperationType: string;
}


export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  serviceInterest: ServiceCategory | 'general';
  subject: string;
  message: string;
  attachmentName?: string;
}

export interface QuoteRequestData {
  fullName: string;
  phone: string;
  serviceType: ServiceCategory;
  material: string;
  estimatedQuantity: string;
  hasDrawings: boolean;
  notes: string;
}
