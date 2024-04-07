'use client';
import { useAppSelector } from "@hooks/index";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export const MetaTitle = () => {    
    const {t} = useTranslation();    
    const directory = useAppSelector(state => state.interface.directory); 
  
    return (
        <Head>
          <title>{`${t(directory.title)} - Maze Music`}</title>
        </Head>
    );
}