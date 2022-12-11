import React, { FC } from "react";

interface Props {
  children?: React.ReactNode;
  disableBg?: boolean;
}

const MobileFrame: FC<Props> = ({ children, disableBg }) => {
  return (
    <div className="grid h-screen place-items-center overflow-x-hidden">
      <main
        className={`${
          disableBg ? "" : "bg-gradient-to-b from-[#75A8F8] to-[#FFFFFF]"
        } h-full max-w-[340px] w-full border-2 shadow-lg aspect-[1/2]`}
      >
        {children}
        {/* {"hello world"} */}
      </main>
    </div>
  );
};

export default MobileFrame;
