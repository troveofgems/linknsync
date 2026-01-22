"use client";
import React from "react";
import {Hero} from "@/components/misc/Hero/Hero";

import {InfoCards} from "@/components/misc/InfoCards/InfoCards";
//import {PricingCards} from "@/components/misc/PricingCards/PricingCards";

function HomePage() {
  return (
      <>
          <Hero />
          <InfoCards />
          {/*<PricingCards />*/}
      </>
  );
}

export default HomePage;