"use client";
import React from "react";
import {Hero} from "@/components/misc/Hero/Hero";

import {InfoCards} from "@/components/misc/InfoCards/InfoCards";

function HomePage() {
  return (
      <>
          <Hero />
          <InfoCards />
      </>
  );
}

export default HomePage;