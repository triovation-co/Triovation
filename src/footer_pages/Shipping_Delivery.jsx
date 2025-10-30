import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 my-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Shipping &amp; Delivery Policy</h1>
      <p className="text-sm text-gray-600 mb-6">
        At <strong>TRIOVATION</strong>, we are committed to delivering your orders safely, securely,
        and within the promised time frame. Every order is packed with care and dispatched through
        trusted courier partners to ensure it reaches you in the best condition.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Order Processing &amp; Dispatch</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>All products are ready to be dispatched within 2–3 business working days after the order is placed.</li>
          <li>Normal delivery will be sent via India Post.</li>
          <li>Electronic products will be shipped only via reputed courier services such as Bluedart, Delhivery, Xpressbees,or DTDC.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Shipping Timeline</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Standard Shipping: 4–5 business days from dispatch.</li>
          <li>
            Express Delivery: Available upon request. Charges will be borne by the customer.
            Delivery is handled through Bluedart, Delhivery, Xpressbees, or DTDC only.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Payment Terms</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>No Cash on Delivery (COD) option is available.</li>
          <li>For orders below ₹5,000 → Full payment must be made in advance.</li>
          <li>
            For orders above ₹5,000 → 70% advance payment is compulsory, and the remaining 30% can
            be paid after delivery reaches you.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">GST &amp; Compliance</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>All our prices are inclusive of GST.</li>
          <li>Relevant GST % is already included in the product total.</li>
          <li>GST is applicable only on orders within India.</li>
          <li>
            For international shipping, please reach out to us at {" "}
            <a href="mailto:triovation.co@gmail.com" className="text-blue-600">
              triovation.co@gmail.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Delivery &amp; Packaging</h2>
        <p className="text-gray-700">
          We ship throughout the week, except Sundays and public holidays, during working hours. All
          shipments are securely packaged to avoid damage during transit.
        </p>

        <p className="mt-3 text-gray-700">
          If you receive a product in damaged condition, with tampered packaging, or broken before
          opening, please refuse the delivery and notify us immediately at {" "}
          <a href="mailto:triovation.co@gmail.com" className="text-blue-600">
            triovation.co@gmail.com
          </a>{" "}
          with your Order ID. For accepted deliveries, please share an unboxing video as proof in
          case of damage claims.
        </p>
      </section>
    </div>
  );
}