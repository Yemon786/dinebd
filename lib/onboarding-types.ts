export interface RegistrationData {
  fullName: string;
  gender: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  age: string;
  nidNumber: string;
  passportNumber: string;
  bloodGroup: string;
  riderPictureSubmitted: string;
  homeAddress: string;
  mobileNumber: string;
  emailAddress: string;
  hasSmartphone: string;
  phoneModel: string;
  workAreaInterest: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleRegistrationNumber: string;
  licenseNumber: string;
  vehiclePictureSubmitted: string;
  licensePictureSubmitted: string;
  vehicleInsuranceSubmitted: string;
  paymentMethodBkash: boolean;
  bkashAccountType: string;
  bkashNumber: string;
  bkashAccountRelation: string;
  bkashConfirmed: boolean;
  nidPictureSubmitted: string;
  photoSubmitted: string;
  howKnowDinebd: string;
  workingWithOtherCompany: string;
  otherCompanyName: string;
  hasDisability: string;
  otherInfoAboutSelf: string;
  otherComments: string;
  declarationAgreed: boolean;
  name: string;
  signature: File | string | null;
  date: string;
  officeVerifiedBy: string;
  officeSignature: File | string | null;
  officeDate: string;
  officeRemarks: string;
}

export interface ContractData {
  agreed: boolean;
  fullName: string;
  nidNumber: string;
  signature: File | string | null;
  date: string;
  officeVerifiedBy: string;
  officeSignature: File | string | null;
  officePosition: string;
  officeDate: string;
}

export interface DataProtectionData {
  agreed: boolean;
  fullName: string;
  nidNumber: string;
  mobileNumber: string;
  signature: File | string | null;
  date: string;
  officeVerifiedBy: string;
  officePosition: string;
  officeSignature: File | string | null;
  officeDate: string;
}

export interface EquipmentData {
  date: string;
  riderName: string;
  mobileNumber: string;
  nidNumber: string;
  commitmentName: string;
  signature: File | string | null;
  signatureDate: string;
  /** PNG data URL of the rasterized Bangla policy text, generated at submit time. */
  bnImageDataUrl?: string;
  /** width / height of bnImageDataUrl, so the PDF can scale it without distortion. */
  bnImageAspect?: number;
}

export interface InsuranceData {
  riderId: string;
  fullName: string;
  dob: string;
  mobileNumber: string;
  nidOrBirthCert: string;
  address: string;
  otherNotes: string;
  declarationAgreed: boolean;
  signature: File | string | null;
  signatureFullName: string;
  date: string;
}

export interface PaymentData {
  riderName: string;
  accountHolderName: string;
  bkashNumber: string;
  accountType: string;
  accountRelation: string;
  otherInfo: string;
  agreed: boolean;
  signature: File | string | null;
  signatureRiderName: string;
  date: string;
}

export interface RiderOnboardingData {
  registration: RegistrationData;
  contract: ContractData;
  dataProtection: DataProtectionData;
  equipment: EquipmentData;
  insurance: InsuranceData;
  payment: PaymentData;
}

export const initialRiderOnboardingData: RiderOnboardingData = {
  registration: {
    fullName: "",
    gender: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    age: "",
    nidNumber: "",
    passportNumber: "",
    bloodGroup: "",
    riderPictureSubmitted: "",
    homeAddress: "",
    mobileNumber: "",
    emailAddress: "",
    hasSmartphone: "",
    phoneModel: "",
    workAreaInterest: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleColor: "",
    vehicleRegistrationNumber: "",
    licenseNumber: "",
    vehiclePictureSubmitted: "",
    licensePictureSubmitted: "",
    vehicleInsuranceSubmitted: "",
    paymentMethodBkash: false,
    bkashAccountType: "",
    bkashNumber: "",
    bkashAccountRelation: "",
    bkashConfirmed: false,
    nidPictureSubmitted: "",
    photoSubmitted: "",
    howKnowDinebd: "",
    workingWithOtherCompany: "",
    otherCompanyName: "",
    hasDisability: "",
    otherInfoAboutSelf: "",
    otherComments: "",
    declarationAgreed: false,
    name: "",
    signature: null,
    date: "",
    officeVerifiedBy: "",
    officeSignature: null,
    officeDate: "",
    officeRemarks: "",
  },
  contract: {
    agreed: false,
    fullName: "",
    nidNumber: "",
    signature: null,
    date: "",
    officeVerifiedBy: "",
    officeSignature: null,
    officePosition: "",
    officeDate: "",
  },
  dataProtection: {
    agreed: false,
    fullName: "",
    nidNumber: "",
    mobileNumber: "",
    signature: null,
    date: "",
    officeVerifiedBy: "",
    officePosition: "",
    officeSignature: null,
    officeDate: "",
  },
  equipment: {
    date: "",
    riderName: "",
    mobileNumber: "",
    nidNumber: "",
    commitmentName: "",
    signature: null,
    signatureDate: "",
  },
  insurance: {
    riderId: "",
    fullName: "",
    dob: "",
    mobileNumber: "",
    nidOrBirthCert: "",
    address: "",
    otherNotes: "",
    declarationAgreed: false,
    signature: null,
    signatureFullName: "",
    date: "",
  },
  payment: {
    riderName: "",
    accountHolderName: "",
    bkashNumber: "",
    accountType: "",
    accountRelation: "",
    otherInfo: "",
    agreed: false,
    signature: null,
    signatureRiderName: "",
    date: "",
  },
};
