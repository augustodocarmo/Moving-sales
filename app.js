const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1RRfFIgn3BOQv8uJ4qP0Hc4JoLJDAUGJ1a4SMxWmwGKk/gviz/tq?tqx=out:csv&sheet=Moving%20Sale";

// Contact can be added later without changing the page layout.
const CONTACT = {
  whatsappNumber: "", // Example: 447700900000 (digits only, including country code)
  contactName: "Augusto & Juliana"
};

const PRICE_OVERRIDES = {
  airfryer: 12,
  kettle: 7,
  toaster: 7
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

let catalogue = structuredClone(products).map((p, index) => ({...p, _order: index, status: "Available"}));
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

function money(n) { return Number(n) === 0 ? "FREE" : `£${Number(n).toFixed(0)}`; }
function imagePath(name) { return `assets/images/${name}`; }
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
  const gallery = p.images.length ? `
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
        status: r[ix["Status"]] || p.status
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
