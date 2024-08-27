import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useState } from "react";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const [liveMessage, setLiveMessage] = useState("The meeting will start shortly. Please stay tuned!")

  const myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_SECRET_KEY;
    const name = location.state?.name || "Harry";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.onLiveStart = () => {
        setLiveMessage("The meeting is live now!");
    };

    zc.joinRoom({
      container: element,
      liveNotStartedTextForAudience: liveMessage,
      startLiveButtonText: "Go Live Now!",
      sharedLinks: [
        {
          name: 'Copy link',
          url:
           window.location.protocol + '//' +
           window.location.host + window.location.pathname +
            '?roomId=' +
            roomId + '&name=' + name,
        },
      ],
      scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
      maxUsers: 10,
      showScreenSharingButton: true,
      screenSharingConfig: {
        resolution: "1920x1080",
        frameRate: 40,
        maxBitRate: 2000,
      },
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,
      useFrontFacingCamera: true,
      videoResolutionDefault: "1920x1080",
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      showRoomTimer: true,
    });
  };
  return (
    <div
    className="container"
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh'}}
  ></div>
  )
};

export default Room;
