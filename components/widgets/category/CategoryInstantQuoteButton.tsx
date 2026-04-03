"use client";

import { useState } from "react";
import Button from "@/components/shared/ui/Button";
import InstantQuoteModal from "@/components/features/quote/ui/InstantQuoteModal";
import type { QuoteCategory } from "@/types";

type Props = {
  quoteCategory?: QuoteCategory | null;
};

export default function CategoryInstantQuoteButton({ quoteCategory = null }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        className="bg-[#2D5016] hover:bg-[#3A6B1F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        Get an Instant Quote
      </Button>
      <InstantQuoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        categoryData={quoteCategory ? { title: quoteCategory.title } : null}
      />
    </>
  );
}
