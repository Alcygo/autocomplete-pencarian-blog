const ably = new Ably.Realtime('vf2ATw.2xYwMw:B_uvc4u0Bky4ojHXx9WSHPR5-67w_ydaR3D47On1s0w');
const channel = ably.channels.get('proxy-request');

function requestURL() {
  const url = document.getElementById("urlInput").value;
  channel.publish('get-url', { url });
}

channel.subscribe('response', (msg) => {
  document.getElementById("viewer").srcdoc = msg.data.body;
});
