const extraProducts = [
  {
    id: "bokken",
    syncKey: null,
    name: "Wooden Bokken (4 available)",
    price: 30,
    category: "Martial Arts",
    description: "4 wooden bokken available, £30 each. Suitable for Aikido & Kendo training. One katana kake (sword stand) is included free with the first purchase.",
    images: ["bokken-site.png"]
  },
  {
    id: "mini-vacuum",
    syncKey: null,
    name: "Semflagree 4-in-1 Cordless Mini Vacuum",
    price: 15,
    category: "Home",
    description: "Brand new Semflagree handheld 4-in-1 cordless mini vacuum. USB-C rechargeable with up to 23000Pa suction, reusable washable HEPA filter and multiple attachments. Suitable for car, home, sofa, keyboard and small spaces.",
    images: ["mini-vacuum.png"]
  },
  {
    id: "kitchen-utensil-bundle",
    syncKey: null,
    name: "Kitchen Utensils & Cutlery Bundle",
    price: 15,
    category: "Kitchen",
    description: "Complete kitchen utensils and cutlery bundle for £15. Includes assorted serving spoons, ladle, spatulas, measuring spoons, potato masher, grater, peeler, pizza cutter, tea strainers, bottle opener, corkscrew, can opener, garlic press, plus cutlery and reusable metal straws with cleaning brushes, as pictured. Collection in Warrington.",
    images: ["kitchen-bundle-1.png", "kitchen-bundle-2.png", "kitchen-bundle-3.png"]
  }
];

products.push(...extraProducts);
categoryIcons["Martial Arts"] = "🥋";
catalogue = structuredClone(products).map((p, index) => ({
  ...p,
  _order: index,
  price: PRICE_OVERRIDES[p.id] ?? p.price,
  status: STATUS_OVERRIDES[p.id] ?? "Available"
}));
buildFilters();
render();
