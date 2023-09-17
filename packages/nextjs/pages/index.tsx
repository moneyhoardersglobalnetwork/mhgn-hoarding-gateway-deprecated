import Image from "next/image";
import type { NextPage } from "next";

import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    
      <><MetaHeader />
      <Image alt="Gateway2 logo" className="cursor-pointer" fill src="/hoarder.png" /></>
      
    
  );
};

export default Home;
