import { useEffect, useState } from "react";
import "./App.css";
import { useInView } from "react-intersection-observer";
import Navbar from "./sections/Navbar";
import Introduction from "./sections/Introduction";
import Knowledge from "./sections/Knowledge";
import Experiences from "./sections/Experiences";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

import { FloatingMenu } from "./components";
import { MdFavorite } from "react-icons/md";

import { PT, EN, ES, DE } from "./docs";

import brasil from "./assets/brasil.svg";
import alemanha from "./assets/alemanha.svg";
import espanha from "./assets/espanha.svg";
import estadosUnidos from "./assets/estados-unidos.svg";
import Resume from "./sections/Resume";

const options = [
  {
    value: "en",
    label: (
      <img
        src={estadosUnidos}
        alt="estadosUnidos"
        style={{ cursor: "pointer" }}
      />
    ),
  },
  {
    value: "de",
    label: <img src={alemanha} alt="alemanha" style={{ cursor: "pointer" }} />,
  },
  {
    value: "pt",
    label: <img src={brasil} alt="brasil" style={{ cursor: "pointer" }} />,
  },
  {
    value: "es",
    label: <img src={espanha} alt="espanha" style={{ cursor: "pointer" }} />,
  },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function App() {
  const [language, setLanguage] = useState(options[0]);
  const [texts, setTexts] = useState(EN);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (language.value === "en") setTexts(EN);
    if (language.value === "de") setTexts(DE);
    if (language.value === "pt") setTexts(PT);
    if (language.value === "es") setTexts(ES);
  }, [language]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div className="main">
      <div ref={ref} style={{ width: "100%" }}>
        <Navbar
          language={language}
          setLanguage={setLanguage}
          options={options}
          texts={texts}
          windowWidth={windowDimensions.width}
        />
      </div>

      {!inView && <FloatingMenu texts={texts} />}

      <Introduction texts={texts} />

      <Experiences texts={texts} />

      <Projects texts={texts} />

      <Knowledge texts={texts} />

      {texts.menu.menuOptions[6] && <Resume texts={texts} />}

      <Contact texts={texts} />

      <footer>
        <p>
          {texts.footer.part1} {<MdFavorite color="red" />} {texts.footer.part2}
        </p>
      </footer>
    </div>
  );
}

export default App;
