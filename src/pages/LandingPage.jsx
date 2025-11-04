import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ima1 from "../imagenes/vetcare/ima1.png";
import ima2 from "../imagenes/vetcare/ima2.png";
import ima3 from "../imagenes/vetcare/ima3.png";
import landi1 from '../imagenes/landipage/landi1.png';
import landi2 from '../imagenes/landipage/landi2.png';
import landi3 from '../imagenes/landipage/landi3.png';
import book1 from '../imagenes/bookhive/book1.png';
import book2 from '../imagenes/bookhive/book2.png';
import book3 from '../imagenes/bookhive/book3.png';
import m1 from '../imagenes/mcdb/m1.png'
import m2 from '../imagenes/mcdb/m2.png'
import m3 from '../imagenes/mcdb/m3.png'


export default function LandingPage() {
  const projects = [
    {
      id: 1,
      title: "VetCare (Veterinaria completa)",
      subtitle: "Gestión: stock, ventas, alertas y cuentas",
      description:
        "Aplicación para veterinaria con gestión de inventario, ventas, alertas y cuentas de clientes. Frontend: React + Tailwind; Backend: Node.js + Express + MongoDB; Auth con JWT.",
      tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
      demo: "https://remarkable-cajeta-23ef55.netlify.app/",
      repo: "https://github.com/Dilanp10/tuamigofiel1",
      // Usamos las imágenes importadas acá
      images: [ima1, ima2, ima3],
    },
    {
      id: 2,
      title: "Mercadito Don Beto",
      subtitle: "Gestión para almacén (offline-ready)",
      description:
        "App para negocio: inventario, ventas, notas, ofertas, historial y cuentas. Frontend: React 18 + Vite + Tailwind; Backend: Node.js + SQLite (better-sqlite3).",
      tech: ["React 18", "Vite", "Tailwind", "SQLite", "Node.js", "Context API"],
      demo: "#",
      repo: "#",
      images: [m1,m2,m3],
    },
    {
      id: 3,
      title: "BookHive",
      subtitle: "Recomendaciones de libros personalizadas",
      description:
        "Plataforma para perfiles, recomendaciones por edad, favoritos y gestión de libros. Stack: React + Node + MongoDB. Auth con JWT.",
      tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
      demo: "https://radiant-monstera-2d8e15.netlify.app/",
      repo: "https://github.com/Dilanp10/bookhive",
      images: [ book1,book2,book3],
    },
    {
      id: 4,
      title: "Landing Veterinaria",
      subtitle: "Landing comercial para clínica veterinaria",
      description:
        "Landing page con hero, servicios, testimonios y formulario. Diseño cuidado y conversion-oriented.",
      tech: ["React", "Tailwind", "UI/UX"],
      demo: "https://candid-kringle-40eaf2.netlify.app/",
      repo: "https://github.com/Dilanp10/landepage-tuamigofiel",
      images: [landi1,landi2,landi3],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  // Glow cursor logic (igual que antes)
  const glowRef = useRef(null);
  const posRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    tx: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    ty: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    let sawFirstMove = false;

    const loop = () => {
      const p = posRef.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;

      if (glowRef.current) {
        const w = parseFloat(glowRef.current.dataset.w || "280");
        const h = parseFloat(glowRef.current.dataset.h || "280");
        glowRef.current.style.transform = `translate3d(${p.x - w / 2}px, ${p.y - h / 2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;
      if (!sawFirstMove) {
        console.log("Glow: mouse detected — debería moverse el efecto");
        sawFirstMove = true;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const addHoverListeners = () => {
      const triggers = document.querySelectorAll(".glow-trigger");
      triggers.forEach((el) => {
        const enter = () => {
          if (!glowRef.current) return;
          const size = el.dataset.glowSize || "540";
          glowRef.current.dataset.w = size;
          glowRef.current.dataset.h = size;
          glowRef.current.style.width = `${size}px`;
          glowRef.current.style.height = `${size}px`;
          glowRef.current.style.opacity = "0.8";
          const variant = el.dataset.glowVariant || "default";
          if (variant === "warm") {
            glowRef.current.style.background =
              "radial-gradient(circle at center, rgba(236,72,153,0.35), rgba(99,102,241,0.15) 45%, transparent 70%)";
          } else {
            glowRef.current.style.background =
              "radial-gradient(circle at center, rgba(99,102,241,0.35), rgba(236,72,153,0.20) 45%, transparent 70%)";
          }
        };
        const leave = () => {
          if (!glowRef.current) return;
          glowRef.current.dataset.w = "280";
          glowRef.current.dataset.h = "280";
          glowRef.current.style.width = `280px`;
          glowRef.current.style.height = `280px`;
          glowRef.current.style.opacity = "0.5";
          glowRef.current.style.background =
            "radial-gradient(circle at center, rgba(99,102,241,0.25), rgba(236,72,153,0.15) 40%, transparent 70%)";
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        el.__glowEnter = enter;
        el.__glowLeave = leave;
      });
    };

    const init = () => {
      if (glowRef.current) {
        const w = parseFloat(glowRef.current.dataset.w || "280");
        const h = parseFloat(glowRef.current.dataset.h || "280");
        glowRef.current.style.transform = `translate3d(${(window.innerWidth / 2) - w / 2}px, ${(window.innerHeight / 2) - h / 2}px, 0)`;
        glowRef.current.style.opacity = "0.5";
      }
    };

    setTimeout(() => {
      init();
      addHoverListeners();
    }, 20);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      const triggers = document.querySelectorAll(".glow-trigger");
      triggers.forEach((el) => {
        if (el.__glowEnter) el.removeEventListener("mouseenter", el.__glowEnter);
        if (el.__glowLeave) el.removeEventListener("mouseleave", el.__glowLeave);
      });
    };
  }, []);

  // --- Lightbox / contact modal state ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactProjectTitle, setContactProjectTitle] = useState(null);

  // Open demo: either navigate or show contact modal
  const handleOpenDemo = (p) => {
    const isDemoAvailable = p.demo && p.demo !== "#" && p.demo.trim() !== "";
    if (isDemoAvailable) {
      window.open(p.demo, "_blank", "noopener,noreferrer");
    } else {
      setContactProjectTitle(p.title);
      setContactModalOpen(true);
    }
  };

  // Lightbox handlers
  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images || []);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const nextImage = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  const prevImage = () =>
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);

  // keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 text-white antialiased relative">
      {/* Glow element */}
      <div
        ref={glowRef}
        data-w="280"
        data-h="280"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 280,
          height: 280,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10,
          opacity: 0.9,
          transform: `translate3d(${posRef.current.x - 210}px, ${posRef.current.y - 210}px, 0)`,
          transition: "opacity 220ms ease, width 320ms ease, height 320ms ease",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.25), rgba(236,72,153,0.15) 40%, transparent 70%)",
          filter: "blur(36px)",
          mixBlendMode: "screen",
        }}
        aria-hidden
      />

      {/* NAV */}
      <header className="backdrop-blur-sm bg-gray-800/70 border-b border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              DP
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Dilan Perea</h1>
              <p className="text-xs text-gray-300">Full Stack Developer — React & Node</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <a href="#projects" className="text-sm hover:underline hover:text-indigo-300 transition glow-trigger">
              Proyectos
            </a>
            <a href="#about" className="text-sm hover:underline hover:text-indigo-300 transition glow-trigger">
              Sobre mí
            </a>

            <a
              href="/CV_Dilan_Leonel_Perea.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-block px-4 py-2 rounded-full border border-indigo-500 text-indigo-300 text-sm font-semibold hover:shadow-md hover:bg-indigo-900/30 glow-trigger"
              data-glow-size="480"
            >
              Ver CV
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -left-20 -top-40 w-96 h-96 bg-gradient-to-tr from-pink-700/30 to-indigo-700/30 rounded-full filter blur-3xl opacity-40 transform rotate-12" />
        <div aria-hidden className="absolute right-0 top-20 w-80 h-80 bg-gradient-to-br from-yellow-600/20 to-pink-700/20 rounded-full filter blur-2xl opacity-30" />

        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Construyo proyectos digitales con{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">React</span>{" "}
              y diseño pensado.
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Transformo ideas en aplicaciones robustas: paneles de administración, tiendas, CRMs y landing pages. Código mantenible, UX accesible y despliegue listo para producción.
            </p>

            <div className="flex gap-4 items-center">
              <a
                href="#projects"
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transform transition glow-trigger"
                data-glow-size="620"
              >
                Ver proyectos
              </a>
              <a href="#about" className="inline-flex items-center gap-2 px-5 py-3 border border-gray-600 rounded-full font-semibold hover:bg-gray-800 transition glow-trigger">
                Contactar
              </a>
            </div>

            <motion.div className="mt-8 flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {["React", "Tailwind", "Node.js", "Express", "MongoDB", "SQLite", "JWT", "Bootstrap"].map((t) => (
                <span key={t} className="text-xs px-3 py-1 bg-gray-800/60 border border-gray-700 rounded-full shadow-sm backdrop-blur-sm glow-trigger">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="p-6 bg-gradient-to-tr from-gray-800 to-indigo-900/30 rounded-3xl shadow-2xl border border-gray-700/40">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">Portafolio</h4>
                    <p className="text-sm text-gray-400">Proyectos reales — code & demos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Disponible</p>
                    <p className="font-semibold">Full-time </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-800/60 rounded-lg border border-gray-700 glow-trigger">
                    <p className="text-xs text-gray-400">Proyectos</p>
                    <p className="font-semibold">4</p>
                  </div>
                  <div className="p-3 bg-gray-800/60 rounded-lg border border-gray-700 glow-trigger">
                    <p className="text-xs text-gray-400">Stack</p>
                    <p className="font-semibold">React + Node</p>
                  </div>
                  <div className="p-3 bg-gray-800/60 rounded-lg border border-gray-700 glow-trigger">
                    <p className="text-xs text-gray-400">Ubicación</p>
                    <p className="font-semibold">Argentina</p>
                  </div>
                  <div className="p-3 bg-gray-800/60 rounded-lg border border-gray-700 glow-trigger">
                    <p className="text-xs text-gray-400">Contacto</p>
                    <p className="font-semibold">dilanperea10@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* PROJECTS */}
      <motion.section id="projects" className="max-w-7xl mx-auto px-6 py-16" variants={container} initial="hidden" animate="visible">
        <h3 className="text-3xl font-bold mb-6">Algunos de los Proyectos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.article key={p.id} variants={item} whileHover={{ scale: 1.02 }} className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg overflow-hidden transform transition glow-trigger" data-glow-size="460">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-700/30 to-pink-700/30 rounded-full opacity-30 filter blur-2xl" />

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold shadow">{p.id}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">{p.subtitle}</p>

                  <p className="text-gray-300 text-sm mb-4">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 bg-gray-700/60 border border-gray-600 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Thumbnails (3 fotos) */}
                  <div className="flex gap-2 mb-4">
                    {(p.images || []).slice(0, 3).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => openLightbox(p.images, idx)}
                        className="w-20 h-12 rounded-lg overflow-hidden border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label={`Abrir imagen ${idx + 1} de ${p.title}`}
                      >
                        <img src={img} alt={`${p.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleOpenDemo(p)}
                      className="text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 font-semibold hover:shadow glow-trigger"
                      data-glow-size="420"
                    >
                      Ver demo
                    </button>

                    <a
                      href={p.repo && p.repo !== "#" ? p.repo : undefined}
                      onClick={(e) => {
                        if (!p.repo || p.repo === "#") {
                          e.preventDefault();
                          setContactProjectTitle(p.title + " (repositorio)");
                          setContactModalOpen(true);
                        }
                      }}
                      target={p.repo && p.repo !== "#" ? "_blank" : undefined}
                      rel={p.repo && p.repo !== "#" ? "noopener noreferrer" : undefined}
                      className={`text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                        p.repo && p.repo !== "#" ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow hover:scale-105 transform transition" : "border border-gray-600 text-gray-300"
                      } font-semibold`}
                    >
                      Repositorio
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* ABOUT */}
      <section id="about" className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Sobre mí</h3>
            <p className="text-gray-300 mb-4">
              Soy desarrollador Full Stack con experiencia en construir aplicaciones que se usan en producción. No tengo experiencia en empresa; todos los proyectos los creé yo mismo para clientes, y tengo muchísimas ganas de aprender y sumar mis conocimientos al equipo. Me enfoco en código limpio, diseño de APIs y experiencias de usuario accesibles. Trabajo con stacks SQL/NoSQL, autenticación segura y despliegues automatizados.
            </p>

            <ul className="grid grid-cols-2 gap-3 text-gray-300">
              <li className="text-sm">• Desarrollo de APIs REST</li>
              <li className="text-sm">• Integración JWT / Auth</li>
              <li className="text-sm">• Arquitectura de proyectos</li>
              <li className="text-sm">• Testing y validaciones</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a className="px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow hover:scale-105 transform transition glow-trigger" data-glow-size="520" href="/CV_Dilan_Leonel_Perea.pdf">
                Descargar CV
              </a>
              <a href="https://github.com/Dilanp10" className="px-5 py-3 rounded-full border border-gray-600 font-semibold glow-trigger">Ver GitHub</a>
            </div>
          </div>

          <aside className="p-6 bg-gradient-to-tr from-gray-800 to-indigo-900/30 rounded-2xl shadow-md border border-gray-700">
            <h4 className="font-semibold mb-2">Contacto</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:dilanperea10@gmail.com" className="text-sm font-medium glow-trigger">
               dilanperea10@gmail.com
              </a>
              <a href="tel:+5493834697224" className="text-sm font-medium glow-trigger">
                +54 9 3834 697224
              </a>
              <a href="https://www.linkedin.com/in/dilan-perea-485a38361/" className="text-sm font-medium glow-trigger">
                LinkedIn
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Dilan Perea. Todos los derechos reservados.</p>
          <div className="flex gap-3">
            <a href="https://github.com/Dilanp10" className="text-sm glow-trigger">GitHub</a>
            <a href="https://www.linkedin.com/in/dilan-perea-485a38361/" className="text-sm glow-trigger">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Lightbox modal (animated with framer-motion) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none z-30"
                aria-label="Cerrar imagen"
              >
                ✕
              </button>

              {/* main image */}
              <div className="w-full bg-black rounded-lg overflow-hidden">
                <motion.img
                  key={lightboxImages[lightboxIndex]}
                  src={lightboxImages[lightboxIndex]}
                  alt={`Imagen ${lightboxIndex + 1}`}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-[60vh] object-contain bg-black"
                />
              </div>

              {/* navigation */}
              {lightboxImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none"
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                </>
              )}

              {/* thumbnails */}
              <div className="mt-3 flex gap-2 justify-center">
                {lightboxImages.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`w-20 h-12 rounded overflow-hidden border ${i === lightboxIndex ? "ring-2 ring-indigo-500" : "border-gray-700"}`}
                    aria-label={`Seleccionar imagen ${i + 1}`}
                  >
                    <img src={thumb} alt={`thumb ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-2 text-center text-sm text-gray-300">{`${lightboxIndex + 1} / ${lightboxImages.length}`}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact modal for unavailable demo/repo */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ y: 12 }} animate={{ y: 0 }} exit={{ y: 12 }} className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-700">
              <h4 className="text-lg font-semibold mb-2">Demo no disponible</h4>
              <p className="text-sm text-gray-300 mb-4">
                La demo de <strong>{contactProjectTitle}</strong> no está disponible públicamente.
              </p>
              <p className="text-sm text-gray-300 mb-4">Si querés verla, contactame y te paso acceso o una presentación rápida:</p>
              <div className="flex flex-col gap-2 mb-4">
                <a href="mailto:dilanperea10@gmail.com" className="px-4 py-2 rounded-full bg-indigo-600 text-white text-center font-semibold">Enviar email</a>
                <a href="https://wa.me/5493834697224" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-gray-600 text-center">Contactar por WhatsApp</a>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setContactModalOpen(false)} className="px-4 py-2 rounded-full border border-gray-600 text-sm">Cerrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}