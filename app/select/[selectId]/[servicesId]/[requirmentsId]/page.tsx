"use client";

import Image from "next/image";
import Logo from "../../../../../assets/dream_biz.png";
import Sett from "../../../../../assets/settings.png";
import { FaRegHandPointRight } from "react-icons/fa";
import { MdLocationPin, MdOutlineDescription } from "react-icons/md";
import Link from "next/link";
import { useQuery } from "react-query";
import { get } from "@/api/api-request";
import { useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

export default function VIewService() {
  const searchParams = useSearchParams();
  const passedService = searchParams.get("subs") ?? "";
  const requirments = JSON.parse(passedService);

  const requirmentId = requirments.id;

  const { data: requirment,isLoading } = useQuery(["document"], () =>
    get("dashboard/document/" + requirmentId).then((res) => res.data)
  );

  return (
    <div className="w-full h-full bg-gray-100 ">
      <div className="w-full h-full bg-blue-700">
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="flex justify-center items-center">
            <Image src={Logo} width={150} height={150} alt="" />
          </div>
        </div>
        {isLoading && (
          <div className="w-full h-[400px] flex justify-center items-center  absolute">
            <CgSpinner className="loading-icon fill-orange-700 " size={70} />
          </div>
        )}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        <div className="w-full h-full bg-gray-100 rounded-tr-3xl rounded-tl-3xl pb-14">
          <div className="w-full h-full p-5 ">
            <div className="w-full flex justify-center items-center p-1 pb-4">
              <p className="text-[16px] border-b-2 border-gray-400 text-gray-600 font-bold ">
                SERVICE REQUIRMENT
              </p>
            </div>
            <div className=" h-[50px] p-3 rounded-xl inline-block justify-start items-center">
              <p className="text-[16px] text-orange-700 font-bold border-b-2 border-gray-600">
                {requirments.serviceName}
              </p>
            </div>
            <div className="w-full h-full  mt-3">
              <div className="w-full h-full bg-white flex flex-row rounded-lg">
                <div className=" mt-5 ml-2">
                  <Image alt="" src={Sett} width={80} height={80} />
                </div>
                <div className="h-full w-full flex flex-col p-2">
                  {requirment?.documentlist?.map((list: any, index: any) => (
                    <div key={index} className="flex p-3 gap-2 border-b-2">
                      <div className="flex justify-center">
                        <MdOutlineDescription size={20} />
                      </div>
                      <p className="text-[14px] text-gray-600 font-semibold">
                        {list.documentName}
                      </p>
                    </div>
                  ))}
                  {/* <div className="flex justify-between p-3 gap-1 border-b-2">
                    <MdOutlineDescription size={20} />
                    <p className="text-[14px] text-gray-700">
                      PASSPORT SIZE PHOTO
                    </p>
                  </div> */}
                  {/* <div className="flex justify-between p-3 gap-1 border-b-2">
                    <MdOutlineDescription size={20} />
                    <p className="text-[14px] text-gray-700">
                      PASSPORT SIZE PHOTO
                    </p>
                  </div> */}
                  {/* <div className="flex justify-between p-3 gap-1 border-b-2">
                    <MdOutlineDescription size={20} />
                    <p className="text-[14px] text-gray-700">
                      PASSPORT SIZE PHOTO
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-f
            ull h-full p-3 flex flex-col justify-center items-center border">
              <h2 className="p-2 font-bold text-gray-600 mb-2">
                - DESCRIPTION -
              </h2>
              <div className="text-[12px] text-red-700">
                {requirment?.servicedesc
                  ? requirment.servicedesc
                  : <p className="text-[14px] font-semibold">"No Description"</p>}
              </div>
            </div>
            <Link href="/select">
              <div className="flex justify-center items-center">
                <div
                  className="w-[150px] h-[50px] bg-green-600 bottom-4 fixed rounded-3xl flex 
                justify-center items-center gap-1"
                >
                  <MdLocationPin className="fill-white" size={25} />
                  <p className="text-white text-[14px] font-semibold">
                    eMitra Hub
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
