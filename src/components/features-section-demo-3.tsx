import { cn } from "@/lib/utils";
import {
  IconArrowsExchange,
  IconEaseInOut,
  IconFileInvoice,
  IconHelp,
  IconShieldCheck,
  IconTerminal2,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {


  const features = [
    {
      title: "Seamless Payments",
      description:
        "Automate transactions, split bills effortlessly, and make payments without friction.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Faster & Cheaper",
      description:
        "Experience near-instant transactions with low fees using blockchain technology.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Secure & Transparent",
      description:
        "Every payment is protected with smart contracts, multi-signature authentication, and encrypted transfers.",
      icon: <IconShieldCheck />,
    },
    {
      title: "Split Payments Made Easy",
      description:
        "Contribute with friends or colleagues to pay for bills, purchases, or services hassle-free.",
      icon: <IconUsers />,
    },
    {
      title: "Third-Party Payments",
      description:
        "Let someone else cover your payment without any complex processes.",
      icon: <IconArrowsExchange />,
    },
    {
      title: "Multi-Wallet Support",
      description:
        "Pay from multiple sources, combining funds from different wallets for a single transaction.",
      icon: <IconWallet />,
    },
    {
      title: "Business-Friendly",
      description:
        "Generate invoices, track payments, and receive funds with ease—perfect for businesses.",
      icon: <IconFileInvoice />,
    },
    {
      title: "24/7 Support",
      description:
        "Our team and AI-powered assistants are always available to help you with transactions.",
      icon: <IconHelp />,
    },
  ];



  return (
    <div className="mx-[10%] mt-6 mb-2">
      <h2 className="section-title">How payBeam Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10  ">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
