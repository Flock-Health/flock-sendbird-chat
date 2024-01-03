import React, { Component, useState } from "react";
import {
  Sendbird,
  ChannelList,
  Channel,
  ChannelSettings,
  MessageSearchPannel,
  Thread,
} from "@sendbird/uikit-react";
import "sendbird-uikit/dist/index.css";

import "./index.css";
export default function Component() {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showThread, setShowThread] = useState(false);
  const [threadTargetMessage, setThreadTargetMessage] =
    (useState < SendableMessageType) | (null > null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [highlightedMessage, setHighlightedMessage] =
    (useState < number) | (null > null);
  const [startingPoint, setStartingPoint] = (useState < number) | (null > null);

  const {
    customApiHost = "",
    customWebSocketHost = "",
    breakpoint = null,
    userListQuery = null,
    profileUrl = "",
    dateLocale = null,
    config = {},
    voiceRecord,
    colorSet = null,
    stringSet = null,
    allowProfileEdit = false,
    disableMarkAsDelivered = false,
    renderUserProfile = null,
    onProfileEditSuccess = null,
    imageCompression = {},
    disableAutoSelect = false,
    sdkInitParams,
    customExtensionParams,
    eventHandlers,
    uikitOptions,
    // The below configs are duplicates of the Dashboard UIKit Configs.
    // Since their default values will be set in the Sendbird component,
    // we don't need to set them here.
    showSearchIcon,
    isMentionEnabled,
    replyType,
    disableUserProfile,
    isVoiceMessageEnabled,
    isMultipleFilesMessageEnabled,
    isTypingIndicatorEnabledOnChannelList,
    isMessageReceiptStatusEnabledOnChannelList,
    isUserIdUsedForNickname = true,
    channelUrlList = null,
  } = props;

  return (
    <Sendbird
      stringSet={stringSet}
      appId={props.model?.sendbirdAppId}
      userId={props.model?.userId}
      accessToken={props.model?.accessToken}
      customApiHost={customApiHost}
      customWebSocketHost={customWebSocketHost}
      breakpoint={breakpoint}
      theme="light"
      nickname={props.model?.userNickname}
      profileUrl={profileUrl}
      dateLocale={dateLocale}
      userListQuery={userListQuery}
      config={config}
      colorSet={colorSet}
      disableUserProfile={disableUserProfile}
      disableMarkAsDelivered={disableMarkAsDelivered}
      renderUserProfile={renderUserProfile}
      imageCompression={imageCompression}
      isReactionEnabled={true}
      isMentionEnabled={isMentionEnabled}
      isVoiceMessageEnabled={isVoiceMessageEnabled}
      isMultipleFilesMessageEnabled={isMultipleFilesMessageEnabled}
      voiceRecord={voiceRecord}
      onUserProfileMessage={(channel) => {
        setCurrentChannel(channel);
      }}
      isTypingIndicatorEnabledOnChannelList={
        isTypingIndicatorEnabledOnChannelList
      }
      isMessageReceiptStatusEnabledOnChannelList={
        isMessageReceiptStatusEnabledOnChannelList
      }
      replyType={replyType}
      showSearchIcon={showSearchIcon}
      uikitOptions={uikitOptions}
      isUserIdUsedForNickname={isUserIdUsedForNickname}
      sdkInitParams={sdkInitParams}
      customExtensionParams={customExtensionParams}
      eventHandlers={eventHandlers}
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
        {showSearch && (
          <div className="sendbird-app__searchpanel-wrap">
            <MessageSearchPannel
              channelUrl={currentChannel?.url || ""}
              onResultClick={(message) => {
                if (message.messageId === highlightedMessage) {
                  setHighlightedMessage?.(null);
                  setTimeout(() => {
                    setHighlightedMessage?.(message.messageId);
                  });
                } else {
                  setStartingPoint?.(message.createdAt);
                  setHighlightedMessage?.(message.messageId);
                }
              }}
              onCloseClick={() => {
                setShowSearch(false);
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
    </Sendbird>
  );
}
