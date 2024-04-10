/**
 * Main Project Types
 */

interface Track {
    _id: string,
    name: string;
    src: string;
    cover: string;
    artist: {
        _id: string;
        full_name: string;
        description?: string;
        avatar: string;
    };
    genres: [string];
    album: null | string;
    duration: number;
    date: Date;
    type: 'single' | 'album';
    played_count: number
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
    _id: string;
    followers: number,    
    listenings: number,    
    albums: string[];
    tracks: string[];
}

type ProfileDto = null | {
    _id: string;
    role: "Listener" | "Artist";
    full_name: string;
    avatar: string
    email: string,
    description?: string;

    followers: number,    
    listenings: number,
    
    albums: string[];
    playlists: string[];
    tracks: string[];
    
    savedTracks: number[],
    savedPlaylists: number[],
    savedAlbums: number[],    
    savedArtists: number[],    
    __v: number
};