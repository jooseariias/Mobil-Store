import Header from "../../components/Header/Header"
import Carrucel from "../../components/Carrucel/Carrucel"
import Footer from '../../components/Footer/Footer'
import Slider from '../../components/Carrucel/Slider'

export default function Home(){

  const data = [
        
    {
    name: "Galaxy S23 ULTRA Phantom black",
    id: 16,
    description: "Forspoken narra la historia de Frey, una joven neoyorquina que acaba en el hermoso y cruel mundo de Athia. Mientras averigua cómo volver a casa, tendrá que usar sus nuevas dotes mágicas para recorrer paisajes enormes y enfrentarse a seres monstruosos.",
    released: "2023-01-24",
    img: "https://samsungar.vtexassets.com/arquivos/ids/186715-800-auto?width=800&height=auto&aspect=true",
    calification: "3",
    MinRequirements: "",
    RecommendRequirements: "",
    company: ["Luminous Productions"],
    genre: ["Action", "Adventure", "Rol"],
    price: 70,
    discount: 0,
  },
  
  {
    name: "IPHONE 13 PRO 512GB SILVER",
    id: 17,
    description: "Vuelve el clásico de terror y supervivencia de ciencia ficción, recreado completamente para ofrecer una experiencia más inmersiva (incluidas mejoras visuales, sonoras y de jugabilidad) al mismo tiempo que se mantiene fiel a la emocionante visión del juego original.",
    released: "2023-01-27",
    img: "https://www.megatone.net/images/Articulos/zoom2x/209/01/MKT0243ETC.jpg",
    calification: "4",
    MinRequirements: "",
    RecommendRequirements: "",
    company: ["Motive"],
    genre: ["Action", "Adventure"],
    price: 60,
    discount: 0,
  },

  {
    name: "Moto G52",
    id: 15,
    description: "En Watch Dogs: Legion, tu misión es crear una resistencia para salvar a Londres de la debacle en un futuro próximo.",
    released: "2023-01-26",
    img: "https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/g/5/g52-negro-frente_1.png",
    calification: "3",
    MinRequirements: "",
    RecommendRequirements: "",
    company: ["Ubisoft Toronto"],
    genre: ["Action", "Adventure"],
    price: 60,
    discount: 0,
  },


  {
    name: "Moto G Stylus 5G",
    id: 17,
    description: "Vuelve el clásico de terror y supervivencia de ciencia ficción, recreado completamente para ofrecer una experiencia más inmersiva (incluidas mejoras visuales, sonoras y de jugabilidad) al mismo tiempo que se mantiene fiel a la emocionante visión del juego original.",
    released: "2023-01-27",
    img: "https://m.media-amazon.com/images/I/51hT7btpukL._AC_SY355_.jpg",
    calification: "4",
    MinRequirements: "",
    RecommendRequirements: "",
    company: ["Motive"],
    genre: ["Action", "Adventure"],
    price: 60,
    discount: 0,
  },

  {
    name: "Moto G Stylus 5G",
    id: 17,
    description: "Vuelve el clásico de terror y supervivencia de ciencia ficción, recreado completamente para ofrecer una experiencia más inmersiva (incluidas mejoras visuales, sonoras y de jugabilidad) al mismo tiempo que se mantiene fiel a la emocionante visión del juego original.",
    released: "2023-01-27",
    img: "https://m.media-amazon.com/images/I/51hT7btpukL._AC_SY355_.jpg",
    calification: "4",
    MinRequirements: "",
    RecommendRequirements: "",
    company: ["Motive"],
    genre: ["Action", "Adventure"],
    price: 60,
    discount: 0,
  },
  

    ];

  return (
    <div className="">
      <Header />
      <Carrucel />

      <div class="bg-cover bg-no-repeat">
        <Slider data={data} tittle={"Tendencies"} />
      </div>

    </div>
  )
}
