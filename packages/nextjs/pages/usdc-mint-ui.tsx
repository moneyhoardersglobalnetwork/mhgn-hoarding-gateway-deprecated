import { MetaHeader } from "~~/components/MetaHeader";
import { Mint } from "~~/components/usdc-mint-ui/Mint";
import { SwapUsdc } from "~~/components/usdc-mint-ui/SwapUsdc";
import { SwapMhgd } from "~~/components/usdc-mint-ui/SwapMhgd";
import { ApproveUsdc } from "~~/components/usdc-mint-ui/ApproveUsdc";
import { ApproveMhgd } from "~~/components/usdc-mint-ui/ApproveMhgd";
import { MintContractData } from "~~/components/usdc-mint-ui/MintContractData";
import { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="MHGD MINT | A MHGN Hoarder Labs Project"
        description="Mint MHGD using USDC."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 items-center flex-grow" data-theme="exampleUi">
        <MintContractData />
        <ApproveUsdc />
        <ApproveMhgd />
        <Mint />
        <SwapUsdc />
        <SwapMhgd />
      </div>
    </>
  );
};

export default ExampleUI;
