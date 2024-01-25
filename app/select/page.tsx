"use client";

import { BsSearch } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import Home from "../../assets/home.png";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { get } from "@/api/api-request";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function Search() {
  const { data: district = [] } = useQuery(["/district/"], () =>
    get("dashboard/district/").then((res) => res.data)
  );

  const [activeDistrict, setActiveDistrict] = useState("");

  const { data: Panchayath } = useQuery(
    ["district/panchayath", activeDistrict],
    () => get("dashboard/district/" + activeDistrict).then((res) => res.data),
    {
      enabled: Boolean(activeDistrict),
    }
  );

  const [activePanchayath, setActivePanchayath] = useState("");
  const [search, setSearch] = useState("");

  const [queryParam, setQueryParam] = useState("");
  const { data: service, isLoading } = useQuery(
    [queryParam],
    () => get("dashboard/" + queryParam).then((res) => res.data),
    {
      enabled: Boolean(queryParam),
    }
  );

  const services = service?.filter((x: any) => {
    if (!search) {
      return true;
    }
    return (x.searchKey || x.pinCode || x.place)
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="w-full h-[100vh] overflow-auto bg-blue-300">
      <div className="w-full h-full bg-blue-300 pt-[60px]">
        <div className="w-full h-[60px] bg-blue-500 flex justify-center items-center p-3 fixed top-0 left-0">
          <div className="h-[40px] w-full bg-gray-100 flex items-center rounded-xl">
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

        <div className="flex flex-col justify-center items-center p-4 gap-4 font-semibold text-gray-600">
          <select className="w-full h-[40px] font-semibold outline-none p-2 rounded-lg">
            <option>Kerala</option>
          </select>
          <select
            className="w-full h-[40px] font-semibold outline-none p-2 rounded-lg"
            onChange={(e) => setActiveDistrict(e.target.value)}
            value={activeDistrict}
          >
            <option>Select District</option>
            {district?.map((dist: any, index: any) => (
              <option key={index} value={dist.id}>
                {dist.districtName}
              </option>
            ))}
          </select>
          <select
            className="w-full h-[40px] font-semibold outline-none p-2 rounded-lg"
            onChange={(e) => setActivePanchayath(e.target.value)}
            value={activePanchayath}
          >
            <option>Select Panchayath</option>
            {Panchayath?.map((panch: any, index: any) => (
              <option key={index} value={panch.id}>
                {panch.panchayathName}
              </option>
            ))}
          </select>
          <div className="flex flex-row justify-end ml-28 gap-3">
            <button
              onClick={() => {
                setQueryParam("");
                setActiveDistrict("");
                setActivePanchayath("");
                setSearch("");
              }}
              className="w-[100px] h-[50px] bg-red-500 rounded-2xl"
            >
              Clear
            </button>
            <button
              onClick={() => {
                setQueryParam(
                  "franchiseSearch?districtid=" +
                    activeDistrict +
                    "&panchayathid=" +
                    activePanchayath +
                    "&searchkey=" +
                    search
                );
              }}
              className="w-[100px] h-[50px] bg-green-500 rounded-2xl"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-full h-full">
          {isLoading && (
            <div className="w-full h-[400px] flex justify-center items-center ">
              <CgSpinner className="loading-icon fill-orange-700" size={70} />
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-3 p-3">
            {services && services?.length > 0
              ? services.map((franch: any, index: any) => (
                  <div
                    key={index}
                    className="w-full p-5 h-[150px] bg-white rounded-xl flex flex-col justify-center items-center gap-5 pb-2"
                  >
                    <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-1">
                      <Image alt="" src={Home} width={60} height={60} />
                      <div className="flex flex-col pl-3">
                        <p className="text-[14px] font-bold font-sans">
                          {franch.name}
                        </p>
                        <p className="text-[12px] font-semibold text-gray-600 font-sans">
                          {franch.phone}
                        </p>
                        <p className="text-[12px] font-semibold text-gray-600 font-sans">
                          {franch.place}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link
                        href={{
                          pathname: "select/" + franch.id,
                          query: { franch: JSON.stringify(franch) },
                        }}
                      >
                        <div className="flex flex-row gap-1 justify-center items-center">
                          <p className="text-[14px] font-bold font-sans text-violet-700">
                            View Franchise
                          </p>
                          <FaAngleRight
                            className="mt-1 font-bold text-gray-600"
                            size={20}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              : services && (
                  <p className="text-red-600 font-semibold message">
                    "There is no franchise found here....!"
                  </p>
                )}

            {/* <div className="w-full p-5 h-[150px] bg-white rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-1">
              <Image alt="" src={Home} width={60} height={60} />
              <div className="flex flex-col pl-3">
                <p className="text-[14px] font-bold font-sans">
                  VILLAGE SERVICE
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  9207214972
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  Kottakkal
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/view-franchise">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <p className="text-[14px] font-bold font-sans text-violet-700">
                    View Franchise
                  </p>
                  <FaAngleRight
                    className="mt-1 font-bold text-gray-600"
                    size={20}
                  />
                </div>
              </Link>
            </div>
          </div> */}
            {/* <div className="w-full p-5 h-[150px] bg-white rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-1">
              <Image alt="" src={Home} width={60} height={60} />
              <div className="flex flex-col pl-3">
                <p className="text-[14px] font-bold font-sans">
                  VILLAGE SERVICE
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  9207214972
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  Kottakkal
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/view-franchise">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <p className="text-[14px] font-bold font-sans text-violet-700">
                    View Franchise
                  </p>
                  <FaAngleRight
                    className="mt-1 font-bold text-gray-600"
                    size={20}
                  />
                </div>
              </Link>
            </div>
          </div> */}
            {/* <div className="w-full p-5 h-[150px] bg-white rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-1">
              <Image alt="" src={Home} width={60} height={60} />
              <div className="flex flex-col pl-3">
                <p className="text-[14px] font-bold font-sans">
                  VILLAGE SERVICE
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  9207214972
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  Kottakkal
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/view-franchise">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <p className="text-[14px] font-bold font-sans text-violet-700">
                    View Franchise
                  </p>
                  <FaAngleRight
                    className="mt-1 font-bold text-gray-600"
                    size={20}
                  />
                </div>
              </Link>
            </div>
          </div> */}
            {/* <div className="w-full p-5 h-[150px] bg-white rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row justify-start items-center border-b-2 w-full gap-2 p-1">
              <Image alt="" src={Home} width={60} height={60} />
              <div className="flex flex-col pl-3">
                <p className="text-[14px] font-bold font-sans">
                  VILLAGE SERVICE
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  9207214972
                </p>
                <p className="text-[12px] font-semibold text-gray-600 font-sans">
                  Kottakkal
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/view-franchise">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <p className="text-[14px] font-bold font-sans text-violet-700">
                    View Franchise
                  </p>
                  <FaAngleRight
                    className="mt-1 font-bold text-gray-600"
                    size={20}
                  />
                </div>
              </Link>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
