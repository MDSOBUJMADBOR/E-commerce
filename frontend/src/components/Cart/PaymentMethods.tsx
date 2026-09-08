const PaymentMethods = () => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-sm font-semibold text-slate-700">
        We Accept
      </h3>

      <div className="grid grid-cols-4 gap-3">

        {/* VISA */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-sm font-bold text-blue-900">
          VISA
        </div>

        {/* MASTER CARD */}

        <div className="flex h-10 items-center justify-center rounded-lg border font-bold text-red-500">
          ●●
        </div>

        {/* AMEX */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-xs font-bold text-blue-700">
          AMEX
        </div>

        {/* PAYPAL */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-sm font-bold text-blue-800">
          PayPal
        </div>

        {/* BKASH */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-xs font-bold">
          bKash
        </div>

        {/* NAGAD */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-xs font-bold text-orange-500">
          Nagad
        </div>

        {/* APPLE PAY */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-sm font-bold">
           Pay
        </div>

        {/* GOOGLE PAY */}

        <div className="flex h-10 items-center justify-center rounded-lg border text-sm font-bold">
          G Pay
        </div>

      </div>
    </section>
  );
};

export default PaymentMethods;