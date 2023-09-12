import React, { Component } from "react";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import "sendbird-uikit/dist/index.css";

import "./index.css";
export default class extends Component {
  render() {
    return (
      <SendbirdApp
        appId={this.props.model?.sendbirdAppId}
        accessToken={this.props.model?.accessToken}
        userId={this.props.model?.userId}
        nickname={this.props.model?.userNickname}
        theme={"light"}
        useReaction={true}
        useMessageGrouping={true}
      />
    );
  }
}
