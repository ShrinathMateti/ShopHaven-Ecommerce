import SectionHeading from "./SectionsHeading/SectionHeading";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./NewArrivals.css";
import Jeans from "../../assets/img/jeans.jpg";
import Shirts from "../../assets/img/shirts.jpg";
import Tshirt from "../../assets/img/tshirts.jpeg";
import Dresses from "../../assets/img/dresses.jpg";
import Joggers from "../../assets/img/joggers.jpg";
import Kurtis from "../../assets/img/kurtis.jpg";

const items = [
  { title: "Jeans", imagePath: Jeans },
  { title: "Shirts", imagePath: Shirts },
  { title: "T-Shirts", imagePath: Tshirt },
  { title: "Dresses", imagePath: Dresses },
  { title: "Joggers", imagePath: Joggers },
  { title: "Kurtis", imagePath: Kurtis },
];

const NewArrivals = () => {
  return (
    <section className="my-8">
      <SectionHeading title="New Arrivals" />

      <div className="px-6 relative">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={`${item.title}-${index}`}>
              
              {/* Netflix-style hover wrapper */}
              <div className="group relative transition-all duration-300 
                              hover:scale-105 hover:z-20 hover:shadow-2xl">

                <Card
                  title={item.title}
                  imagePath={item.imagePath}
                />
             
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;