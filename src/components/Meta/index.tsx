'use client';

import { useEffect } from "react";
import { usePathname  } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { setDirectory } from "@store/reducers/interfaceReducer";
import { lsGetItem } from "@helpers/localstorage";
import { directories } from "@helpers/directory";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export const Title = () => {
    const pathname = usePathname();
    let current_locale = lsGetItem('i18nLanguage');  
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [ directory ] = useAppSelector(state => [state.interface.directory]);
  
    useEffect(() => {
      for (let val in directories) {
        if (directories[val].path == pathname) {
          dispatch(setDirectory(directories[val]))
        }
      }
    }, [pathname, current_locale]);
  
    return (
        <Head>
            <title>{`${t(directory.title)} - Maze Music`}</title>
        </Head>
    );
}