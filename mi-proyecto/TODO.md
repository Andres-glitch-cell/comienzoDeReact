# Animation Fixes TODO

## Issues Identified

1. Missing `.scroll-animate-fade` CSS class - used by ScrollAnimations.tsx for 'fade' animation type
2. Missing `.scroll-animate-slide-up` CSS class - used by ScrollAnimations.tsx for 'slide-up' animation type and directly used in App.tsx

## Fix Plan

- [x] Add `.scroll-animate-fade` CSS class to App.css
- [x] Add `.scroll-animate-slide-up` CSS class to App.css
- [x] Test the build to verify fixes

## Animation Classes Reference

### Existing (working)

- scroll-animate-slide-left ✓
- scroll-animate-slide-right ✓
- scroll-animate-slide-down ✓
- scroll-animate-scale ✓
- scroll-animate-scale-up ✓
- scroll-animate-rotate ✓
- scroll-animate-flip ✓
- scroll-animate-shimmer ✓
- scroll-animate-zoom-in ✓
- scroll-animate-bounce ✓
- scroll-animate-elastic ✓
- scroll-animate-wave ✓
- scroll-animate-glow ✓

### Missing (needs to be added)

- scroll-animate-fade
- scroll-animate-slide-up
