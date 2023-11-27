import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import bipin from '../../images/bipin.jpg';
import raj from '../../images/raj.jpg';
import roshan from '../../images/roshan.jpg';
import sumit from '../../images/sumit.jpg';
import niseem from '../../images/niseem.jpeg';
// import Dashboard from '../dashboard/Dashboard';

const Announcements = () => {
  return (
    <>
      <div className='bg-primary py-medium'>
        <div className='container mx-auto text-white px-large  flex flex-row items-center justify-between'>
          <h2 className='text-5xl'>ERStreamline</h2>
          <div className='px-4 py-2 bg-secondary border-2 border-secondary hover:shadow-lg hover:shadow-secondary-500/50 text-white rounded-full text-base transition-colors'>
            <Link to='/login'>Login</Link>
          </div>
          {/* <Link to='/patient/dashboard'>PATIENT</Link> */}
          {/* <Link to='/logout'>Logout</Link> */}
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='bg-background'>
          <div className='container mx-auto p-large'>
            <h3 className='mb-10 text-center font-bold text-3xl'>
              Hear what our users say
            </h3>
            <Swiper
              className='p-medium'
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation
              pagination={{ clickable: true }}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={bipin}
                    alt='Bipin'
                  />
                  <h6 className='font-semibold mb-2'>Patient, 25 years old</h6>
                  {/* <p className='text-primary mb-4'>ERStreamline</p> */}
                  <p>
                    "I've been a patient for the past year, and I can't speak
                    highly enough about the quality of care I've received. The
                    staff is not only professional but also incredibly
                    compassionate. They take the time to listen, explain things
                    thoroughly, and make me feel like I'm in capable hands. I'm
                    grateful to have found a healthcare provider that
                    prioritizes both expertise and empathy."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={raj}
                    alt='Raj'
                  />
                  <h6 className='font-semibold mb-2'>Patient, 19 years old</h6>
                  {/* <p className='text-primary mb-4'>ERStreamline</p> */}
                  <p>
                    "Choosing ERStreamline was one of the best decisions I've
                    made for my health. The personalized approach to my
                    treatment plan made a significant difference. The medical
                    team here goes above and beyond, making sure I understand my
                    options and supporting me every step of the way. It's not
                    just a healthcare facility; it feels like a place that
                    genuinely cares about its patients' well-being."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={roshan}
                    alt='Roshan'
                  />
                  <h6 className='font-semibold mb-2'>Patient, 28 years old</h6>
                  {/* <p className='text-primary mb-4'>ERStreamline</p> */}
                  <p>
                    "After struggling with a chronic condition for years, I
                    turned to ERStreamline, and it's been a game-changer. The
                    expertise of the medical professionals, coupled with the
                    latest technology, has made a noticeable impact on my
                    health. The collaborative and holistic approach to treatment
                    has not only improved my physical well-being but has also
                    positively influenced my overall quality of life."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={sumit}
                    alt='Sumit'
                  />
                  <h6 className='font-semibold mb-2'>Patient, 25 years old</h6>
                  {/* <p className='text-primary mb-4'>ERStreamline</p> */}
                  <p>
                    "From the moment I walked through the doors of ERStreamline,
                    I felt a sense of comfort and trust. The atmosphere is warm,
                    and the staff is friendly, which goes a long way in easing
                    any apprehensions. The doctors are not only highly skilled
                    but also excellent communicators. They take the time to
                    educate and involve patients in their healthcare journey,
                    fostering a sense of empowerment."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={niseem}
                    alt='Niseem'
                  />
                  <h6 className='font-semibold mb-2'>Patient, 25 years old</h6>
                  {/* <p className='text-primary mb-4'>ERStreamline</p> */}
                  <p>
                    "I've been a loyal patient at ERStreamline for over a
                    decade, and the consistently high standard of care has kept
                    me coming back. The dedication of the medical team to
                    staying abreast of the latest advancements in healthcare is
                    evident. The seamless integration of technology into their
                    practice has made processes efficient without sacrificing
                    the personal touch. I highly recommend ERStreamline to
                    anyone seeking top-notch medical care."
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
