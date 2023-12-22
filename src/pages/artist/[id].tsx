import React from "react";
import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ArtistHero from "@components/ArtistHero";

export default function Artist() {
    return (
      <>
        <ArtistHero/>

        <div className="container-fluid">
          <h1>Artist</h1>
        </div>
      </>
    );
}

export async function getStaticProps({ locale } : { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export const getStaticPaths = (context: GetStaticPaths) => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  }
}
