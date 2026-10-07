const extraProducts = [
  {
    id: "bokken",
    syncKey: null,
    name: "Wooden Bokken (4 available)",
    price: 30,
    category: "Martial Arts",
    description: "4 wooden bokken available, £30 each. Suitable for Aikido & Kendo training. One katana kake (sword stand) is included free with the first purchase.",
    images: ["bokken-site.jpg"]
  },
  {
    id: "mini-vacuum",
    syncKey: null,
    name: "Semflagree 4-in-1 Cordless Mini Vacuum",
    price: 15,
    category: "Home",
    description: "Brand new Semflagree handheld 4-in-1 cordless mini vacuum. USB-C rechargeable with up to 23000Pa suction, reusable washable HEPA filter and multiple attachments. Suitable for car, home, sofa, keyboard and small spaces.",
    images: ["mini-vacuum.jpg"]
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
