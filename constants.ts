import { Scheme, StatCard } from './types';
import { CheckCircle, Clock, ThumbsUp, IndianRupee, FileText, Briefcase, GraduationCap, Home } from 'lucide-react';

export const MOCK_USER = {
  name: "Rajesh Kumar",
  location: "Maharashtra",
  pendingApplications: 12,
  language: "Hindi"
};

export const SCHEMES: Scheme[] = [
  {
    id: '1',
    name: 'PM Scholarship Scheme',
    ministry: 'Ministry of Education',
    category: 'Education',
    eligibilityMatch: 95,
    benefitAmount: '₹50,000/year',
    status: 'Pending',
    description: 'Financial assistance for higher education for meritorious students.'
  },
  {
    id: '2',
    name: 'Ayushman Bharat',
    ministry: 'Ministry of Health',
    category: 'Healthcare',
    eligibilityMatch: 88,
    benefitAmount: '₹5L coverage',
    status: 'Approved',
    description: 'Health insurance scheme for secondary and tertiary care hospitalization.'
  },
  {
    id: '3',
    name: 'PM Awas Yojana',
    ministry: 'Ministry of Housing',
    category: 'Housing',
    eligibilityMatch: 92,
    benefitAmount: '₹2.5L subsidy',
    status: 'Not Started',
    description: 'Credit-linked subsidy scheme for affordable housing for the urban poor.'
  },
  {
    id: '4',
    name: 'Skill India Mission',
    ministry: 'Ministry of Skill Development',
    category: 'Employment',
    eligibilityMatch: 85,
    benefitAmount: 'Free Training',
    status: 'Pending',
    description: 'Vocational training to improve employability of youth.'
  },
  {
    id: '5',
    name: 'PM Garib Kalyan Anna Yojana',
    ministry: 'Ministry of Consumer Affairs',
    category: 'Food Security',
    eligibilityMatch: 100,
    benefitAmount: '5kg/month',
    status: 'Active',
    description: 'Free food grains to the poor and needy.'
  }
];

export const STATS: StatCard[] = [
  {
    label: 'Eligible Schemes',
    value: 24,
    subValue: '+12%',
    color: 'green',
    icon: CheckCircle
  },
  {
    label: 'Applications in Progress',
    value: 12,
    subValue: 'Pending',
    color: 'orange',
    icon: Clock
  },
  {
    label: 'Approved Benefits',
    value: 8,
    subValue: 'Active',
    color: 'blue',
    icon: ThumbsUp
  },
  {
    label: 'Benefits Received',
    value: '₹2.4L',
    subValue: 'Total',
    color: 'purple',
    icon: IndianRupee
  }
];

export const APPLICATIONS = [
  {
    id: 'APP-2024-001',
    schemeName: 'PM Scholarship Scheme',
    dateApplied: '2024-02-15',
    status: 'In Review',
    stage: 2, // 0: Submitted, 1: Verified, 2: In Review, 3: Approved
    totalStages: 4,
    timeline: [
      { status: 'Application Submitted', date: '2024-02-15', completed: true },
      { status: 'Document Verification', date: '2024-02-18', completed: true },
      { status: 'Ministry Review', date: 'In Progress', completed: false },
      { status: 'Final Approval', date: 'Pending', completed: false },
    ]
  },
  {
    id: 'APP-2024-002',
    schemeName: 'Skill India Mission',
    dateApplied: '2024-03-01',
    status: 'Verified',
    stage: 1,
    totalStages: 3,
    timeline: [
      { status: 'Application Submitted', date: '2024-03-01', completed: true },
      { status: 'Center Allocation', date: 'In Progress', completed: false },
      { status: 'Training Start', date: 'Pending', completed: false },
    ]
  }
];

export const DOCUMENTS = [
  {
    id: '1',
    name: 'Aadhaar Card',
    type: 'Identity',
    verified: true,
    issuer: 'UIDAI',
    date: '2022-01-10',
    icon: FileText
  },
  {
    id: '2',
    name: 'Income Certificate',
    type: 'Income',
    verified: true,
    issuer: 'Revenue Dept',
    date: '2023-04-15',
    icon: IndianRupee
  },
  {
    id: '3',
    name: 'Domicile Certificate',
    type: 'Residence',
    verified: true,
    issuer: 'Govt of Maharashtra',
    date: '2021-06-20',
    icon: Home
  },
  {
    id: '4',
    name: '10th Marksheet',
    type: 'Education',
    verified: true,
    issuer: 'State Board',
    date: '2015-06-01',
    icon: GraduationCap
  },
  {
    id: '5',
    name: 'Caste Certificate',
    type: 'Identity',
    verified: false,
    issuer: 'Pending Verification',
    date: '2024-01-10',
    icon: FileText
  }
];