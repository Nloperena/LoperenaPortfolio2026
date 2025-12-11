# Paper Texture Implementation Guide

## Step 1: Get Texture from Adobe Express

1. Go to Adobe Express
2. Search for "paper texture" or "parchment texture"
3. Choose a subtle, aged texture with neutral/cream tones
4. Download as PNG or JPG
5. Recommended size: 512x512px or 1024x1024px (for tiling)

## Step 2: Add to Project

1. Place the texture file in `/public/` directory
2. Name it something like: `paper-texture.png` or `parchment-texture.jpg`

## Step 3: Update CSS

### Option A: Replace Current SVG Noise (Recommended)
Update `app/globals.css` line 641-649:

```css
.bg-paper-grain {
  background-color: #F2F0E6;
  background-image: url('/paper-texture.png'); /* Your new texture */
  background-repeat: repeat;
  background-attachment: scroll;
  background-size: 512px 512px; /* Adjust to match your texture size */
  opacity: 0.4; /* Adjust opacity to make it subtle */
  mix-blend-mode: multiply; /* Optional: blends with background color */
}
```

### Option B: Layer Both (More Realistic)
Keep the SVG noise and add the image texture on top:

```css
.bg-paper-grain {
  background-color: #F2F0E6;
  background-image: 
    url('/paper-texture.png'), /* Your texture image */
    url("data:image/svg+xml,..."); /* Keep existing SVG noise */
  background-repeat: repeat, repeat;
  background-attachment: scroll, scroll;
  background-size: 512px 512px, 400px 400px;
  opacity: 0.3, 0.03; /* Adjust both opacities */
}
```

## Step 4: Fine-Tuning

### Adjust Opacity
- Start with `opacity: 0.2-0.4` and adjust based on how visible you want it
- Too high = distracting, too low = invisible

### Adjust Size
- If texture looks too large: increase `background-size` (e.g., 1024px)
- If texture looks too small: decrease `background-size` (e.g., 256px)

### Adjust Blend Mode (Optional)
- `multiply`: Darkens and blends with background
- `overlay`: Adds depth
- `soft-light`: Subtle blending
- Remove `mix-blend-mode` for normal overlay

### Color Tinting (If texture is grayscale)
```css
.bg-paper-grain {
  background-color: #F2F0E6;
  background-image: url('/paper-texture.png');
  background-repeat: repeat;
  background-size: 512px 512px;
  filter: sepia(20%) saturate(80%) brightness(105%);
  /* Adjust sepia/saturate/brightness to match your cream color */
}
```

## Step 5: Test Performance

- Check file size: Should be under 200KB for web
- Test on different screen sizes
- Ensure it tiles seamlessly (no visible seams)
- Check on both light and dark backgrounds if using dark mode

## Current Usage Locations

The `.bg-paper-grain` class is used in:
- `app/page.tsx` - Main container
- `components/LineageDrawer.tsx` - Drawer background
- Various other components

All will automatically use the new texture once you update the CSS.


