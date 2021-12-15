import React, { useState, useEffect } from "react";
import styled from "styled-components";
import inMemoryJwt from "../inMemoryJwt";
import Header from "../components/Header";
import ActionsBar from "../components/ActionsBar";
import Meeting from "../components/Meeting";
import { CircularProgress } from "@mui/material";

const ResearchResults = (props) => {
  const params = props.match.params;
  const [results, setResults] = useState(null);

  useEffect(() => {
    setResults(null);
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `/private/meetings/search/${params.query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${inMemoryJwt.getToken()}`,
            },
          }
        );
        const { status, data } = await response.json();

        if (status === 200) {
          setResults(data);
        } else {
          window.alert("Oups, try again!.");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchResults();
  }, [params]);

  return (
    <Wrapper>
      <Header />
      <ActionsBar />
      {!results ? (
        <CircularDiv>
          <CircularProgress color="success" />
        </CircularDiv>
      ) : results.length > 0 ? (
        results.map((meeting) => <Meeting meeting={meeting} />)
      ) : (
        <NoResult>
          There are no meeting for this activity.
          <br />
          Maybe you should create one?
        </NoResult>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  font-size: 25px;
  color: whitesmoke;
`;

const CircularDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default ResearchResults;
