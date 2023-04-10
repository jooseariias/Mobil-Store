import Header from "../../components/Header/Header"
import Carrucel from "../../components/Carrucel/Carrucel"
import Footer from '../../components/Footer/Footer'
import Slider from '../../components/Carrucel/Slider'

export default function Home(){

  const data = [  

    {
      id: 1,
      name: "Moto G52",
      description: "It has 6 GB of RAM, 128 GB of internal storage and an ultra-fast Octa Core processor, great performance for gaming and streaming videos..",
      price: 70,
      image: "https://s1.eestatic.com/2022/04/12/elandroidelibre/moviles-android/664444069_223505499_1706x1698.jpg",
      stock: 25,
      year: 2022,
      enabled: true,
      brandId: 6,
      brand: {
        id: 6,
        name: "Motorola",
        logo: "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
      },
      colorId: 1,
      storageCapacityId: 3
    },

    {
      id: 3,
      name: "Moto G Stylus 5G",
      description: "Carrier compatibility: AT&T: 4G, VoLTE 5G support planned via MR, Verizon: 5G sub6 NSA, VoLTE, T Mobile: 5G sub6 SA/NSA, VoLTE, WiFi Calling, Video Calling, Tracfone: GSM, CDMA, Spectrum: 5G sub6 NSA, VoLTE, WiFi Calling. Does not support: U.S.",
      price: 100,
      image:"https://m.media-amazon.com/images/I/41wKBxAos4L.jpg",
      stock: 7,
      year: 2021,
      enabled: true,
      brandId: 6,
      brand: {
        id: 6,
        name: "Motorola",
        logo: "https://www.cordobadigital.net/wp-content/uploads/2017/08/Motorola-logo-C3DDCBA822-seeklogo.com_.png"
      },
      colorId: 5,
      storageCapacityId: 5
    },

    {
      id: 5,
      name: "iPhone SE 2020",
      description: "",
      price: 200,
      image: "https://d1eh9yux7w8iql.cloudfront.net/product_images/347172_c1921907-2134-4618-a53e-e60283bf9fb5.jpg",
      stock: 25,
      year: 2020,
      enabled: true,
      brandId: 7,
      brand: {
        id: 7,
        name: "Apple",
        logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CA",
      },
      colorId: 3,
      storageCapacityId: 3
    },

    {
      id: 9,
      name: "POCO M3",
      description: "LONG LASTING BATTERY: Stay ready for today’s surprises with the fast charging,* long-lasting battery of Galaxy A14 5G; Confidently handle work while on the go and play your favorite games with a battery that gives your charger a break",
      price: 150,
      image:"https://cdn.shopify.com/s/files/1/0253/6472/5856/products/celular-xiaomi-poco-m3-64gb_600x600.jpg?v=1638200116",
      stock: 30,
      year: 2020,
      enabled: true,
      brandId: 1,
      brand: {
        name:'Xiaomi', 
        logo:'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$'
      },
      colorId: 5,
      storageCapacityId: 4
    },

    {
      id: 11,
      name: "iPhone 13 Pro",
      description: "Unlocked Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.",
      price: 300,
      image:"https://www.macstation.com.ar/img/productos/2599-2.jpg",
      stock: 4,
      year: 2023,
      enabled: true,
      brandId: 7,
      brand: {
        id:7 ,
        name: 'Apple',
        logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0oB4mcJKRwvUTySReKWZX5l2kqAXzTxMmRMdBFxucWGX_449WCjGYLAa5SgvzGnesg4&usqp=CAU"
      },
      colorId: 7,
      storageCapacityId: 7
    },
  
    ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Header />
      <Carrucel />

      <div class="bg-cover bg-no-repeat mb-5">
        <Slider data={data} tittle={"Tendencies"} />
        <Slider data={data} tittle={"Best sellers"} />
        <Slider data={data} tittle={"Offers of the month"} />
      </div>

      <Footer />

    </div>
  )
}
