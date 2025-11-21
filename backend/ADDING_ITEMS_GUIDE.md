# Adding Items to Your Database - Quick Guide

This guide shows you how to add new menu items and locations to your Azure Cosmos DB database, including how to add images.

## Step 0: Adding Images First! 📸

Before adding a menu item to the database, you need to add the image file.

### Option A: Local Images (Current Setup - Easiest)

Your images are currently stored in `frontend/public/`. This is the simplest approach:

1. **Add your image file**
   - Navigate to `frontend/public/` folder
   - Add your image file (e.g., `lavender.png`)
   - Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`

2. **Image requirements**
   - **Naming**: Use lowercase, no spaces (e.g., `lavender-matcha.png` not `Lavender Matcha.png`)
   - **Size**: Recommend 500x500px or similar square dimensions
   - **File size**: Keep under 500KB for fast loading

3. **Reference in database**
   - Use the path `/filename.png` (must start with `/`)
   - Example: `"image": "/lavender.png"`

**Example workflow:**
```bash
# 1. Add image to frontend/public
frontend/public/
  ├── strawberry.png
  ├── earl-gray.png
  ├── lavender.png  ← Your new image

# 2. Reference it in database
"image": "/lavender.png"
```

### Option B: Azure Blob Storage (Advanced - Better for Production)

For better performance and scalability, store images in Azure Blob Storage:

#### Setup (One-Time):

1. **Create container in Azure Portal**
   - Go to your Storage Account: `bedhedmatchastorage`
   - Click "Containers" in left sidebar
   - Click "+ Container"
   - Name: `images`
   - Public access level: **Blob** (allows public read access to blobs)
   - Click "Create"

2. **Upload images**
   - Click on the `images` container
   - Click "Upload" button
   - Select your image file(s)
   - Click "Upload"

3. **Get image URL**
   - Click on the uploaded image
   - Copy the **URL** (looks like):
   ```
   https://bedhedmatchastorage.blob.core.windows.net/images/lavender.png
   ```

4. **Use full URL in database**
   ```json
   {
     "id": "5",
     "name": "Lavender Matcha",
     "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
     "price": 7.50,
     "image": "https://bedhedmatchastorage.blob.core.windows.net/images/lavender.png"
   }
   ```

#### Benefits of Blob Storage:
✅ **Faster loading** - Images served from Azure CDN  
✅ **Scalable** - Handles thousands of images easily  
✅ **Professional** - Industry standard approach  
✅ **Cheap** - First 5GB free, then ~$0.02/GB  

#### When to use which:
- **Use frontend/public**: For 10-20 images, simple setup
- **Use Blob Storage**: For 50+ images, faster performance, production apps

---

## Method 1: Azure Portal (Easiest - No Coding!)

### Adding a Menu Item

1. **Go to Azure Portal**
   - Visit [portal.azure.com](https://portal.azure.com)
   - Navigate to your Cosmos DB account: `bedhed-matcha-db`

2. **Open Data Explorer**
   - Click on "Data Explorer" in the left sidebar
   - Expand database: `bedhed-matcha`
   - Expand container: `menu-items`

3. **Add New Item**
   - Click "New Item" button (top toolbar)
   - Delete the default content
   - Paste this template (modify the values):
   ```json
   {
     "id": "5",
     "name": "Lavender Matcha",
     "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
     "price": 7.50,
     "image": "/lavender.png"
   }
   ```

4. **Save**
   - Click "Save" button
   - Your new drink appears instantly on your website! 🎉

### Adding a Location

Same process, but in the `locations` container:

1. Data Explorer → `bedhed-matcha` → `locations`
2. Click "New Item"
3. Paste template:
   ```json
   {
     "id": "3",
     "date": "2025-02-15",
     "venue": "Frisco Food Truck Park",
     "address": "789 Main St, Frisco, TX",
     "time": "11am - 8pm"
   }
   ```
4. Click "Save"

### Important Notes:
- **ID must be unique** - Don't reuse existing IDs
- **ID must be a string** - Use `"5"` not `5`
- **Date format**: `YYYY-MM-DD` (e.g., `2025-02-15`)
- **Image paths**: Start with `/` (e.g., `/lavender.png`)

---

## Method 2: Python Script (For Multiple Items)

Create a file `backend/add_items.py`:

```python
from db_config import CosmosDB

# Initialize database connection
db = CosmosDB()

# Add a new menu item
new_drink = {
    "id": "5",
    "name": "Lavender Matcha",
    "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
    "price": 7.50,
    "image": "/lavender.png"
}

success = db.add_menu_item(new_drink)
if success:
    print(f"✓ Added: {new_drink['name']}")
else:
    print(f"✗ Failed to add: {new_drink['name']}")

# Add a new location
new_location = {
    "id": "3",
    "date": "2025-02-15",
    "venue": "Frisco Food Truck Park",
    "address": "789 Main St, Frisco, TX",
    "time": "11am - 8pm"
}

success = db.add_location(new_location)
if success:
    print(f"✓ Added: {new_location['venue']}")
else:
    print(f"✗ Failed to add: {new_location['venue']}")
```

**Run it:**
```bash
cd backend
python add_items.py
```

---

## Method 3: Bulk Add (For Many Items at Once)

Create `backend/bulk_add.py`:

```python
from db_config import CosmosDB

db = CosmosDB()

# List of new menu items
new_menu_items = [
    {
        "id": "5",
        "name": "Lavender Matcha",
        "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
        "price": 7.50,
        "image": "/lavender.png"
    },
    {
        "id": "6",
        "name": "Vanilla Bean Matcha",
        "ingredients": ["Vanilla Bean", "Milk of Choice", "Matcha"],
        "price": 7.00,
        "image": "/vanilla.png"
    },
    {
        "id": "7",
        "name": "Rose Matcha",
        "ingredients": ["Rose Syrup", "Milk of Choice", "Matcha"],
        "price": 7.50,
        "image": "/rose.png"
    }
]

# Add all items
print("Adding menu items...")
for item in new_menu_items:
    success = db.add_menu_item(item)
    if success:
        print(f"  ✓ Added: {item['name']}")
    else:
        print(f"  ✗ Failed: {item['name']}")

print("\nDone! Check your website to see the new drinks.")
```

**Run it:**
```bash
python bulk_add.py
```

---

## Updating Existing Items

### Update a Price (Azure Portal):
1. Data Explorer → Find the item
2. Click on the item to open it
3. Edit the `price` field
4. Click "Update"

### Update via Python:
```python
from db_config import CosmosDB

db = CosmosDB()

# Update menu item (must include ALL fields)
updated_item = {
    "id": "1",
    "name": "Strawberry Matcha",
    "ingredients": ["Strawberry Puree", "Milk of Choice", "Matcha"],
    "price": 7.50,  # New price!
    "image": "/strawberry.png"
}

success = db.update_menu_item("1", updated_item)
if success:
    print("✓ Updated successfully!")
```

---

## Deleting Items

### Delete via Azure Portal:
1. Data Explorer → Find the item
2. Right-click on the item
3. Select "Delete Item"
4. Confirm

### Delete via Python:
```python
from db_config import CosmosDB

db = CosmosDB()

# Delete a menu item by ID
success = db.delete_menu_item("5")
if success:
    print("✓ Deleted successfully!")
```

---

## Menu Item Template

Copy this template for new drinks:

```json
{
  "id": "UNIQUE_NUMBER",
  "name": "Drink Name",
  "ingredients": ["Ingredient 1", "Ingredient 2", "Matcha"],
  "price": 7.00,
  "image": "/image-name.png"
}
```

**Field Requirements:**
- `id`: Unique string (e.g., `"5"`, `"6"`, `"7"`)
- `name`: Drink name as it appears on menu
- `ingredients`: Array of strings (what's in the drink)
- `price`: Number (use `.00` or `.50` for cents)
- `image`: Path to image file
  - **Local**: `/image-name.png` (must start with `/`)
  - **Blob Storage**: Full URL `https://bedhedmatchastorage.blob.core.windows.net/images/image-name.png`

### Complete Example Workflow (Adding a New Drink):

**1. Prepare the image:**
```bash
# Option A: Add to frontend/public
# Copy lavender.png to frontend/public/lavender.png

# Option B: Upload to Azure Blob Storage
# Portal → Storage Account → Containers → images → Upload
```

**2. Add to database:**
```json
{
  "id": "5",
  "name": "Lavender Matcha",
  "ingredients": ["Lavender Syrup", "Milk of Choice", "Matcha"],
  "price": 7.50,
  "image": "/lavender.png"
}
```

**3. Test:**
- Visit your website
- Check that the new drink appears with the image!

---

## Location Template

Copy this template for new pop-up locations:

```json
{
  "id": "UNIQUE_NUMBER",
  "date": "2025-02-15",
  "venue": "Event Name",
  "address": "123 Main St, City, State",
  "time": "11am - 8pm"
}
```

**Field Requirements:**
- `id`: Unique string
- `date`: Format `YYYY-MM-DD` (e.g., `2025-02-15`)
- `venue`: Name of the market/event
- `address`: Full address
- `time`: Hours (any format you prefer)

---

## Quick Reference: Common Tasks

### Add a new drink with image:
1. **Add image**: Copy image to `frontend/public/` (or upload to Blob Storage)
2. **Add to database**: Portal → Data Explorer → menu-items → New Item
3. **Paste JSON**: Use template with correct image path
4. **Save & test**: Visit website to verify

### Add one menu item (Portal):
1. Portal → Data Explorer → menu-items → New Item
2. Paste JSON → Save

### Add multiple items (Python):
1. Create script with list of items
2. Loop through and call `db.add_menu_item(item)`
3. Run script

### Upload image to Blob Storage:
1. Portal → Storage Account → Containers → images
2. Click Upload → Select file → Upload
3. Copy the blob URL
4. Use full URL in database item

### Update a price (Portal):
1. Find item → Click to open
2. Edit price field → Update

### View all items:
1. Portal → Data Explorer → menu-items
2. Click "Items" to see full list

---

## Tips

✅ **Add images before database entries** - Have the image ready first  
✅ **Use descriptive filenames** - `strawberry-matcha.png` not `img1.png`  
✅ **Optimize images** - Compress to reduce file size (use tinypng.com)  
✅ **Square images work best** - 500x500px or 800x800px recommended  
✅ **Always use unique IDs** - Check existing items first  
✅ **Test on one item first** - Before bulk adding  
✅ **Keep image files in frontend/public** - Match image paths exactly  
✅ **Use consistent formatting** - Makes data easier to manage  
✅ **Backup before deleting** - Can't undo deletions easily  

### Image Best Practices:
- **Format**: PNG for transparency, JPG for photos, WebP for best compression
- **Size**: 500x500px to 1000x1000px (square is best)
- **File size**: Under 200KB (compress large images)
- **Naming**: Lowercase, hyphens for spaces (e.g., `earl-gray-matcha.png`)
- **Background**: Consider transparent PNG or solid color

---

## Troubleshooting

**Error: "Conflict - An item with the same id already exists"**
- Solution: Use a different, unique ID

**Item added but not showing on website**
- Check: Is backend running? (`python app.py`)
- Check: Is ID formatted as string (`"5"` not `5`)
- Refresh browser (Ctrl+F5)

**Image not displaying**
- Check: Image file is in `frontend/public/` folder
- Check: Image path in database starts with `/` (e.g., `/lavender.png`)
- Check: Filename matches exactly (case-sensitive!)
- Check: Image file format is supported (.png, .jpg, .jpeg, .webp)
- Try: Hard refresh browser (Ctrl+Shift+R or Ctrl+F5)

**Image appears broken/missing**
- Verify: Image filename in database matches actual file
- Check: No typos in the path
- For Blob Storage: Verify container is set to "Blob" public access
- For Blob Storage: Test the URL directly in browser

**Blob Storage images not loading**
- Check: Container public access is set to "Blob"
- Check: URL is correct and complete
- Test: Open blob URL directly in browser
- Check: No CORS issues (should work by default)

**Can't connect to database**
- Check: `.env` file has correct credentials
- Check: Cosmos DB firewall allows your IP

---

**You're all set!** Start with Method 1 (Azure Portal) - it's the easiest way to add items. 🚀
