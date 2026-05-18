import { SVGProps } from 'react';

function ico(path: React.ReactNode, size = 18) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}

export const Icons = {
  search:  (s = 18) => ico(<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>, s),
  user:    (s = 18) => ico(<><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></>, s),
  bag:     (s = 18) => ico(<><path d="M5 7h14l-1.5 13h-11z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></>, s),
  menu:    (s = 18) => ico(<><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>, s),
  down:    (s = 18) => ico(<path d="m6 9 6 6 6-6"/>, s),
  right:   (s = 18) => ico(<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>, s),
  close:   (s = 18) => ico(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>, s),
  check:   (s = 18) => ico(<path d="M20 6 9 17l-5-5"/>, s),
  plus:    (s = 18) => ico(<><path d="M12 5v14"/><path d="M5 12h14"/></>, s),
  minus:   (s = 18) => ico(<path d="M5 12h14"/>, s),
  star:    (s = 14) => ico(<path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>, s),
  truck:   (s = 18) => ico(<><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>, s),
  return:  (s = 18) => ico(<><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></>, s),
  shield:  (s = 18) => ico(<><path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></>, s),
};
