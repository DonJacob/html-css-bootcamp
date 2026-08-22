# Eyepiece Bench

An interactive telescope field-of-view calculator. Pick a telescope, an eyepiece and a
Barlow or reducer, then watch a real deep-sky or solar-system target redraw itself at true
angular size inside the field your rig actually delivers.

Open `index.html` in any browser — phone, tablet or desktop. No build step, no dependencies,
one self-contained file.

## What it models

| Value | Formula |
| --- | --- |
| Effective focal length | telescope focal length × barlow |
| Magnification | effective focal length ÷ eyepiece focal length |
| True field of view | eyepiece apparent field ÷ magnification |
| Exit pupil | aperture ÷ magnification |
| Focal ratio | effective focal length ÷ aperture |
| Dawes limit | 116 ÷ aperture in mm (arcseconds) |
| Useful magnification | aperture ÷ 7 up to aperture × 2 |

Aperture also sets the limiting magnitude of the drawn star field (`2.7 + 5·log₁₀ D`), so a
smaller scope visibly shows fewer stars, and the Dawes limit sets the diffraction size of
every star drawn — which is why ε Lyrae's pairs merge below roughly 50 mm and split above it.

Targets whose interesting detail is far smaller than the field get a magnified inset drawn
with the same physics, because the canvas resolves much less angular detail than an eye at a
real eyepiece.

## Caveats

True field uses the classic `AFOV ÷ magnification` estimate rather than the eyepiece field
stop diameter, so it runs a few percent optimistic on wide-angle eyepieces. Star fields are
representative, not a survey catalogue. Angular sizes of the targets are real.
