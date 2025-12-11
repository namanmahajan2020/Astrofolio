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
      generateMeteors();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      // more precise random placement and a random show delay so stars appear at different times
      const x = Number((Math.random() * 100).toFixed(2));
      const y = Number((Math.random() * 100).toFixed(2));
      newStars.push({
        id: `s-${i}-${Date.now()}`, // include timestamp to avoid duplicate keys on quick regenerations
        size: Math.random() * 3 + 1,
        x,
        y,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
        showDelay: Math.random() * 6, // stars will start their pulse at random times (seconds)
      });
    }

    setStars(newStars);
  };

  // helper to create random travel vector and initial position
  const randomMeteorProps = (id) => {
    const size = Math.random() * 2 + 1;
    const startX = Math.random() * 100;
    const startY = Math.random() * 20;
    const delay = Math.random() * 6;
    const duration = Math.random() * 2 + 2.5;

    const dx =
      -(
        window.innerWidth *
        (0.6 + Math.random() * 0.9) *
        (size / 2 + 0.6)
      ).toFixed(0) + "px";

    const dy =
      Math.max(
        200,
        window.innerHeight *
          (0.25 + Math.random() * 0.65) *
          (size / 2 + 0.6)
      ).toFixed(0) + "px";

    return {
      id: `m-${id}`,
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

    setMeteors(newMeteors);

    // clear previous interval if any
    if (intervalRef.current) clearInterval(intervalRef.current);

    // compute a safe reshuffle interval (no mid-flight resets)
    const durations = newMeteors.map((m) => m.delay + m.animationDuration);
    const safeMs =
      Math.max(3000, Math.ceil(Math.max(...durations) * 1000) + 500);

    intervalRef.current = setInterval(() => {
      setMeteors((prev) =>
        prev.map((m, idx) => ({
          id: m.id,
          ...randomMeteorProps(idx),
        }))
      );
    }, safeMs);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",

            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            animationDelay: star.showDelay + "s", // <--- staggered appearance
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
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
