
import {
  Truck,
  LockKeyhole,
  RotateCcw,
  Headset,
} from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

const benefits: Benefit[] = [
  {
    title: "Free Shipping",
    description: "On all orders over $50",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: LockKeyhole,
  },
  {
    title: "Easy Return",
    description: "30 days return policy",
    icon: RotateCcw,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support",
    icon: Headset,
  },
];

const ServiceBenefits = () => {
  return (
    <section className="w-full bg-white py-5">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-4
          "
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  flex
                  min-h-[76px]
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-4
                  transition-all
                  duration-200
                  hover:border-gray-300
                  hover:shadow-md
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-50
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="text-green-600"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className=" font-semibold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-[11px] leading-4 text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;