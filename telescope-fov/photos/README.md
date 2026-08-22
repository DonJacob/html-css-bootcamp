# photos/

Drop real astrophotographs in here and Telescope Explorer will draw them in the eyepiece
view at true angular size, in place of the procedural renderings.

Nothing ships with the app. Astrophotos carry licences — NASA images are generally public
domain, ESA/Hubble and ESO are CC BY 4.0, and most amateur images are all rights reserved —
so choosing which ones to include, and crediting them, is your call.

## Adding one

1. Put the image here, named after the target id: `m42.jpg`, `m31.jpg`, `veil.jpg`. The ids
   are the `id:` fields in the `TARGETS` array in `index.html`.

2. Register it in the `PHOTOS` block near the top of the `<script>` in `index.html`:

   ```js
   const PHOTOS = {
     m42:  {src:"photos/m42.jpg",  fov:120, credit:"NASA/ESA Hubble"},
     m31:  {src:"photos/m31.jpg",  fov:200, credit:"Jane Observer, 2026"},
     veil: {src:"photos/veil.jpg", fov:190, rot:12, credit:"ESO"}
   };
   ```

3. Switch the app to **Photo** under "Drawn as".

## fov is the field that matters

`fov` is **the width of your image in arcminutes** — not the size of the object in it. It is
what lets a photograph sit at the same true angular scale as everything else in the app, so
that swapping eyepieces reframes the photo exactly the way it would reframe the real sky.

Three ways to get it:

- **Plate solve** the image (astrometry.net, ASTAP, PixInsight). This gives the field width
  directly and is the accurate answer.
- **From the optics that took it:** `fov_arcmin = 3438 × sensor_width_mm ÷ focal_length_mm`.
- **By eye:** if a known object spans a third of the frame, the frame is three times that
  object's angular size. The sizes are in the `TARGETS` array — M42 is 85′, M31 is 190′,
  the Moon is 31′.

Get `fov` wrong and the photo will be drawn at the wrong scale, which quietly defeats the
whole point of the app. Everything else is cosmetic.

## Cropping

Centre the object in the frame. The app draws the image centred on the field, so an
off-centre object will sit off-centre in the eyepiece. Square crops work best. `rot` rotates
the image clockwise in degrees if the orientation needs fixing.

## Checking your fov before you trust it

`example-scale-check.jpg` in this folder is a calibration card, not a photograph: a plain disc
that fills exactly half the frame, over a synthetic star field. Register it temporarily as the
Moon with a frame width of twice the Moon's diameter —

```js
const PHOTOS = { moon: {src:"photos/example-scale-check.jpg", fov:62} };
```

— switch to **Photo**, and the disc should measure 31′ against the scale bar in the corner,
the same size the drawn Moon renders at. If it does, the scaling path is behaving and you can
trust your own images. Remove the entry afterwards.

## Publishing as a single file

Relative paths work when you open `index.html` from disk or serve the folder. If the page has
to travel as one self-contained file — a published artifact, an email attachment — the images
must be inlined as data URIs:

```
node tools/inline-photos.mjs                # writes index.inlined.html
```

The images are stored as-is, so downscale them first (1000 px on the long edge is plenty for
a field circle) or the file gets large.
