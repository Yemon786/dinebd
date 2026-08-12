"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioOptionGroup } from "@/components/onboarding/radio-group";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { RegistrationData } from "@/lib/onboarding-types";

interface RegistrationSectionProps {
  data: RegistrationData;
  onChange: (patch: Partial<RegistrationData>) => void;
}

export default function RegistrationSection({
  data,
  onChange,
}: RegistrationSectionProps) {
  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600">
        Please complete this form carefully. All information will remain
        confidential and used only for official purposes.
      </p>

      {/* Section A */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section A: Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="regFullName">Rider Full Name</Label>
            <Input
              id="regFullName"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Gender</Label>
            <RadioOptionGroup
              name="gender"
              options={["Male", "Female", "Other"]}
              value={data.gender}
              onChange={(v) => onChange({ gender: v })}
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="DD"
                value={data.dobDay}
                onChange={(e) => onChange({ dobDay: e.target.value })}
              />
              <span className="text-gray-400">/</span>
              <Input
                placeholder="MM"
                value={data.dobMonth}
                onChange={(e) => onChange({ dobMonth: e.target.value })}
              />
              <span className="text-gray-400">/</span>
              <Input
                placeholder="YYYY"
                value={data.dobYear}
                onChange={(e) => onChange({ dobYear: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="regAge">Age</Label>
            <Input
              id="regAge"
              value={data.age}
              onChange={(e) => onChange({ age: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regNid">NID Number</Label>
            <Input
              id="regNid"
              value={data.nidNumber}
              onChange={(e) => onChange({ nidNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regPassport">
              Passport Number (if available)
            </Label>
            <Input
              id="regPassport"
              value={data.passportNumber}
              onChange={(e) => onChange({ passportNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regBirthCert">Birth Certificate Number</Label>
            <Input
              id="regBirthCert"
              value={data.birthCertificateNumber}
              onChange={(e) =>
                onChange({ birthCertificateNumber: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="regBlood">Blood Group</Label>
            <Input
              id="regBlood"
              value={data.bloodGroup}
              onChange={(e) => onChange({ bloodGroup: e.target.value })}
            />
          </div>
          <div>
            <Label>Rider Picture Submitted</Label>
            <RadioOptionGroup
              name="riderPictureSubmitted"
              options={["Yes", "No"]}
              value={data.riderPictureSubmitted}
              onChange={(v) => onChange({ riderPictureSubmitted: v })}
            />
          </div>
        </div>
      </div>

      {/* Section B */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section B: Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="regHomeAddress">Home Address</Label>
            <Input
              id="regHomeAddress"
              value={data.homeAddress}
              onChange={(e) => onChange({ homeAddress: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regMobile">Mobile Number (+880)</Label>
            <Input
              id="regMobile"
              value={data.mobileNumber}
              onChange={(e) => onChange({ mobileNumber: e.target.value })}
              placeholder="+880"
            />
          </div>
          <div>
            <Label htmlFor="regEmail">Email Address</Label>
            <Input
              id="regEmail"
              type="email"
              value={data.emailAddress}
              onChange={(e) => onChange({ emailAddress: e.target.value })}
            />
          </div>
          <div>
            <Label>Do you have a smartphone?</Label>
            <RadioOptionGroup
              name="hasSmartphone"
              options={["Yes", "No"]}
              value={data.hasSmartphone}
              onChange={(v) => onChange({ hasSmartphone: v })}
            />
          </div>
          <div>
            <Label htmlFor="regPhoneModel">What phone do you use?</Label>
            <Input
              id="regPhoneModel"
              value={data.phoneModel}
              onChange={(e) => onChange({ phoneModel: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="regWorkArea">
              Which area are you interested in working in?
            </Label>
            <Input
              id="regWorkArea"
              value={data.workAreaInterest}
              onChange={(e) => onChange({ workAreaInterest: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Section C */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section C: Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="regEmergencyName">Emergency Contact Name</Label>
            <Input
              id="regEmergencyName"
              value={data.emergencyContactName}
              onChange={(e) =>
                onChange({ emergencyContactName: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="regEmergencyRelation">Relation to Rider</Label>
            <Input
              id="regEmergencyRelation"
              value={data.emergencyContactRelation}
              onChange={(e) =>
                onChange({ emergencyContactRelation: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="regEmergencyNumber">
              Emergency Contact Number (+880)
            </Label>
            <Input
              id="regEmergencyNumber"
              value={data.emergencyContactNumber}
              onChange={(e) =>
                onChange({ emergencyContactNumber: e.target.value })
              }
              placeholder="+880"
            />
          </div>
        </div>
      </div>

      {/* Section D */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section D: Vehicle Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Vehicle Type</Label>
            <RadioOptionGroup
              name="vehicleType"
              options={["Bicycle", "Motorcycle", "Scooter", "Other"]}
              value={data.vehicleType}
              onChange={(v) => onChange({ vehicleType: v })}
            />
          </div>
          <div>
            <Label htmlFor="regVehicleModel">Vehicle Model</Label>
            <Input
              id="regVehicleModel"
              value={data.vehicleModel}
              onChange={(e) => onChange({ vehicleModel: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regVehicleColor">Vehicle Color</Label>
            <Input
              id="regVehicleColor"
              value={data.vehicleColor}
              onChange={(e) => onChange({ vehicleColor: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regVehicleRegNumber">
              Vehicle Registration Number (if applicable)
            </Label>
            <Input
              id="regVehicleRegNumber"
              value={data.vehicleRegistrationNumber}
              onChange={(e) =>
                onChange({ vehicleRegistrationNumber: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="regLicenseNumber">License Number</Label>
            <Input
              id="regLicenseNumber"
              value={data.licenseNumber}
              onChange={(e) => onChange({ licenseNumber: e.target.value })}
            />
          </div>
          <div>
            <Label>Vehicle Picture Submitted</Label>
            <RadioOptionGroup
              name="vehiclePictureSubmitted"
              options={["Yes", "No"]}
              value={data.vehiclePictureSubmitted}
              onChange={(v) => onChange({ vehiclePictureSubmitted: v })}
            />
          </div>
          <div>
            <Label>License Picture Submitted</Label>
            <RadioOptionGroup
              name="licensePictureSubmitted"
              options={["Yes", "No"]}
              value={data.licensePictureSubmitted}
              onChange={(v) => onChange({ licensePictureSubmitted: v })}
            />
          </div>
          <div>
            <Label>Vehicle Insurance Submitted</Label>
            <RadioOptionGroup
              name="vehicleInsuranceSubmitted"
              options={["Yes", "No"]}
              value={data.vehicleInsuranceSubmitted}
              onChange={(v) => onChange({ vehicleInsuranceSubmitted: v })}
            />
          </div>
        </div>
      </div>

      {/* Section E */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section E: Banking / Payment Details (bKash Only)
        </h3>
        <div className="space-y-4">
          <CheckboxAgreement
            checked={data.paymentMethodBkash}
            onChange={(checked) => onChange({ paymentMethodBkash: checked })}
            label="Choose your Payment Method: bKash"
          />
          <div>
            <Label>Confirm your bKash Account Type</Label>
            <RadioOptionGroup
              name="bkashAccountType"
              options={["Personal", "Merchant", "Other"]}
              value={data.bkashAccountType}
              onChange={(v) => onChange({ bkashAccountType: v })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="regBkashNumber">bKash Number</Label>
              <Input
                id="regBkashNumber"
                value={data.bkashNumber}
                onChange={(e) => onChange({ bkashNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="regBkashRelation">
                bKash Account Relation (Owner / Family Member / Others)
              </Label>
              <Input
                id="regBkashRelation"
                value={data.bkashAccountRelation}
                onChange={(e) =>
                  onChange({ bkashAccountRelation: e.target.value })
                }
              />
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Confirmation
            </p>
            <CheckboxAgreement
              checked={data.bkashConfirmed}
              onChange={(checked) => onChange({ bkashConfirmed: checked })}
              label="I confirm that the bKash account details provided are accurate and authorized for receiving payments, and I agree to Dinebd's terms and conditions."
            />
          </div>
        </div>
      </div>

      {/* Section F */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section F: Supporting Documents (Submission Status)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>NID / Passport / Birth Certificate Picture Submitted</Label>
            <RadioOptionGroup
              name="nidPictureSubmitted"
              options={["Yes", "No"]}
              value={data.nidPictureSubmitted}
              onChange={(v) => onChange({ nidPictureSubmitted: v })}
            />
          </div>
          <div>
            <Label>Recent Passport-size Photo Submitted</Label>
            <RadioOptionGroup
              name="photoSubmitted"
              options={["Yes", "No"]}
              value={data.photoSubmitted}
              onChange={(v) => onChange({ photoSubmitted: v })}
            />
          </div>
        </div>
      </div>

      {/* Section G */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section G: Additional Information
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="regHowKnow">How do you know about Dinebd?</Label>
            <Input
              id="regHowKnow"
              value={data.howKnowDinebd}
              onChange={(e) => onChange({ howKnowDinebd: e.target.value })}
            />
          </div>
          <div>
            <Label>
              Are you working with any other food delivery company?
            </Label>
            <RadioOptionGroup
              name="workingWithOtherCompany"
              options={["Yes", "No"]}
              value={data.workingWithOtherCompany}
              onChange={(v) => onChange({ workingWithOtherCompany: v })}
            />
          </div>
          <div>
            <Label htmlFor="regOtherCompany">
              If Yes, please specify the company name
            </Label>
            <Input
              id="regOtherCompany"
              value={data.otherCompanyName}
              onChange={(e) =>
                onChange({ otherCompanyName: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Do you have any disabilities?</Label>
            <RadioOptionGroup
              name="hasDisability"
              options={["Yes", "No"]}
              value={data.hasDisability}
              onChange={(v) => onChange({ hasDisability: v })}
            />
          </div>
          <div>
            <Label htmlFor="regOtherInfo">
              Any other information about yourself
            </Label>
            <Textarea
              id="regOtherInfo"
              value={data.otherInfoAboutSelf}
              onChange={(e) =>
                onChange({ otherInfoAboutSelf: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="regOtherComments">Any other comments?</Label>
            <Textarea
              id="regOtherComments"
              value={data.otherComments}
              onChange={(e) => onChange({ otherComments: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Section H */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
          Section H: Declaration
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          I hereby declare that the information provided above is true and
          accurate. I agree to abide by Dinebd's Code of Conduct, Community
          Guidelines, and Terms of Employment, and authorize Dinebd to use
          the payment details provided for processing payments.
        </p>
        <CheckboxAgreement
          checked={data.declarationAgreed}
          onChange={(checked) => onChange({ declarationAgreed: checked })}
          label="I declare that the information provided above is true and accurate, and I agree to Dinebd's Code of Conduct, Community Guidelines, and Terms of Employment."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="regDeclName">Name</Label>
            <Input
              id="regDeclName"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="regDeclSignature">Signature</Label>
            <Input
              id="regDeclSignature"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange({ signature: file });
              }}
            />
            <SignaturePreview value={data.signature} />
          </div>
          <div>
            <Label htmlFor="regDeclDate">Date</Label>
            <Input
              id="regDeclDate"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            For Office Use Only
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="regOfficeVerifiedBy">
                Verified by Dinebd (representative name)
              </Label>
              <Input
                id="regOfficeVerifiedBy"
                value={data.officeVerifiedBy}
                onChange={(e) =>
                  onChange({ officeVerifiedBy: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="regOfficeSignature">
                Dinebd representative signature
              </Label>
              <Input
                id="regOfficeSignature"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange({ officeSignature: file });
                }}
              />
              <SignaturePreview value={data.officeSignature} />
            </div>
            <div>
              <Label htmlFor="regOfficeDate">Date</Label>
              <Input
                id="regOfficeDate"
                type="date"
                value={data.officeDate}
                onChange={(e) => onChange({ officeDate: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="regOfficeRemarks">Remarks (if any)</Label>
              <Input
                id="regOfficeRemarks"
                value={data.officeRemarks}
                onChange={(e) =>
                  onChange({ officeRemarks: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
