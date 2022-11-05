async function fcmSend(title, body, token) {
  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization: `key=	AAAAFnzciEE:APA91bHOX_FgDNgFTLLTSbHE4kvvheA1E9F1UuFjSH35xby4mxstKYSPV1QaysAxVnzMBlKutSGLxmDbzmzi1eOgX0GCOvpnSP_DW9ls7467aK5Wsu9FMX9M_i_KChNuMLg2H2z5f0uk`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token,
      notification: {
        body: body,
        title: title,
        content_available: true,
        priority: "high",
      },
      data: {
        body: body,
        title: title,
        content_available: true,
        priority: "high",
      },
    }),
  });
  return response.json();
}

export default fcmSend;
