# Shoppable Tracker

Analytics tracking library for Shoppable services (Facebook Pixel, Google Analytics, TikTok Pixel).

## Version Management

**IMPORTANT:** Always bump the version number in `package.json` when making code changes.

This library is used via GitHub in dependent services. NPM caches packages by version number, so code changes without a version bump may not be picked up by consuming services during deployment.

### When to Bump Version:
- ✅ Any code change (features, fixes, updates)
- ✅ Dependency updates that affect functionality
- ❌ README-only changes (optional)

### How to Bump:
```bash
# Update package.json version (follow semver)
# Major: Breaking changes (1.0.0 → 2.0.0)
# Minor: New features (1.0.0 → 1.1.0)
# Patch: Bug fixes (1.0.0 → 1.0.1)
```
