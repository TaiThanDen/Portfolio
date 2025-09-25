import MouseSpotlightCard from "@/components/reusable-components/MouseSpotlightCard";
import { Spotlight } from "@/../components/uilayouts/main-spotlight";
import { useState } from "react";
import Modal from "@/components/reusable-components/Modal";
import thepngocphutai from "@/assets/projects/thepngocphutai.png";
import techzone from "@/assets/projects/techzone.png";
import AsmVue from "@/assets/projects/ASM_VUE_post.png";
import portfolio from "@/assets/projects/portfolio.png";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalSourceCode, setModalSourceCode] = useState("");
  const [modalWebsite, setModalWebsite] = useState("");

  const openModal = (
    img: string,
    title: string,
    content: React.ReactNode,
    sourceCode: string,
    website: string
  ) => {
    setModalImg(img);
    setModalTitle(title);
    setModalContent(content);
    setModalSourceCode(sourceCode);
    setModalWebsite(website);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const projectsData = [
    {
      image: thepngocphutai,
      title: "Thép Ngọc Phú Tài",
      desc: "A corporate website for Ngoc Phu Tai Steel Company, built to present the company's services, products, and news.",
      tags: ["Vue", "Tailwind", "Go", "My SQL"],
      website: "https://thepngocphutai.netlify.app/"
    },
    {
      image: "https://cineflexz.netlify.app/assets/cineflexLaptopIllustration-DDz6Um_B.jpg",
      title: "CineFlex",
      desc: "An online movie streaming website with a wide variety of films available for free; if you’re tired of watching ads, you can upgrade to a paid plan.",
      tags: ["React", "Type Script", "Java", "Tailwind", "My SQL"],
      sourceCode: "https://github.com/TaiThanDen/cineflex",
    },
    {
      image: techzone,
      title: "Tech Zone",
      desc: "An IoT-based healthcare project developed to measure and monitor heart rate using ESP32 and pulse sensors.",
      tags: ["Java", "Bootstrap", "SQL Server"],
      sourceCode: "https://github.com/TaiThanDen/TechZone",
    },
    {
      image: AsmVue,
      title: "ASM Vue",
      desc: "A social network built with Vue where users can post and comment on posts.",
      tags: ["Vue", "JavaScript", "Bootstrap"],
      sourceCode: "https://github.com/TaiThanDen/ASM_VUE",
    },
    {
      image: "https://github.com/TaiThanDen/Yoso-Breaking-News/blob/main/src/main/webapp/static/news/images/44b0e301-99bb-4181-8cff-4e1d2a65d2ce.png?raw=true",
      title: "Yoso Breaking News",
      desc: "A website that offers official news and also lets users read blog posts.",
      tags: ["Java", "Bootstrap", "SQL Server"],
      sourceCode: "https://github.com/TaiThanDen/Yoso-Breaking-News",
    },
    {
      image: portfolio,
      title: "Portfolio Website",
      desc: "A fully functional website designed to showcase my work and projects.",
      tags: ["React", "Tailwind", "Type Script", "Supbase", "Node JS"],
      sourceCode: "https://github.com/TaiThanDen/Portfolio",
      website: "https://taithandenportfolio.netlify.app/"
    }
  ];

  return (
    <section className="min-h-screen bg-[#18181b] py-20">
      <div className="max-w-7xl mx-auto px-6 cursor-pointer">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.
          </p>
        </div>

        <Spotlight
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
          ProximitySpotlight
          HoverFocusSpotlight
          CursorFlowGradient
        >
          {projectsData.map((project, index) => (
            <MouseSpotlightCard
              key={index}
              image={project.image}
              title={project.title}
              desc={project.desc}
              tags={project.tags}
              onClick={() =>
                openModal(
                  project.image,
                  project.title,
                  <p>{project.desc}</p>,
                  project.sourceCode || "",
                  project.website || ""
                )
              }
            />
          ))}
        </Spotlight>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          img={modalImg}
          sourceCode={modalSourceCode}
          website={modalWebsite}
        >
          {modalContent}
        </Modal>
      </div>
    </section>
  );
}