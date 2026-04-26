import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import { ThemeProvider } from "next-themes";
import ExpandOnHover from "../components/ui/expand-cards";
import { Logos3 } from "../components/ui/logos3";
import { Loader } from "../components/ui/loader";
import { ContactForm } from "../components/ui/contact-form";
import { AboutMe } from "../components/ui/connoisseur-stack-interactor";
import { DottedSurface } from "../components/ui/dotted-surface";
import "./index.css";

const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const dottedBgRoot = document.getElementById("dotted-bg-root");
if (dottedBgRoot) {
  createRoot(dottedBgRoot).render(
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <DottedSurface style={{ zIndex: 0 }} />
      </ThemeProvider>
    </StrictMode>,
  );
}

const loaderRoot = document.getElementById("loader-root");
if (loaderRoot) {
  createRoot(loaderRoot).render(
    <StrictMode>
      <Loader />
    </StrictMode>,
  );
}

const projectsRoot = document.getElementById("projects-root");
if (projectsRoot) {
  createRoot(projectsRoot).render(
    <StrictMode>
      <ExpandOnHover />
    </StrictMode>,
  );
}

const skillsRoot = document.getElementById("skills-root");
if (skillsRoot) {
  createRoot(skillsRoot).render(
    <StrictMode>
      <Logos3 />
    </StrictMode>,
  );
}

const aboutRoot = document.getElementById("about-root");
if (aboutRoot) {
  createRoot(aboutRoot).render(
    <StrictMode>
      <AboutMe />
    </StrictMode>,
  );
}

const contactRoot = document.getElementById("contact-root");
if (contactRoot) {
  createRoot(contactRoot).render(
    <StrictMode>
      <ContactForm />
    </StrictMode>,
  );
}


