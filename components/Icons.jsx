// Original mark: a chocolate bar — rounded square, scored into four
// segments, with one segment filled and a soft highlight edge.
export function LogoMark(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4.75"
        y="4.75"
        width="22.5"
        height="22.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16 5.6v20.8M5.6 16h20.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M17.9 7.6h4.35A2.1 2.1 0 0 1 24.35 9.7v4.4H17.9V7.6Z"
        fill="currentColor"
      />
      <path
        d="M9.2 22.6v-4.4h4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
