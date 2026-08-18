import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090c",
          color: "#f3f4f6",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 6, color: "#8b919c" }}>
          NITIN.OS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.9 }}>Nitin S</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#8b919c" }}>Software Engineer</div>
          <div style={{ marginTop: 28, fontSize: 20, color: "#616874" }}>
            Full stack · AI / ML · Systems · Product
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 16, color: "#4d7cff", letterSpacing: 3 }}>
          OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES
        </div>
      </div>
    ),
    size,
  );
}
