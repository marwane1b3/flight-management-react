import React, { useMemo } from "react";
import { useAuth } from "../../contexts/auth";
import "./UserPanel.scss";
import type { UserPanelProps } from "../../types";

export default function UserPanel({ menuMode }: UserPanelProps) {
  const { user, signOut } = useAuth();

  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          <div
            style={{
              background: `url(${user!.avatarUrl}) no-repeat #fff`,
              backgroundSize: "cover",
            }}
            className={"user-image"}
          />
        </div>
        <div className={"user-name"}>{user!.email}</div>
      </div>
    </div>
  );
}
