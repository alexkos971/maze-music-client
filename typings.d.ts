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

interface SignUpDto {
    role: 'listener' | 'artist' | 'admin',
    name: string;
    email: string,
    password: string,
    description: string;
    avatar: string;
    genres: string[];
}

interface GetSessionInfoDto {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

interface SignInDto {
    email: string,
    password: string,   
}

interface ArtistDto {
    id: string;
    followers: number,    
    listenings: number,    
    albums: string[];
    tracks: string[];
}

interface ProfileDto {
    id: string;
    name: string;
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