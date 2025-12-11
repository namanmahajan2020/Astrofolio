import { useEffect, useState, useRef } from "react";

// id, size, x, y, opacity, animationDuration
// meteors: id, size, x, y, delay, animationDuration, dx, dy

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
      // regenerate meteors on resize too (optional)
      generateMeteors();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const generateStars = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const numberOfStars = Math.floor((W * H) / 10000);

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const x = Number((Math.random() * 100).toFixed(2));
      const y = Number((Math.random() * 100).toFixed(2));
      newStars.push({
        id: `s-${i}-${Date.now()}`,
        size: Math.random() * 3 + 1,
        x,
        y,
        opacity: Math.random() * 0.5 + 0.45,
        animationDuration: Math.random() * 4 + 2,
        showDelay: Math.random() * 6,
      });
    }
    setStars(newStars);
  };

  // helper to create random travel vector and initial position
  const randomMeteorProps = (idx) => {
    const size = Math.random() * 2 + 1;
    // start off somewhere near top band
    const startX = Number((Math.random() * 100).toFixed(2));
    const startY = Number((Math.random() * 18).toFixed(2));
    const delay = Number((Math.random() * 3).toFixed(2)); // shorter staggers feel more "burst-like"
    const duration = Number((Math.random() * 1.6 + 0.9).toFixed(2)); // faster runs

    // distances in px (negative x to move left)
    const dx =
      -Math.round(
        window.innerWidth * (0.55 + Math.random() * 0.8) * (size / 2 + 0.6)
      ) + "px";

    const dy =
      Math.round(
        window.innerHeight * (0.25 + Math.random() * 0.6) * (size / 2 + 0.6)
      ) + "px";

    return {
      // unique id -> includes timestamp to force remount
      id: `m-${idx}-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
      size,
      x: startX,
      y: startY,
      delay,
      animationDuration: duration,
      dx,
      dy,
    };
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push(randomMeteorProps(i));
    }

    // set the *new* array (new keys) so DOM nodes remount — animations start cleanly
    setMeteors(newMeteors);

    // clear previous interval if any
    if (intervalRef.current) clearInterval(intervalRef.current);

    // compute a safe reshuffle interval (no mid-flight resets)
    const durations = newMeteors.map((m) => m.delay + m.animationDuration);
    const safeMs = Math.max(2000, Math.ceil(Math.max(...durations) * 1000) + 600);

    // Regenerate whole meteor set after they finish (so we replace elements entirely)
    intervalRef.current = setInterval(() => {
      const fresh = [];
      for (let i = 0; i < numberOfMeteors; i++) fresh.push(randomMeteorProps(i));
      setMeteors(fresh);
    }, safeMs);
  };

  return (
    <div className="star-background cinematic fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="star-orbit" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star orbiting-star"
            style={{
              left: "50%",
              top: "50%",
              width: s.size + "px",
              height: s.size + "px",
              opacity: s.opacity,
              animationDuration: s.animationDuration + "s",
              animationDelay: s.showDelay + "s",
              ["--rx"]: `${Math.max(8, 60 + Math.random() * 600)}px`, // simplified orbit radii
              ["--ry"]: `${Math.max(4, 20 + Math.random() * 300)}px`,
              ["--theta-deg"]: `${(Math.random() * 360).toFixed(2)}deg`,
              ["--orbit-mod"]: (0.9 + Math.random() * 0.3).toFixed(3),
              ["--blink-dur"]: `${(8 + Math.random() * 22).toFixed(2)}s`,
              ["--blink-delay"]: `${(Math.random() * 20).toFixed(2)}s`,
              ["--depth"]: (0.25 + Math.random() * 0.75).toFixed(3),
            }}
          />
        ))}
      </div>

      {meteors.map((meteor) => (
        <div
          key={meteor.id} // unique -> forces remount on regeneration
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 48 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
            ["--dx"]: meteor.dx,
            ["--dy"]: meteor.dy,
          }}
        />
      ))}
    </div>
  );
};
