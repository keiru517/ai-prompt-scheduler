import { CreditCard } from "lucide-react";

export default function PageHeader() {
  return (
    <>
      {" "}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Billing & Subscription
          </h2>
        </div>
      </div>
    </>
  );
}
