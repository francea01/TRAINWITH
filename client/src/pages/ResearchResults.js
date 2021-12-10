import React, { useState, useEffect } from "react";
import styled from "styled-components";
import inMemoryJwt from "../inMemoryJwt";
import Header from "../components/Header";
import ActionsBar from "../components/ActionsBar";
import Meeting from "../components/Meeting";

const ResearchResults = (props) => {
  const params = props.match.params;
  const [results, setResults] = useState([]);

  useEffect(() => {
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
          window.alert("Sorry, we didn't find you.");
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
      {results.length > 0 ? (
        results.map((meeting) => <Meeting meeting={meeting} />)
      ) : (
        <NoResult>
          There are no meeting for this activity.
          <br />
          Maybe you should make one?
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

export default ResearchResults;
