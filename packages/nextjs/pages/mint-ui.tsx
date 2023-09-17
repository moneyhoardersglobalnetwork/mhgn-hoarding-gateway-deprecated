import { MetaHeader } from "~~/components/MetaHeader";
import { Mint } from "~~/components/mint-ui/Mint";
import { SwapDai } from "~~/components/mint-ui/SwapDai";
import { SwapMhgd } from "~~/components/mint-ui/SwapMhgd";
import { ApproveDai } from "~~/components/mint-ui/ApproveDai";
import { ApproveMhgd } from "~~/components/mint-ui/ApproveMhgd";
import { MintContractData } from "~~/components/mint-ui/MintContractData";
import { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="MHGD MINT | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 items-center flex-grow" data-theme="exampleUi">
        <MintContractData />
        <ApproveDai />
        <ApproveMhgd />
        <Mint />
        <SwapDai />
        <SwapMhgd />
      </div>
    </>
  );
};

export default ExampleUI;
