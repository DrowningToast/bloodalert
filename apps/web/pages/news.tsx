import { Loader, Spoiler } from "@mantine/core";
import { NextPage } from "next";
import { useQuery } from "react-query";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";
import { fetchNews } from "../components/QueryFunctions";
import { IAnnouncement } from "../components/types/responses";

const News: NextPage = () => {
  const { isLoading, isError, data, error } = useQuery<IAnnouncement[]>({
    queryKey: "news",
    queryFn: fetchNews,
  });

  if (isLoading)
    return (
      <MobileFrame disableBg>
        <div className="h-full bg-gradient-to-b from-[#5999FF] to-[#B8D2FA] overflow-y-auto">
          <div className="bg-[#B9D3FB] drop-shadow-lg pb-4">
            <Navbar />
          </div>
          <div className="w-full h-full grid place-items-center">
            <Loader />
          </div>
        </div>
      </MobileFrame>
    );

  return (
    <MobileFrame disableBg>
      <div className="h-full bg-gradient-to-b from-[#5999FF] to-[#B8D2FA] overflow-y-auto">
        <div className="bg-[#B9D3FB] drop-shadow-lg pb-4">
          <Navbar />
        </div>
        <div className="w-full flex flex-col items-center gap-y-6 px-8 py-8 pb-12">
          {data?.map((announcement) => {
            return (
              <Spoiler
                maxHeight={290}
                showLabel="อ่านต่อ"
                hideLabel="ซ่อน"
                classNames={{
                  control: "z-20 relative font-kanit mt-2",
                }}
                className="border-2 border-black rounded-xl w-full px-6 py-6 relative z-10"
              >
                <div className="absolute inset-0 opacity-[60%] rounded-xl bg-white"></div>

                <div className="relative">
                  <h1 className="font-jost font-bold text-5xl">
                    {announcement.bloodtype}
                  </h1>
                  <h2 className="font-kanit font-semibold text-2xl">
                    {announcement.name} {announcement.surname}
                  </h2>
                  <ul className="text-right my-6 font-kanit text-sm">
                    <li>เบอร์โทร {announcement.phonenumber}</li>
                    <li>{announcement.hospital}</li>
                    <li>เขต {announcement.district}</li>
                    <li>
                      วันที่ {new Date(announcement.date).toLocaleDateString()}
                    </li>
                  </ul>
                  <hr className="border-black my-4" />
                  <h5 className="font-semibold font-kanit text-sm">
                    หมายเหตุ*
                  </h5>
                  <p className="text-sm font-kanit">{announcement.note}</p>
                </div>
              </Spoiler>
            );
          })}
        </div>
      </div>
    </MobileFrame>
  );
};

export default News;
