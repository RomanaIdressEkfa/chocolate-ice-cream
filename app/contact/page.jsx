import PageHero from '@/components/PageHero';
import ContactPanel from '@/components/ContactPanel';

export const metadata = {
  title: 'Contact',
  description: 'Send us a note about an order, wholesale, or anything chocolate.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        video="/videos/1-1.mp4"
        eyebrow="Contact"
        lines={['Let us talk', 'chocolate.']}
        intro="Questions about an order, a wholesale list, or which bar to start with. Send a note and a real person will answer it."
      />
      <ContactPanel />
    </>
  );
}
