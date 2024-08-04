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

interface PlaylistDto {
    _id: string;
    __v: number
    date: Date,
    name: string,
    description: string | null;
    cover: string | null;
    owner: string;
    is_public: boolean,
    tracks: Track[]
}

type LoginType = 'google' | 'local';

interface SignUpDto {
    role: 'listener' | 'artist' | 'admin',
    full_name: string;
    email: string,
    password: string,
    confirm_password: string,

    // avatar: string;
    description: string;
    genres: string[];
}

interface SignUpGoogleDto {
    role: 'listener' | 'artist' | 'admin'
    token: string;
    // avatar: string;
    description: string;
    genres: string[];
}

interface SignInDto {
    email: string,
    password: string
}

interface SignInGoogleDto {
    token: string
}

interface GetSessionInfoDto {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

interface ArtistDto {
    _id: string;
    avatar: string | null;
    full_name: string;
    followers: number,    
    listenings: number,    
    albums: string[];
    tracks: string[];
}

type ProfileDto = {
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
    
    saved_tracks: string[],
    saved_playlists: string[],
    saved_albums: string[],    
    saved_artists: string[],    
    __v: number
};