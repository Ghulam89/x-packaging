 "use client";
import React, { useMemo } from "react";
import Tabs from "@/components/shared/ui/Tabs";
import ProducedCard from "@/components/entities/product/ui/ProducedCard";

export default function CustomPackagingProduced() {
  const customBox = useMemo(
    () => [
      {
        id: 1,
        title: "Price Quote",
        data: [
          { title: "Instant Price Quote", desc: "Get an instant price quote for your customized packaging project within 20 minutes. You can submit a form, email, or call us." },
          { title: "Price Matching", desc: "Match the price with your budget and let us know about it. We will try our best to give you the economical price quote." },
          { title: "Price Approval", desc: "Give us approval on the prices so that we can proceed with the order. You will find us the best in the custom packaging line." },
        ],
      },
      {
        id: 2,
        title: "Design Approval",
        data: [
          { title: "Mockup Designing", desc: "Send us your artwork so that we can design a 3D digital mockup of the box. If you have/are a designer, then you can ask for a dieline as well." },
          { title: "Artwork Revisions", desc: "If you find any mistakes or have any suggestions, ask for the revisions until satisfied." },
          { title: "Mockup Approval", desc: "After receiving the 3D digital mockup of the box, please give us approval on the mockup if everything looks good to you." },
        ],
      },
      {
        id: 3,
        title: "Payment",
        data: [
          { title: "Credit/Debit Card", desc: "Make the payment by requesting a payment link from your representative using your debit or credit card via a secure merchant." },
          { title: "Wire/ACH Transfer", desc: "Make the payment through ACH or Wire Transfer to our bank if best suited. Request our bank account details." },
          { title: "PayPal / Google Pay", desc: "Transfer the amount by requesting a PayPal invoice or use Google Pay." },
        ],
      },
      {
        id: 4,
        title: "Production",
        data: [
          { title: "Final Approval", desc: "We send a final specification sheet with all necessary details of your project for final approval." },
          { title: "Prototyping/Sampling", desc: "We do a sample run if requested or needed to make the best version of the final products. Approval required." },
          { title: "The Production", desc: "We start production after final approval or sample approval. The order is produced as per the committed time." },
        ],
      },
      {
        id: 5,
        title: "Shipping",
        data: [
          { title: "QC Analysis", desc: "After production, our quality control department operates the QC analysis to ensure quality." },
          { title: "Shipping", desc: "The order is shipped after QC. Tracking ID is provided with updates until delivery." },
          { title: "Customer’s Feedback", desc: "We urge customers to give feedback on the project delivered." },
        ],
      },
      {
        id: 6,
        title: "Recorders",
        data: [
          { title: "Dedicated Support Person", desc: "We appoint a dedicated support person to your upcoming projects to keep you in the loop." },
          { title: "Heavy Discounts", desc: "We inform you of bulk order, month-end, and occasional discounts to save big." },
          { title: "Ultimate Business Partnership", desc: "We provide the best to take this business relationship to new heights." },
        ],
      },
    ],
    []
  );

  const tabs = useMemo(
    () =>
      customBox.map((box) => ({
        title: box.title,
        content: <ProducedCard data={box.data} />,
      })),
    [customBox]
  );

  return (
    <section className="bg-[#F7F7F7] py-10">
      <div className="w-full max-w-[95%] sm:max-w-8xl sm:p-4 rounded-xl mx-auto">
        <div className="text-center pb-3 px-2">
          <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">5 Simple Steps to Get Your Custom Packaging</h2>
          <p className="py-3 text-gray-600">
            X Custom Packaging is a one-stop shop where you can meet your every packaging demand. We made order placement as easy as child’s play.
          </p>
        </div>
        <div className="w-full overflow-hidden">
          <Tabs defaultTab={"Price Quote"} className={"bg-white"} tabs={tabs} />
        </div>
      </div>
    </section>
  );
}
