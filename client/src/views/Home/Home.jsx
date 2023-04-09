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
    price: 10,
    image: "https://s1.eestatic.com/2022/04/12/elandroidelibre/moviles-android/664444069_223505499_1706x1698.jpg",
    stock: 18,
    year: 2022,
    enabled: true,
    brandId: 6,
    colorId: 1,
    storageCapacityId: 3
  },

  {
    id: 3,
    name: "Moto G Stylus 5G",
    description: "Carrier compatibility: AT&T: 4G, VoLTE 5G support planned via MR, Verizon: 5G sub6 NSA, VoLTE, T Mobile: 5G sub6 SA/NSA, VoLTE, WiFi Calling, Video Calling, Tracfone: GSM, CDMA, Spectrum: 5G sub6 NSA, VoLTE, WiFi Calling. Does not support: U.S.",
    price: 100,
    image: "https://m.media-amazon.com/images/I/41wKBxAos4L.jpg",
    stock: 6,
    year: 2021,
    enabled: true,
    brandId: 6,
    colorId: 5,
    storageCapacityId: 5
  },

  {
    id: 11,
    name: "IPhone 13 Pro",
    description: "Unlocked Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.",
    price: 300,
    image: "https://m.media-amazon.com/images/I/61jLiCovxVL.jpg",
    stock: 4,
    year: 2023,
    enabled: true,
    brandId: 7,
    colorId: 7,
    storageCapacityId: 7
  },

  {
    id: 17,
    name: "Mate 20 Pro",
    description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.",
    price: 130,
    image: "https://static.fnac-static.com/multimedia/Images/ES/NR/33/1e/48/4726323/1505-1.jpg",
    stock: 6,
    year: 2020,
    enabled: true,
    brandId: 4,
    colorId: 7,
    storageCapacityId: 5
  },

  {
    id: 16,
    name: "P30",
    description: "This is an unlocked international mobile phone and it may be used with any GSM network in the world that uses a frequency or band that this device supports. This phone/tablet will NOT work with Verizon, Sprint, Boost, or any other CDMA network. Wireless frequencies for 3G, 4G, and LTE vary by network",
    price: 153,
    image: "https://phonesdata.com/files/models/Huawei--P30-lite-932.jpg",
    stock: 15,
    year: 2020,
    enabled: true,
    brandId: 4,
    colorId: 5,
    storageCapacityId: 3
  },
  
  
  

    ];

  return (
    <div className="bg-slate-100 dark:bg-slate-900">
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
