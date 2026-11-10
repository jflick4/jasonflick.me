---
title: SkyTruth
summary: A stacking pipeline for the Vaonis Vespera that refuses to invent photons. Star detection, RANSAC alignment, GPU sigma-clipped stacking, transient detection — and an audit report that says exactly what it did.
status: active
tags: [Astronomy, Physics, "Open source"]
featured: false
order: 2
image: /images/projects/skytruth-pipeline.png
imageAlt: "The SkyTruth pipeline — ingest, filter, align, transients, stack, stretch, validate"
links:
  - label: Source on GitHub
    href: https://github.com/jflick4/Sky-Helper-vaonis
---

## The objective

Smart telescopes like the Vespera do something quietly remarkable: they point, track, and stack hundreds of short exposures into a picture while you sleep. They also do something quietly annoying — the picture you get is the one the telescope decided to make, with processing you can't see and can't argue with.

SkyTruth is my answer. It pulls the raw frames off the telescope — every FITS file, every bit of metadata — and runs its own pipeline, built on one rule I wrote down before the first line of code:

> No generative AI. No hallucinated stars. No invented nebula detail. If a step ran, the report says so. If a frame was thrown out, the report says why.

The name is the point. A stacker's job is to find the signal that was actually there, not to paint what the sky "should" look like.

## What it actually does

Every session goes through the same eight stages, and each one logs what it did:

1. **Ingest.** Debayer the raw FITS, pull the metadata — target, gain, exposure, pointing — straight from the telescope's manifest.
2. **Quality filter.** Score every frame on sky brightness, noise, and alignment residual using robust statistics (MAD z-scores). Outliers get rejected, and the rejection is logged.
3. **Align.** Detect stars, match them between frames, and solve a rigid transform with RANSAC. Alignment runs in a chain so a bad frame can't poison its neighbours.
4. **Transients.** Before stacking, scan the aligned frames for anything that's bright in a few frames but not most — satellites, cosmic rays, the occasional airplane. At 8σ a session that would produce thousands of false positives at 5σ produces a few dozen real ones. They're logged, not erased.
5. **Stack.** Sigma-clipped mean on the GPU (CuPy, falling back to NumPy), tiled so a 300-frame session fits in memory. The output is a float32 FITS that preserves the sensor's actual ADU values — the scientific product — plus a 16-bit TIFF.
6. **Stretch.** The linear stack is dark; it has to be stretched to be seen. Four strategies live in a module you can A/B: the Generalized Hyperbolic Stretch, a nebula-tuned variant, and two linked-asinh stretches after Lupton et al. 2004.
7. **Validate.** Automated checks that the output isn't flipped, that the stars are round, that nothing came out blacker than it went in.
8. **Scorecard.** Measure star count, FWHM, roundness, SNR, dynamic range, and nebula detail on the telescope's own JPEG and on ours, side by side. The pipeline grades itself against the manufacturer.

## Telescope vs. SkyTruth

Same raw frames, two pipelines. Left is what the Vespera produced; right is SkyTruth. Drag.

<BeforeAfter before="/images/astro/ngc2359-telescope.jpg" after="/images/astro/ngc2359-skytruth.jpg" beforeLabel="Telescope" afterLabel="SkyTruth" alt="NGC 2359, Thor's Helmet — 205 frames, December 2025" />

<BeforeAfter before="/images/astro/m20-telescope.jpg" after="/images/astro/m20-skytruth.jpg" beforeLabel="Telescope" afterLabel="SkyTruth" alt="M20, the Trifid Nebula — 37 frames, June 2026" />

<BeforeAfter before="/images/astro/ic1396-telescope.jpg" after="/images/astro/ic1396-skytruth.jpg" beforeLabel="Telescope" afterLabel="SkyTruth" alt="IC 1396, the Elephant's Trunk — 238 frames, June 2026" />

And this is where both of them started: a single ten-second frame, straight off the sensor, before any stacking at all.

![A single raw frame of NGC 2359 — what one exposure actually looks like](/images/astro/ngc2359-raw.jpg)

## What's still wrong

In the spirit of the name: the tiled stacker currently leaves a visible seam where tiles meet, because sigma clipping runs independently per tile. Some sessions — the North America Nebula, the Flame, the Eagle — show it, and they aren't on this page until the overlap-and-blend fix is in. Sessions over about 300 frames can still run out of memory during star detection. The next stages on the roadmap are self-supervised denoising, PSF deconvolution from the stars themselves, and colour calibration against Gaia DR3.

## The stack

TypeScript monorepo — React + Vite front end, Express API, Postgres via Drizzle, OpenAPI-generated clients — with the scientific pipeline in Python (NumPy, SciPy, Astropy, CuPy). Observations arrive from the telescope over FTP on the Vespera Classic and USB on the Vespera III. The source is linked above.

[Jason: add the story of why you started — the night the telescope's JPEG didn't match what you knew was there — and your own favourite image once the seam is fixed.]
