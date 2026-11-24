import { ImageResponse } from "next/og";

export const alt = "Munali Shakya - Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #3b3a6b, #e8a98f)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800 }}>Munali Shakya</div>
        <div style={{ fontSize: 44, marginTop: 16 }}>Backend Engineer</div>
        <div style={{ fontSize: 30, marginTop: 32, opacity: 0.85 }}>
          C# · ASP.NET Core · AWS · Terraform · AI integrations
        </div>
      </div>
    ),
    size,
  );
}
