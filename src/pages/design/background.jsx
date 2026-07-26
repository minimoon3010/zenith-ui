export default function Background({ count = 120 }) {
    const stars = Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        pulseDuration: Math.random() * 1.5 + 0.8,
        driftX: (Math.random() - 0.5) * 100,
        driftY: (Math.random() - 0.5) * 100,
        driftDuration: Math.random() * 20 + 15,
    }));

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {stars.map(s => {
                const starStyle = {
                    position: 'absolute',
                    top: `${s.top}%`,
                    left: `${s.left}%`,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    borderRadius: '50%',
                    background: 'white',
                    '--drift-x': `${s.driftX}px`,
                    '--drift-y': `${s.driftY}px`,
                    animation: `pulse ${s.pulseDuration}s ease-in-out ${s.delay}s infinite,
                        drift ${s.driftDuration}s ease-in-out ${s.delay}s infinite`,
                };

                return <div key={s.id} style={starStyle} />;
            })}
        </div>
    );
}