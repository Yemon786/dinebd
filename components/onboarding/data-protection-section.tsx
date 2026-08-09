"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { DataProtectionData } from "@/lib/onboarding-types";

interface DataProtectionSectionProps {
  data: DataProtectionData;
  onChange: (patch: Partial<DataProtectionData>) => void;
}

export default function DataProtectionSection({
  data,
  onChange,
}: DataProtectionSectionProps) {
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
      <p>
        <span className="font-semibold">Applies To:</span> All Delivery
        Riders registered with Dinebd in Bangladesh
      </p>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">1. Purpose</h4>
        <p>
          This policy outlines how Dinebd collects, uses, stores, protects,
          and discloses personal data of riders engaged on its platform. We
          are committed to safeguarding personal information in accordance
          with the laws of Bangladesh.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">2. Scope</h4>
        <p>
          This policy applies to all personal and sensitive information
          collected from riders, both during registration and throughout
          their association with Dinebd.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">
          3. What information we collect
        </h4>
        <p className="mb-2">
          We collect a wide range of information that helps us verify
          identity, operate our services efficiently, and comply with legal
          obligations. The data collected includes:
        </p>
        <p className="font-semibold">a. Personal information</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Full legal name (as per NID/passport)</li>
          <li>
            National Identification Number (NID) or Passport number and a
            scanned copy
          </li>
          <li>Driving license number and scanned copy</li>
          <li>Father's and Mother's name</li>
          <li>Date of birth</li>
          <li>Gender</li>
          <li>Blood group (optional, for emergency use)</li>
        </ul>
        <p className="font-semibold">b. Photographic and biometric data</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Profile photo (mandatory for app and ID)</li>
          <li>Selfie verification during onboarding or fraud checks</li>
          <li>
            (Optional) Fingerprint or face scan if required by regulation or
            authentication tools
          </li>
        </ul>
        <p className="font-semibold">c. Contact information</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Mobile number(s)</li>
          <li>Email address</li>
          <li>Current address (present)</li>
          <li>Permanent address</li>
          <li>Emergency contact details (e.g., next of kin)</li>
        </ul>
        <p className="font-semibold">d. Professional and operational data</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Employment history (if collected)</li>
          <li>Rider ID number (internal)</li>
          <li>Registration date</li>
          <li>Work schedule and shift logs</li>
          <li>Order delivery history and performance metrics</li>
          <li>App login times and GPS tracking logs</li>
        </ul>
        <p className="font-semibold">e. Vehicle information</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Vehicle type (bike, bicycle, car, etc.)</li>
          <li>Vehicle registration number</li>
          <li>Vehicle fitness and tax token documents (if applicable)</li>
          <li>Insurance documents</li>
        </ul>
        <p className="font-semibold">f. Financial &amp; banking information</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Bank account details for salary/incentive disbursement</li>
          <li>Mobile Financial Service (MFS) numbers (bKash, Nagad, etc.)</li>
          <li>Payment transaction history</li>
        </ul>
        <p className="font-semibold">
          g. Technical and app usage information
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>IP address</li>
          <li>Device type and model</li>
          <li>Operating system</li>
          <li>App version and crash logs</li>
          <li>Location data (GPS tracking during delivery hours)</li>
          <li>Activity logs and login/logout records</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">
          4. Why we collect your information
        </h4>
        <p className="mb-2">
          We collect and process rider data for the following reasons:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li className="font-semibold">
            Identity verification &amp; background checks
          </li>
          <li className="font-semibold">
            Compliance with local traffic and labour regulations
          </li>
          <li className="font-semibold">Delivery and order management</li>
          <li className="font-semibold">
            Performance monitoring, rating, and feedback
          </li>
          <li className="font-semibold">
            Payment processing (salary, incentives, reimbursements)
          </li>
          <li className="font-semibold">Emergency contact &amp; safety response</li>
          <li className="font-semibold">
            Legal dispute resolution, fraud investigation
          </li>
          <li className="font-semibold">
            Communication of policy updates, training, and support
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">
          5. How we protect your data
        </h4>
        <p className="mb-2">
          Dinebd applies robust technical and organizational security
          practices, including:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="font-semibold">Data Encryption</span>: All
            sensitive data (NID, license, bank info) is encrypted in transit
            and at rest.
          </li>
          <li>
            <span className="font-semibold">Restricted Access</span>: Only
            authorized HR, compliance, and finance team members can access
            sensitive records.
          </li>
          <li>
            <span className="font-semibold">
              Firewall and Intrusion Detection
            </span>
            : Data is hosted on secure, firewalled servers with continuous
            monitoring.
          </li>
          <li>
            <span className="font-semibold">Regular Audits</span>: Internal
            audits are conducted to detect unauthorized access or misuse.
          </li>
          <li>
            <span className="font-semibold">Data Minimization</span>: We
            only collect the data necessary for specific operational or
            legal purposes.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">
          6. Data retention policy
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Rider personal data is retained for{" "}
            <span className="font-semibold">
              the duration of the rider's association
            </span>{" "}
            with Dinebd and up to{" "}
            <span className="font-semibold">3 years after termination</span>{" "}
            (or as legally required).
          </li>
          <li>
            Data related to financial transactions may be stored longer per
            regulatory and audit requirements.
          </li>
          <li>
            Riders can request deletion of their data (unless restricted by
            law) by contacting support.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">7. Your rights</h4>
        <p className="mb-2">
          Under this policy and applicable Bangladeshi law, riders have the
          right to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access the personal data we hold about them</li>
          <li>Correct or update inaccurate or outdated information</li>
          <li>Request the deletion or restriction of their data</li>
          <li>Object to data processing under certain conditions</li>
          <li>Withdraw consent for optional data uses (e.g., marketing)</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">8. Disclosure of data</h4>
        <p className="mb-2">
          We do <span className="font-semibold">not sell or rent rider data</span>.
          However, information may be shared:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>With government or law enforcement agencies when legally required</li>
          <li>
            With financial partners (e.g., banks, MFS providers) for payment
            processing
          </li>
          <li>With insurance or emergency services during incidents</li>
          <li>
            With third-party service providers under strict confidentiality
            obligations
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">9. Policy updates</h4>
        <p className="mb-2">
          This policy may be updated periodically. Riders will be informed
          of major changes via:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>In-app notifications</li>
          <li>Email or SMS</li>
          <li>Platform announcements</li>
        </ul>
        <p>
          The latest version will always be available at: the app and{" "}
          <span className="underline">https://dinebd.com/privacy-policy</span>
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">10. Contact us</h4>
        <p className="mb-1">
          If you have any questions or requests related to your personal
          data, please contact:
        </p>
        <p>Email: support@dinebd.com | riders@dinebd.com</p>
        <p>Phone: +8801339865044</p>
        <p>Office Address: Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A, Dhaka 1213.</p>
      </div>

      <div>
        <h4 className="font-bold text-gray-900 text-[15px] mb-2 pl-3 border-l-[3px] border-primary/50">11. Acknowledgment</h4>
        <p>
          By registering as a rider and using the Dinebd platform, you
          acknowledge that you have read and agreed to the terms of this
          Rider Data Protection Policy.
        </p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-2">
          Agreement &amp; Signature
        </p>
        <p className="mb-3">
          I, the undersigned, confirm that I have read, understood, and
          agreed to abide by the{" "}
          <span className="font-semibold">
            Dinebd Rider Data Protection Policy
          </span>
          . I acknowledge how my personal data will be collected, used,
          stored, and protected as outlined in this policy.
        </p>
        <p className="mb-4">
          I understand my rights under this policy and applicable
          Bangladeshi law, including the right to access, update, or
          request deletion of my personal data.
        </p>

        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Rider information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dpFullName">Full Name</Label>
            <Input
              id="dpFullName"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dpNid">National ID Number</Label>
            <Input
              id="dpNid"
              value={data.nidNumber}
              onChange={(e) => onChange({ nidNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dpMobile">Mobile Number</Label>
            <Input
              id="dpMobile"
              value={data.mobileNumber}
              onChange={(e) => onChange({ mobileNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dpSignature">Signature of rider</Label>
            <Input
              id="dpSignature"
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
            <Label htmlFor="dpDate">Date</Label>
            <Input
              id="dpDate"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">For Dinebd use only</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dpOfficeVerifiedBy">Verified by (Full Name)</Label>
              <Input
                id="dpOfficeVerifiedBy"
                value={data.officeVerifiedBy}
                onChange={(e) =>
                  onChange({ officeVerifiedBy: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="dpOfficePosition">Position</Label>
              <Input
                id="dpOfficePosition"
                value={data.officePosition}
                onChange={(e) => onChange({ officePosition: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dpOfficeSignature">Signature</Label>
              <Input
                id="dpOfficeSignature"
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
              <Label htmlFor="dpOfficeDate">Date</Label>
              <Input
                id="dpOfficeDate"
                type="date"
                value={data.officeDate}
                onChange={(e) => onChange({ officeDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <CheckboxAgreement
            checked={data.agreed}
            onChange={(checked) => onChange({ agreed: checked })}
            label="I have read, understood, and agreed to abide by the Dinebd Rider Data Protection Policy."
          />
        </div>
      </div>
    </div>
  );
}
