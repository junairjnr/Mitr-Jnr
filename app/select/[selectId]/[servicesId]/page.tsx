"use client";

import Image from "next/image";
import Logo from "../../../../assets/dream_biz.png";
import Sett from "../../../../assets/settings.png";
import { FaRegHandPointRight } from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "react-query";
import { get } from "@/api/api-request";
import { log } from "console";
import { useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

export default function VIewService({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const searviceDetails = searchParams.get("list") ?? "";
  const serviceList = JSON.parse(searviceDetails);

  const serviceId = serviceList.id;

  const { data: details, isLoading } = useQuery(
    ["dashboard/Services/", serviceId],
    () => get("dashboard/Services/" + serviceId)
  );
  const serviceDetails = details?.data;

  return (
    <div className="w-full h-full bg-gray-100 ">
      <div className="w-full h-full bg-blue-700">
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="flex justify-center items-center">
            <Image src={Logo} width={150} height={150} alt="" />
          </div>
        </div>
        {isLoading && (
          <div className="w-full h-[400px] flex justify-center items-center bg-  absolute">
            <CgSpinner className="loading-icon fill-orange-700" size={70} />
          </div>
        )}

        <div className="w-full h-full bg-gray-100 rounded-tr-3xl rounded-tl-3xl ">
          <div className="w-full h-full p-5 ">
            <div className=" h-[50px] p-3 rounded-xl inline-block justify-start items-center">
              <p className="text-[16px] text-orange-700 font-bold border-b-2 border-gray-600">
                {serviceList.name}
              </p>
            </div>
            <div className="w-full h-full  mt-3">
              <div className="w-full  bg-white flex flex-row rounded-lg">
                <div className="w-full h-full flex flex-col p-2">
                  {serviceDetails?.map((item: any) => (
                    <div key={item.id}>
                      <Link
                        href={{
                          pathname: "serviceId/" + item.id,
                          query: { subs: JSON.stringify(item) },
                        }}
                      >
                        <div className=" flex justify-between p-3 h-[60px] border-b-2 gap-1">
                          <div className="flex justify-center items-center">
                            <p className="text-[14px] text-gray-700 font-semibold">
                              {item.serviceName}
                            </p>
                          </div>
                          <div className="flex justify-center items-center p-1 mt-3">
                            <FaRegHandPointRight size={20} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
