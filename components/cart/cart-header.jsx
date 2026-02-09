import { useRouter } from "next/router";
import { CheckIcon } from "lucide-react";
import {useTranslations} from "next-intl";

export default function CartHeader({ title }) {
  const router = useRouter();
  const t = useTranslations('index');

  const steps = [
    { id: 1, title: t('shoppingCart'), path: "/cart" },
    { id: 2, title: t('checkoutDetails'), path: "/checkout/addresses" },
    { id: 3, title: t('payment'), path: "/checkout/payment" },
  ];

  const getCurrentStep = () => {
    if (router.pathname.startsWith("/cart")) return 1;
    if (router.pathname.startsWith("/checkout/addresses")) return 2;
    if (router.pathname.startsWith("/checkout/payment")) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8">
      <h2 className="font-bold text-[25px]">{title}</h2>
      <div className="flex justify-between items-center w-full px-60">
        {steps.map((step) => (
          <button
            onClick={() => router.push(step.path)}
            disabled={step.id > currentStep}
            key={step.id}
            className={`flex justify-center items-center gap-4 ${
              currentStep === step.id ? "text-primary" : ""
            }`}
            href={step.path}
          >
            <div
              className={`size-[54px] flex text-white justify-center items-center rounded-full ${
                currentStep === step.id || currentStep > step.id
                  ? "bg-primary"
                  : "bg-slate-600"
              }`}
              key={step.id}
            >
              {currentStep > step.id ? (
                <CheckIcon className="w-8 text-white" />
              ) : (
                step.id
              )}
            </div>
            <p>{step.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
