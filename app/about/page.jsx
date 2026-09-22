import PageHero from '@/components/PageHero';
import AboutPanels from '@/components/AboutPanels';

export const metadata = {
  title: 'About us',
  description: 'A small kitchen, one churn and a recipe that has not moved in ten years.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={['A small kitchen', 'with one obsession.']}
        intro="We make chocolate ice cream and very little else. This is how that happens, and why we have never been in a hurry to grow out of it."
      />
      <AboutPanels />
    </>
  );
}
