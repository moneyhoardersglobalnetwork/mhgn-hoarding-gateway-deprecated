import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Mint = () => {
  const [visible, setVisible] = useState(true);
  const [daiAmount, setDaiAmount] = useState("");
  

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "MhgdDaiMint2",
    functionName: "mint",
    args: [daiAmount],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="grid justify-center items-center bg-base-300 relative pb-10">
       <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">You've entered</span>
            <span className="block text-4xl font-bold">The</span>
            <span className="block text-4xl font-bold">MHGD MINT</span>
            MHGD can only be minted using DAI StableCoin.
          </h1>
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col justify-center w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">👋🏻</span>
            <div>
              <div>
                Welcome to the MHGD MINT 
              </div>
              <div className="mt-2">
                Set a spending cap for your Dai or MHGD above{" "}
                <div> <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem]">
                  We -recommend -setting -a -cap- below- your -total -balance!
                </code>{" "}</div>
               
                then use your DAI to mint MHGD or swap between the assets.
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
           
    <div className="flex  relative pb-10">
    <div className="flex flex-col w-md mx-5 sm:mx-8 2xl:mx-20">
      <div className="flex flex-col  mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
        <span className="text-4xl sm:text-6xl text-black">Mint</span>

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
                    Mint <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                )}
              </button>
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
