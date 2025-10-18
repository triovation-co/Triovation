import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 my-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-600 mb-6">
        By using the services of <strong>TRIOVATION</strong> and placing an order, you (the
        Customer) agree to the terms and conditions outlined below. TRIOVATION reserves the
        right to update, modify, or change these terms at any time. Customers are encouraged to
        read the terms carefully each time before placing an order.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Order &amp; Payment</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>All orders must be placed through official TRIOVATION channels (website, email, WhatsApp, Instagram, or LinkedIn).</li>
          <li>No Cash on Delivery (COD) option is available.</li>
          <li>For orders below ₹5,000 → 100% payment is required in advance.</li>
          <li>For orders above ₹5,000 → 70% advance payment is compulsory, and the remaining 30% can be paid after delivery reaches the customer.</li>
          <li>All prices are inclusive of GST as per Government of India regulations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Cancellations</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Customized Products: Cancellations are only accepted within 1 hour of placing the order.</li>
          <li>Non-Customized Products: Cancellations are accepted within 2 hours of placing the order.</li>
          <li>Once the order is processed or dispatched, cancellations are not allowed.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Shipping &amp; Delivery</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Orders are dispatched within 2–3 business working days of placement.</li>
          <li>Standard shipping takes 4–5 business days from dispatch.</li>
          <li>Express delivery is available on request; courier charges will be borne by the customer.</li>
          <li>TRIOVATION ships through trusted courier partners like Bluedart, Delhivery, Xpressbees, and DTDC. Normal deliveries may also be sent via India Post.</li>
          <li>Delivery timelines may vary depending on the location, courier serviceability, public holidays, or unforeseen delays.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Returns &amp; Exchanges</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Returns are only applicable for retail orders of up to 3 pieces.</li>
          <li>The return request must be raised within 3 days of receiving the order.</li>
          <li>Returns are accepted only if the product is in bad condition, packaging is tampered, or the item is damaged before opening.</li>
          <li>Customers must provide a video of the unboxing as proof for damaged claims.</li>
          <li>Returns are not applicable for customized products, bulk orders, or corporate orders.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Refunds</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>For prepaid orders (both customized and non-customized), refunds will be processed within 24 hours of cancellation approval.</li>
          <li>For orders already dispatched, refunds are not applicable unless the product is damaged.</li>
          <li>For advance payments on customized orders, design charges may be deducted before refund (if design work has already been initiated).</li>
          <li>Refunds will be processed back to the original payment method or via bank transfer/PayTM (in case of COD advance payments).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Product Quality &amp; Liability</h2>
        <p className="text-gray-700">
          TRIOVATION ensures that all products are designed, made, and quality-checked by our in-house team before dispatch. Slight variations in design, material, or finish may occur due to the handcrafted and customized nature of products. TRIOVATION will not be held responsible for damages arising from misuse, mishandling, or improper care of products after delivery.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Legal Jurisdiction</h2>
        <p className="text-gray-700">All disputes shall be subject to the jurisdiction of Mumbai, India.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Acceptance of Terms</h2>
        <p className="text-gray-700">By placing an order with TRIOVATION, the customer confirms that they have read, understood, and accepted these Terms &amp; Conditions.</p>
      </section>
    </div>
  );
}
