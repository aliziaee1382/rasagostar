export type PageId = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

export type ServiceCategory = 'mold_making' | 'stamping' | 'plastic_injection' | 'laser_cutting';

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  titleEn?: string;
  slogan?: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  capacities: string[];
  features: string[];
  materials: string[];
  equipmentList: string[];
  image: string;
  secondaryImage?: string;
  imageCaption?: string;
  secondaryImageCaption?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn?: string;
  category: ServiceCategory;
  categoryLabel: string;
  image: string;
  description: string;
  material: string;
  dimensions: string;
  tolerance?: string;
  toolingType?: string;
  application: string;
  productionCapacity?: string;
  tags?: string[];
  technicalSpecs?: string[];
}

export interface CompanyStat {
  value: string;
  numericValue?: number;
  label: string;
  sublabel?: string;
  icon?: string;
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

export interface ProductionChainStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  tag: string;
  highlight: string;
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

export interface CompanyInfoData {
  name: string;
  nameEn: string;
  slogan: string;
  subSlogan: string;
  registrationNumber: string;
  experienceYears: string;
  personnelCount: string;
  productionArea: string;
  officeArea: string;
  totalArea: string;
  maxPressCapacity: string;
  phone: string;
  phoneDirect: string;
  phoneTel: string;
  mobileSupport: string;
  mobileTel: string;
  email: string;
  emailSales: string;
  address: string;
  workingHours: string;
  postalCode: string;
  neshanMapsUrl: string;
  neshanMapsEmbedUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export interface IntegratedProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  details?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  tagline?: string;
  slogan?: string;
  description: string;
  bgImage: string;
  image?: string;
  primaryBtnText: string;
  primaryBtnAction: string;
  secondaryBtnText: string;
  secondaryBtnAction: string;
  bulletPoints?: string[];
  metrics?: { label: string; value: string }[];
  order: number;
  isActive: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  primaryHoverColor: string;
  secondaryColor: string;
  secondaryHoverColor: string;
  accentColor: string;
  darkBgColor: string;
  siteTitle: string;
  logoUrl: string;
  copyrightText: string;
  enableFloatingQuoteBtn: boolean;
}

export interface ComplementaryService {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
  equipment?: string;
}

export interface HomePageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  statsTitle?: string;
  partnersTitle?: string;
  partnersSubtitle?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  advantagesTitle?: string;
  advantagesSubtitle?: string;
  chainTitle?: string;
  chainSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

export interface AboutPageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  headline?: string;
  subheadline?: string;
  historyTitle?: string;
  historyText?: string;
  historyParagraph1?: string;
  historyParagraph2?: string;
  missionTitle?: string;
  missionText?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionText?: string;
  qualityTitle?: string;
  qualityText?: string;
  ceoMessageTitle?: string;
  ceoMessageText?: string;
  ceoName?: string;
  ceoRole?: string;
}

export interface ServicesPageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  introTitle?: string;
  introText?: string;
  complementaryTitle?: string;
  complementarySubtitle?: string;
  consultationTitle?: string;
  consultationSubtitle?: string;
  consultationButtonText?: string;
}

export interface ContactPageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  formTitle?: string;
  formSubtitle?: string;
  formButtonText?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  responsePromiseText?: string;
}

export interface PagesContentData {
  home: HomePageContent;
  about: AboutPageContent;
  services: ServicesPageContent;
  contact: ContactPageContent;
}

export interface OnlineMessengerItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  phone: string;
  link: string;
  icon: 'whatsapp' | 'rubika' | 'bale' | 'instagram' | 'telegram' | 'eitaa' | 'phone' | 'link' | string;
  color?: string;
  isActive: boolean;
  order?: number;
}

export interface MessengersSectionConfig {
  badge: string;
  title: string;
  description: string;
  connectedPhone: string;
}

export interface SiteContentData {
  themeSettings: ThemeSettings;
  heroSlides: HeroSlide[];
  pagesContent: PagesContentData;
  companyInfo: CompanyInfoData;
  stats: CompanyStat[];
  aboutInfrastructureStats: CompanyStat[];
  services: ServiceDetail[];
  complementaryServices: ComplementaryService[];
  portfolioItems: PortfolioItem[];
  partners: PartnerCompany[];
  integratedProcessSteps: IntegratedProcessStep[];
  productionChainSteps: ProductionChainStep[];
  timelineMilestones: TimelineMilestone[];
  onlineMessengers?: OnlineMessengerItem[];
  messengersConfig?: MessengersSectionConfig;
}

export type MessageStatus = 'new' | 'read' | 'reviewed' | 'approved' | 'confirmed';

export interface MessageAttachment {
  name: string;
  url: string;
  size?: number;
  fileType?: string;
}

export interface ContactMessage {
  id: string;
  trackingCode: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName?: string;
  company?: string;
  serviceInterest?: ServiceCategory | 'general';
  subject: string;
  message: string;
  attachment?: any;
  status: MessageStatus;
  createdAt: string;
  formattedDate?: string;
}

export interface AdminUser {
  username: string;
  displayName: string;
  role: string;
}
