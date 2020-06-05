import React, { useState, useEffect } from "react";
import Search from "./Search";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const AutoSearch = () => {
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  const getHashParams = () => {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const [songsState, setSongsState] = useState({
    suggestedSongs: [],
  });
  const { suggestedSongs } = songsState;

  const [searchQueryState, setSearchQueryState] = useState({
    searchQuery: " ",
  });
  const { searchQuery } = searchQueryState;

  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
    // getSearchedTracks(searchQuery);
  };

  useEffect(() => {
    // getSearchedTracks(searchQuery)
    const getSearchedTracks = async (searchQuery) => {
      if (getHashParams().access_token) {
        spotifyApi.setAccessToken(getHashParams().access_token);
      }
      try {
        const res = await spotifyApi.search(searchQuery, ["track"]);
        const songs = res.tracks.items.map((item) => item.name);
        console.log(songs);
        setSuggestions(songs);
        // suggestions based on user input
        // const filteredSongs = suggestedSongs.toLowerCase().filter((songs) => searchQuery.toLowerCase() > -1);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSearchedTracks(searchQuery)
  }, []);

  const setSuggestions = (trackArray) => {
    const newSongState = {
      suggestedSongs: trackArray,
    };
    setSongsState({ newSongState });
    // console.log(suggestedSongs);
    // setSongsState({...songsState, suggestedSongs: trackArray });
  };

  return (
    <div>
      <Search
        value={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
      {/* {suggestedSongs.map((song) => (
        <p>{song}</p>
      ))} */}
    </div>
  );
};

export default AutoSearch;
