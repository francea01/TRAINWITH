import React, { createContext, useReducer } from "react";

export const HomeFeedContext = createContext(null);

const initialState = {
  meetings: [],
  hasLoaded: false,
  isLiked: false,
  LikeColor: null,
  updateFeed: false,
  postingMeeting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-meeting-info-from-server": {
      return {
        ...state,
        meetings: action.meetings,
        hasLoaded: true,
        isLiked: true,
      };
    }
    case "receive-post-info-from-server": {
      console.log(action);
      return {
        ...state,
        updateFeed: !state.updateFeed,
        postingMeeting: false,
      };
    }
    case "post-tweet-from-client": {
      return {
        ...state,
        postingMeeting: true,
      };
    }
  }
}

export const HomeFeedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveMeetingInfoFromServer = (data) => {
    dispatch({
      type: "receive-meeting-info-from-server",
      ...data,
    });
  };
  console.log(state);

  const receivePostInfoFromServer = (data) => {
    dispatch({
      type: "receive-post-info-from-server",
      ...data,
    });
  };
  const postMeetingFromClient = (data) => {
    dispatch({
      type: "post-meeting-from-client",
      ...data,
    });
  };

  return (
    <HomeFeedContext.Provider
      value={{
        state,
        actions: {
          receiveMeetingInfoFromServer,
          receivePostInfoFromServer,
          postMeetingFromClient,
        },
      }}
    >
      {children}
    </HomeFeedContext.Provider>
  );
};
