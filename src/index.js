import React, { useState } from "react";
import {
  SendBirdProvider,
  ChannelList,
  Channel,
  ChannelSettings,
  GroupChannelListOrder,
} from "@sendbird/uikit-react";
import ChannelPreview from "@sendbird/uikit-react/ChannelList/components/ChannelPreview";
import "sendbird-uikit/dist/index.css";

import "./index.css";
export default function Component(props) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const {
    userListQuery = null,
    profileUrl = "",
    dateLocale = null,
    colorSet = null,
    allowProfileEdit = false,
    disableAutoSelect = false,
    // The below configs are duplicates of the Dashboard UIKit Configs.
    // Since their default values will be set in the Sendbird component,
    // we don't need to set them here.
    showSearchIcon,
    replyType,
    isMultipleFilesMessageEnabled,
  } = props;

  return (
    <SendBirdProvider
      appId={props.model?.sendbirdAppId}
      userId={props.model?.userId}
      accessToken={props.model?.accessToken}
      theme="light"
      nickname={props.model?.userNickname}
      profileUrl={profileUrl}
      dateLocale={dateLocale}
      userListQuery={userListQuery}
      colorSet={colorSet}
    >
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <ChannelList
            allowProfileEdit={allowProfileEdit}
            activeChannelUrl={currentChannel?.url}
            disableAutoSelect={disableAutoSelect}
            onChannelSelect={(channel) => {
              if (channel) {
                setCurrentChannel(channel);
              } else {
                setCurrentChannel(null);
              }
            }}
            queries={{
              channelListQuery: {
                channelUrlsFilter: props.model?.channelUrlList,
                includeEmpty: true,
                includeFrozen: true,
              },
            }}
            renderChannelPreview={(props) => {
              return (
                <ChannelPreview
                  {...props}
                  renderChannelAction={() => {
                    return <span>{props.channel.customType}</span>;
                  }}
                  onLeaveChannel={() => {}}
                />
              );
            }}
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
              setShowSettings(!showSettings);
            }}
            onSearchClick={() => {
              setShowSettings(false);
              setShowSearch(!showSearch);
            }}
            showSearchIcon={showSearchIcon}
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
      </div>
    </SendBirdProvider>
  );
}
