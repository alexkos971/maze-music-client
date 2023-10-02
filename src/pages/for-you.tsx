import React from "react";
import Artists from "@components/Artists";
import MainWrap from "@components/MainWrap";

import Button from "@components/ui/Button";
import { Text, Email, Select, Password } from "@components/ui/Field";
import Form from "@components/ui/Form";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";
import { lsSetItem } from "@helpers/localstorage";

import {WeekndAvatar} from "@helpers/images";

export default function ForYou() {
    const router = useRouter();
    const {locale, pathname, query, asPath} = router;

    const handleLocaleChange = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });

        lsSetItem({ name: 'i18nLanguage', value: newLocale });
    };

    return (
        <MainWrap>
            <Artists 
                title="Artists"
                data={[
                {
                    id: 'as234qas',
                    name: 'The',
                    followers: [],
                    albums: [],
                },
                {
                    id: 'as234qas',
                    name: 'Dua Lipa',
                    avatar: WeekndAvatar,
                    albums: [123, 2342, 234, 3434],
                    followers: [123, 2342, 234, 3434]
                },
                {
                    id: 'as234qas',
                    name: 'The Weeknd',
                    avatar: WeekndAvatar,
                    albums: [],
                    followers: []
                },
                {
                    id: 'as234qas',
                    name: 'Dua Lipa',
                    avatar: WeekndAvatar,
                    albums: [123, 2342, 234, 3434],
                    followers: [123, 2342, 234, 3434]
                },
            ]}/>

            <Form>
                <Text 
                    name="text"
                    title="SOme title"
                    placeholder="Placeholder"
                    required={true} />

                <Email 
                    title="Email"
                    name="email"
                    placeholder="Email"
                    required={true} />
                
                <Password 
                    title="Password"
                    name="password"
                    placeholder="Password"
                    required={true} />
                
                <Select 
                    name="language"
                    title="Language"
                    value={locale ?? null}
                    options={['en', 'ua']} 
                    onChange={handleLocaleChange}/>

                <Button type="submit">Submit</Button>
            </Form>
            
        </MainWrap>
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