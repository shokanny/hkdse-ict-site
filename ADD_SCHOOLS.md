# Adding Schools - Quick Guide

## Quick Start: Add a New School

### Step 1: Edit `auth.js`

Open `auth.js` and find the `SCHOOLS_CONFIG` array (around line 5):

```javascript
const SCHOOLS_CONFIG = [
  {
    id: "iktmc",
    name: "IKTMC",
    emailDomain: "@learn.iktmc.edu.hk",
    enabled: true
  },
  // 👇 Add your new school here
  {
    id: "your-school-id",
    name: "Your School Name",
    emailDomain: "@learn.yourschool.edu.hk",
    enabled: true
  }
];
```

### Step 2: Save and Test

1. Save the file
2. Refresh the browser
3. Try logging in with the new school's email domain

That's it! ✨

## Examples

### Adding King George V School
```javascript
{
  id: "kgv",
  name: "King George V School",
  emailDomain: "@learn.kgv.edu.hk",
  enabled: true
}
```

### Adding Diocesan Girls' School
```javascript
{
  id: "dgs",
  name: "Diocesan Girls' School",
  emailDomain: "@learn.dgs.edu.hk",
  enabled: true
}
```

### Adding Multiple Schools at Once
```javascript
const SCHOOLS_CONFIG = [
  {
    id: "iktmc",
    name: "IKTMC",
    emailDomain: "@learn.iktmc.edu.hk",
    enabled: true
  },
  {
    id: "kgv",
    name: "King George V School",
    emailDomain: "@learn.kgv.edu.hk",
    enabled: true
  },
  {
    id: "dgs",
    name: "Diocesan Girls' School",
    emailDomain: "@learn.dgs.edu.hk",
    enabled: true
  }
];
```

## What Each Field Does

| Field | Purpose | Example |
|-------|---------|---------|
| `id` | Unique identifier (no spaces) | `"kgv"` |
| `name` | School name (for display) | `"King George V School"` |
| `emailDomain` | Email ending (must start with @) | `"@learn.kgv.edu.hk"` |
| `enabled` | Is school active? | `true` or `false` |

## Advanced: Enable/Disable Schools at Runtime

If you want to dynamically manage schools without editing code, you can use these functions in the browser console:

### Disable a school temporarily
```javascript
setSchoolEnabled("iktmc", false);
```

### Re-enable a school
```javascript
setSchoolEnabled("iktmc", true);
```

### Add a new school programmatically
```javascript
addSchool("newschool", "New School", "@learn.newschool.edu.hk");
```

### View all enabled schools
```javascript
console.log(getEnabledSchools());
```

## FAQ

**Q: What if I use a different email domain?**
A: Update the `emailDomain` field to match. Example: `"@student.myschool.edu"` or `"@mail.myschool.com"`

**Q: Can students from multiple domains login?**
A: Yes! Add multiple schools to the config.

**Q: What if my school uses multiple email domains?**
A: Add separate entries for each domain with unique IDs.

**Q: How do I make the login page show all available schools?**
A: Contact development team - this would require updating the login page UI to display available schools dynamically.

**Q: Can I change a school's ID after students login?**
A: ⚠️ Not recommended - it won't affect existing login, but be consistent.

## Common Mistakes

❌ **Wrong:** `"learn.myschool.edu.hk"` (missing @)
✅ **Right:** `"@learn.myschool.edu.hk"`

❌ **Wrong:** `id: "My School"` (has spaces)
✅ **Right:** `id: "my-school"` or `id: "myschool"`

❌ **Wrong:** Using the same `id` for two schools
✅ **Right:** Use unique IDs for each school

## Need Help?

1. Check your email domain spelling
2. Make sure `enabled: true` is set
3. Refresh the browser after saving
4. Check browser console (F12) for errors
5. Try logging in with the exact email format
