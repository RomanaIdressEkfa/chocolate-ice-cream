import PageHero from '@/components/PageHero';
import ShopGrid from '@/components/ShopGrid';
import MediaBand from '@/components/MediaBand';

export const metadata = {
  title: 'Shop',
  description: 'Four small batch chocolate bars, churned and dipped every morning.',
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        video="/videos/nuts.mp4"
        eyebrow="Shop"
        lines={['Take a box', 'home.']}
        intro="Every bar is churned, dipped and packed the same morning it ships. Pick one, or take all four and decide later."
      />
      <ShopGrid />

      <MediaBand
        video="/videos/1-1.mp4"
        eyebrow="Made to order"
        lines={['Churned tonight,', 'yours tomorrow.']}
        body="Every box is packed in dry ice the morning it ships, so it reaches you as solid as it left the kitchen."
        cta={{ href: '/contact', label: 'Place an order' }}
      />
    </>
  );
}
