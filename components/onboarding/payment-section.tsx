"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioOptionGroup } from "@/components/onboarding/radio-group";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { PaymentData } from "@/lib/onboarding-types";

interface PaymentSectionProps {
  data: PaymentData;
  onChange: (patch: Partial<PaymentData>) => void;
}

export default function PaymentSection({
  data,
  onChange,
}: PaymentSectionProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 leading-relaxed">
        Please provide accurate payment details. Dinebd is not responsible
        for errors or payments to incorrect/unauthorized accounts. Payments
        cannot be reversed once processed. Please ensure the provided Bkash
        number below is verified and authorized to receive funds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="payRiderName">Rider Name</Label>
          <Input
            id="payRiderName"
            value={data.riderName}
            onChange={(e) => onChange({ riderName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="payAccountHolder">Name of Bkash Account Holder</Label>
          <Input
            id="payAccountHolder"
            value={data.accountHolderName}
            onChange={(e) =>
              onChange({ accountHolderName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="payBkashNumber">Bkash Number</Label>
          <Input
            id="payBkashNumber"
            value={data.bkashNumber}
            onChange={(e) => onChange({ bkashNumber: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Note: This number must be verified and authorized to receive
            payments. Dinebd will not take responsibility if this is not
            the authorized account.
          </p>
        </div>
        <div>
          <Label>Bkash Account Type</Label>
          <RadioOptionGroup
            name="payAccountType"
            options={["Personal", "Merchant"]}
            value={data.accountType}
            onChange={(v) => onChange({ accountType: v })}
          />
        </div>
        <div>
          <Label htmlFor="payAccountRelation">
            Bkash Account Relation (Owner/Family, others)
          </Label>
          <Input
            id="payAccountRelation"
            value={data.accountRelation}
            onChange={(e) => onChange({ accountRelation: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="payOtherInfo">Other Information</Label>
          <Textarea
            id="payOtherInfo"
            value={data.otherInfo}
            onChange={(e) => onChange({ otherInfo: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">Terms &amp; Conditions:</span> By
          signing, the rider confirms that the Bkash account details
          provided are correct and authorized for payment. Payments will be
          made via Bkash unless agreed otherwise. Personal and financial
          information will be used only for payment processing and kept
          secure. Dinebd is not liable for errors or delays from incorrect
          details or third-party processing. This agreement is governed by
          the laws of Bangladesh.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="paySignatureRiderName">Rider Name</Label>
            <Input
              id="paySignatureRiderName"
              value={data.signatureRiderName}
              onChange={(e) =>
                onChange({ signatureRiderName: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="paySignature">Signature</Label>
            <Input
              id="paySignature"
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
            <Label htmlFor="payDate">Date</Label>
            <Input
              id="payDate"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>

        <CheckboxAgreement
          checked={data.agreed}
          onChange={(checked) => onChange({ agreed: checked })}
          label="I confirm that the Bkash account details provided are correct and authorized for payment."
        />
      </div>
    </div>
  );
}
