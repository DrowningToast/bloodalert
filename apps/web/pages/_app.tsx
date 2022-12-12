import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { bloodalertQueryClient } from "../components/QueryClient";
import { AuthUpdater, firebaseUserAtom } from "../components/firebase";
import { NextSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={bloodalertQueryClient}>
      <AuthUpdater />
      <NextSeo
        title="Bloodalert"
        description="โครงการ Blood Alert เป็นระบบแจ้งเตือนการรับบริจาคโลหิตด่วนที่ Personalize สำหรับกลุ่มเป้าหมายที่ติดตามความเคลื่อนไหว โดยจะประชาสัมพันธ์ผ่านทาง Line Chat Bot ที่ผู้ใช้ที่ต้องการจะติดตามหรือทราบข่าวสารนั้นสามารถเลือกกลุ่มโลหิตที่ต้องการจะติดตามได้ และยังสามารถเลือกติดตามแค่จากบางโรงพยาบาลที่ผู้ใช้อยู่ใกล้และสามารถเข้าถึงได้ง่าย โดยญาติของผู้ป่วยที่ต้องการเลือดนั้นสามารถประชาสัมพันธ์ผ่านทาง Line Chat Bot ได้พร้อมกับรายละเอียดต่างๆ"
        canonical="https://bloodalert-web.vercel.app/"
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
