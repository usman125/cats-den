import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Cat's Den - Premium Kittens for Loving Homes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8F0",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #FFE5D5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #FFE5D5 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#C96B4B",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
            }}
          >
            <span style={{ fontSize: 60 }}>🐱</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#2D2D2D",
              }}
            >
              Cat&apos;s Den
            </span>
            <span
              style={{
                fontSize: 28,
                color: "#6B6B6B",
              }}
            >
              Premium Kittens for Loving Homes
            </span>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 20,
          }}
        >
          {[
            { icon: "🏆", text: "Champion Bloodlines" },
            { icon: "💉", text: "Health Guaranteed" },
            { icon: "❤️", text: "Well Socialized" },
          ].map((feature) => (
            <div
              key={feature.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: "white",
                padding: "16px 24px",
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <span style={{ fontSize: 32 }}>{feature.icon}</span>
              <span style={{ fontSize: 22, color: "#2D2D2D" }}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 48,
            backgroundColor: "#C96B4B",
            color: "white",
            padding: "18px 48px",
            borderRadius: 16,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Find Your Perfect Kitten
        </div>

        {/* Website URL */}
        <span
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 20,
            color: "#6B6B6B",
          }}
        >
          catsden.com
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

