import Artists from "@components/Artists";
import MainWrap from "@components/MainWrap";

import Button from "@components/ui/Button";
import { Text, Email, Select } from "@components/ui/Field";
import Form from "@components/ui/Form";

import {WeekndAvatar} from "@helpers/images";

export default function ForYou() {

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
                
                <Select 
                    name="language"
                    title="Language"
                    required={true}
                    placeholder="Some"
                    options={{
                        "en-EN" : 'English',
                        "ru-RU" : 'Russian'
                    }} 
                    />

                <Button type="submit">Submit</Button>
            </Form>
            
        </MainWrap>
    );
}