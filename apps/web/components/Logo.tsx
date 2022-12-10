import Image from "next/image";
import { FC } from "react";

interface Props {
  width?: number;
}

const Logo: FC<Props> = ({ width }) => {
  return (
    <div
      className={`bg-white aspect-square w-${
        width !== undefined ? `${width}px` : "44"
      } rounded-full relative`}
    >
      <Image src="/logo.png" alt="Logo picture" fill />
    </div>
  );
};

export default Logo;
