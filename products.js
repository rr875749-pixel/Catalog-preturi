// TVA:
//  11% — Orbit (toate), Airwaves (toate)
//  21% — Winterfresh, Hubba Bubba, Skittles + toate produsele din imaginea 2 (ciocolată)

const PRODUCTS = [

  // ── ORBIT REFRESHER (HP) — TVA 11% ───────────────────────────────────────
  { code: "ART_28345", name: "ORBIT Ref. Strawberry Lemon HP 17,9g",              category: "Orbit Refresher",      bucCutie: 12,  priceNoVAT: 3.95,   priceWithVAT: 4.38,   vatRate: 11, discount: 0 },
  { code: "ART_28343", name: "ORBIT Refresher Bubblemint HP 17,9g",               category: "Orbit Refresher",      bucCutie: 12,  priceNoVAT: 3.95,   priceWithVAT: 4.38,   vatRate: 11, discount: 0 },
  { code: "ART_28341", name: "ORBIT Refresher Tropical HP 17,9g",                 category: "Orbit Refresher",      bucCutie: 12,  priceNoVAT: 3.95,   priceWithVAT: 4.38,   vatRate: 11, discount: 0 },
  { code: "ART_28346", name: "ORBIT Refresher Spearmint HP 17,9g",                category: "Orbit Refresher",      bucCutie: 12,  priceNoVAT: 3.95,   priceWithVAT: 4.38,   vatRate: 11, discount: 0 },
  { code: "ART_31769", name: "ORBIT Refresher Watermelon Raspberry HP 12*17,9g",  category: "Orbit Refresher",      bucCutie: 12,  priceNoVAT: 3.55,   priceWithVAT: 3.94,   vatRate: 11, discount: 0 },

  // ── ORBIT PELLETS — TVA 11% ───────────────────────────────────────────────
  { code: "ART_02781", name: "Orbit Pellet Peppermint",                           category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_01580", name: "Orbit Pellet Spearmint",                            category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_01579", name: "Orbit Pellet Winterfresh",                          category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_01581", name: "Orbit Pellet WaterMelon",                           category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_02784", name: "Orbit Pellet Blueberry",                            category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_09359", name: "Orbit Bubblemint",                                  category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_02787", name: "ORBIT Strawberry 14g",                              category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },
  { code: "ART_31723", name: "ORBIT White Fresh Mint 30*15,37g",                  category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.50,   priceWithVAT: 3.89,   vatRate: 11, discount: 0 },
  { code: "ART_31721", name: "ORBIT White Fruit 30*15,37g",                       category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.50,   priceWithVAT: 3.89,   vatRate: 11, discount: 0 },
  { code: "ART_31722", name: "ORBIT White Spearmint 30*15,37g",                   category: "Orbit Pellets",        bucCutie: 30,  priceNoVAT: 3.50,   priceWithVAT: 3.89,   vatRate: 11, discount: 0 },

  // ── AIRWAVES — TVA 11% ────────────────────────────────────────────────────
  { code: "ART_02792", name: "Airwaves 2nd generation Mentol & Eucalyptus",       category: "Airwaves",             bucCutie: 30,  priceNoVAT: 3.70,   priceWithVAT: 4.11,   vatRate: 11, discount: 0 },
  { code: "ART_02793", name: "Airwaves 2nd generation Cassis",                    category: "Airwaves",             bucCutie: 30,  priceNoVAT: 3.70,   priceWithVAT: 4.11,   vatRate: 11, discount: 0 },
  { code: "ART_02795", name: "Airwaves Extrem",                                   category: "Airwaves",             bucCutie: 30,  priceNoVAT: 3.70,   priceWithVAT: 4.11,   vatRate: 11, discount: 0 },
  { code: "ART_06096", name: "Airwaves Black Mint 600*14g",                       category: "Airwaves",             bucCutie: 30,  priceNoVAT: 3.70,   priceWithVAT: 4.11,   vatRate: 11, discount: 0 },
  { code: "ART_26666", name: "AIRWAVES Lime Ginger 30p",                          category: "Airwaves",             bucCutie: 30,  priceNoVAT: 3.70,   priceWithVAT: 4.11,   vatRate: 11, discount: 0 },

  // ── WINTERFRESH PELLETS — TVA 11% ─────────────────────────────────────────
  { code: "ART_02791", name: "Winterfresh Original Pellets",                      category: "Winterfresh",          bucCutie: 30,  priceNoVAT: 3.34,   priceWithVAT: 3.71,   vatRate: 11, discount: 0 },

  // ── ORBIT SINGLE PORTION — TVA 11% ───────────────────────────────────────
  { code: "ART_05564", name: "Orbit Spearmint miniflow",                          category: "Orbit Single Portion", bucCutie: 100, priceNoVAT: 0.62,   priceWithVAT: 0.69,   vatRate: 11, discount: 0 },
  { code: "ART_14838", name: "Orbit Bubblemint miniflows",                        category: "Orbit Single Portion", bucCutie: 100, priceNoVAT: 0.62,   priceWithVAT: 0.69,   vatRate: 11, discount: 0 },

  // ── ORBIT BAGS — TVA 11% ──────────────────────────────────────────────────
  { code: "ART_30543", name: "ORBIT Bubblemint XXL bag 18*50g",                   category: "Orbit Bags",           bucCutie: 18,  priceNoVAT: 8.97,   priceWithVAT: 9.96,   vatRate: 11, discount: 0 },
  { code: "ART_30544", name: "ORBIT Spearmint XXL bag 18*50g",                    category: "Orbit Bags",           bucCutie: 18,  priceNoVAT: 8.97,   priceWithVAT: 9.96,   vatRate: 11, discount: 0 },

  // ── ORBIT / AIRWAVES BOTTLES — TVA 11% ───────────────────────────────────
  { code: "ART_29541", name: "Orbit Spearmint Bottle 6x64g",                      category: "Bottles",              bucCutie: 6,   priceNoVAT: 13.01,  priceWithVAT: 14.44,  vatRate: 11, discount: 0 },
  { code: "ART_29538", name: "Orbit Watermelon bottle 6x64g",                     category: "Bottles",              bucCutie: 6,   priceNoVAT: 13.01,  priceWithVAT: 14.44,  vatRate: 11, discount: 0 },
  { code: "ART_31724", name: "ORBIT White Fruit bottle 6x64g",                    category: "Bottles",              bucCutie: 6,   priceNoVAT: 14.42,  priceWithVAT: 16.01,  vatRate: 11, discount: 0 },
  { code: "ART_31725", name: "ORBIT White Spearmint bottle 6x64g",                category: "Bottles",              bucCutie: 6,   priceNoVAT: 14.42,  priceWithVAT: 16.01,  vatRate: 11, discount: 0 },
  { code: "ART_29536", name: "Airwaves Cassis bottle 64g",                        category: "Bottles",              bucCutie: 6,   priceNoVAT: 14.06,  priceWithVAT: 15.61,  vatRate: 11, discount: 0 },
  { code: "ART_29537", name: "Airwaves Extreme bottle 64g",                       category: "Bottles",              bucCutie: 6,   priceNoVAT: 14.06,  priceWithVAT: 15.61,  vatRate: 11, discount: 0 },
  { code: "ART_31770", name: "ORBIT Refresher Watermelon Raspberry bottle 6*67g", category: "Bottles",              bucCutie: 6,   priceNoVAT: 15.70,  priceWithVAT: 17.43,  vatRate: 11, discount: 0 },
  { code: "ART_22109", name: "Orbit Refresher Bottle Spearmint 6p",               category: "Bottles",              bucCutie: 6,   priceNoVAT: 18.44,  priceWithVAT: 20.47,  vatRate: 11, discount: 0 },
  { code: "ART_24635", name: "ORBIT Refreshers Tropical bottle 67g",              category: "Bottles",              bucCutie: 6,   priceNoVAT: 18.44,  priceWithVAT: 20.47,  vatRate: 11, discount: 0 },
  { code: "ART_28344", name: "ORBIT Ref. Strawberry Lemon Btl 67g",               category: "Bottles",              bucCutie: 6,   priceNoVAT: 18.44,  priceWithVAT: 20.47,  vatRate: 11, discount: 0 },
  { code: "ART_28342", name: "ORBIT Refresher Bubblemint bottle 67g",             category: "Bottles",              bucCutie: 6,   priceNoVAT: 18.44,  priceWithVAT: 20.47,  vatRate: 11, discount: 0 },

  // ── HUBBA BUBBA — TVA 21% ────────────────────────────────────────────────
  { code: "ART_03331", name: "Hubba Bubba Apple 7g",                              category: "Hubba Bubba",          bucCutie: 20,  priceNoVAT: 4.93,   priceWithVAT: 5.97,   vatRate: 21, discount: 0 },
  { code: "ART_03332", name: "Hubba Bubba Outrageous Original 7g",                category: "Hubba Bubba",          bucCutie: 20,  priceNoVAT: 4.93,   priceWithVAT: 5.97,   vatRate: 21, discount: 0 },
  { code: "ART_24697", name: "HUBBA BUBBA Strawberry 20*35g",                     category: "Hubba Bubba",          bucCutie: 20,  priceNoVAT: 4.93,   priceWithVAT: 5.97,   vatRate: 21, discount: 0 },
  { code: "NG401",     name: "Hubba Bubba Triple Strawberry/Blueberry/Watermelon", category: "Hubba Bubba",         bucCutie: 12,  priceNoVAT: 11.97,  priceWithVAT: 14.48,  vatRate: 21, discount: 0 },
  { code: "ART_29554", name: "HUBBA BUBBA Cola Tape 180*56g",                     category: "Hubba Bubba",          bucCutie: 12,  priceNoVAT: 11.97,  priceWithVAT: 14.48,  vatRate: 21, discount: 0 },

  // ── WINTERFRESH MINTS — TVA 11% ───────────────────────────────────────────
  { code: "ART_01583", name: "Winterfresh Strong Mint - Vel Mints",               category: "Winterfresh",          bucCutie: 24,  priceNoVAT: 4.05,   priceWithVAT: 4.50,   vatRate: 11, discount: 0 },
  { code: "ART_00047", name: "Winterfresh Fresh Mint - Vel Mints",                category: "Winterfresh",          bucCutie: 24,  priceNoVAT: 4.05,   priceWithVAT: 4.50,   vatRate: 11, discount: 0 },

  // ── SKITTLES — TVA 21% ────────────────────────────────────────────────────
  { code: "ART_01562", name: "Skittles Fruits",                                   category: "Skittles",             bucCutie: 14,  priceNoVAT: 3.20,   priceWithVAT: 3.87,   vatRate: 21, discount: 0 },
  { code: "ART_01582", name: "Skittles Crazy Sours",                              category: "Skittles",             bucCutie: 14,  priceNoVAT: 3.20,   priceWithVAT: 3.87,   vatRate: 21, discount: 0 },
  { code: "ART_18960", name: "Skittles Smoothie 38g",                             category: "Skittles",             bucCutie: 14,  priceNoVAT: 3.20,   priceWithVAT: 3.87,   vatRate: 21, discount: 0 },
  { code: "ART_18929", name: "Skittles Fruits 18 gr",                             category: "Skittles",             bucCutie: 18,  priceNoVAT: 1.55,   priceWithVAT: 1.88,   vatRate: 21, discount: 0 },
  { code: "ART_28651", name: "SKITTLES Crazy Sours 15*152g",                      category: "Skittles Bags",        bucCutie: 15,  priceNoVAT: 10.98,  priceWithVAT: 13.29,  vatRate: 21, discount: 0 },
  { code: "ART_28650", name: "SKITTLES Fruits 15*152g",                           category: "Skittles Bags",        bucCutie: 15,  priceNoVAT: 10.98,  priceWithVAT: 13.29,  vatRate: 21, discount: 0 },
  { code: "ART_29405", name: "SKITTLES Smoothies 14*152g",                        category: "Skittles Bags",        bucCutie: 14,  priceNoVAT: 10.98,  priceWithVAT: 13.29,  vatRate: 21, discount: 0 },

  // ── BOUNTY — TVA 21% (prețuri exacte din catalog) ─────────────────────────
  { code: "NG321",     name: "BOUNTY CIOCO LAPTE 57G 12*24",                      category: "Bounty",               bucCutie: 24,  priceNoVAT: 4.20,   priceWithVAT: 5.08,   vatRate: 21, discount: 0 },
  { code: "ART_18325", name: "BOUNTY CIOCO LAPTE (4*57g)x12",                     category: "Bounty",               bucCutie: 12,  priceNoVAT: 13.75,  priceWithVAT: 16.64,  vatRate: 21, discount: 0 },

  // ── CELEBRATIONS — TVA 21% ────────────────────────────────────────────────
  { code: "ART_15016", name: "CELEBRATIONS Centerpiece 196g x8",                  category: "Celebrations",         bucCutie: 8,   priceNoVAT: 20.79,  priceWithVAT: 25.16,  vatRate: 21, discount: 0 },

  // ── M&M'S — TVA 21% ──────────────────────────────────────────────────────
  { code: "ART_02906", name: "M&M'S CU ARAHIDE 45G 24*1",                        category: "M&M's",                bucCutie: 24,  priceNoVAT: 3.68,   priceWithVAT: 4.45,   vatRate: 21, discount: 0 },
  { code: "ART_03098", name: "M&M'S CU CIOCOLATA 45G 24*1",                      category: "M&M's",                bucCutie: 24,  priceNoVAT: 3.68,   priceWithVAT: 4.45,   vatRate: 21, discount: 0 },
  { code: "ART_18335", name: "M&MS Crispy 24*36g RO HU",                         category: "M&M's",                bucCutie: 24,  priceNoVAT: 3.68,   priceWithVAT: 4.45,   vatRate: 21, discount: 0 },
  { code: "ART_05533", name: "M&M's Cioco 16x90g",                               category: "M&M's",                bucCutie: 16,  priceNoVAT: 7.14,   priceWithVAT: 8.64,   vatRate: 21, discount: 0 },
  { code: "ART_05544", name: "M&M's Arahide 16x90g",                             category: "M&M's",                bucCutie: 16,  priceNoVAT: 7.14,   priceWithVAT: 8.64,   vatRate: 21, discount: 0 },
  { code: "ART_18331", name: "M&MS Crispy 16*77g Bag RO HU",                     category: "M&M's",                bucCutie: 16,  priceNoVAT: 7.14,   priceWithVAT: 8.64,   vatRate: 21, discount: 0 },
  { code: "ART_22111", name: "M&M's Ciocolată 12x250g",                          category: "M&M's",                bucCutie: 12,  priceNoVAT: 17.08,  priceWithVAT: 20.67,  vatRate: 21, discount: 0 },
  { code: "ART_22112", name: "M&M's Arahidă 12x250g",                            category: "M&M's",                bucCutie: 12,  priceNoVAT: 17.08,  priceWithVAT: 20.67,  vatRate: 21, discount: 0 },
  { code: "ART_22113", name: "M&M's Crispy 1*10x213g",                           category: "M&M's",                bucCutie: 10,  priceNoVAT: 17.08,  priceWithVAT: 20.67,  vatRate: 21, discount: 0 },

  // ── MALTESERS — TVA 21% ───────────────────────────────────────────────────
  { code: "ART_19940", name: "MALTESERS STD 37g 1x25",                           category: "Maltesers",            bucCutie: 25,  priceNoVAT: 3.68,   priceWithVAT: 4.45,   vatRate: 21, discount: 0 },
  { code: "ART_19941", name: "MALTESERS Treat bag 68g 24x1",                     category: "Maltesers",            bucCutie: 24,  priceNoVAT: 7.14,   priceWithVAT: 8.64,   vatRate: 21, discount: 0 },
  { code: "ART_22114", name: "MALTESERS std pouch 192.5g 18x1",                  category: "Maltesers",            bucCutie: 18,  priceNoVAT: 16.97,  priceWithVAT: 20.53,  vatRate: 21, discount: 0 },

  // ── MARS — TVA 21% ────────────────────────────────────────────────────────
  { code: "ART_13436", name: "MARS 40*51G STD EST RO",                           category: "Mars",                 bucCutie: 40,  priceNoVAT: 3.55,   priceWithVAT: 4.30,   vatRate: 21, discount: 0 },
  { code: "ART_13437", name: "MARS 24*70g KS Std EE RO",                         category: "Mars",                 bucCutie: 24,  priceNoVAT: 4.95,   priceWithVAT: 5.99,   vatRate: 21, discount: 0 },
  { code: "ART_26926", name: "MARS 3-pack 34*135g",                              category: "Mars",                 bucCutie: 34,  priceNoVAT: 8.40,   priceWithVAT: 10.16,  vatRate: 21, discount: 0 },
  { code: "ART_26930", name: "MARS 5-pack 17*225g",                              category: "Mars",                 bucCutie: 17,  priceNoVAT: 15.03,  priceWithVAT: 18.19,  vatRate: 21, discount: 0 },

  // ── MILKY WAY — TVA 21% ───────────────────────────────────────────────────
  { code: "ART_17479", name: "MILKY WAY CIOCO LAPTE 1X 56*21.5g",               category: "Milky Way",            bucCutie: 56,  priceNoVAT: 2.26,   priceWithVAT: 2.73,   vatRate: 21, discount: 0 },

  // ── MIXED / BULK — TVA 21% ────────────────────────────────────────────────
  { code: "ART_20105", name: "Mixed Minis 400g",                                  category: "Mixed",                bucCutie: 12,  priceNoVAT: 25.74,  priceWithVAT: 31.15,  vatRate: 21, discount: 0 },
  { code: "ART_19516", name: "Choco Bulk 500gr",                                  category: "Mixed",                bucCutie: 12,  priceNoVAT: 32.38,  priceWithVAT: 39.18,  vatRate: 21, discount: 0 },

  // ── SNICKERS — TVA 21% ────────────────────────────────────────────────────
  { code: "ART_04302", name: "SNICKERS CLA 40x50g RO,EST",                       category: "Snickers",             bucCutie: 40,  priceNoVAT: 3.55,   priceWithVAT: 4.30,   vatRate: 21, discount: 0 },
  { code: "ART_24836", name: "SNICKERS Creamy Smooth Peanut 24*36,5g",           category: "Snickers",             bucCutie: 24,  priceNoVAT: 3.92,   priceWithVAT: 4.74,   vatRate: 21, discount: 0 },
  { code: "NG749",     name: "SNICKERS SP KINGSIZE 75G 24X1",                     category: "Snickers",             bucCutie: 24,  priceNoVAT: 4.95,   priceWithVAT: 5.99,   vatRate: 21, discount: 0 },
  { code: "ART_18181", name: "Snickers Trio 20 X 112.5G",                        category: "Snickers",             bucCutie: 20,  priceNoVAT: 7.06,   priceWithVAT: 8.54,   vatRate: 21, discount: 0 },
  { code: "ART_26933", name: "SNICKERS 3-pack 34*150g",                          category: "Snickers",             bucCutie: 34,  priceNoVAT: 9.34,   priceWithVAT: 11.30,  vatRate: 21, discount: 0 },
  { code: "ART_26934", name: "SNICKERS 5-pack 17*250g",                          category: "Snickers",             bucCutie: 17,  priceNoVAT: 15.02,  priceWithVAT: 18.17,  vatRate: 21, discount: 0 },

  // ── TWIX — TVA 21% ────────────────────────────────────────────────────────
  { code: "ART_04303", name: "TWIX std TWIN 1x30 50g RO,EST",                    category: "Twix",                 bucCutie: 30,  priceNoVAT: 3.55,   priceWithVAT: 4.30,   vatRate: 21, discount: 0 },
  { code: "ART_12179", name: "TWIX Ciocolata alba 32*46g Std RO",                category: "Twix",                 bucCutie: 32,  priceNoVAT: 3.55,   priceWithVAT: 4.30,   vatRate: 21, discount: 0 },
  { code: "NH273",     name: "TWIX EXTRA TWIN 75G 30*1",                          category: "Twix",                 bucCutie: 30,  priceNoVAT: 4.95,   priceWithVAT: 5.99,   vatRate: 21, discount: 0 },
  { code: "ART_19650", name: "TWIX Salted Caramel 30*46g",                       category: "Twix",                 bucCutie: 30,  priceNoVAT: 3.92,   priceWithVAT: 4.74,   vatRate: 21, discount: 0 },
  { code: "ART_26935", name: "TWIX Twin 3-pack 36*150g",                         category: "Twix",                 bucCutie: 36,  priceNoVAT: 9.34,   priceWithVAT: 11.30,  vatRate: 21, discount: 0 },
  { code: "ART_26936", name: "TWIX Twin 5-pack 18*250g",                         category: "Twix",                 bucCutie: 18,  priceNoVAT: 15.02,  priceWithVAT: 18.17,  vatRate: 21, discount: 0 },

  // ── COLORWORKS (M&M) — TVA 21% ────────────────────────────────────────────
  { code: "ART_28154", name: "Colorworks Cup M&M yellow 480x500ml",              category: "Colorworks",           bucCutie: 480, priceNoVAT: 1.55,   priceWithVAT: 1.88,   vatRate: 21, discount: 0 },
  { code: "ART_28155", name: "Colorworks Lid M&M yellow 480x500ml",              category: "Colorworks",           bucCutie: 480, priceNoVAT: 0.63,   priceWithVAT: 0.76,   vatRate: 21, discount: 0 },

  // ── M&M'S BULK 5KG — TVA 21% ──────────────────────────────────────────────
  { code: "ART_28142", name: "M&M's Arahide Dark Pink Natural 5kg",              category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28144", name: "M&M's Arahide Pink Natural 5kg",                   category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28146", name: "M&M's Arahide Red 5kg",                            category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28143", name: "M&M's Arahide Blue 5kg",                           category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28145", name: "M&M's Arahide Aqua 5kg",                           category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28147", name: "M&M's Arahide Electric green 5kg",                 category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28148", name: "M&M's Arahide Yellow 5kg",                         category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28153", name: "M&M's Arahide Orange 5kg",                         category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28149", name: "M&M's Arahide Black 5kg",                          category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28150", name: "M&M's Arahide White 5kg",                          category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28151", name: "M&M's Arahide Teal 5kg",                           category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },
  { code: "ART_28152", name: "M&M's Arahide LT Purple Natural 5kg",              category: "M&M's Bulk",           bucCutie: 1,   priceNoVAT: 379.17, priceWithVAT: 458.80, vatRate: 21, discount: 0 },

];
