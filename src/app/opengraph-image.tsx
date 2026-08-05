import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/data";

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070c",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "#7c6cff",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#00d2a8",
            opacity: 0.22,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#7c6cff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            AK
          </div>
          <div style={{ color: "#a2a2b4", fontSize: 26 }}>{PROFILE.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f4f4f7", fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>
            {PROFILE.name}
          </div>
          <div style={{ color: "#7c6cff", fontSize: 40, fontWeight: 600, marginTop: 8 }}>
            {PROFILE.role}
          </div>
          <div style={{ color: "#a2a2b4", fontSize: 28, marginTop: 24, maxWidth: 900 }}>
            Offline-first tools, compression that ships, and retrieval systems people use.
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, color: "#6e6e83", fontSize: 24 }}>
          <div style={{ display: "flex" }}>github.com/Mayamoho</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>University of Dhaka</div>
        </div>
      </div>
    ),
    size,
  );
}
