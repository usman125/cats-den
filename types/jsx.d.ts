// Type declarations for web components used by react-datocms
// These are needed because react-datocms may render video players and other web components

declare namespace JSX {
  interface IntrinsicElements {
    "mux-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "playback-id"?: string;
        "stream-type"?: string;
        "metadata-video-title"?: string;
        "primary-color"?: string;
        "secondary-color"?: string;
        "accent-color"?: string;
        poster?: string;
        autoplay?: boolean | string;
        loop?: boolean | string;
        muted?: boolean | string;
        "default-hidden-captions"?: boolean | string;
      },
      HTMLElement
    >;
  }
}

