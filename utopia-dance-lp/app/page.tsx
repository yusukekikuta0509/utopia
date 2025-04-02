// app/page.tsx
import HeroSection from '@/components/HeroSection';
import ExecutiveGreeting from '@/components/ExecutiveGreeting';
import LogoDesign from '@/components/LogoDesign';
import DanceGenres from '@/components/DanceGenres';
import SpecialThanks from '@/components/SpecialThanks';
import MemberList from '@/components/MemberList';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExecutiveGreeting />
      <LogoDesign />
      <DanceGenres 
        id="1" 
        name="Contemporary Dance"
        choreographer="John Doe" 
        performers={["Alice", "Bob", "Charlie"]} 
      />
      <SpecialThanks />
      <MemberList />
      <Footer />
    </main>
  );
}
