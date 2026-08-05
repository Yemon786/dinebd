"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { EquipmentData } from "@/lib/onboarding-types";

interface EquipmentSectionProps {
  data: EquipmentData;
  onChange: (patch: Partial<EquipmentData>) => void;
}

export default function EquipmentSection({
  data,
  onChange,
}: EquipmentSectionProps) {
  return (
    <div className="space-y-6" lang="bn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eqDate">তারিখ</Label>
          <Input
            id="eqDate"
            type="date"
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="eqRiderName">রাইডারের নাম</Label>
          <Input
            id="eqRiderName"
            value={data.riderName}
            onChange={(e) => onChange({ riderName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="eqMobile">রাইডারের মোবাইল নম্বর</Label>
          <Input
            id="eqMobile"
            value={data.mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="eqNid">জাতীয় পরিচয়পত্র নম্বর</Label>
          <Input
            id="eqNid"
            value={data.nidNumber}
            onChange={(e) => onChange({ nidNumber: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <div>
          <h4 className="font-bold text-gray-800 mb-2">
            ইকুইপমেন্ট ব্যবহারের শর্তাবলী:
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>ইকুইপমেন্ট শুধুমাত্র প্রতিষ্ঠানের কাজের জন্য ব্যবহার করতে হবে।</li>
            <li>ইকুইপমেন্ট রক্ষণাবেক্ষণ ও নিরাপদে রাখার দায়িত্ব রাইডারের।</li>
            <li>ক্ষতি, হারানো বা চুরি হলে প্রতিষ্ঠানকে তা অবিলম্বে জানাতে হবে।</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2">ইকুইপমেন্ট নেওয়ার শর্ত:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              রাইডারকে প্রতিষ্ঠানের ইকুইপমেন্ট নেওয়ার জন্য ইকুইপমেন্ট এর মোট
              মূল্যের সম্পূর্ণ টাকা দিয়ে ইকুইপমেন্ট নিয়ে কাজ শুরু করতে
              পারবেন।
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2">
            ইকুইপমেন্ট ফেরত দেওয়ার শর্ত:
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>চাকরি/চুক্তি শেষ হওয়ার সময় সব ইকুইপমেন্ট ভালো অবস্থায় ফেরত দিতে হবে।</li>
            <li>
              ফেরত না দিলে বা ক্ষতিগ্রস্ত অবস্থায় ফেরত দিলে এর মূল্য
              রাইডারের পাওনা থেকে কেটে নেওয়া হবে।
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2">চুক্তির মেয়াদ:</h4>
          <p>এই চুক্তি ইকুইপমেন্ট ফেরত দেওয়া পর্যন্ত কার্যকর থাকবে।</p>
        </div>
      </div>

      <div className="pt-2">
        <Label htmlFor="eqCommitmentName">
          আমি _______________ সম্মতি দিচ্ছি যে, আমি ডাইনবিডির সাথে একনবিষ্ট
          ভাবে কাজ করবো।
        </Label>
        <Input
          id="eqCommitmentName"
          value={data.commitmentName}
          onChange={(e) => onChange({ commitmentName: e.target.value })}
          placeholder="নাম লিখুন"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eqSignature">রাইডারের স্বাক্ষর</Label>
          <Input
            id="eqSignature"
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
          <Label htmlFor="eqSignatureDate">তারিখ</Label>
          <Input
            id="eqSignatureDate"
            type="date"
            value={data.signatureDate}
            onChange={(e) => onChange({ signatureDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
