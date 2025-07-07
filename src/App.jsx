// Importações: libs, estilos e ícones que vão ser usados no app
import React from "react";
import photoSvg from './assets/photo.svg';
import html2pdf from "html2pdf.js";
import { createGlobalStyle } from "styled-components";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeflex/themes/primeone-light.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

// Estilos globais
export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--green-100);
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }
}
`;

const App = () => {
  // Dados
  const profileData = {
    photo: photoSvg, // Pode usar foto padrão ou de uma fonte externa
    name: "Jaime Castro",
    title: "Engenheiro de Software",
    content: [
      {
        icon: "ti-phone",
        name: "+55 12 3456-7890",
      },
      {
        icon: "ti-mail",
        name: "jaimecastro@mail.com",
      },
      {
        icon: "ti-brand-github",
        name: "github.com/jaimecastro",
      },
      {
        icon: "ti-map-pin",
        name: "São Paulo - SP",
      },
    ],
  };

  const aboutData = {
    icon: "ti-user",
    title: "Sobre mim",
    content:
      "Apaixonado por desafios, estou em constante busca pela excelência no desenvolvimento web. Sou comprometido em criar soluções eficazes e inovadoras. Trabalho bem em equipe e sou orientado para gerar resultados.",
  };

  const educationData = {
    icon: "ti-school",
    title: "Formação Acadêmica",
    content: [
      {
        degree: "Engenharia de software",
        details: "Especialização, 2019-2021\nUniversidade Borcelle",
      },
      {
        degree: "Design gráfico",
        details: "Graduação, 2014-2018\nUniversidade Hanover e Tavares",
      },
    ],
  };

  const skillsData = {
    icon: "ti-settings",
    title: "Habilidades",
    content: [
      {
        icon: "ti-code",
        name: "Desenvolvimento Web",
      },
      {
        icon: "ti-settings-check",
        name: "Gerenciamento de Projetos",
      },
      {
        icon: "ti-code-dots",
        name: "Principais Linguagens de Programação",
      },
      {
        icon: "ti-database",
        name: "Banco de Dados",
      }
    ],
  };

  const experienceData = {
    icon: "ti-briefcase",
    title: "Experiência Profissional",
    content: [
      {
        position: "Desenvolvedor Sênior",
        company: "Borcelle, 2021-2023",
        description:
          "Desenvolvimento de plataformas para web e mobile usando tecnologias front-end e back-end.",
      },
      {
        position: "Engenheiro de software",
        company: "Faustino, 2019-2020",
        description:
          "Projeto e desenvolvimento de sistemas escaláveis de gerenciamento de dados para diversos clientes.",
      },
      {
        position: "Gerente de Projetos",
        company: "Pense S.A., 2019",
        description:
          "Coordenação e liderança de equipes de desenvolvimento em projetos com foco no cumprimento de prazos.",
      },
      {
        position: "Desenvolvedor",
        company: "Hanover e Tavares, 2018",
        description:
          "Desenvolvimento de lógica de servidor robusta e eficiente para otimização de consultas de banco de dados.",
      },
      {
        position: "Engenheiro de Software",
        company: "Borcelle, 2017",
        description:
          "Suporte ao desenvolvimento de novos recursos para aplicativos de alto tráfego. Resolução de problemas.",
      },
    ],
  };

  // Define o favicon da aba do navegador
  const href = document.querySelector("link[rel*='icon']"),
        ext  = profileData.photo.split(".").pop().toLowerCase();

  const mimeSubtypes = {
    svg: "svg+xml",
    ico: "x-icon",
    png: "png",
    jpg: "jpeg",
    jpeg: "jpeg",
    gif: "gif",
    webp: "webp",
    bmp: "bmp",
  };

  if (href) {
    href.setAttribute("href", profileData.photo);
    href.setAttribute("type", `image/${mimeSubtypes[ext] || ext}`);
  }

  // Define o título da aba do navegador
  document.title = `${profileData.name} | Currículo`;

  // Adiciona fonts/ícones externos
  const links = [
    {
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap",
    },
    {
      href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css",
    },
  ];

  links.forEach(({ href }) => {
    const hostnameParts = new URL(href).hostname.split(".");
    const id = hostnameParts.slice(0, 2).join("-");

    if (!document.getElementById(id)) {
      Object.assign(document.head.appendChild(document.createElement("link")), {
        rel: "stylesheet",
        href,
        id,
      });
    }
  });

  // Gera o PDF do currículo
  const handleDownloadPdf = () => {
    const element = document.getElementById("cv-content");

    if (!element) {
      console.error("Dados não encontrados");
      return;
    }

    const classList = element.classList;

    const applyDownloadClasses = () => {
      classList.remove("md:w-9", "border-round-3xl");
      classList.add("w-full");
    };

    const restoreOriginalClasses = () => {
      classList.add("md:w-9", "border-round-3xl");
      classList.remove("w-full");
    };

    const showLoading = () => {
      let loadingDiv = document.createElement("div");
      loadingDiv.id = "loading-overlay";
      Object.assign(loadingDiv.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
        userSelect: "none",
      });
      loadingDiv.textContent = "Gerando currículo...";
      document.body.appendChild(loadingDiv);
    };

    const hideLoading = () => {
      const loadingDiv = document.getElementById("loading-overlay");
      if (loadingDiv) {
        loadingDiv.remove();
      }
    };

    const hideLoadingWithDelay = (startTime, minDuration = 2000) => {
      const elapsed = Date.now() - startTime;
      const remaining = minDuration - elapsed;
      if (remaining > 0) {
        setTimeout(hideLoading, remaining);
      } else {
        hideLoading();
      }
    };

    applyDownloadClasses();
    showLoading();

    const options = {
      margin: 0,
      filename: `Currículo de ${profileData.name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    const startTime = Date.now();

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => {
        console.log("Curriculum downloaded successfully");
        hideLoadingWithDelay(startTime, 3000);
        restoreOriginalClasses();
      })
      .catch((error) => {
        console.error("Failed to download curriculum:", error);
        hideLoadingWithDelay(startTime, 3000);
        restoreOriginalClasses();
      });
  };

  // Componente card
  const Card = ({ data, type }) => {
    const renderContent = () => {
      switch (type) {
        case "text":
          return <p className="text-600 line-height-3">{data.content}</p>;

        case "education":
          return (
            <div className="flex flex-column gap-4">
              {data.content.map((item, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-800 mb-2">{item.degree}</h4>
                  <div className="text-sm text-600">
                    {item.details.split("\n").map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );

        case "experience":
          return (
            <div className="flex flex-column gap-4">
              {data.content.map((item, index) => (
                <div
                  key={index}
                  className="pl-4 border-round-xl border-left-2 border-none border-solid border-green-400"
                >
                  <h4 className="font-semibold text-800 mb-2">
                    {item.position}
                  </h4>
                  <p className="text-sm font-medium mb-2 text-green-800">
                    {item.company}
                  </p>
                  <p className="text-600 text-sm line-height-3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          );

        case "skills":
          return (
            <div className="flex align-items-stretch flex-wrap gap-1">
              {data.content.map((item, index) => (
                <div
                  key={index}
                  className="flex align-items-center justify-content-center p-2 py-1 bg-green-700 border-round"
                >
                  <div className="flex gap-1 text-white">
                    <i
                      className={`${item.icon.split("-")[0]} ${item.icon}`}
                    ></i>
                    <span className="text-xs">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          );

        default:
          return (
            <div className="text-600 text-sm line-height-3">{data.content}</div>
          );
      }
    };

    return (
      <div className="bg-green-50 border-round-2xl p-4 shadow-2">
        <div className="flex align-items-center mb-4">
          <div
            className="flex align-items-center justify-content-center bg-green-100 mr-3 border-round-lg"
            style={{
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            <i
              className={`${data.icon.split("-")[0]} ${
                data.icon
              } text-3xl text-green-600`}
            ></i>
          </div>
          <h3 className="text-xl font-semibold text-800">{data.title}</h3>
        </div>
        {renderContent()}
      </div>
    );
  };

  return (
    <>
      {/* Aplica os estilos globais */}
      <GlobalStyle />

      <div
        className="relative min-h-screen w-full md:w-9 mx-auto shadow-8 border-round-3xl overflow-hidden"
        id="cv-content"
      >
        {/* Header */}
        <div
          className="relative overflow-hidden text-white min-h-full"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0d6860)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="absolute top-0 right-0 mr-8 mt-4 w-8rem h-8rem bg-white-alpha-10 border-circle"></div>
            <div className="absolute bottom-0 right-0 -mr-7 -mb-8 w-16rem h-16rem bg-white-alpha-10 border-circle"></div>
            <div className="absolute top-0 left-0 -ml-5 -mt-5 w-12rem h-12rem bg-white-alpha-10 border-circle"></div>
          </div>

          <div className="relative pt-5 px-6 pb-7 z-5">
            <div className="flex flex-column md:flex-row align-items-center justify-content-start md:justify-content-between flex-wrap gap-5">
              <div className="flex flex-column md:flex-row align-items-center gap-5">
                <Image
                  src={profileData.photo}
                  alt={profileData.name}
                  className="overflow-hidden w-9rem h-9rem block bg-white border-circle shadow-4 border-1 border-solid border-white"
                  imageClassName="w-full h-full border-circle p-1"
                  imageStyle={{ objectFit: "cover" }}
                />

                <div className="text-center md:text-left">
                  <div className="text-lg font-light mb-2">Olá, eu sou</div>
                  <h1 className="text-4xl font-bold mb-2">
                    {profileData.name}
                  </h1>
                  <p className="text-xl font-light opacity-90">
                    {profileData.title}
                  </p>
                </div>
              </div>

              {/* Contatos */}
              <div className="flex flex-row md:flex-column justify-content-center gap-3 font-light text-center md:text-right">
                {profileData.content.map((item, index) => (
                  <div key={index} className="flex align-items-center gap-2">
                    <i
                      className={`${item.icon.split("-")[0]} ${
                        item.icon
                      } text-3x1 md:text-xl`}
                    ></i>
                    <span className="hidden md:block">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Container */}
        <div className="relative surface-50 -mt-5 p-5 border-round-3xl border-noround-bottom">
          <h2 className="text-2xl font-light text-600 mb-5 text-center md:text-left hidden">
            Curriculum vitae
          </h2>

          {/* Cards */}
          <div className="grid">
            {/* Coluna da esquerda */}
            <div className="col-12 md:col-6">
              <div className="flex flex-column gap-4">
                <Card data={aboutData} type="text" />
                <Card data={educationData} type="education" />
                <Card data={skillsData} type="skills" />
              </div>
            </div>

            {/* Coluna da direita */}
            <div className="col-12 md:col-6">
              <Card data={experienceData} type="experience" />
            </div>
          </div>
        </div>
      </div>

      {/* Botão baixar currículo */}
      <Button
        label="Baixar currículo"
        icon="ti ti-download"
        onClick={handleDownloadPdf}
        className="fixed right-0 bottom-0 mb-5 mr-5 bg-green-700 border-none cursor-pointer p-3 border-circle shadow-4 z-5"
        pt={{
          label: { className: "hidden" },
          icon: { className: "text-white text-3xl" },
        }}
      />
    </>
  );
};

export default App;
