import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Cancellation & Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Order Cancellation</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>For customized products, cancellations must be made within <strong>1 hour</strong> of placing the order.</li>
          <li>For non-customized products, cancellations must be made within <strong>2 hours</strong> of placing the order.</li>
          <li>To cancel an order, please email us at <a href="mailto:support@triovation.in" className="text-blue-600">support@triovation.in</a> with your order number in the subject line.</li>
          <li>Once the order is processed or dispatched, cancellations are no longer possible. Customized products cannot be refunded. For non-customized products, you may refuse delivery at the doorstep and inform us via email.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Return Policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Only retail orders of up to 3 pieces are eligible for return.</li>
          <li>Returns must be requested within <strong>3 days</strong> of receiving the order.</li>
          <li>Returns are applicable only if the product is in bad condition, has tampered packaging, or is damaged before opening.</li>
          <li>Please refuse delivery in such cases and notify us immediately.</li>
          <li>If damage is found after receiving, kindly share a video of the unboxing as proof while raising the return request.</li>
        </ul>
        <p className="mt-3 text-gray-700">Note: Returns are not applicable for bulk or corporate orders and customized products.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>For prepaid orders (customized and non-customized), refunds will be processed within <strong>24 hours</strong> of order cancellation and credited back to the same payment source.</li>
          <li>For COD orders, customers must share bank account details. Refunds will be processed within <strong>7–10 working days</strong> or via PayTM.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p>For cancellations, returns, or refunds:</p>
        <ul className="mt-2 space-y-1">
          <li>📧 <a href="mailto:support@triovation.in" className="text-blue-600">support@triovation.in</a></li>
        </ul>
      </section>
    </div>
  );
};

export default CancellationRefundPolicy;
