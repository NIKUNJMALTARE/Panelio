import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import HeroSection from "../components/landing/HeroSection.jsx";
import AboutSection from "../components/landing/AboutSection.jsx";
import WhyChooseUs from "../components/landing/WhyChooseUs.jsx";
import ProjectsSection from "../components/landing/ProjectsSection.jsx";
import HappyClientsSection from "../components/landing/HappyClientsSection.jsx";
import ContactForm from "../components/landing/ContactForm.jsx";
import NewsletterSection from "../components/landing/NewsletterSection.jsx";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <AboutSection />
      <ProjectsSection />
      <HappyClientsSection />
      <ContactForm />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default LandingPage;