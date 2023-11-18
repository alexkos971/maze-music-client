/**
 * Main Project Types
 */

interface Track {
    id: string,
    name: string;
    src: string;
    cover: string;
    artist: {
        id: string,
        name: string;
    };
    album: null | {
        id: string,
        name: string;
    }
    duration: number;
    playedCount: number
};

interface Player {
    track: Track | null;
    isPlaying: false;
    // duration: number;
    currentTime: number,
    // playList: {
    //     id: string,
    //     tracks: Track[]
    // };

    // ID
    playList: string | null,
    volume: number;    
};

interface Artist {
    id: string;
    followers: number,    
    name: string;
    albums: string[];
    tracks: string[];
    created_date: Date;
    description: string;
    avatar: string;
}