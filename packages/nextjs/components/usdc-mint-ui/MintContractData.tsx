import { formatEther } from "ethers";
import { useEffect, useRef, useState } from "react";

import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";



export const MintContractData = () => {
  const { address } = useAccount();
 
  

 

  const { data: totalMintTrans } = useScaffoldContractRead({
    contractName: "MhgdUsdcMint",
    functionName: "Total_Mint_Transactions",
  });

  const { data: minterHasMinted } = useScaffoldContractRead({
    contractName: "MhgdUsdcMint",
    functionName: "Total_AllTime_Minted",
  });

  const { data: usdcReserveBalance } = useScaffoldContractRead({
    contractName: "MhgdUsdcMint",
    functionName: "usdcReserve",
  });
  
  const { data: mhgdReserveBalance } = useScaffoldContractRead({
    contractName: "MhgdUsdcMint",
    functionName: "mhgdReserve",
  });

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/background.jpeg')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">

      <div className="flex justify-center w-full">

        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-center">Mint Transactions</div>
          <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalMintTrans?.toString() || "0"}
          </div>
        </div>
      </div>
      <div className="bg-accent border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary flex items-center">Mint Has Minted</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(minterHasMinted || "0")).toFixed(2)}
        </div>
      </div>
      <div className="bg-accent border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary flex items-center">USDC Reserve</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
        {usdcReserveBalance?.toString() || "0"}
        </div>
    </div>
    <div className="bg-accent border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary flex items-center">MHGD Reserve</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(mhgdReserveBalance || "0")).toFixed(2)}
        </div>
      </div>
      </div>
     
      
  );
};
