import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const SwapDai = () => {
  const [visible, setVisible] = useState(true);
  const [daiAmount, setDaiAmount] = useState("");
  

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "MhgdDaiMint2",
    functionName: "swapDai",
    args: [daiAmount],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="grid justify-center  items-center bg-base-300 relative pb-10">
      
      <DiamondIcon className="absolute top-0 left-36" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            Swap for MHGD
            <div>

     
    <div className="flex  relative pb-10">
    <div className="flex flex-col  w-full mx-5 sm:mx-8 2xl:mx-20">
      <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
        <span className="text-4xl sm:text-6xl text-black">Swap Dai</span>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <input
            type="text"
            placeholder="Amount"
            className="input text-black font-bai-jamjuree w-full px-5 bg-white bg-[length:100%_100%] border border-primary  text-lg sm:text-2xl placeholder-black uppercase"
            onChange={e => setDaiAmount(e.target.value)}
          />
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
            <div className="flex rounded-full border-2 border-primary p-1">
              <button
                className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                onClick={() => writeAsync()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Swap <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                )}
              </button>
    </div>
    </div>
    </div>
    <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 DAI + Gas</div>
          </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

    
  );
};
