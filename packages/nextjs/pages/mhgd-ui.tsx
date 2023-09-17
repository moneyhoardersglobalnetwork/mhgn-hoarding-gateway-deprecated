import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ApproveMhgd } from "~~/components/mhgd-ui/ApproveMhgd";
import { Claim } from "~~/components/mhgd-ui/Claim";
import { ContractData } from "~~/components/mhgd-ui/ContractData";
import { ContractInteraction } from "~~/components/mhgd-ui/ContractInteraction";
import { DonateMhgd } from "~~/components/mhgd-ui/DonateMhgd";
import { Hoard } from "~~/components/mhgd-ui/Hoard";
import { IncreaseHoard } from "~~/components/mhgd-ui/IncreaseHoard";
import { MhgdHoardingContractData } from "~~/components/mhgd-ui/MhgdHoardingContractData";
import { UnHoard } from "~~/components/mhgd-ui/UnHoard";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="MHGD UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-block flex-grow" data-theme="exampleUi">
        <ContractData />
        <MhgdHoardingContractData />
        <ContractInteraction />
        <ApproveMhgd />
        <DonateMhgd />
        <Hoard />
        <IncreaseHoard />
        <UnHoard />
        <Claim />
      </div>
    </>
  );
};

export default ExampleUI;
