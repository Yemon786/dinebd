"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { InsuranceData } from "@/lib/onboarding-types";

interface InsuranceSectionProps {
  data: InsuranceData;
  onChange: (patch: Partial<InsuranceData>) => void;
}

const BENEFIT_SCHEDULE = [
  {
    coverage: "Accidental Death (occurring within the policy validity)",
    amount: "BDT. 200,000",
  },
  {
    coverage:
      "Accidental Hospitalization (including day-care treatment) Sub-limits apply as per section 5",
    amount: "Up to BDT. 50,000",
  },
];

const SUB_LIMITS = [
  {
    type: "Head Injury",
    description:
      "Severe collision impacts can cause a closed head injury. In that situation, the fluid and tissue inside the skull are damaged because of the sudden movement or impact of the head. Less severe closed head injuries often result in concussions, while the most severe impacts can cause brain damage. Major types of head injuries include Hematoma, Hemorrhage, Concussion, Edema, Skull fracture, Diffuse axonal injury etc.",
    amount: "BDT. 50,000",
  },
  {
    type: "3rd Degree Burn",
    description:
      "Third-degree burns destroy the epidermis and dermis. They may go into the innermost layer of skin, the subcutaneous tissue. The burn site may look white or blackened and charred.",
    amount: "BDT. 37,500",
  },
  {
    type: "Chest Injury, Internal Organ Injury",
    description:
      "These injuries can be more severe such as broken ribs or internal injuries such as internal bleedings. Blunt trauma occurs when a part of the body collides with something else, particularly at high speed or with great force. When this happens, blood vessels inside the body can be crushed or torn. Penetrating trauma occurs when an object penetrates the body and tears holes in blood vessels, muscle and internal organs. This can happen when someone falls onto a sharp object, as in workplace accidents, or when objects collide with and penetrate the body in motor vehicle accidents.",
    amount: "BDT. 25,000",
  },
  {
    type: "Fracture, Dislocation, Dismemberment, Amputation, 2nd Degree Burn",
    description:
      "A fracture is a break, usually in a bone. If the broken bone punctures the skin, it is called an open or compound fracture. A dislocation is an injury to a joint — a place where two or more bones come together — in which the ends of the bones are forced from their normal positions. Dismemberment or amputation is a cut off or disjoin of a limb or a part of a limb. Second-degree burns involve the epidermis and part of the lower layer of skin, the dermis. The burn site looks red, blistered, and may be swollen and painful.",
    amount: "BDT. 15,000",
  },
  {
    type: "Cut injury, Multiple Abrasions, Soft Tissue Injury, 1st Degree Burn",
    description:
      "Cuts and scratches are areas of damage on the surface of the skin. A cut is a line of damage that can go through the skin and into the muscle tissues below, whereas a scrape is surface damage that does not penetrate the lower tissues. A soft tissue injury is damage to the body's connective tissue, which means muscles, ligaments and tendons. An abrasion or \"excoriation\" is a wearing away of the upper layer of skin as a result of applied friction force. First-degree burns affect only the outer layer of skin, the epidermis.",
    amount: "BDT. 5,000",
  },
];

export default function InsuranceSection({
  data,
  onChange,
}: InsuranceSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">Dinebd</span>
          <span className="text-gray-400">×</span>
          <span className="text-lg font-bold text-[#1a2b6d]">bimafy</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2">
          Rider Insurance Policy – Employee Registration Form
        </h3>
        <p className="text-sm text-gray-600">
          This insurance is provided for Dinebd Riders through Bimafy, in
          collaboration with Dinebd. Coverage and benefits are subject to
          the terms of the group life insurance policy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="insRiderId">Dinebd rider ID</Label>
          <Input
            id="insRiderId"
            value={data.riderId}
            onChange={(e) => onChange({ riderId: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="insFullName">Full Name (As per NID)</Label>
          <Input
            id="insFullName"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="insDob">Date of Birth (YYYY-MM-DD)</Label>
          <Input
            id="insDob"
            value={data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div>
          <Label htmlFor="insMobile">Active Mobile Phone Number</Label>
          <Input
            id="insMobile"
            value={data.mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="insNid">NID/Birth Certificate Number</Label>
          <Input
            id="insNid"
            value={data.nidOrBirthCert}
            onChange={(e) => onChange({ nidOrBirthCert: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="insAddress">Address</Label>
          <Input
            id="insAddress"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="insOtherNotes">Other Notes</Label>
          <Textarea
            id="insOtherNotes"
            value={data.otherNotes}
            onChange={(e) => onChange({ otherNotes: e.target.value })}
          />
        </div>
      </div>

      <div className="text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold text-gray-800 mb-2">Important Notes:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>All information is mandatory except for the NID/Birth Certificate number.</li>
          <li>Please provide the Full Name and Date of Birth exactly as per the NID.</li>
          <li>Date of Birth should be in the format: YYYY-MM-DD.</li>
          <li>If a person does not have an NID, provide details as per the Birth Certificate.</li>
          <li>Persons aged below 18 or above 59 are not eligible for insurance coverage.</li>
        </ol>
      </div>

      {/* Annexure 1 */}
      <div className="text-sm text-gray-700 leading-relaxed space-y-6 border-t border-gray-200 pt-6">
        <div>
          <p className="font-bold text-gray-800">Annexure 1</p>
          <p className="font-semibold text-gray-800 underline">
            Applicable for Subscription of Rider Accident Care (The Service)
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-2">
            DESCRIPTION OF THE SERVICE
          </h4>
          <p className="mb-3">
            This digital service (the "Service") facilitates the
            registration/enrolment of eligible Dinebd Delivery Agents (End
            Users) under a group life insurance policy managed with a
            listed life insurance company in Bangladesh. The Service also
            provides an online platform to the registered/enrolled delivery
            agents of Dinebd (the End Users become Insured Members) to
            submit insurance claims digitally. Upon the occurrence of an
            event covered under the group life insurance policy in relation
            to an Insured Member shall entitle the insurance coverage
            benefits to the Insured Member or the legal nominee (in
            applicable cases).
          </p>
          <p>
            The group life insurance policy provides insurance coverage
            against Accidental Death, and Accidental Hospitalization
            (including day-care treatment) to the Insured Members who have
            been registered/enrolled under the group life insurance policy
            through this Service with certain provisions, limitations, and
            exclusions as mentioned under the Insurance Policy Details
            section below.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-2">
            INSURANCE COVERAGE PROVIDER
          </h4>
          <p>
            The insurance risk is underwritten by a listed life insurance
            company (Insurance Partner) under a group life insurance
            policy. Insurance coverage and related benefits are provided by
            the Insurance Partner and any insurance claim payments relating
            to the coverage is subject to verification and assessment by
            the Insurance Partner.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-2">
            SUBSCRIPTION FEE
          </h4>
          <p>BDT. 349 (taka three hundred and forty-nine only) per Insured Member Per Year.</p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-2">
            PAYMENT OF SUBSCRIPTION FEE
          </h4>
          <p>
            Subscription fees must be paid in advance on a monthly/yearly
            basis in order to ensure proper insurance enrolment and claim
            settlement.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-2">
            CLAIM SUBMISSION PROCESS
          </h4>
          <p className="mb-3">
            Insurance claims can be submitted using the dedicated online
            claim platform as provided by Bimafy by providing necessary
            information and by attaching/uploading relevant claim documents
            (scanned images/clear photographs of the medical and other
            relevant documents). List of required documents for particular
            insurance coverages are provided on the Insurance Policy
            Details section. Customers who availed an insurance coverage
            through this service may log-in to the Platform (Bimafy
            Website/Mobile App) using the registered email/phone number to
            submit a claim.
          </p>
          <p className="mb-2">
            The following conditions must be met in order to submit an
            insurance claim:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Insurance claims must be submitted with all required documents
              within 30 (Thirty) days of the covered event using the claims
              platform on the Bimafy Website/Mobile App.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 underline mb-3">
            INSURANCE POLICY DETAILS
          </h4>

          <p className="font-semibold text-gray-800 underline mb-1">1. Definitions</p>
          <p className="mb-2">
            <span className="font-semibold">"Insured Person"</span> means
            the person who has been registered or enrolled under this
            Service of digital insurance subscription.
          </p>
          <p className="mb-2">
            <span className="font-semibold">"Accident"</span> means a
            sudden, unexpected, violent and external specific event which
            happens during the time of cover, at an identifiable time and
            place and which causes Bodily Injury.
          </p>
          <p className="mb-2">
            <span className="font-semibold">"Accidental Death"</span> means
            death of an Insured Person due to an Accident within thirty days
            from the date of Accident.
          </p>
          <p className="mb-2">
            <span className="font-semibold">"Bodily Injury"</span> means an
            identifiable physical injury to an Insured Person's body,
            caused directly and solely by an Accident and independently of
            illness, or disease which is verified and certified by a
            certified medical practitioner.{" "}
            <span className="font-semibold">
              "Accidental Hospitalization (including day-care treatment)"
            </span>{" "}
            means hospital admission or treatment taken by the Insured
            Person due to an Accidental Injury.{" "}
            <span className="font-semibold">"Covered Event"</span> means
            Accidental Hospitalization (including day-care treatment), and
            Accidental Death of the Insured Person.
          </p>
          <p className="mb-4">
            <span className="font-semibold">"Insurance Company"</span> means
            third party insurance companies with applicable registrations
            and licenses from the relevant authority who are independent
            contractors and not Bimafy Ltd.
          </p>

          <p className="font-semibold text-gray-800 underline mb-1">
            2. Eligibility and Terms
          </p>
          <p className="mb-2">
            An Accidental Death, and Accidental Hospitalization (including
            day-care treatment) coverage shall be applicable for the
            Insured Persons who have been registered or enrolled under the
            group life insurance policy through this digital insurance
            subscription (the Service). Only the Insured Persons shall be
            under the insurance coverage with certain provisions, and
            limitations as per the following:
          </p>
          <ol className="list-[lower-roman] list-inside space-y-1 mb-4">
            <li>Insured Person must be above 18 years of age at the time of registration.</li>
            <li>Insurance coverage shall be applicable within the territory of Bangladesh only.</li>
            <li>All insurance coverage is valid for 365 days from the date of registration.</li>
          </ol>

          <p className="font-semibold text-gray-800 underline mb-2">
            3. Insurance Benefit Schedule
          </p>
          <p className="mb-3">
            The Insured Person or the legal nominee (in applicable cases) of
            the Insured Person or the legal nominee shall be able to claim
            the insurance benefits in case of a Covered Event as per the
            following table:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-2 text-left border border-gray-300">
                    Type of Coverage
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-300">
                    Sum Assured/Coverage Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {BENEFIT_SCHEDULE.map((row, idx) => (
                  <tr
                    key={row.coverage}
                    className={idx % 2 === 0 ? "bg-primary/10" : "bg-white"}
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {row.coverage}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 font-medium">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-gray-800 underline mb-1">
            4. Waiting Period
          </p>
          <p className="mb-4">
            1 day (24 hours) waiting period from the date of insurance
            subscription is applicable for coverage commencement. Any
            accident occurring within this 1 day (24 hours) waiting period
            is not covered under this policy.
          </p>

          <p className="font-semibold text-gray-800 underline mb-1">
            5. Exclusions
          </p>
          <p className="mb-2">
            The following exclusions shall be applicable for the insurance
            coverage:
          </p>
          <p className="font-semibold mb-1">General Exclusions:</p>
          <ol className="list-[lower-roman] list-inside space-y-1 mb-3">
            <li>Any pre-existing conditions.</li>
            <li>Any mental, emotional, and psychiatric disorders.</li>
            <li>Any condition/accident due to consuming addictive substances</li>
            <li>
              Any accident due to performing any illegal activity (i.e.,
              driving without a valid license, participating in
              competition/races/stunts, etc.)
            </li>
          </ol>
          <p className="font-semibold mb-1">
            Specific Exclusions for Accidental Death:
          </p>
          <ol className="list-[lower-roman] list-inside space-y-1 mb-3">
            <li>
              Death caused by self-inflicted injury or the commission of or
              attempted commission of an assault or any unlawful act, or
              being engaged in any illegal activity or felony;
            </li>
            <li>Suicide while sane or insane;</li>
          </ol>
          <p className="font-semibold mb-1">
            Specific Exclusions for Accidental Hospitalization (including
            Day-Care Treatment):
          </p>
          <ol className="list-[lower-roman] list-inside space-y-1 mb-4">
            <li>
              Accidents due to any unlawful activities or due to use of
              addictive substances by the Insured Person.
            </li>
          </ol>

          <p className="font-semibold text-gray-800 underline mb-2">
            6. Sub-Limits for Accidental Hospitalization (Including Day-Care
            Treatment)
          </p>
          <p className="mb-3">
            Accidental Hospitalization (including day-care treatment) can be
            further classified under the following different categories
            with corresponding benefits:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-3 py-2 text-left border border-gray-300 w-1/5">
                    Types of Accidental Injury
                  </th>
                  <th className="px-3 py-2 text-left border border-gray-300">
                    Description of Accidental Injury due to Accident
                  </th>
                  <th className="px-3 py-2 text-left border border-gray-300 w-1/6">
                    Sum Assured/Coverage Amount (BDT.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUB_LIMITS.map((row, idx) => (
                  <tr
                    key={row.type}
                    className={idx % 2 === 0 ? "bg-primary/10" : "bg-white"}
                  >
                    <td className="px-3 py-2 border border-gray-300 font-medium align-top">
                      {row.type}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 align-top text-xs">
                      {row.description}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 font-medium align-top">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-gray-800 underline mb-2">
            7. Claim Documentation
          </p>
          <p className="mb-2">
            The claimant must provide the below mentioned documents in
            digital formats in order to submit a claim:
          </p>
          <p className="font-semibold mb-1">i. For Accidental Death</p>
          <ol className="list-[lower-alpha] list-inside space-y-1 mb-3">
            <li>Copy of NID/Passport/Birth Certificate of the Insured Person</li>
            <li>Driving license of the Insured Person (in applicable cases)</li>
            <li>
              Death Certificate from the last attending physician/clinic/hospital
              mentioning the actual cause of death
            </li>
            <li>First Incident Report (FIR) from the local law enforcement authority</li>
            <li>Post-mortem report</li>
            <li>Copy of NID/Passport/Birth Certificate of the legal Nominee</li>
            <li>Proof of relationship of Nominee with the Insured Person</li>
            <li>Any other supporting documents (if required)</li>
          </ol>
          <p className="font-semibold mb-1">
            ii. For Accidental Hospitalization (including day-care treatment)
          </p>
          <ol className="list-[lower-alpha] list-inside space-y-1 mb-4">
            <li>Copy of NID/Passport/Birth Certificate</li>
            <li>Copy of Driving License (in applicable cases)</li>
            <li>Doctor's prescription/emergency ticket</li>
            <li>Doctor's Advice for hospitalization (in applicable cases)</li>
            <li>Discharge Certificate (in applicable cases)</li>
            <li>All medical bills</li>
            <li>
              All diagnostic test reports such as X-Ray, City Scan, MRI or
              such relevant reports
            </li>
            <li>Any other supporting documents (if required)</li>
          </ol>

          <p className="font-semibold text-gray-800 underline mb-1">
            Claim Decision, and Settlement
          </p>
          <p className="mb-2">
            All claims are subject to verification by the Insurance Company
            and Insurance Company reserves the right to reject any claim if
            it is deemed invalid/inappropriate or not applicable under
            insurance coverage.
          </p>
          <p className="mb-2">
            Successful claims for insurance coverage shall be settled in
            favor of the appropriate beneficiary via bank account/mobile
            wallet within the following timeline after receiving all
            necessary documents from the Insured Person or legal nominee of
            the Insured Person (in applicable cases).
          </p>
          <ul className="list-disc list-inside">
            <li>
              Accidental Hospitalization (including day-care treatment)
              Claims: 10 working days
            </li>
            <li>Accidental Death Claims: 28 working days</li>
          </ul>
        </div>
      </div>

      {/* Declaration & signature */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <p className="font-semibold text-gray-800">Employee Declaration:</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          I hereby declare that the information provided above is accurate
          and complete to the best of my knowledge. I understand that
          providing false information may lead to rejection of my insurance
          coverage. I also agree to the full terms and conditions of the
          insurance policy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="insSignature">Rider Signature</Label>
            <Input
              id="insSignature"
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
            <Label htmlFor="insSignatureFullName">Full Name (as per NID)</Label>
            <Input
              id="insSignatureFullName"
              value={data.signatureFullName}
              onChange={(e) =>
                onChange({ signatureFullName: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="insDate">Date</Label>
            <Input
              id="insDate"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>

        <CheckboxAgreement
          checked={data.declarationAgreed}
          onChange={(checked) => onChange({ declarationAgreed: checked })}
          label="I confirm the above declaration is accurate and I agree to the full terms and conditions of the insurance policy."
        />
      </div>
    </div>
  );
}
