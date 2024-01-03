import React, { useState } from "react";
import {
  SendirdProvider,
  ChannelList,
  Channel,
  ChannelSettings,
} from "@sendbird/uikit-react";
import Thread from "@sendbird/uikit-react/Thread";
import "sendbird-uikit/dist/index.css";

import "./index.css";
export default function Component() {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showThread, setShowThread] = useState(false);
  const [threadTargetMessage, setThreadTargetMessage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  const [startingPoint, setStartingPoint] = useState(null);

  const {
    userListQuery = null,
    profileUrl = "",
    dateLocale = null,
    colorSet = null,
    allowProfileEdit = false,
    onProfileEditSuccess = null,
    disableAutoSelect = false,
    // The below configs are duplicates of the Dashboard UIKit Configs.
    // Since their default values will be set in the Sendbird component,
    // we don't need to set them here.
    showSearchIcon,
    replyType,
    isMultipleFilesMessageEnabled,
    channelUrlList = null,
  } = props;

  return (
    <SendirdProvider
      appId={props.model?.sendbirdAppId}
      userId={props.model?.userId}
      accessToken={props.model?.accessToken}
      theme="light"
      nickname={props.model?.userNickname}
      profileUrl={profileUrl}
      dateLocale={dateLocale}
      userListQuery={userListQuery}
      colorSet={colorSet}
      onUserProfileMessage={(channel) => {
        setCurrentChannel(channel);
      }}
    >
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <ChannelList
            allowProfileEdit={allowProfileEdit}
            activeChannelUrl={currentChannel?.url}
            onProfileEditSuccess={onProfileEditSuccess}
            disableAutoSelect={disableAutoSelect}
            onChannelSelect={(channel) => {
              setStartingPoint?.(null);
              setHighlightedMessage?.(null);
              if (channel) {
                setCurrentChannel(channel);
              } else {
                setCurrentChannel(null);
              }
            }}
            queries={
              channelUrlList
                ? {
                    channelListQuery: {
                      channelUrlsFilter: channelUrlList,
                    },
                  }
                : null
            }
          />
        </div>
        <div
          className={`
          ${showSettings ? "sendbird-app__conversation--settings-open" : ""}
          ${showSearch ? "sendbird-app__conversation--search-open" : ""}
          sendbird-app__conversation-wrap
        `}
        >
          <Channel
            channelUrl={currentChannel?.url || ""}
            onChatHeaderActionClick={() => {
              setShowSearch(false);
              setShowThread(false);
              setShowSettings(!showSettings);
            }}
            onSearchClick={() => {
              setShowSettings(false);
              setShowThread(false);
              setShowSearch(!showSearch);
            }}
            onReplyInThread={({ message }) => {
              // parent message
              setShowSettings(false);
              setShowSearch(false);
              if (replyType === "THREAD") {
                setThreadTargetMessage(message);
                setShowThread(true);
              }
            }}
            onQuoteMessageClick={({ message }) => {
              // thread message
              setShowSettings(false);
              setShowSearch(false);
              if (replyType === "THREAD") {
                setThreadTargetMessage(message);
                setShowThread(true);
              }
            }}
            onMessageAnimated={() => {
              setHighlightedMessage(null);
            }}
            onMessageHighlighted={() => {
              setHighlightedMessage?.(null);
            }}
            showSearchIcon={showSearchIcon}
            startingPoint={startingPoint}
            animatedMessage={highlightedMessage}
            isReactionEnabled={true}
            replyType={replyType}
            isMessageGroupingEnabled={true}
            isMultipleFilesMessageEnabled={isMultipleFilesMessageEnabled}
          />
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <ChannelSettings
              className="sendbird-channel-settings"
              channelUrl={currentChannel?.url || ""}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
        {showThread && (
          <Thread
            className="sendbird-app__thread"
            channelUrl={currentChannel?.url || ""}
            message={threadTargetMessage}
            onHeaderActionClick={() => {
              setShowThread(false);
            }}
            onMoveToParentMessage={({ message, channel }) => {
              if (channel?.url !== currentChannel?.url) {
                setCurrentChannel(channel);
              }
              if (message?.messageId !== highlightedMessage) {
                setStartingPoint?.(message?.createdAt);
              }
              setTimeout(() => {
                setHighlightedMessage(message?.messageId);
              }, 500);
            }}
          />
        )}
      </div>
    </SendirdProvider>
  );
}
