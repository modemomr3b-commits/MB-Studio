import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Setup
const db = new Database("app_data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name_en TEXT,
    name_ar TEXT,
    sort_order INTEGER
  );

  CREATE TABLE IF NOT EXISTS designs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id TEXT,
    title TEXT,
    image_url TEXT,
    is_hidden BOOLEAN DEFAULT 0,
    sort_order INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert default categories if none exist
const countCat = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
if (countCat.count === 0) {
  const categories = [
    { id: "mens_shoes", name_en: "Men's Shoes", name_ar: "أحذية رجالية" },
    { id: "womens_shoes", name_en: "Women's Shoes", name_ar: "أحذية نسائية" },
    { id: "kids_shoes", name_en: "Kids' Shoes", name_ar: "أحذية أطفال" },
    { id: "mens_fashion", name_en: "Men's Fashion", name_ar: "أزياء رجالية" },
    { id: "womens_fashion", name_en: "Women's Fashion", name_ar: "أزياء نسائية" },
    { id: "kids_fashion", name_en: "Kids' Fashion", name_ar: "أزياء أطفال" },
    { id: "mens_perfume", name_en: "Men's Perfume", name_ar: "عطور رجالية" },
    { id: "womens_perfume", name_en: "Women's Perfume", name_ar: "عطور نسائية" },
    { id: "kids_perfume", name_en: "Kids' Perfume", name_ar: "عطور أطفال" },
    { id: "womens_jewelry", name_en: "Women's Jewelry", name_ar: "مجوهرات نسائية" },
    { id: "mens_watches", name_en: "Men's Watches", name_ar: "ساعات رجالية" },
    { id: "kids_accessories", name_en: "Kids' Accessories", name_ar: "إكسسوارات أطفال" },
    { id: "mens_bags", name_en: "Men's Bags", name_ar: "حقائب رجالية" },
    { id: "womens_bags", name_en: "Women's Bags", name_ar: "حقائب نسائية" },
    { id: "kids_bags", name_en: "Kids' Bags", name_ar: "حقائب أطفال" },
    { id: "all_videos", name_en: "Videos", name_ar: "فيديوهات" }
  ];
  const insertCat = db.prepare("INSERT INTO categories (id, name_en, name_ar, sort_order) VALUES (?, ?, ?, ?)");
  categories.forEach((c, index) => {
    insertCat.run(c.id, c.name_en, c.name_ar, index);
  });
} else {
  // Ensure videos exist
  const hasVideos = db.prepare("SELECT COUNT(*) as count FROM categories WHERE id = 'all_videos'").get() as { count: number };
  if (hasVideos.count === 0) {
    const insertCat = db.prepare("INSERT INTO categories (id, name_en, name_ar, sort_order) VALUES (?, ?, ?, ?)");
    insertCat.run("all_videos", "Videos", "فيديوهات", 99);
  }
}


// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// App Setup
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

// Constants
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "MB Studio";
const JWT_SECRET = process.env.JWT_SECRET || "mb_studio_secret_key_12345";

// Middleware
const getToken = (req: express.Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return req.cookies.admin_token;
};

const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API Routes

app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    // Also set a secure cross-origin cookie if possible (though some browsers block this now in iframes)
    res.cookie("admin_token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: true }); 
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

app.get("/api/auth/me", (req, res) => {
  const token = getToken(req);
  if (!token) return res.json({ isAdmin: false });
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ isAdmin: true });
  } catch {
    res.json({ isAdmin: false });
  }
});

// Categories
app.get("/api/categories", (req, res) => {
  const categories = db.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all();
  res.json(categories);
});

app.post("/api/categories", requireAdmin, (req, res) => {
  const { id, name_en, name_ar } = req.body;
  if (!id || !name_en || !name_ar) return res.status(400).json({ error: "Missing fields" });
  
  const sort_order = db.prepare("SELECT IFNULL(MAX(sort_order), -1) + 1 as next_order FROM categories").get() as any;
  
  try {
    db.prepare("INSERT INTO categories (id, name_en, name_ar, sort_order) VALUES (?, ?, ?, ?)").run(id, name_en, name_ar, sort_order.next_order);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/categories/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  res.json({ success: true });
});

// Designs
app.get("/api/designs", (req, res) => {
  const { category, showHidden } = req.query;
  
  let query = "SELECT * FROM designs";
  const params: any[] = [];
  
  const token = getToken(req);
  let isAdmin = false;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAdmin = true;
    } catch {}
  }

  const conditions = [];
  
  if (category) {
    conditions.push("category_id = ?");
    params.push(category);
  }
  
  if (!isAdmin || showHidden !== 'true') {
    conditions.push("is_hidden = 0");
  }
  
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  
  query += " ORDER BY sort_order ASC, created_at DESC";
  
  const designs = db.prepare(query).all(...params);
  res.json(designs);
});

app.post("/api/designs", requireAdmin, upload.single("image"), (req, res) => {
  const { category_id, title } = req.body;
  const file = req.file;
  if (!file || !category_id || !title) {
    return res.status(400).json({ error: "Missing required fields or image" });
  }
  const image_url = "/uploads/" + file.filename;
  
  const sort_order = db.prepare("SELECT IFNULL(MAX(sort_order), -1) + 1 as next_order FROM designs WHERE category_id = ?").get(category_id) as any;
  
  db.prepare("INSERT INTO designs (category_id, title, image_url, sort_order) VALUES (?, ?, ?, ?)").run(category_id, title, image_url, sort_order.next_order);
  
  res.json({ success: true });
});

app.put("/api/designs/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { title, is_hidden, category_id } = req.body;
  
  db.prepare("UPDATE designs SET title = ?, is_hidden = ?, category_id = ? WHERE id = ?").run(
    title, is_hidden ? 1 : 0, category_id, id
  );
  res.json({ success: true });
});

app.post("/api/designs/reorder", requireAdmin, (req, res) => {
  const { orderedIds } = req.body; // Array of IDs in the new order
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: "Invalid array" });
  
  const updateOrder = db.prepare("UPDATE designs SET sort_order = ? WHERE id = ?");
  db.transaction(() => {
    orderedIds.forEach((id, index) => {
      updateOrder.run(index, id);
    });
  })();
  
  res.json({ success: true });
});

app.delete("/api/designs/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const design = db.prepare("SELECT image_url FROM designs WHERE id = ?").get(id) as any;
  if (design && design.image_url) {
    const filename = design.image_url.split("/uploads/")[1];
    if (filename) {
      const filepath = path.join(uploadsDir, filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }
  }
  db.prepare("DELETE FROM designs WHERE id = ?").run(id);
  res.json({ success: true });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
