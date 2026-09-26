import PageHero from '@/components/PageHero';
import AboutPanels from '@/components/AboutPanels';
import MediaBand from '@/components/MediaBand';

export const metadata = {
  title: 'About us',
  description: 'A small kitchen, one churn and a recipe that has not moved in ten years.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        video="/videos/1-1.mp4"
        eyebrow="About us"
        lines={['A small kitchen', 'with one obsession.']}
        intro="We make chocolate ice cream and very little else. This is how that happens, and why we have never been in a hurry to grow out of it."
      />
      <AboutPanels />

      <MediaBand
        video="/videos/nuts.mp4"
        eyebrow="Come and see"
        lines={['The door is', 'usually open.']}
        body="We are a small kitchen in Mirpur and we like visitors. Say hello before you come and there will be something on a spoon waiting."
        cta={{ href: '/contact', label: 'Get in touch' }}
      />
    </>
  );
}
