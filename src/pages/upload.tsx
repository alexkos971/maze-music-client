import useProtectedPage from "@hooks/protectedPage";
import MainWrap from "@components/MainWrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState, useEffect } from "react";
import Form from "@components/UI/Form";
import { FilePicker, Text, MultiSelect } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@hooks";
import { showToast } from "@store/reducers/interfaceReducer";
import { useUploadTrackMutation } from "@store/api/tracksApi";

export default useProtectedPage(function Upload() {
  const {t} = useTranslation('common');
  let [fields, setFields] = useState({});
  let [validFields, setValidFields] = useState({});
  let [uploadTrack, { isSuccess, isLoading }] = useUploadTrackMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      setFields({});
      setValidFields({});
      showToast({type: 'success', text: t('pages.upload.success')});
    }
  }, [isSuccess])

  return (
    <MainWrap>
      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-6 offset-lg-3">            
            <Form {...{ fields, setFields, validFields, setValidFields }} className="max-w-4 p-8 rounded-lg bg-gray-f5">
              <Title tag="h3" className="text-center">Upload your track</Title>
              
              <Text
                title="Track name"
                name="name"            
                required={true}
              />

              <MultiSelect
                title="Choose the genres of track"
                name="genres"
                placeholder="Type genre and press enter..."
                required={true}
              />

              <FilePicker
                title="Track file"
                name="track"
                accept="audio/mp3, audio/wav, audio/flac"
                required={true}
              />

              <FilePicker
                title="Track Cover"
                name="cover"
                accept="image/png, image/jpg, image/webp"
                required={true}
              />

              <Button 
                type="submit" 
                onClick={() => uploadTrack(fields)} 
                isLoading={isLoading}
                disabled={!Object.keys(validFields).some(key => validFields[key] == false )}
                className="w-full mt-10">{t("interface.submit")}</Button>
            </Form>
          </div>
        </div>
      </div>
    </MainWrap>
  );
})

export async function getStaticProps({ locale } : { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        // Will be passed to the page component as props
      },
    };
}