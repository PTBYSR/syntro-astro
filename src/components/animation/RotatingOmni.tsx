import { motion } from "framer-motion";
import { Phone, MessageSquare, Mail, MessageCircle, Globe } from "lucide-react";
import { useMemo } from "react";

export default function OmnichannelOrbit() {
  const brand = "#FDA4B8";       // brand color
  const strokeColor = "#030712"; // icon stroke color

  // Channels with even spacing
  const channels = useMemo(
    () => [
      { id: "voice", icon: Phone, label: "Voice" },
      { id: "chat", icon: MessageSquare, label: "Chat" },
      { id: "email", icon: Mail, label: "Email" },
      { id: "sms", icon: MessageCircle, label: "SMS" },
      { id: "omni", icon: Globe, label: "Omnichannel" },
    ],
    []
  );

  return (
    <div className="relative flex items-center justify-center rounded-2xl overflow-hidden">
      {/* Brand glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${brand}10 0%, transparent 70%)`,
        }}
      />

      {/* Central AI Core */}
      {/* <div
        className="absolute w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-[#030712] font-semibold z-20"
        style={{
          background: brand,
          boxShadow: `0 0 25px ${brand}90`,
        }}
      >
        AI
      </div> */}

      {/* Orbits + Channels */}
      {channels.map((ch, i) => {
        const Icon = ch.icon;
        const radius = 80 + i * 40; // evenly spaced radii
        const duration = 15 + i * 3; // slower rotation

        return (
          <div key={ch.id} className="absolute">
            {/* Orbit line */}
            {/* <div
              className="absolute rounded-full border"
              style={{
                width: radius * 2,
                height: radius * 2,
                top: `calc(50% - ${radius}px)`,
                left: `calc(50% - ${radius}px)`,
                borderColor: `${brand}40`,
              }}
            /> */}

            {/* Rotating Icon (stays upright) */}
            <motion.div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration,
              }}
            >
              <motion.div
                className="absolute flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  top: -radius,
                  left: "50%",
                  x: "-50%",
                  borderRadius: "50%",
                  backgroundColor: `${brand}`,
                  boxShadow: `0 0 15px ${brand}70`,
                }}
              >
                {/* Keep upright: reverse rotation */}
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration,
                  }}
                >
                  <Icon size={22} color={strokeColor} strokeWidth={2} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
