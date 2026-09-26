import ScrollCues from '@/components/ScrollCues';
import Hero from '@/components/Hero';
import FocusPanel from '@/components/FocusPanel';
import Focus3D from '@/components/Focus3D';
import Story from '@/components/Story';
import Flavours from '@/components/Flavours';
import Showcase from '@/components/Showcase';
import Craft from '@/components/Craft';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <ScrollCues />
      <Hero />

      <FocusPanel
        id="nuts"
        side="right"
        video="/videos/nuts.mp4"
        eyebrow="The crunch"
        lines={['Whole hazelnuts,', 'roasted dark.']}
        body="Roasted in small trays until the skins crack and the oils come forward, then folded in whole. No paste, no sweepings, no shortcuts taken to make the bag go further."
        note="Roasted fresh every Tuesday morning."
      />

      <Focus3D
        id="cream"
        video="/videos/cream.mp4"
        eyebrow="The cream"
        lines={['Churned slow,', 'never whipped.']}
        body="Fresh cream goes in at dawn and turns for seventy two hours. Slow enough to stay dense, cold enough to hold its shape the moment it meets the chocolate."
        note="Four ingredients on the label. That is the whole list."
      />

      <Story />
      <Flavours />
      <Showcase />
      <Craft />
      <Contact />
    </>
  );
}
