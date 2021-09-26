import React from 'react';

function noop() {}

export let Context = React.createContext({
    isAuthenticated: false,
    token: false,
    server: "https://maze-music-server.herokuapp.com/",
    sidebar: [
      {
        "name": "For you",
        "path": "/for-you",
        "icon": "heartbeat",
        "id": 1
      },
      {
        "name": "Artists",
        "path": "/artist",
        "icon": "users",
        "id": 2
      },
      {
        "name": "Albums",
        "path": "/albums",
        "icon": "compact-disc",
        "id": 3
      },
      {
        "name": "Songs",
        "path": "/songs",
        "icon": "music",
        "id": 4
      },
      {
        "name": "Playlists",
        "path": "/playlists",
        "icon": "stream",
        "id": 5
      },
      {
        "name": "Search",
        "path": "/search",
        "icon": "search",
        "id": 6
      },
      {
        "name": "Upload",
        "path": "/upload",
        "icon": "cloud-upload-alt",
        "id": 7
      }],
    defaultPage: () => {
      return this.sidebar[0]
    },
    login: noop,
    my: {},
    logout: noop
});