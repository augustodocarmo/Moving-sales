const extraProducts = [
  {
    id: "bokken",
    syncKey: null,
    name: "Aikido/Kendo Bokken",
    price: 30,
    category: "Martial Arts",
    description: "Brand-new bokken, never used. Very good quality, sturdy wood and a good training weight. Suitable for Aikido and Kendo training. Seller is an Aikido instructor.",
    images: ["bokken-1.webp"]
  }
];

products.push(...extraProducts);
categoryIcons["Martial Arts"] = "🥋";
catalogue = structuredClone(products).map((p, index) => ({...p, _order: index, status: "Available"}));
buildFilters();
render();
