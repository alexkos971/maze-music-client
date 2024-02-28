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

interface User {
    id: string;
    role: 'listener' | 'artist' | 'admin',
    name: string;
    created_date: Date;
    description: string;
    avatar: string;
}

interface Artist extends User {
    followers: number,    
    listenings: number,    
    albums: string[];
    tracks: string[];
}

interface Profile extends User {
    email: string,
    password: string,   
    followers: number,    
    followings: number[],
    albums: string[];
    playlists: string[];
    tracks: string[];
    savedTracks: number[],
    savedPlaylists: number[],
    savedAlbums: number[],
}