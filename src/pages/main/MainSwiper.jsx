import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axiosInstance from "../../api/youtubeAxios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from "react";
import '@css/MainSwiper.css'; // CSS 파일을 임포트합니다.

export default function MainSwiper() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance.get('/db')
      .then(res => {
        const firstFiveVideos = res.data.db[0].items.slice(0, 5);
        setVideos(firstFiveVideos);
      }).catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }} 
      >
        {videos.length > 0 ? (
          videos.map(data => (
            <SwiperSlide key={data.id} className="swiper-slide">
              <div className="video-card">
                <img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} className="video-thumbnail" />
                <h3 className="video-title">{data.snippet.title}</h3>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>에러임</p>
        )}
      </Swiper>
    </div>
  );
}
