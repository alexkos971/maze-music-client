import Artists from "@components/Artists";
import MainWrap from "@components/MainWrap";

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
        </MainWrap>
    );
}