import React, { useEffect, useRef, useState, useCallback } from "react";
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
      demo: "https://funkabook.netlify.app/",
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  // === Glow cursor ===
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
        glowRef.current.style.transform = `translate3d(${p.x - w / 2}px, ${
          p.y - h / 2
        }px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;
      if (!sawFirstMove) sawFirstMove = true;
    };

    const onTouch = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      posRef.current.tx = t.clientX;
      posRef.current.ty = t.clientY;
      if (!sawFirstMove) sawFirstMove = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

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

        el.addEventListener("touchstart", enter, { passive: true });
        el.addEventListener("touchend", leave, { passive: true });

        el.__glowEnter = enter;
        el.__glowLeave = leave;
      });
    };

    const init = () => {
      if (glowRef.current) {
        const w = parseFloat(glowRef.current.dataset.w || "280");
        const h = parseFloat(glowRef.current.dataset.h || "280");
        glowRef.current.style.transform = `translate3d(${
          window.innerWidth / 2 - w / 2
        }px, ${window.innerHeight / 2 - h / 2}px, 0)`;
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
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);

      const triggers = document.querySelectorAll(".glow-trigger");
      triggers.forEach((el) => {
        if (el.__glowEnter)
          el.removeEventListener("mouseenter", el.__glowEnter);
        if (el.__glowLeave)
          el.removeEventListener("mouseleave", el.__glowLeave);

        el.removeEventListener("touchstart", el.__glowEnter);
        el.removeEventListener("touchend", el.__glowLeave);
      });
    };
  }, []);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactProjectTitle, setContactProjectTitle] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenDemo = (p) => {
    const isDemoAvailable =
      p.demo && p.demo !== "#" && p.demo.trim() !== "";

    if (isDemoAvailable) {
      window.open(p.demo, "_blank", "noopener,noreferrer");
    } else {
      setContactProjectTitle(p.title);
      setContactModalOpen(true);
    }
  };

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

  const nextImage = () =>
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);

  const prevImage = () =>
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);

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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const safeLinkProps = (url) =>
    url && url !== "#"
      ? { href: url, target: "_blank", rel: "noopener noreferrer" }
      : { href: "#" };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 text-white antialiased relative">
      {/* glow */}
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
          transform: `translate3d(${posRef.current.x - 210}px, ${
            posRef.current.y - 210
          }px, 0)`,
          transition:
            "opacity 220ms ease, width 320ms ease, height 320ms ease",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.25), rgba(236,72,153,0.15) 40%, transparent 70%)",
          filter: "blur(36px)",
          mixBlendMode: "screen",
        }}
        aria-hidden
      />

      {/* NAV */}
      <header className="backdrop-blur-sm bg-gray-800/70 border-b border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              DP
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Dilan Perea
              </h1>
              <p className="text-xs text-gray-300">
                Full Stack Developer — React & Node
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <a
              href="#projects"
              className="text-sm hover:underline hover:text-indigo-300 transition glow-trigger"
            >
              Proyectos
            </a>
            <a
              href="#about"
              className="text-sm hover:underline hover:text-indigo-300 transition glow-trigger"
            >
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

          {/* Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú"
              className="p-2 rounded-md bg-gray-800/60 border border-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800/80 border-t border-gray-700"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm"
                >
                  Proyectos
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm"
                >
                  Sobre mí
                </a>

                <a
                  href="/CV_Dilan_Leonel_Perea.pdf"
                  className="py-2 text-sm"
                >
                  Ver CV
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -left-20 -top-40 w-96 h-96 bg-gradient-to-tr from-pink-700/30 to-indigo-700/30 rounded-full filter blur-3xl opacity-40 transform rotate-12"
        />

        <div
          aria-hidden
          className="absolute right-0 top-20 w-80 h-80 bg-gradient-to-br from-yellow-600/20 to-pink-700/20 rounded-full filter blur-2xl opacity-30"
        />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Construyo proyectos digitales con{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                React
              </span>{" "}
              y diseño pensado.
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mb-6">
              Transformo ideas en aplicaciones robustas: paneles de
              administración, tiendas, CRMs y landing pages. Código
              mantenible, UX accesible y despliegue listo para producción.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <a
                href="#projects"
                className="w-full sm:w-auto text-center relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transform transition glow-trigger"
                data-glow-size="620"
              >
                Ver proyectos
              </a>

              <a
                href="#about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-600 rounded-full font-semibold hover:bg-gray-800 transition glow-trigger"
              >
                Contactar
              </a>
            </div>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                "React",
                "Tailwind",
                "Node.js",
                "Express",
                "MongoDB",
                "SQLite",
                "JWT",
                "Bootstrap",
              ].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 bg-gray-800/60 border border-gray-700 rounded-full shadow-sm backdrop-blur-sm glow-trigger"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gradient-to-tr from-gray-800 to-indigo-900/30 rounded-3xl shadow-2xl border border-gray-700/40"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">Portafolio</h4>
                    <p className="text-sm text-gray-400">
                      Proyectos reales — code & demos
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">Disponible</p>
                    <p className="font-semibold">Full-time</p>
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
                    <p className="font-semibold">
                      dilanperea10@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="max-w-7xl mx-auto px-6 py-12 md:py-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        {/* AVISO DE DEMOS LENTAS */}
        <div className="mb-6 p-4 rounded-xl bg-yellow-600/20 border border-yellow-500/40 text-yellow-300 text-sm">
          ⚠️ <b>Nota:</b> Las demos están desplegadas en hosting gratuito.
          <br />Al abrirlas por primera vez, <b>pueden tardar unos segundos
          en despertar y responder las peticiones HTTP</b>.  
          ¡Gracias por esperar!
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Algunos de los Proyectos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.article
              key={p.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg overflow-hidden transform transition glow-trigger"
              data-glow-size="460"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-700/30 to-pink-700/30 rounded-full opacity-30 filter blur-2xl" />

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold shadow">
                  {p.id}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">{p.subtitle}</p>

                  <p className="text-gray-300 text-sm mb-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 bg-gray-700/60 border border-gray-600 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* IMÁGENES miniatura */}
                  <div className="flex gap-2 mb-4">
                    {(p.images || [])
                      .slice(0, 3)
                      .map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => openLightbox(p.images, idx)}
                          className="w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label={`Abrir imagen ${idx + 1} de ${p.title}`}
                        >
                          <img
                            src={img}
                            alt={`${p.title} screenshot ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleOpenDemo(p)}
                      className="text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 font-semibold hover:shadow glow-trigger w-full sm:w-auto"
                      data-glow-size="420"
                    >
                      Ver demo
                    </button>

                    <a
                      {...safeLinkProps(p.repo)}
                      onClick={(e) => {
                        if (!p.repo || p.repo === "#") {
                          e.preventDefault();
                          setContactProjectTitle(
                            p.title + " (repositorio)"
                          );
                          setContactModalOpen(true);
                        }
                      }}
                      className={`text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                        p.repo && p.repo !== "#"
                          ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow hover:scale-105 transform transition"
                          : "border border-gray-600 text-gray-300"
                      } font-semibold w-full sm:w-auto`}
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

      {/* NOTA: no sigo pegando el ABOUT porque me cortaste el código aquí.
          Si querés te lo armo completo con el modal de contacto, lightbox, footer, etc. */}
    </div>
  );
}
