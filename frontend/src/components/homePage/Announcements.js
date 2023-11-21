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
      <div className='container mx-auto p-large'>
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
                  <h6 className='font-semibold mb-2'>Co-founder</h6>
                  <p className='text-primary mb-4'>ERStreamline</p>
                  <p>
                    "Thank you so much for your excellent service and
                    consideration. We stopped in for an unplanned asthma check
                    and you got my son in quickly. It is great to know we have
                    such an amazing health care facility right around the corner
                    from us. All of the staff are excellent."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={raj}
                    alt='Bipin'
                  />
                  <h6 className='font-semibold mb-2'>Co-founder</h6>
                  <p className='text-primary mb-4'>ERStreamline</p>
                  <p>
                    "Thank you so much for your excellent service and
                    consideration. We stopped in for an unplanned asthma check
                    and you got my son in quickly. It is great to know we have
                    such an amazing health care facility right around the corner
                    from us. All of the staff are excellent."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={roshan}
                    alt='Bipin'
                  />
                  <h6 className='font-semibold mb-2'>Co-founder</h6>
                  <p className='text-primary mb-4'>ERStreamline</p>
                  <p>
                    "Thank you so much for your excellent service and
                    consideration. We stopped in for an unplanned asthma check
                    and you got my son in quickly. It is great to know we have
                    such an amazing health care facility right around the corner
                    from us. All of the staff are excellent."
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex flex-col items-center'>
                  <img
                    className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                    src={sumit}
                    alt='Bipin'
                  />
                  <h6 className='font-semibold mb-2'>Co-founder</h6>
                  <p className='text-primary mb-4'>ERStreamline</p>
                  <p>
                    "Thank you so much for your excellent service and
                    consideration. We stopped in for an unplanned asthma check
                    and you got my son in quickly. It is great to know we have
                    such an amazing health care facility right around the corner
                    from us. All of the staff are excellent."
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
