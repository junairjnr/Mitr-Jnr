"use client";

import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Mitra from "../../assets/d_biz.png";
import Link from "next/link";
import { useQuery } from "react-query";
import { get } from "@/api/api-request";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Scrollbar,
  A11y,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

export default function Dashboard() {
  const { data: ads } = useQuery(["ads"], () =>
    get("AdsApi/ads").then((res) => res)
  );

  const { data: dash, isLoading } = useQuery(["dashboard/index/"], () =>
    get("dashboard/index/").then((res) => res.data)
  );
  const [search, setSearch] = useState("");
  const serviceList = dash?.serviceHeadModelList.filter((x: any) => {
    if (!search) {
      return true;
    }
    return x.name.toLowerCase().includes(search.toLowerCase());
  });
  const slideActiveRef = useRef(0);

  return (
    <div className="w-full h-[100vh] bg-gray-100 overflow-auto">
      <div className="w-full h-full bg-gray-100 pt-[100px]">
        <div className="w-full h-[100px] bg-blue-600 flex justify-center items-center p-3 fixed top-0 left-0 z-10">
          <div className="h-[40px] w-full  bg-gray-100 flex items-center rounded-xl">
            <div
              className="w-[50px] h-full bg-gray-100 flex justify-center items-center
           rounded-tl-lg rounded-bl-lg"
            >
              <BsSearch className="fill-slate-700" size={20} />
            </div>
            <input
              placeholder="Search Service...."
              className="h-full w-full outline-none bg-gray-100 rounded-tr-lg rounded-br-lg"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
        <div className="flex justify-center items-center p-5">
          <Swiper
            onSlideChange={(e) => (slideActiveRef.current = e.activeIndex)}
            className="flex flex-col w-full justify-center items-center h-[200px] rounded-md border
             shadow shadow-[#7b7878] bg-orange-900"
            modules={[
              Navigation,
              Scrollbar,
              A11y,
              EffectFade,
              Pagination,
              Autoplay,
            ]}
            autoplay
            spaceBetween={50}
            slidesPerView={1}
          >
            {ads?.data.map((item: any, index: any) => (
              <SwiperSlide key={index} className="w-full h-full">
                <Image
                  alt=""
                  src={"https://" + item.fileName}
                  height={200}
                  width={200}
                  className="w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {isLoading && (
          <div className="w-full h-[400px] flex justify-center items-center bg-gray-100  absolute">
            <CgSpinner className="loading-icon fill-orange-700" size={70} />
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-3 p-3 pb-20">
          {serviceList?.map((item: any, index: any) => (
            <div
              key={index}
              className="w-full h-[150px] bg-white rounded-xl flex flex-col justify-center p-5 items-center gap-5"
            >
              <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-2">
                <Image alt="" src={Mitra} width={60} height={60} />
                <p className="text-[14px] text-gray-600 font-bold font-sans">
                  {item.name}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  href={{
                    pathname: "dashboard/" + item.id,
                    query: { list: JSON.stringify(item) },
                  }}
                >
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <p className="text-[14px] font-bold font-sans text-violet-700">
                      View Service
                    </p>
                    <FaAngleRight
                      className="mt-1 font-bold text-gray-600"
                      size={20}
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))}

          {/* <div className="w-full h-[150px] bg-white rounded-xl flex flex-col justify-center p-10 items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-2">
              <Image alt="" src={Mitra} width={60} height={60} />
              <p className="text-[14px] font-bold font-sans">VILLAGE SERVICE</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-1 justify-center items-center">
                <p className="text-[14px] font-bold font-sans text-violet-700">
                  View Service
                </p>
                <FaAngleRight
                  className="mt-1 font-bold text-gray-600"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[150px] bg-white rounded-xl flex flex-col justify-center p-10 items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-2">
              <Image alt="" src={Mitra} width={60} height={60} />
              <p className="text-[14px] font-bold font-sans">VILLAGE SERVICE</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-1 justify-center items-center">
                <p className="text-[14px] font-bold font-sans text-violet-700">
                  View Service
                </p>
                <FaAngleRight
                  className="mt-1 font-bold text-gray-600"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[150px] bg-white rounded-xl flex flex-col justify-center p-10 items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-2">
              <Image alt="" src={Mitra} width={60} height={60} />
              <p className="text-[14px] font-bold font-sans">VILLAGE SERVICE</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-1 justify-center items-center">
                <p className="text-[14px] font-bold font-sans text-violet-700">
                  View Service
                </p>
                <FaAngleRight
                  className="mt-1 font-bold text-gray-600"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[150px] bg-white rounded-xl flex flex-col justify-center p-10 items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-2">
              <Image alt="" src={Mitra} width={60} height={60} />
              <p className="text-[14px] font-bold font-sans">VILLAGE SERVICE</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-1 justify-center items-center">
                <p className="text-[14px] font-bold font-sans text-violet-700">
                  View Service
                </p>
                <FaAngleRight
                  className="mt-1 font-bold text-gray-600"
                  size={20}
                />
              </div>
            </div>
          </div> */}

          <Link href="/select">
            <div
              className="w-[150px] h-[50px] bg-green-600 ml-[430px] bottom-5  right-4 fixed rounded-3xl flex 
            justify-center items-center gap-1"
            >
              <MdLocationPin className="fill-white" size={25} />
              <p className="text-white text-[14px] font-semibold">eMitra Hub</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
