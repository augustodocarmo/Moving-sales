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
  },
  {
    id: "vax-upright",
    syncKey: null,
    name: "Vax Air Stretch Upright Vacuum Cleaner",
    price: 20,
    category: "Home",
    description: "Vax Air Stretch upright corded vacuum cleaner in grey and orange, with cyclonic dust container (1.5L shown in product material). Used. Manufacturer/product images are illustrative; please ask about the condition and included attachments before collection. Collection in Warrington.",
    images: ["vax-1.png", "vax-2.png"]
  },
  {
    id: "yashe-cookware",
    syncKey: null,
    name: "Cream Cookware Set – Used",
    price: 5,
    category: "Kitchen",
    description: "Complete used cookware set for £5, as represented by the illustrative 13-piece set images (pans, lids, removable handles and protectors). IMPORTANT: The images are illustrative product photos, not photographs of the actual used set. Collection in Warrington.",
    images: ["yashe-cookware-1.png", "yashe-cookware-2.png"]
  },
  {
    id: "hangers-39",
    syncKey: null,
    name: "39 Clothes Hangers – Wooden & Black",
    price: 5,
    category: "Home",
    description: "Bundle of 39 clothes hangers, including natural wooden hangers and black velvet-style hangers, with metal hooks. Sold together for £5. Collection in Warrington.",
    images: ["hangers-1.png", "hangers-2.png"]
  },
  {
    id: "cake-dome",
    syncKey: null,
    name: "Cake Dome with Wooden Base",
    price: 5,
    category: "Kitchen",
    description: "Clear cake dome with a wooden serving base and top handle. Used condition, with visible scratches on the transparent cover as shown in the photograph. £5. Collection in Warrington.",
    images: ["cake-dome-1.png"]
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
