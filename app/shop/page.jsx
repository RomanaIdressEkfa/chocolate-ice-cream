import PageHero from '@/components/PageHero';
import ShopGrid from '@/components/ShopGrid';

export const metadata = {
  title: 'Shop',
  description: 'Four small batch chocolate bars, churned and dipped every morning.',
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        lines={['Take a box', 'home.']}
        intro="Every bar is churned, dipped and packed the same morning it ships. Pick one, or take all four and decide later."
      />
      <ShopGrid />
    </>
  );
}
