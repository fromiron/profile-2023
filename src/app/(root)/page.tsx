import AboutSection from "./about";
import ContactSection from "./contact";
import SkillSection from "./skill";
import TopSection from "./top";
import WorkSection from "./work";

export default function Home() {
  return (
    <>
      <TopSection />
      <AboutSection />
      <SkillSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
