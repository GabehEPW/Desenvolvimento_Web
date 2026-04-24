import Header from "./components/Header";
import Article from "./components/Article";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const post = {
    titulo: "Os Melhores Jogos de 2026",
    data: "28 de Fevereiro de 2026",
    conteudo1:
      "2026 tem sido um ano incrível para os amantes de jogos, com lançamentos que estão conquistando os corações dos jogadores. Desde jogos de ação até RPGs épicos, há algo para tudo e todos.",
    conteudo2:
      "Além disso, as expansões de jogos populares estão trazendo ainda mais conteúdo e emoção para os jogadores.",
    imagem:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3764200/ce5437442768e38eb575f205ab9397d0264017b0/header.jpg",
    legenda: "Resident Evil Requiem",
  };

  return (
    <div className="container">
      <Header />
      <main>
        <Article post={post} />
      </main>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;