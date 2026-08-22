# Telescope Explorer

An interactive telescope field-of-view calculator. Pick a telescope, an eyepiece and a
Barlow or reducer, then watch a real deep-sky or solar-system target redraw itself at true
angular size inside the field your rig actually delivers.

Open `index.html` in any browser — phone, tablet or desktop. No build step, no dependencies,
one self-contained file.

## Sections

**The eyepiece view** — a live field circle with the selected target drawn at true angular
size, a scale bar, and a magnified detail inset for targets far smaller than the field.

**Controls** — 23 targets in five categories (solar system, galaxies, nebulae, clusters,
double stars), telescope and eyepiece presets, a barlow/reducer strip from 0.5× to 3×, and
every value editable by slider or typed number.

**The light path** — an optical schematic that redraws as you change the controls. Light
converges to the focal plane and opens out again at the same angle, so the beam reaching the
eyepiece mirrors the one that left the objective, and its width there is the exit pupil. Past
the eyepiece it runs collimated to your eye, which sits at that exit pupil, where the
eyepiece's whole illuminated field subtends the apparent field angle. The objective scales
with aperture, the cone angle follows the focal ratio, and a barlow or reducer appears in the
cone when one is fitted. Below it, every parameter and every derived value.

**What fits in this field** — the whole selected category rendered as thumbnails in your
current field, each labelled with its angular size and how much of the field it fills, so
you can see at a glance which objects your rig frames and which overflow it.

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

## Targets

| Category | Objects |
| --- | --- |
| Solar system | Moon, Jupiter, Saturn, Mars, Venus |
| Galaxies | M31 Andromeda, M33 Triangulum, M51 Whirlpool, M81 Bode's, M104 Sombrero |
| Nebulae | M42 Orion, Veil, North America, M8 Lagoon, M16 Eagle, M27 Dumbbell, M57 Ring |
| Clusters | M45 Pleiades, M44 Beehive, Double Cluster, M13 Hercules |
| Double stars | Albireo, ε Lyrae |

Every object is drawn procedurally on canvas — no image files — at its real angular size,
from Saturn's 44″ rings to the Veil's 3° shell.

## Caveats

True field uses the classic `AFOV ÷ magnification` estimate rather than the eyepiece field
stop diameter, so it runs a few percent optimistic on wide-angle eyepieces. Star fields are
representative, not a survey catalogue. Angular sizes of the targets are real.
