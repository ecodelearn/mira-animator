# Video formats

One 16:9 deck is the source of truth. From it, Mira generates extra files for other aspect ratios, transitions and video — **without ever touching the original**. Each format agent writes a new file next to `index.html`.

```
decks/my-talk/
├── index.html              # the original 16:9 deck
├── index-1x1.html          # mira-squared
├── index-9x16.html         # mira-vertical
├── index-thirds.html       # mira-thirds
├── index-dissolve.html     # mira-transition-dissolve
└── talk.mp4                # mira-slide-to-video
```

## Square — `/mira-squared`

A **1:1 (1080×1080)** version, for the Instagram feed, LinkedIn, and other square placements. It locks each slide into the square frame and shrinks the side gaps, with a fixed frame and light fitting. Centered by default, with the option to align left or right. It can also create square slides from scratch in the native geometry when there is no source deck.

→ `index-1x1.html`

## Vertical — `/mira-vertical`

A **9:16 (1080×1920)** version, for Reels, Shorts, TikTok and Stories. Each content slide is reduced to just the main title at the top and a tall, standardized animation canvas below — subtitle, card header and footer pills are dropped, and the title auto-shrinks to fit at most two lines. The key move: each animation's **axis is reworked for portrait** (a horizontal flow becomes vertical, a wide ellipse becomes tall, a side-by-side comparison becomes stacked). Text, colors, timings and the loop stay intact — only position, axis and viewBox height change. Outside the column the background is `#000000`.

→ `index-9x16.html`

!!! tip "Growing elements on vertical"
    On 9:16, when you ask `mira-size-animator` to grow the elements, it also reduces the distances between them so the composition stays tight. On 16:9, only the elements grow.

## Rule of thirds — `/mira-thirds`

A **composition** variant that does **not** change the aspect ratio. It pushes each slide's content (title, animation and pills) into columns 1 and 2 of a 3×3 grid — the left two-thirds — and leaves the entire right column free. That free column is reserved for you to overlay text, a lower-third, or the presenter's video during editing.

It composes on top of any base: 16:9, the 1:1 square, or the 9:16 vertical. The free side is the right by default and can be flipped to the left.

→ `index-thirds.html`

## Dissolve transition — `/mira-transition-dissolve`

A **transition** variant. It swaps the smooth scroll between cards for a real **crossfade** (dissolve, Canva/Keynote style) using the View Transitions API (same-document). One slide dissolves into the next.

Because it is same-document, it works straight from `file://` with no server (Chrome/Edge). Browsers without the API simply navigate normally.

→ `index-dissolve.html`

## Slide to video: `/mira-slide-to-video`

Renders one or more slides into a single **`.mp4`**, the real animation and not a screenshot. It opens the deck in **headless Chrome**, records each slide in real time (the animation starts from zero, with no leak from the previous slide, framed to fill the frame) and stitches the clips with **ffmpeg**. You pick which slide or slides go in and the resolution (16:9, 9:16 or 1:1); with more than one slide it chains them with a crossfade, 4 seconds per slide by default. Slides with a **finite** animation, like `mira-chart-race`, play in full. The original deck is never touched.

For a vertical or square video that truly fills the frame, record the deck already adapted to the format: the `index-9x16.html` from `mira-vertical` or the `index-1x1.html` from `mira-squared`. It needs **ffmpeg** on the PATH plus `puppeteer` and `puppeteer-screen-recorder`, installed on demand.

→ `deck.mp4`

## Recording tip

The automatic way to turn any of these into a video is `/mira-slide-to-video` (above). To do it by hand, open the file and screen-record with the browser viewport set to the format's resolution (1920×1080, 1080×1080, or 1080×1920). The internal loops keep every slide alive while you record.
