import ScrollCues from '@/components/ScrollCues';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Flavours from '@/components/Flavours';
import Craft from '@/components/Craft';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <ScrollCues />
      <Hero />
      <Story />
      <Flavours />
      <Craft />
      <Contact />
    </>
  );
}
