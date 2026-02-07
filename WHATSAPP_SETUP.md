# ⚙️ IMPORTANT: Update Your WhatsApp Number

## Current Configuration
Your project is currently configured with a **demo WhatsApp number**: `+966501234567`

**This MUST be updated with your actual business WhatsApp number before deploying to production.**

---

## How to Update (2 Options)

### Option 1: Direct File Edit (Recommended for Quick Testing)
1. Open: `app/src/config/contact.ts`
2. Find this line:
   ```typescript
   whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966501234567',
   ```
3. Replace `+966501234567` with your number:
   ```typescript
   whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+your-phone-number',
   ```
4. Save and restart your dev server

### Option 2: Environment Variable (Recommended for Production)
1. Create or edit `app/.env.local`
2. Add this line:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=+your-phone-number
   ```
3. Save and restart your dev server

---

## Format Guidelines

### ✅ Correct Format
```
+966501234567      (country code + number)
+1234567890        (any country)
+44123456789       (UK example)
+33123456789       (France example)
```

### ❌ Incorrect Format
```
966501234567       (missing + sign)
0501234567         (local format - won't work)
+966 50 123 4567   (spaces will be removed, but works)
```

---

## Related Contact Information

You can also update these in the same config file:

```typescript
// In app/src/config/contact.ts

export const contactConfig = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966501234567',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@fastfortourism.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+966 50 123 4567',
};
```

Or via environment variables:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=+your-whatsapp
NEXT_PUBLIC_EMAIL=your@email.com
NEXT_PUBLIC_PHONE=+your-phone
```

---

## Where WhatsApp Number is Used

✅ All tour pages - "Book Now" buttons
✅ Offers page - "Book Offer" button  
✅ Visa page - "Contact Us" button
✅ MICE page - "WhatsApp Us" button
✅ Logistics page - "WhatsApp Us" button
✅ DMC page - "WhatsApp Us" button
✅ Footer - WhatsApp social icon
✅ All custom messages include the service/package name

---

## Testing Your WhatsApp Link

1. Update the number in config or .env
2. Restart dev server: `npm run dev`
3. Open any tour page (e.g., `/tours/egypt`)
4. Click "Book Now" button
5. Verify it opens WhatsApp with your number

---

## Common Issues

**Problem**: WhatsApp opens with wrong number
- ✓ Make sure you used the `+` sign
- ✓ Verify country code is correct
- ✓ Clear browser cache: Ctrl+Shift+Delete
- ✓ Restart dev server

**Problem**: WhatsApp doesn't open at all
- ✓ Check if WhatsApp Web is set up on your device
- ✓ Try a different device (mobile vs desktop)
- ✓ Verify number format is correct

**Problem**: Pre-filled message not showing
- ✓ This is normal - some WhatsApp versions may not show preview
- ✓ Message will still be sent when you type

---

## Production Deployment

Before deploying:

1. ✅ Update WhatsApp number
2. ✅ Verify it's correct in production .env file
3. ✅ Test on multiple devices/browsers
4. ✅ Test on mobile WhatsApp app
5. ✅ Verify messages are pre-filled correctly

---

## Quick Command Reference

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

## Support

If WhatsApp integration isn't working after updating:
1. Check file permissions
2. Verify number format
3. Clear `.next` cache: `rm -rf .next`
4. Reinstall dependencies: `npm install`
5. Restart dev server

---

## Your Action Items

- [ ] Copy your WhatsApp number
- [ ] Update it in `src/config/contact.ts` OR `.env.local`
- [ ] Restart dev server
- [ ] Test by clicking "Book Now" on a tour page
- [ ] Verify WhatsApp opens with your number

---

**⚠️ WARNING**: Don't forget this step before launching to production!

**Date**: January 22, 2026
**Action Required**: YES - Update your WhatsApp number
