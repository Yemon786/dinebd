"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { SignaturePreview } from "@/components/onboarding/signature-preview";
import type { ContractData } from "@/lib/onboarding-types";

interface ContractSectionProps {
  data: ContractData;
  onChange: (patch: Partial<ContractData>) => void;
}

export default function ContractSection({
  data,
  onChange,
}: ContractSectionProps) {
  return (
    <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
      <div>
        <h4 className="font-bold text-gray-800 mb-2">1. Introduction</h4>
        <p>
          Welcome to Dinebd. By becoming a food delivery rider with Dinebd,
          you agree to comply with the following Terms and Conditions. These
          terms are designed to ensure safe, efficient, and professional
          services for both our customers and partners (vendors/restaurants).
          By accepting these conditions, you acknowledge that your services
          will be conducted in line with the company's values and
          operational guidelines.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          2. Eligibility and Registration
        </h4>
        <p className="font-semibold text-gray-800">Eligibility:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>You must be at least 18 years old.</li>
          <li>
            You must possess a valid driver's license for motorcycles,
            bicycles, or any other applicable vehicle used for delivery.
          </li>
          <li>
            You must own a smartphone with reliable internet access to use
            the Dinebd Rider App.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Registration:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            You must provide accurate personal information, including:
            <ul className="list-disc list-inside pl-5">
              <li>A valid National ID.</li>
              <li>A recent photograph.</li>
              <li>Proof of vehicle ownership or lease documents.</li>
            </ul>
          </li>
          <li>
            Any incorrect or misleading information provided during
            registration may result in termination or disqualification from
            using Dinebd services.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          3. Vehicle Requirements
        </h4>
        <p className="font-semibold text-gray-800">Vehicle Condition:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Your vehicle must be well-maintained, roadworthy, and meet all
            applicable local traffic regulations.
          </li>
          <li>
            Regular maintenance of the vehicle is your responsibility. This
            includes ensuring your vehicle is clean and fit for service at
            all times.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Insurance:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Your vehicle must be insured as required by local laws and
            regulations.
          </li>
          <li>
            Proof of insurance may be requested at any time. You must
            provide updated insurance documents if any changes occur.
            Failure to provide valid insurance can result in suspension from
            Dinebd services.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          4. Rider Responsibilities
        </h4>
        <p className="font-semibold text-gray-800">Timeliness:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            You must promptly accept delivery requests through the Dinebd
            Rider App and complete the delivery within the estimated time
            frame.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Professional Conduct:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            You must maintain professional conduct at all times. Respect
            customers, restaurant staff, and fellow road users. Harassment,
            inappropriate behavior, or offensive language will not be
            tolerated.
          </li>
          <li>
            Misconduct or any unprofessional actions may result in
            immediate termination of your contract.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Safety:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Always adhere to traffic laws and safety regulations.</li>
          <li>
            Wear appropriate safety gear (e.g., helmet, protective
            clothing). Ensure your vehicle is in good working condition
            before each shift.
          </li>
          <li>
            Failure to comply with safety regulations could result in
            penalties or termination.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Food Handling:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            It is your responsibility to keep food orders warm and in good
            condition by using the Dinebd-approved delivery bag.
          </li>
          <li>
            The delivery bag must be clean and suitable for maintaining food
            safety standards, ensuring that the food reaches customers in
            optimal condition.
          </li>
          <li>
            If the food is damaged during transit due to rider negligence,
            it is the rider's responsibility to immediately notify Dinebd.
          </li>
          <li>
            Riders will not be paid for deliveries involving damaged food,
            and Dinebd reserves the right to hold an investigation into the
            cause of the damage. Based on the investigation's findings,
            Dinebd may take further action, including but not limited to
            withholding payment for the order or applying penalties.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          5. Payment and Earnings
        </h4>
        <p className="font-semibold text-gray-800">Earnings Structure:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Your earnings are determined by factors such as delivery
            distance, delivery time, and surge pricing during high-demand
            periods. Details about these factors can be found in your
            Dinebd Rider App.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Payment Method:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Payments for completed deliveries will be processed on a weekly
            basis, and earnings will be transferred directly to your
            registered bank account.
          </li>
          <li>
            It is your responsibility to ensure that your bank account
            information is correct to receive timely payments.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">
          Additional Compensation:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            During peak hours or high-demand periods, Dinebd may implement
            surge pricing, where you can earn more for deliveries in
            specific locations. Surge pricing information will be provided
            through the app.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">6. App Usage</h4>
        <p className="font-semibold text-gray-800">Account Security:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            Report any unauthorized use or suspected security breach of
            your account to Dinebd support immediately.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">App Updates:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            You are required to regularly update the Dinebd Rider App to
            access the latest features, performance enhancements, and
            security improvements. Failure to do so may result in service
            disruptions.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          7. Delivery Procedures
        </h4>
        <p className="font-semibold text-gray-800">Order Pickup:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            When picking up orders, verify the accuracy of the order with
            the vendor (restaurant) before departing. Ensure all items are
            included and in good condition.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">
          Communication with Customers:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Contact customers only as necessary, using the app's built-in
            messaging or call functions.
          </li>
          <li>
            Do not exchange personal contact information with customers.
            Ensure all communication is limited to delivery-related
            matters.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Delivery Process:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Deliver the food to the customer's specified address in a timely manner.</li>
          <li>Use the approved delivery bag to maintain food quality during transit.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          8. Policy on Food Delivery Cash/Partial Payment and Collection
        </h4>
        <p className="font-semibold text-gray-800">Order Payment:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            At the time of pickup, you are responsible for paying the
            vendor the full order amount, minus the platform and delivery
            fees.
          </li>
          <li>
            Upon delivery, you will collect the same amount from the
            customer, ensuring the transaction is accurate.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">
          Unsuccessful Deliveries &amp; Rider Payment
        </p>
        <p className="mb-2">
          In the unlikely event that an order is not successfully delivered
          after the rider reaches the drop-off destination:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            If you are unable to locate the customer, you must return the
            food to the vendor, who may refund you for the order payment.
          </li>
          <li>
            Both the rider and vendor must report any unsuccessful
            deliveries to Dinebd immediately to resolve the issue.
          </li>
          <li>The rider may be entitled to receive the full delivery fee.</li>
          <li>
            The rider may also be entitled to reimbursement of up to 15% or
            less of the amount paid to the restaurant. In certain cases, the
            rider may receive no reimbursement, while in other cases they
            may receive the full amount paid at pickup. All such
            reimbursements are subject to Dinebd's investigation.
          </li>
          <li>
            If the same issue is repeatedly reported by the same rider,
            Dinebd reserves the right to withhold the delivery fee and treat
            the matter as subject to further investigation.
          </li>
          <li>
            All such cases will be carefully reviewed under Dinebd's
            investigation process to determine the appropriate resolution.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">9. Dispute Resolution</h4>
        <p className="font-semibold text-gray-800">Customer Issues:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            In the event of a delivery dispute or complaint, address the
            issue professionally and follow Dinebd's policies for dispute
            resolution.
          </li>
          <li>
            For unresolved disputes, report the situation to Dinebd support
            for further assistance.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Support:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Riders can contact Dinebd support through the app or via email
            for help with any app-related or delivery issues.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          10. Termination of Agreement
        </h4>
        <p className="font-semibold text-gray-800">Voluntary Termination:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            You may choose to terminate your contract at any time by
            notifying Dinebd in writing.
          </li>
          <li>
            Upon termination, any outstanding payments due to you will be
            processed within the usual payment cycle.
          </li>
        </ul>
        <p className="font-semibold text-gray-800">Company Termination:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Dinebd reserves the right to terminate your agreement if you
            fail to adhere to these Terms and Conditions, violate local
            traffic laws, or exhibit unprofessional behaviour.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">11. Employment Status</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            As a rider for Dinebd, you are classified as self-employed. This
            means you are not an employee of Dinebd and are responsible for
            managing and paying your taxes on delivery earnings.
          </li>
          <li>
            This is a zero-hour contract, and Dinebd has no obligation to
            provide a specific number of delivery requests.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">12. Changes to Terms</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Dinebd reserves the right to modify these Terms and Conditions
            as needed. You will be notified of any significant changes to
            the terms.
          </li>
          <li>
            Continued use of the Dinebd platform following such changes
            constitutes acceptance of the revised terms.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          13. Dinebd rider community guidelines
        </h4>
        <p className="mb-3">
          At Dinebd, our goal is to maintain a safe, respectful, and
          reliable platform for everyone: customers, restaurants, and
          riders. These Community Guidelines outline the behaviours and
          standards we expect all riders to uphold while using the Dinebd
          platform.
        </p>

        <p className="font-semibold text-gray-800">Respect everyone</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Be courteous: Treat customers, restaurant staff, and fellow
            riders with professionalism and kindness.
          </li>
          <li>
            Zero tolerance for discrimination: Any discriminatory behaviour
            based on religion, gender, race, caste, nationality, or
            disability is strictly prohibited.
          </li>
          <li>
            No harassment or violence: Any threatening, abusive, or violent
            behaviour will result in immediate account deactivation.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Be reliable and professional
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Timely deliveries: Always aim to pick up and deliver orders
            promptly, following the instructions in the app.
          </li>
          <li>
            Dress appropriately: Wear clean and presentable clothing.
            Dinebd-branded gear is preferred when available.
          </li>
          <li>
            Stay sober: Riders must never operate under the influence of
            alcohol, drugs, or any substance that could impair judgment or
            performance.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Communicate clearly and respectfully
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Be polite and professional: Use respectful language when
            interacting with customers or restaurant partners.
          </li>
          <li>
            Limit contact: Only contact customers when necessary to
            complete a delivery.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">Prioritize safety</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Follow traffic laws: Always ride safely, wear a helmet, and
            follow road rules.
          </li>
          <li>
            Protect the food: Ensure food is not tampered with and is
            delivered in the same condition it was received.
          </li>
          <li>
            Report issues: Use the app to report accidents, unsafe
            conditions, unsuccessful delivery or inappropriate behaviour.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Use the platform honestly
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            No cheating or manipulation: GPS spoofing, false order
            completions, or handing off orders to unauthorized individuals
            are strictly forbidden.
          </li>
          <li>
            Accept only what you'll complete: Only carry out deliveries
            you've accepted yourself.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Maintain account integrity
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Use your own account: Only the registered rider should be using
            the Dinebd account and the listed vehicle.
          </li>
          <li>
            Keep documents up to date: Always upload valid identification,
            license, and vehicle registration documents.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">Fraud and Misuse</p>
        <p className="mb-2">
          Dinebd maintains a zero-tolerance policy toward fraud and
          dishonest behaviour. Violations may lead to account suspension or
          permanent deactivation. Examples of fraud include (but are not
          limited to):
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Using false identities or documents</li>
          <li>Faking order completions or GPS locations</li>
          <li>Requesting refunds or fees dishonestly</li>
          <li>Creating fake or duplicate accounts</li>
          <li>Keeping food without delivery</li>
          <li>Misusing promotions or referrals</li>
          <li>Sharing your account with others</li>
          <li>Submitting false claims (e.g. for damages or cleaning)</li>
        </ul>

        <p className="font-semibold text-gray-800">
          Breaches of terms and guidelines
        </p>
        <p className="mb-2">
          A rider may face serious consequences for any behaviour that, in
          Dinebd's view, harms users, damages trust or compromises the
          platform. This includes:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Theft or fraud</li>
          <li>Physical or verbal abuse</li>
          <li>Harassment, bullying, or sexual misconduct</li>
          <li>Discrimination or hate speech</li>
          <li>Reckless or dangerous driving</li>
          <li>Intoxication while delivering</li>
          <li>Sharing private user or merchant data</li>
          <li>Legal or regulatory violations</li>
        </ul>

        <p className="font-semibold text-gray-800">
          How we enforce these guidelines
        </p>
        <p className="mb-2">
          Violating the Rider Terms or these Community Guidelines may result
          in:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Warnings</li>
          <li>Temporary suspensions</li>
          <li>Permanent deactivation</li>
        </ul>
        <p className="mb-3">
          This applies to all Dinebd accounts you hold, regardless of role
          (e.g. rider, customer). You can contact Dinebd Support if you
          believe a decision was made in error and would like a review.
        </p>

        <p className="font-semibold text-gray-800">
          Investigations and reporting
        </p>
        <p className="mb-2">
          We take reports seriously, whether they come from customers,
          restaurants, other riders, or external sources. Our team may:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Contact you for clarification</li>
          <li>Temporarily suspend your account during an investigation</li>
          <li>
            Restrict access based on reports from regulators or law
            enforcement
          </li>
        </ul>
        <p className="mb-3">
          Repeat violations or refusal to cooperate with an investigation
          may lead to permanent deactivation without further notice.
        </p>

        <p className="font-semibold text-gray-800">Immediate deactivation</p>
        <p className="mb-2">
          Some actions result in immediate removal from the platform,
          including:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>Acts of violence or threats</li>
          <li>Harassment or sexual misconduct</li>
          <li>Discrimination or hate speech</li>
          <li>Fraud, theft, or illegal activity</li>
          <li>Serious safety violations or reckless behaviour</li>
        </ul>
        <p className="mb-3">
          We may also cooperate with law enforcement when required.
        </p>

        <p className="font-semibold text-gray-800">
          Screening and compliance
        </p>
        <p className="mb-3">
          To ensure the safety of our community, Dinebd may conduct
          background and compliance checks where legally permitted. This
          includes driving records or criminal history. Violations may
          result in denial or removal of access to the platform.
        </p>

        <p className="font-semibold text-gray-800">A shared responsibility</p>
        <p>
          We appreciate the hard work and dedication of every Dinebd rider.
          By following these guidelines, you help us maintain a platform
          that is safe, efficient, and trusted by all. Let's work together
          to make every delivery a positive experience for you, for our
          customers, and for our partners.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">
          14. Dinebd Rider Payment Policy
        </h4>
        <p className="font-semibold text-gray-800">Important Rules</p>
        <p className="font-semibold text-gray-800 mt-2">
          Delivery Distance Calculation:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            The delivery distance is calculated from the vendor's location
            to the customer's address, not from where the rider accepted
            the delivery.
          </li>
          <li>
            Travel to the vendor's location is unpaid. Payment begins once
            the rider picks up the food from the vendor.
          </li>
          <li>
            Upon arrival at the vendor's location, the rider is responsible
            for making the payment for the food order directly to the
            vendor. Subsequently, the rider will collect the equivalent
            amount from the customer upon delivery of the food.
          </li>
          <li>
            Riders will receive their accumulated delivery payment on a
            weekly basis from Dinebd. The specific payment date is outlined
            in the rider's contract.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">Payment Structure</p>
        <p className="mb-3">
          The following example shows how payments may typically be
          calculated. Please note that this formula is provided for
          reference purposes only. It should not be treated as the actual
          formula used in real situations. Its sole purpose is to give
          riders an illustrative example of how payments could work.
        </p>
        <p className="mb-1">For example:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Base Payment: Riders may receive a minimum payment of 38 Taka
            for deliveries within 3 km.
          </li>
          <li>
            Additional Payment: For distances exceeding 3 km, riders will
            receive an additional 7.50 Taka per km for the distance beyond
            3 km.
          </li>
        </ul>
        <p className="font-semibold">Example 1: Delivery Distance = 5 km</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Base payment: 38 Taka for the first 3 km.</li>
          <li>
            Additional payment: 7.50 BDT Taka per km for the next 2 km, so 2
            km × 7.50 Taka = 15 Taka.
          </li>
        </ul>
        <p className="mb-3">
          Total payment: 38 Taka (base) + 15 Taka (additional) = 53 Taka.
        </p>

        <p className="mb-1">
          <span className="font-semibold">Long Distance Payment:</span> For
          deliveries over 10 km, riders will receive 8.50 Taka per km for
          every km beyond 10 km.
        </p>
        <p className="font-semibold">Example 2: Delivery Distance = 12 km</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Base payment: 38 Taka for the first 3 km.</li>
          <li>
            Additional payment: 7.50 Taka per km for the next 7 km (from 3
            km to 10 km), so 7 km × 7.50 Taka = 52.50 Taka.
          </li>
          <li>
            Long-distance payment: 8.50 Taka per km for the remaining 2 km
            (from 10 km to 12 km), so 2 km × 8.50 Taka = 17 Taka.
          </li>
          <li>
            Total payment: 38 Taka (base) + 52.50 Taka (additional) + 17
            Taka (long distance) = 107.50 Taka.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Corrected Payment Structure Summary:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>For a 5 km delivery, the total payment would be 53 Taka.</li>
          <li>
            For a 12 km delivery, the total payment would be 107.50 Taka.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">Surge Pricing</p>
        <p className="mt-2 font-semibold">1. Surge Pricing Conditions:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>
            Dinebd can implement surge pricing based on location and time to
            meet customer demand during busy periods.
          </li>
          <li>Surge pricing can increase delivery fares by 1% to 5% or more.</li>
        </ul>
        <p className="font-semibold">2. Surge Management:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Upon demand, Dinebd system will select surge locations and the
            duration of the surge period.
          </li>
          <li>
            Surge pricing will be managed automatically or manually by
            Dinebd, with the ability to start and stop the surge as needed.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">Unsuccessful Deliveries:</p>
        <p className="mt-2 font-semibold">1. Customer Not Found:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>
            If the rider is unable to locate the customer, the rider must
            return the food to the vendor.
          </li>
        </ul>
        <p className="font-semibold">2. Vendor Refund:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>
            The vendor is required to refund the rider for the unsuccessful
            delivery once the food is returned.
          </li>
        </ul>
        <p className="font-semibold">3. Reporting:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>
            The rider must report any unsuccessful delivery or transaction
            to Dinebd immediately.
          </li>
          <li>
            Dinebd will investigate reported incidents and take necessary
            measures to prevent future issues.
          </li>
        </ul>
        <p className="font-semibold">4. Compensate Payment:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            After investigating the incident, if Dinebd determines that the
            customer was genuinely not available, Dinebd may compensate the
            rider for their time as a delivery fee.
          </li>
        </ul>
        <p className="mb-3">
          This process ensures that both riders and vendors have clear
          instructions and support in handling unexpected circumstances,
          ensuring smooth operations and customer satisfaction.
        </p>

        <p className="font-semibold text-gray-800">Compliance:</p>
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>All riders are required to adhere to this policy without exception.</li>
          <li>
            Non-compliance may result in disciplinary action, up to and
            including termination of employment.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          Review and future updates:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>This policy will be reviewed periodically and updated as necessary.</li>
          <li>
            This policy ensures fair compensation for Dinebd riders,
            considering both the base distance and any additional travel
            required. The implementation of surge pricing helps meet
            customer demand while providing riders with increased earnings
            during peak times. By adhering to this policy, we aim to
            maintain a seamless and trustworthy process for food payment and
            delivery.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">16. Governing law</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>These Terms and Conditions are governed by the laws of Bangladesh.</li>
          <li>
            Any legal disputes arising from these terms will be subject to
            the jurisdiction of the courts in Bangladesh.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-gray-800 mb-2">17. Contact information</h4>
        <p className="mb-2">
          For any questions, concerns, or support, please contact Dinebd at
          the following:
        </p>
        <p>Email: support@dinebd.com | riders@dinebd.com</p>
        <p>Phone: +8801339865044 or +8801333158931</p>
        <p>
          Office Address: Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A,
          Dhaka 1213, Bangladesh.
        </p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-2">
          Acknowledgment and Signature
        </p>
        <p className="mb-3">
          By agreeing to these terms, you acknowledge that you have read,
          understood, and accepted them. Thank you for being a part of
          Dinebd.
        </p>
        <p className="mb-4">
          I, the undersigned, confirm that I have read, understood, and
          agreed to abide by the{" "}
          <span className="font-semibold">
            Dinebd Rider Terms and Conditions
          </span>
          , including all related policies and guidelines. I acknowledge
          that failure to comply may result in suspension or termination of
          my access to the Dinebd platform.
        </p>

        <p className="font-bold text-gray-800 mb-3">Rider Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractFullName">Full Name</Label>
            <Input
              id="contractFullName"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contractNid">National ID Number</Label>
            <Input
              id="contractNid"
              value={data.nidNumber}
              onChange={(e) => onChange({ nidNumber: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contractSignature">Signature</Label>
            <Input
              id="contractSignature"
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
            <Label htmlFor="contractDate">Date</Label>
            <Input
              id="contractDate"
              type="date"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <p className="font-bold text-gray-800">For Dinebd Use Only</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contractOfficeVerifiedBy">
                Verified by (Full Name)
              </Label>
              <Input
                id="contractOfficeVerifiedBy"
                value={data.officeVerifiedBy}
                onChange={(e) =>
                  onChange({ officeVerifiedBy: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="contractOfficeSignature">Signature</Label>
              <Input
                id="contractOfficeSignature"
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
              <Label htmlFor="contractOfficePosition">Position</Label>
              <Input
                id="contractOfficePosition"
                value={data.officePosition}
                onChange={(e) =>
                  onChange({ officePosition: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="contractOfficeDate">Date</Label>
              <Input
                id="contractOfficeDate"
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
            label="I have read, understood, and agreed to abide by the Dinebd Rider Terms and Conditions, including all related policies and guidelines."
          />
        </div>
      </div>
    </div>
  );
}
