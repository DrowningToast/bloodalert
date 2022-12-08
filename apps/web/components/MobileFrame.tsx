import React, { FC } from "react";

interface Props {
  children?: React.ReactNode;
}

const MobileFrame: FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <main className="bg-gradient-to-b from-[#75A8F8] to-[#FFFFFF] w-full max-w-[400px] border-2 shadow-lg aspect-[1/2]">
        {children}
      </main>
    </div>
  );
};

export default MobileFrame;
