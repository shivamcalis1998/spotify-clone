import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Body() {
  const [{ token, selectedPlayListId, selectedPlayList }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getInitialPlayList = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlayListId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlayList = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description.startsWith("<a")
          ? ""
          : res.data.description,
        image: res.data.images[0].url,
        tracks: res.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlayList });
    };
    getInitialPlayList();
  }, [token, dispatch, selectedPlayListId]);
  return (
    <Container>
      {selectedPlayList && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlayList.image} alt="" />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div``;
