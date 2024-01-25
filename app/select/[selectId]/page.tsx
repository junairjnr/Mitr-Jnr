"use client";

import Image from "next/image";
import Logo from "../../../assets/dream_biz.png";
import {
  MdInfoOutline,
  MdOutlineLocationOn,
  MdPerson3,
  MdWhatsapp,
} from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { GrSettingsOption } from "react-icons/gr";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { get } from "@/api/api-request";
import Link from "next/link";

export default function ViewFranchise() {
  const searchParams = useSearchParams();
  const passedFranch = searchParams.get("franch") ?? "";
  const franchDetails = JSON.parse(passedFranch);

  const { data: dash, isLoading } = useQuery(["dashboard/index/"], () =>
    get("dashboard/index/").then((res) => res.data)
  );
  
  const serviceList = dash?.serviceHeadModelList;
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto bg-blue-600">
        <div className="flex justify-center items-center">
          <Image alt="" src={Logo} width={150} height={150} />
        </div>

        <div className="p-5">
          <div className="w-full h-auto bg-[#0614aad4] rounded-xl font-semibold">
            <div className="w-full flex flex-col justify-start items-start p-6 gap-5">
              <div className="flex flex-row justify-center items-center gap-2 text-white">
                <div className="flex justify-center">
                  <MdPerson3 size={20} />
                </div>
                <p>Name</p>:<p>{franchDetails?.name}</p>
              </div>
              <div className="flex flex-row justify-center  gap-2 text-white">
                <div className="flex justify-center">
                  <MdOutlineLocationOn size={20} />
                </div>
                <p>Place</p>:<p>{franchDetails?.place}</p>
              </div>
              <div className="flex flex-row justify-center gap-2 text-white">
                <div className="flex justify-center">
                  <MdInfoOutline size={20} />
                </div>
                <p>Address</p>:<p>{franchDetails?.address}</p>
              </div>
              <div className="flex flex-row justify-center  gap-2 text-white">
                <div className="flex justify-center">
                  <IoIosCall size={20} />
                </div>
                <p>Phone</p>:<p>{franchDetails?.phone}</p>
              </div>
            </div>
            <div className="flex justify-center items-center text-white gap-10 p-3">
              {franchDetails?.whatsappNo && (
                <button
                  type="button"
                  className="w-14 h-14 p-2 bg-green-600 rounded-full flex justify-center items-center"
                >
                  <a href={`https://wa.me/${franchDetails?.whatsappNo}`}>
                    <MdWhatsapp size={30} />
                  </a>
                </button>
              )}

              <button
                type="button"
                className="w-14 h-14 p-2 bg-blue-400 rounded-full flex justify-center items-center"
              >
                <a href={`tel:${franchDetails?.phone}`}>
                  <IoIosCall size={30} />
                </a>
              </button>
              <button
                type="button"
                className="w-14 h-14 p-2 bg-lime-500 rounded-full flex justify-center items-center"
              >
                <a
                  href={`https://maps.google.com/maps/place/${
                    franchDetails.locationUrl
                      ? franchDetails.locationUrl
                      : "No Location given"
                  }`}
                >
                  <MdOutlineLocationOn size={30} />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="p-3 ">
          <div className="bg-white w-full h-full flex justify-center items-center p-2 flex-col  rounded-lg">
            <div className="flex flex-row border-b-2 border-gray-500 p-1 gap-1">
              <GrSettingsOption className="fill-black" size={20} />
              <h1 className="text-gray-600 font-bold">SERVICES</h1>
            </div>
            <div className="w-full h-full b flex justify-center ">
              <div className="h-[] grid grid-cols-2 gap-3 p-2 overflow-auto">
                {serviceList?.map((dash: any, index: any) => (
                  <div
                    key={index}
                    className="bg-orange-800 flex justify- items-center h-[60px] text-white p-1 pl-2 rounded-xl gap-3 mt-1"
                  >
                    <div className=" mt-1 flex  ">
                      <FiSettings size={15} />
                    </div>
                    <Link
                      href={{
                        pathname: "selectId/" + dash.id,
                        query: { list: JSON.stringify(dash) },
                      }}
                    >
                      <p className="text-[12px] mt-1 font-semibold">
                        {dash.name}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="w-full h-full p-3 flex flex-row gap-1 overflow-auto justify-center items-center cursor-pointer ">
              {serviceList?.map((dash: any) => (
                <div className=" bg-orange-800 text-white  flex p-2 items-center justify-center rounded-xl">
                  <div className=" w-full">
                    <p className="text-[14px]">{dash.name}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
