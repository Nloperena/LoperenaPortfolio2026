# Component Copy Instructions

To complete the Next.js migration, copy the following component files from `../src/components/` to `./components/` and make the following conversions:

## Components to Copy (with conversions)

### Already Converted:
- ✅ `NewHeader.tsx` - Converted React Router `Link` to Next.js `Link`
- ✅ `app/page.tsx` - Main page with Next.js metadata API

### Need to Copy (no changes needed):
1. `CredibilityStrip.tsx` - No React Router dependencies
2. `TechStackStrip.tsx` - No React Router dependencies
3. `AboutMeSection.tsx` - No React Router dependencies
4. `SpecializationsSection.tsx` - No React Router dependencies
5. `SimplifiedCTA.tsx` - No React Router dependencies
6. `FooterV2.tsx` - No React Router dependencies (uses regular `<a>` tags)
7. `NewHero.tsx` - No React Router dependencies
8. `CurvedLoop.tsx` - No React Router dependencies
9. `GradualBlur.tsx` - No React Router dependencies
10. `FaultyTerminal.tsx` - No React Router dependencies
11. `ServicesDrawer.tsx` - No React Router dependencies
12. `TestimonialVideosGrid.tsx` - No React Router dependencies

### Need to Convert:
1. **`VITOCaseStudyTeaser.tsx`** - Replace:
   ```tsx
   import { Link } from 'react-router-dom';
   ```
   With:
   ```tsx
   import Link from 'next/link';
   ```
   And replace:
   ```tsx
   <Link to="/projects/vito-fryfilter">
   ```
   With:
   ```tsx
   <Link href="/projects/vito-fryfilter">
   ```

## Import Path Updates

All components use `@/components/...` imports which should work with the Next.js tsconfig.json path alias already set up.

## Quick Copy Command (PowerShell)

```powershell
# Copy components that don't need changes
Copy-Item ../src/components/CredibilityStrip.tsx ./components/
Copy-Item ../src/components/TechStackStrip.tsx ./components/
Copy-Item ../src/components/AboutMeSection.tsx ./components/
Copy-Item ../src/components/SpecializationsSection.tsx ./components/
Copy-Item ../src/components/SimplifiedCTA.tsx ./components/
Copy-Item ../src/components/FooterV2.tsx ./components/
Copy-Item ../src/components/NewHero.tsx ./components/
Copy-Item ../src/components/CurvedLoop.tsx ./components/
Copy-Item ../src/components/GradualBlur.tsx ./components/
Copy-Item ../src/components/FaultyTerminal.tsx ./components/
Copy-Item ../src/components/ServicesDrawer.tsx ./components/
Copy-Item ../src/components/TestimonialVideosGrid.tsx ./components/
```

Then manually convert `VITOCaseStudyTeaser.tsx` as described above.

