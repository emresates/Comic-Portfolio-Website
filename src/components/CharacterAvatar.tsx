export function CharacterAvatar() {
  return (
    <div className="anim-float-bob" style={{ position: "relative" }}>
      <div
        style={{
          width: 260,
          height: 260,
          background: "#FFD23F",
          border: "5px solid #1A1A2E",
          borderRadius: "50%",
          boxShadow: "8px 8px 0 #1A1A2E",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="anim-burst-spin"
          style={{
            position: "absolute",
            inset: -60,
            background:
              "repeating-conic-gradient(#FFD23F 0deg 12deg, #FFB800 12deg 24deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle, rgba(214,40,40,0.22) 1.8px, transparent 1.8px) 0 0 / 14px 14px",
          }}
        />
        <div style={{ position: "relative", width: 190, height: 230 }}>
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: 25,
              width: 140,
              height: 78,
              background: "#D62828",
              border: "4px solid #1A1A2E",
              borderRadius: "40px 40px 0 0",
            }}
          />
          <div
            className="font-bangers"
            style={{
              position: "absolute",
              bottom: 8,
              left: 76,
              width: 38,
              height: 38,
              background: "#FFD23F",
              border: "3px solid #1A1A2E",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "#1A1A2E",
            }}
          >
            E
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 52,
              left: 66,
              width: 58,
              height: 16,
              background: "#fff",
              border: "3px solid #1A1A2E",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 62,
              left: 78,
              width: 34,
              height: 24,
              background: "#FFC49B",
              border: "3px solid #1A1A2E",
              borderTop: "none",
              borderBottom: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 26,
              left: 42,
              width: 106,
              height: 118,
              background: "#FFC49B",
              border: "4px solid #1A1A2E",
              borderRadius: "48px 48px 42px 42px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 78,
              left: 34,
              width: 16,
              height: 24,
              background: "#FFC49B",
              border: "3px solid #1A1A2E",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 78,
              left: 140,
              width: 16,
              height: 24,
              background: "#FFC49B",
              border: "3px solid #1A1A2E",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 36,
              width: 118,
              height: 52,
              background: "#1A1A2E",
              borderRadius: "60px 70px 10px 30px",
              transform: "rotate(-4deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 30,
              width: 34,
              height: 46,
              background: "#1A1A2E",
              borderRadius: "20px 0 10px 24px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 96,
              width: 56,
              height: 34,
              background: "#1A1A2E",
              borderRadius: "10px 40px 40px 6px",
              transform: "rotate(8deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 62,
              width: 30,
              height: 8,
              background: "#4CB5AE",
              borderRadius: 8,
              transform: "rotate(-8deg)",
            }}
          />
          <div
            className="anim-brow"
            style={{
              position: "absolute",
              top: 64,
              left: 62,
              width: 24,
              height: 6,
              background: "#1A1A2E",
              borderRadius: 4,
              transform: "rotate(-6deg)",
            }}
          />
          <div
            className="anim-brow-delay"
            style={{
              position: "absolute",
              top: 62,
              left: 104,
              width: 24,
              height: 6,
              background: "#1A1A2E",
              borderRadius: 4,
              transform: "rotate(10deg)",
            }}
          />
          <div
            className="anim-blink"
            style={{
              position: "absolute",
              top: 76,
              left: 64,
              width: 20,
              height: 22,
              background: "#fff",
              border: "3px solid #1A1A2E",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 6,
                width: 9,
                height: 9,
                background: "#1A1A2E",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            className="anim-blink"
            style={{
              position: "absolute",
              top: 76,
              left: 106,
              width: 20,
              height: 22,
              background: "#fff",
              border: "3px solid #1A1A2E",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 5,
                width: 9,
                height: 9,
                background: "#1A1A2E",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 96,
              left: 92,
              width: 10,
              height: 14,
              borderRight: "3px solid #1A1A2E",
              borderBottom: "3px solid #1A1A2E",
              borderRadius: "0 0 10px 0",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 114,
              left: 76,
              width: 42,
              height: 18,
              background: "#fff",
              border: "3px solid #1A1A2E",
              borderRadius: "4px 4px 22px 22px",
              transform: "rotate(3deg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 6,
                background: "#D62828",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 102,
              left: 56,
              width: 14,
              height: 8,
              background: "rgba(214,40,40,0.35)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 124,
              width: 14,
              height: 8,
              background: "rgba(214,40,40,0.35)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
      <div
        className="font-luckiest anim-wiggle"
        style={{
          position: "absolute",
          top: -18,
          right: -30,
          fontSize: 26,
          color: "#fff",
          background: "#D62828",
          border: "4px solid #1A1A2E",
          padding: "8px 14px",
          borderRadius: 12,
          transform: "rotate(8deg)",
          boxShadow: "4px 4px 0 #1A1A2E",
        }}
      >
        POW!
      </div>
      <div
        className="font-luckiest anim-wiggle-delay"
        style={{
          position: "absolute",
          bottom: -6,
          left: -34,
          fontSize: 18,
          color: "#1A1A2E",
          background: "#4CB5AE",
          border: "4px solid #1A1A2E",
          padding: "6px 12px",
          borderRadius: 10,
          transform: "rotate(-8deg)",
          boxShadow: "4px 4px 0 #1A1A2E",
        }}
      >
        {"</kod>"}
      </div>
    </div>
  );
}
