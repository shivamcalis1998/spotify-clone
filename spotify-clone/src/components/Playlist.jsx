import React, { useEffect } from "react";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getplayListdata = async () => {
      const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const { items } = res.data;
      const playlists = items.map((playlist) => ({
        name: playlist.name,
        id: playlist.id,
      }));
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };

    getplayListdata();
  }, [token, dispatch]);

  return (
    <Container>
      <h3 style={{ marginLeft: "10px", marginBottom: "-20px" }}>PlayLists</h3>
      <ul>
        {playlists.map((playlist) => {
          return <li key={playlist.id}>{playlist.name}</li>;
        })}
        {playlists.map((playlist) => {
          return <li key={playlist.id}>{playlist.name}</li>;
        })}
        {playlists.map((playlist) => {
          return <li key={playlist.id}>{playlist.name}</li>;
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;
