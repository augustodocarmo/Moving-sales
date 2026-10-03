const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1RRfFIgn3BOQv8uJ4qP0Hc4JoLJDAUGJ1a4SMxWmwGKk/gviz/tq?tqx=out:csv&sheet=Moving%20Sale";

// Contact can be added later without changing the page layout.
const CONTACT = {
  whatsappNumber: "447423451354",
  contactName: "Augusto & Juliana"
};

const PROJECTOR_IMAGE = "data:image/webp;base64,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";

const PRICE_OVERRIDES = {
  sofa: 90,
  armchair: 48,
  books: 12,
  helmet: 20,
  games: 12,
  workout: 12,
  iron: 5.6,
  dryer: 8,
  mirror: 12,
  "grey-chest": 24,
  jacket: 24,
  coalport: 36,
  cookware: 0,
  projector: 16,
  crockery: 8,
  bedding: 8,
  lamps: 8,
  coffee: 12,
  popcorn: 6.4
};

const STATUS_OVERRIDES = {
  airfryer: "Gone",
  guitar: "Gone",
  kettle: "Gone",
  toaster: "Gone",
  printer: "Gone",
  plants: "Gone",
  mattress: "Gone",
  storage: "Gone",
  "round-table": "Gone"
};

const products = [
  {
    id: "sofa", syncKey: "2-Seater Sofa (Light Blue)", name: "2-Seater Sofa (Light Blue)", price: 120,
    category: "Furniture", description: "Woven fabric, piped edges, one small mark on seat cushion, RRP £550",
    images: ["sofa-1.webp", "sofa-2.webp", "sofa-3.webp"]
  },
  {
    id: "armchair", syncKey: "Wingback Armchair", name: "Wingback Armchair", price: 60,
    category: "Furniture", description: "Grey/beige linen-look, button detailing, solid wood tapered legs, excellent condition",
    images: ["armchair-1.webp", "armchair-2.webp", "armchair-3.webp", "armchair-4.webp"]
  },
  {
    id: "mattress", syncKey: "IKEA VESTERÖY Mattress (Double)", name: "IKEA VESTERÖY Mattress (Double)", price: 55,
    category: "Furniture", description: "Firm, without topper, light marks on side panel from moving",
    images: ["mattress-2.webp", "mattress-1.webp", "mattress-3.webp"]
  },
  {
    id: "books", syncKey: "Books Bundle (18 books)", name: "Books Bundle (18 books)", price: 15,
    category: "Books & Games", description: "Mix of fiction, historical fiction, thrillers and non-fiction. £2 each / £1 each if buying 4+ / £15 for all",
    images: ["books-collage.webp"]
  },
  {
    id: "helmet", syncKey: "Zorax Full-Face Motorcycle Helmet (Size L)", name: "Zorax Full-Face Motorcycle Helmet (Size L)", price: 25,
    category: "Motorcycle", description: "Matte black, tinted visor, never crashed, cosmetic scratches from moving only",
    images: ["helmet-1.webp", "helmet-2.webp", "helmet-3.webp"]
  },
  {
    id: "games", syncKey: "Board Games & Puzzles Bundle", name: "Board Games & Puzzles Bundle", price: 15,
    category: "Books & Games", description: "Risk: Balance of Power (2 player), The Da Vinci Code board game, IQ Collection 16-in-1 puzzles, Balance & Stack game, Rope Great Battle game",
    images: ["games-1.webp", "games-2.webp", "games-3.webp"]
  },
  {
    id: "guitar", syncKey: "Classical Guitar + Stand", name: "Classical Guitar + Stand", price: 50,
    category: "Home & Leisure", description: "Full-size classical/nylon-string guitar, natural wood finish, new strings, folding stand included",
    images: ["guitar-1.webp", "guitar-2.webp", "guitar-3.webp"]
  },
  {
    id: "workout", syncKey: "Home Workout Bundle", name: "Home Workout Bundle", price: 15,
    category: "Fitness", description: "3kg ankle/wrist weights, skipping rope, ab wheel roller, yoga mat, yoga blocks (pair), mesh carry bag",
    images: ["workout-collage.webp", "workout-1.webp", "workout-2.webp"]
  },
  {
    id: "iron", syncKey: "Russell Hobbs Supreme Steam Iron 2400W", name: "Russell Hobbs Supreme Steam Iron 2400W", price: 7,
    category: "Home", description: "Stainless steel soleplate, 40g/min continuous steam + 110g/min steam shot, self-cleaning, anti-drip, 300ml water tank. Lightly used, works perfectly, no box",
    images: ["iron-1.webp"]
  },
  {
    id: "dryer", syncKey: "Wahl Hair Dryer", name: "Wahl Hair Dryer", price: 10,
    category: "Home", description: "Compact, powerful dryer, UK plug. Used only a few times, like new condition",
    images: ["dryer-1.webp"]
  },
  {
    id: "mirror", syncKey: "Gold Frame Mirror (90x65cm)", name: "Gold Frame Mirror (90x65cm)", price: 15,
    category: "Home", description: "Decorative gold-tone frame, 90x65cm including frame. Minor damage to one corner of the frame (cosmetic only, mirror itself unaffected)",
    images: ["mirror-1.webp", "mirror-2.webp", "mirror-3.webp", "mirror-4.webp"]
  },
  {
    id: "grey-chest", syncKey: "IKEA HEMNES-style 3-Drawer Chest (Grey/Green, repainted)", name: "IKEA HEMNES-style 3-Drawer Chest", price: 30,
    category: "Furniture", description: "Bought second-hand already repainted by previous owner in matte grey/green (not original IKEA colour). Solid construction, smooth-running drawers, black knobs. Visible marks/staining on top surface (pre-existing, cosmetic only)",
    images: ["grey-chest-1.webp"]
  },
  {
    id: "jacket", syncKey: "Rexel Motorcycle Jacket (Size L)", name: "Rexel Motorcycle Jacket (Size L)", price: 30,
    category: "Motorcycle", description: "Black/hi-vis yellow with reflective panels, Air Vent System, multiple pockets, adjustable cuffs. Some marks on sleeve and slightly loose stitching in one area, still fully functional",
    images: ["jacket-1.webp", "jacket-2.webp", "jacket-3.webp", "jacket-4.webp", "jacket-5.webp", "jacket-6.webp", "jacket-7.webp", "jacket-8.webp", "jacket-9.webp"]
  },
  {
    id: "coalport", syncKey: "Coalport Revelry Bone China Coffee Set (14 pieces)", name: "Coalport Revelry Bone China Coffee Set (14 pieces)", price: 45,
    category: "Kitchen", description: "Vintage Coalport Revelry bone china coffee set, made in England. Blue cherub design with gilt trim. Includes coffee pot with lid, milk jug, 6 cups and 6 saucers. Excellent condition, no chips or cracks",
    images: ["coalport-2.webp", "coalport-1.webp", "coalport-3.webp", "coalport-4.webp", "coalport-5.webp", "coalport-6.webp", "coalport-7.webp", "coalport-8.webp", "coalport-9.webp"]
  },
  {
    id: "cookware", syncKey: "Blue Saucepan & Frying Pan Set", name: "Blue Saucepan & Frying Pan Set", price: 0,
    category: "Kitchen", description: "Set of blue cookware (currently disassembled, all parts included): 2 large saucepans with stainless steel lids and strainer holes, 1 small milk pan with spout, 1 frying pan, 4 side handles, 2 long handles, all screws included. Well used. Needs a screwdriver to reassemble. FREE to collect",
    images: ["cookware-1.webp"]
  },
  {
    id: "toaster", syncKey: "Ribbed 2-Slice Toaster", name: "Ribbed 2-Slice Toaster", price: 7,
    category: "Kitchen", description: "Ribbed 2-slice toaster in taupe/beige, matching kettle. Used less than 3 months, excellent condition. 7 browning settings, defrost/reheat/cancel, warming rack, wide slots, removable crumb tray",
    images: ["toaster-1.webp", "toaster-2.webp", "toaster-3.webp", "toaster-4.webp"]
  },
  {
    id: "kettle", syncKey: "Ribbed Electric Kettle 1.7L", name: "Ribbed Electric Kettle 1.7L", price: 7,
    category: "Kitchen", description: "Ribbed electric kettle in taupe/beige, matching toaster. Used less than 3 months, excellent condition. Fluted design, matte finish, water level window, removable limescale filter, cordless 360° base",
    images: ["kettle-1.webp", "kettle-2.webp", "kettle-3.webp"]
  },
  {
    id: "airfryer", syncKey: "Ribbed Digital Air Fryer", name: "Ribbed Digital Air Fryer", price: 12,
    category: "Kitchen", description: "Ribbed digital air fryer in taupe/beige, matching kettle and toaster. Used less than 3 months, excellent condition. Digital touchscreen, adjustable temp/timer, 8 presets, shake reminder, keep warm, non-stick basket with removable crisper plate",
    images: ["airfryer-4.webp", "airfryer-1.webp", "airfryer-2.webp", "airfryer-3.webp", "airfryer-5.webp"]
  },
  {
    id: "projector", syncKey: null, name: "XuanPad M8-F Mini Projector", price: 20,
    category: "Electronics", description: "Handy little projector for movie nights, gaming or a casual home cinema. Manual focus and keystone, with HDMI, USB, VGA, AV and TF/microSD inputs. Supports up to 1080p input. HDMI cable included as pictured. Used condition, as shown.",
    images: [PROJECTOR_IMAGE]
  },
  {
    id: "printer", syncKey: "HP DeskJet 2810e All-in-One Printer", name: "HP DeskJet 2810e All-in-One Printer", price: 15,
    category: "Electronics", description: "HP DeskJet 2810e wireless all-in-one printer, good working condition. Prints, scans, copies. Wi-Fi (HP Smart app), compact, HP Instant Ink compatible. Comes with power cable, some light marks from normal use",
    images: ["printer-1.webp", "printer-2.webp"]
  },
  {
    id: "crockery", syncKey: "Kitchen Crockery Bundle (Plates, Cups & Glasses)", name: "Kitchen Crockery Bundle", price: 10,
    category: "Kitchen", description: "Mixed plates, cups, mugs and drinking glasses, various sets. Good condition, moving abroad so clearing it all out. Photos on request",
    images: []
  },
  {
    id: "bedding", syncKey: "Bedding & Linens Bundle (Sheets, Pillowcases, Towels)", name: "Bedding & Linens Bundle", price: 10,
    category: "Home", description: "Mixed bed sheets, pillowcases and towels, various sizes/colours. Clean, good condition. Photos on request",
    images: []
  },
  {
    id: "storage", syncKey: "Kitchen Storage & Bakeware Bundle (Pyrex, Containers, Baking Trays)", name: "Kitchen Storage & Bakeware Bundle", price: 8,
    category: "Kitchen", description: "Food storage containers, Pyrex bowls, baking trays/tins. Mixed sizes, good condition. Photos on request",
    images: []
  },
  {
    id: "plants", syncKey: "Plant Bundle (Bonsai, Snake Plant, Basil + Extras)", name: "Plant Bundle", price: 15,
    category: "Home", description: "Small bonsai tree, snake plant (Sansevieria), small basil plant, extra plant pot + bag of coco coir. All healthy and well cared for. £15 for everything, or sell separately",
    images: []
  },
  {
    id: "lamps", syncKey: "Study/Desk Lamps (x2)", name: "Study/Desk Lamps (x2)", price: 10,
    category: "Home", description: "2 matching desk lamps in good condition, great for home office or study space",
    images: ["lamp-1.webp"]
  },
  {
    id: "coffee", syncKey: "Pour Over Coffee Kit", name: "Pour Over Coffee Kit", price: 15,
    category: "Kitchen", description: "Complete pour-over coffee kit in good condition: dripper, coffee grinder, filter paper holder",
    images: ["coffee-collage.webp", "coffee-1.webp", "coffee-2.webp"]
  },
  {
    id: "popcorn", syncKey: "Mini Popcorn Maker", name: "Mini Popcorn Maker", price: 8,
    category: "Kitchen", description: "Small home popcorn machine, great for movie nights. Good working condition",
    images: []
  },
  {
    id: "round-table", syncKey: null, name: "Round Black Table", price: 0,
    category: "Furniture", description: "Round black table with wooden legs. Visible cosmetic wear/chipping around the edge. FREE to collect",
    images: ["table-1.webp", "table-2.webp", "table-3.webp", "table-4.webp", "table-5.webp", "table-6.webp"]
  }
];

const categoryIcons = {
  "Furniture": "🪑", "Kitchen": "🍽️", "Home": "🏠", "Books & Games": "📚",
  "Motorcycle": "🏍️", "Fitness": "🏋️", "Home & Leisure": "🎸", "Electronics": "🖨️"
};

let catalogue = structuredClone(products).map((p, index) => ({...p, _order: index, price: PRICE_OVERRIDES[p.id] ?? p.price, status: STATUS_OVERRIDES[p.id] ?? "Available"}));
let activeFilter = "All";
let query = "";
let sort = "default";

const productGrid = document.getElementById("productGrid");
const filterBar = document.getElementById("filterBar");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const itemCount = document.getElementById("itemCount");
const freeCount = document.getElementById("freeCount");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");
const syncStatus = document.getElementById("syncStatus");
const dialog = document.getElementById("itemDialog");
const dialogContent = document.getElementById("dialogContent");
const toast = document.getElementById("toast");

function money(n) { const v = Number(n); return v === 0 ? "FREE" : `£${Number.isInteger(v) ? v.toFixed(0) : v.toFixed(2)}`; }
function imagePath(name) { return /^(data:|https?:\/\/)/.test(String(name)) ? name : `assets/images/${name}`; }
function escapeHtml(s = "") { return s.replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }

function buildFilters() {
  const categories = ["All", "Free", ...new Set(catalogue.map(p => p.category))];
  filterBar.innerHTML = categories.map(cat => `<button class="filter-button ${cat === activeFilter ? "is-active" : ""}" data-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`).join("");
  filterBar.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    buildFilters();
    render();
  }));
}

function visibleProducts() {
  let rows = catalogue.filter(p => p.status.toLowerCase() === "available");
  if (activeFilter === "Free") rows = rows.filter(p => Number(p.price) === 0);
  else if (activeFilter !== "All") rows = rows.filter(p => p.category === activeFilter);
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter(p => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q));
  }
  if (sort === "priceAsc") rows.sort((a,b) => a.price - b.price || a.name.localeCompare(b.name));
  else if (sort === "priceDesc") rows.sort((a,b) => b.price - a.price || a.name.localeCompare(b.name));
  else if (sort === "name") rows.sort((a,b) => a.name.localeCompare(b.name));
  else rows.sort((a,b) => a._order - b._order);
  return rows;
}

function cardMedia(p) {
  if (p.embedUrl) return `<iframe class="promo-embed" src="${p.embedUrl}" title="${escapeHtml(p.name)}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>`;
  if (p.images.length) return `<img src="${imagePath(p.images[0])}" alt="${escapeHtml(p.name)}" loading="lazy" decoding="async">`;
  const icon = categoryIcons[p.category] || "📦";
  return `<div class="placeholder"><div><span>${icon}</span>Photo coming soon</div></div>`;
}

function render() {
  const rows = visibleProducts();
  const available = catalogue.filter(p => p.status.toLowerCase() === "available");
  itemCount.textContent = available.length;
  freeCount.textContent = available.filter(p => Number(p.price) === 0).length;
  emptyState.hidden = rows.length > 0;
  productGrid.innerHTML = rows.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card__media" data-view="${p.id}">${cardMedia(p)}</div>
      <div class="card__body">
        <div class="card__meta"><span class="category">${escapeHtml(p.category)}</span><span class="price ${p.price === 0 ? "free" : ""}">${money(p.price)}</span></div>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="card__desc">${escapeHtml(p.description)}</p>
        <div class="card__actions">
          <button class="btn btn--secondary" data-view="${p.id}">View item</button>
          <button class="btn btn--primary" data-interest="${p.id}">I’m interested</button>
        </div>
      </div>
    </article>`).join("");

  productGrid.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => openItem(el.dataset.view)));
  productGrid.querySelectorAll("[data-interest]").forEach(el => el.addEventListener("click", () => enquire(el.dataset.interest)));
}

function openItem(id) {
  const p = catalogue.find(x => x.id === id);
  if (!p) return;
  const gallery = p.embedUrl ? `<div class="dialog-gallery"><iframe class="dialog-gallery__main promo-embed promo-embed--dialog" src="${p.embedUrl}" title="${escapeHtml(p.name)}"></iframe></div>` : p.images.length ? `
    <div class="dialog-gallery">
      <img id="dialogMainImage" class="dialog-gallery__main" src="${imagePath(p.images[0])}" alt="${escapeHtml(p.name)}">
      ${p.images.length > 1 ? `<div class="dialog-thumbs">${p.images.map((img,i) => `<button class="${i===0?"active":""}" data-img="${img}" aria-label="View photo ${i+1}"><img src="${imagePath(img)}" alt=""></button>`).join("")}</div>` : ""}
    </div>` : `<div class="dialog-gallery placeholder"><div><span>${categoryIcons[p.category] || "📦"}</span>Photo coming soon</div></div>`;

  dialogContent.innerHTML = `<div class="dialog-grid">${gallery}<div class="dialog-details">
    <span class="category">${escapeHtml(p.category)} · Available</span>
    <h2>${escapeHtml(p.name)}</h2>
    <p class="dialog-price ${p.price===0?"free":""}">${money(p.price)}</p>
    <p class="dialog-description">${escapeHtml(p.description)}</p>
    <div class="dialog-actions"><button class="btn btn--primary" data-dialog-interest="${p.id}">I’m interested</button></div>
    <p class="dialog-note">Collection in Warrington. Please arrange collection before travelling.</p>
  </div></div>`;

  dialogContent.querySelectorAll(".dialog-thumbs button").forEach(btn => btn.addEventListener("click", () => {
    document.getElementById("dialogMainImage").src = imagePath(btn.dataset.img);
    dialogContent.querySelectorAll(".dialog-thumbs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }));
  dialogContent.querySelector("[data-dialog-interest]")?.addEventListener("click", () => enquire(p.id));
  dialog.showModal();
}

async function enquire(id) {
  const p = catalogue.find(x => x.id === id);
  if (!p) return;
  const message = `Hi, I’m interested in the ${p.name} (${money(p.price)}) from your Warrington moving sale. Is it still available?`;
  if (CONTACT.whatsappNumber) {
    window.open(`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({title: p.name, text: message, url: location.href});
      return;
    } catch (e) { if (e.name === "AbortError") return; }
  }
  try {
    await navigator.clipboard.writeText(message);
    showToast("Enquiry copied — send it to Augusto or Juliana");
  } catch {
    prompt("Copy this message:", message);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i=0; i<text.length; i++) {
    const c = text[i], n = text[i+1];
    if (c === '"' && quoted && n === '"') { field += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { row.push(field); field = ""; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && n === '\n') i++;
      row.push(field); field = "";
      if (row.some(v => v !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function priceFromCell(cell) {
  const cleaned = String(cell || "").replace(/[^0-9.]/g, "");
  return cleaned === "" ? null : Number(cleaned);
}

async function syncFromSheet() {
  try {
    const response = await fetch(`${SHEET_CSV_URL}&_=${Date.now()}`, {cache: "no-store"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const matrix = parseCsv(await response.text());
    const headers = matrix.shift().map(h => h.trim());
    const ix = Object.fromEntries(headers.map((h,i) => [h,i]));
    const live = new Map(matrix.map(r => [r[ix["Item"]], r]));

    catalogue = catalogue.map(p => {
      if (!p.syncKey || !live.has(p.syncKey)) return p;
      const r = live.get(p.syncKey);
      const livePrice = priceFromCell(r[ix["Price (£)"]]);
      return {
        ...p,
        price: PRICE_OVERRIDES[p.id] ?? livePrice ?? p.price,
        description: r[ix["Description"]] || p.description,
        status: STATUS_OVERRIDES[p.id] ?? (r[ix["Status"]] || p.status)
      };
    });
    syncStatus.textContent = "Live availability from our moving-sale list";
    syncStatus.classList.add("live");
    buildFilters(); render();
  } catch (err) {
    syncStatus.textContent = "Availability snapshot — message before travelling";
    console.info("Live sheet sync unavailable; using embedded catalogue.", err);
  }
}

searchInput.addEventListener("input", e => { query = e.target.value.trim(); render(); });
sortSelect.addEventListener("change", e => { sort = e.target.value; render(); });
resetFilters.addEventListener("click", () => { query = ""; activeFilter = "All"; searchInput.value = ""; buildFilters(); render(); });
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

buildFilters();
render();
syncFromSheet();
