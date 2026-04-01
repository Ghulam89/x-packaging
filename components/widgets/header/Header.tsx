import { getBrandsAll } from "@/lib/api";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const brands = await getBrandsAll(300);
  return (
    <HeaderClient initialBrands={Array.isArray(brands) ? brands : []} />
  );
}
