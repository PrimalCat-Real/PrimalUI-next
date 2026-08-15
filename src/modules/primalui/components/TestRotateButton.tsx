import type { CSSProperties } from 'react'

const TestRotateButton = () => {
    return (
        <div
            className="gradient-border-component gradient-border-auto w-24 h-8"
            style={{
                "--gradient-primary": "#584827",
                "--gradient-secondary": "#c7a03c",
                "--gradient-accent": "#f9de90",
                "--bg-color": "#2d230f",
                "--border-width": "2px",
                "--border-radius": "20px",
                "--animation-duration": "5s",
                border: "2px solid transparent",
                borderRadius: "20px",
                backgroundImage: `linear-gradient(#2d230f, #2d230f),
conic-gradient(
    from var(--gradient-angle, 0deg),
    #584827 0%,
    #c7a03c 37%,
    #f9de90 30%,
    #c7a03c 33%,
    #584827 40%,
    #584827 50%,
    #c7a03c 77%,
    #f9de90 80%,
    #c7a03c 83%,
    #584827 90%
)`,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box"
            } as CSSProperties}
        >
            <style>
                {`
                    @property --gradient-angle {
                        syntax: '<angle>';
                        initial-value: 0deg;
                        inherits: false;
                    }

                    .gradient-border-auto {
                        animation: gradient-border-rotate var(--animation-duration, 5s) linear infinite;
                    }

                    @keyframes gradient-border-rotate {
                        to {
                            --gradient-angle: 360deg;
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default TestRotateButton

