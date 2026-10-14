import Certifications from '../components/Certifications'
import ChatWidget from '../components/ChatWidget'
import Clients from '../components/Clients'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Locations from '../components/Locations'
import Patients from '../components/Patients'
import Paths from '../components/Paths'
import MobileUnit from '../components/MobileUnit'
import Risks from '../components/Risks'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Technology from '../components/Technology'
import UnitsSlider from '../components/UnitsSlider'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { AudienceProvider } from '../context/audience'
import { useReveal } from '../hooks/useReveal'
import '../styles/landing.css'

export default function Home() {
  useReveal()

  return (
    <AudienceProvider>
      <Header />
      <main>
        <Hero />
        <Stats />
        <UnitsSlider />
        <Paths />
        <Risks />
        <Services />
        <MobileUnit />
        <Technology />
        <Clients />
        <Patients />
        <Certifications />
        <Locations />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppFloat />
    </AudienceProvider>
  )
}
