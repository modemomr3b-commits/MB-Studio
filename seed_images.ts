import Database from "better-sqlite3";

const db = new Database("app_data.db");

function generatePrompt(category, subCategory, i) {
    let subject = '';
    
    // Detailed logic for each subcategory covering 20 distinct types without duplicates
    if (category === 'footwear') {
      const typesList = {
        mens_shoes: [
          "mens classic black oxford shoe", "mens brown leather brogue", "mens minimalist white sneaker", "mens suede chelsea boot", "mens athletic running shoe", "mens formal monk strap shoe", "mens casual slip-on loafer", "mens high-top basketball sneaker", "mens desert boot", "mens hiking boot",
          "mens navy blue boat shoe", "mens black leather shiny formal shoe", "mens sporty tennis sneaker", "mens vintage leather boot", "mens grey modern running shoe", "mens burgundy oxford shoe", "mens canvas casual sneaker", "mens leather chukka boot", "mens two-tone wingtip shoe", "mens black athletic trainer"
        ],
        womens_shoes: [
          "womens black stiletto heel", "womens red leather pump", "womens nude ankle strap sandal", "womens white casual sneaker", "womens black leather ankle boot", "womens suede knee-high boot", "womens ballet flat", "womens platform chunky sneaker", "womens wedge sandal", "womens metallic silver heel",
          "womens strappy evening sandal", "womens pink athletic running shoe", "womens leopard print flat", "womens brown suede bootie", "womens white leather slip-on", "womens gold evening stiletto", "womens navy blue pump", "womens pointed toe flat", "womens chunky black boot", "womens pastel running sneaker"
        ],
        kids_shoes: [
          "kids colorful light-up sneaker", "kids pink velcro shoe", "kids blue running sneaker", "kids tiny yellow rain boot", "kids white school shoe", "toddler canvas shoe", "kids red high-top sneaker", "kids black formal school shoe", "kids glitter slip-on shoe", "kids green athletic trainer",
          "kids blue star-print canvas shoe", "kids purple running shoe", "toddler brown leather boot", "kids neon green sport sneaker", "toddler polka dot shoe", "kids silver shiny sneaker", "kids navy velcro school shoe", "kids orange slip-on sneaker", "kids pink floral boot", "kids yellow canvas sneaker"
        ]
      };
      const types = typesList[subCategory] || typesList.mens_shoes;
      subject = types[i % types.length];
    } else if (category === 'fashion') {
      const typesList = {
        mens_fashion: [
          "mens tailored navy blue suit", "mens casual denim jacket with t-shirt", "mens winter wool overcoat", "mens black leather biker jacket", "mens grey slim fit blazer", "mens white linen shirt", "mens streetwear hoodie and cargo pants", "mens plaid flannel shirt", "mens khaki trench coat", "mens formal tuxedo",
          "mens burgundy knit sweater", "mens olive green bomber jacket", "mens striped polo shirt", "mens light blue dress shirt", "mens charcoal grey suit jacket", "mens tan double-breasted blazer", "mens black urban streetwear outfit", "mens maroon turtleneck sweater", "mens casual summer short sleeve shirt", "mens brown corduroy jacket"
        ],
        womens_fashion: [
          "womens elegant red evening gown", "womens floral summer maxi dress", "womens black tailored blazer", "womens white silk blouse", "womens casual denim jacket outfit", "womens pleated midi skirt", "womens winter cashmere wool coat", "womens pink cocktail dress", "womens leather moto jacket", "womens bohemian chic dress",
          "womens navy blue wrap dress", "womens yellow sundress", "womens grey knit oversized sweater", "womens classic white button-down shirt", "womens emerald green silk dress", "womens black velvet evening gown", "womens pastel trench coat", "womens high-waisted trousers outfit", "womens sequin party dress", "womens casual striped t-shirt dress"
        ],
        kids_fashion: [
          "kids cute yellow raincoat", "kids blue denim overalls", "kids pink princess dress", "kids striped cotton t-shirt", "kids winter padded jacket", "kids colorful printed hoodie", "kids red velvet party dress", "kids green cargo pants outfit", "toddler plaid flannel shirt", "kids white christening gown",
          "kids navy blue sailor dress", "kids orange graphic t-shirt", "kids grey knit cardigan", "kids floral spring dress", "kids black and white striped onesie", "kids pink tutu skirt", "kids blue winter snowsuit", "kids yellow polka dot dress", "kids red knitted sweater", "kids casual jeans outfit"
        ]
      };
      const types = typesList[subCategory] || typesList.mens_fashion;
      subject = types[i % types.length];
    } else if (category === 'jewelry') {
      const typesList = {
        womens_jewelry: [
          "womens diamond statement necklace", "womens gold hoop earrings", "womens silver tennis bracelet", "womens sapphire ring", "womens pearl drop earrings", "womens rose gold pendant", "womens emerald choker", "womens platinum engagement ring", "womens ruby stud earrings", "womens gold chain necklace",
          "womens vintage diamond brooch", "womens amethyst ring", "womens silver charm bracelet", "womens gold bangle set", "womens diamond chandelier earrings", "womens opal pendant necklace", "womens turquoise ring", "womens rose gold cuff bracelet", "womens crystal teardrop earrings", "womens pearl strand necklace"
        ],
        mens_watches: [
          "mens silver mechanical dive watch", "mens gold luxury chronograph", "mens black leather strap dress watch", "mens digital sports watch", "mens minimalist grey dial watch", "mens rose gold skeleton watch", "mens titanium aviation watch", "mens brown leather vintage watch", "mens stainless steel smart watch", "mens blue dial steel watch",
          "mens black ceramic luxury watch", "mens green dial automatic watch", "mens two-tone steel and gold watch", "mens carbon fiber sports watch", "mens white dial dress watch", "mens square case luxury watch", "mens bronze diving watch", "mens nato strap field watch", "mens gold pocket watch", "mens black matte minimalist watch"
        ],
        kids_accessories: [
          "kids cute pink plastic watch", "kids tiny gold stud earrings", "kids colorful beaded bracelet", "kids silver heart pendant", "kids blue digital watch", "kids flower shape earrings", "kids rainbow rubber bracelet", "kids butterfly necklace", "kids red digital alarm watch", "kids gold initial pendant",
          "kids cute animal shape earrings", "kids pastel color friendship bracelet", "kids silver star necklace", "kids green digital sports watch", "kids daisy flower bracelet", "kids tiny pearl earrings", "kids mermaid tail pendant", "kids purple digital watch", "kids cherry shape earrings", "kids gold chain with little bell"
        ]
      };
      const types = typesList[subCategory] || typesList.womens_jewelry;
      subject = types[i % types.length];
    } else if (category === 'perfume') {
      const typesList = {
        mens_perfume: [
          "mens black matte cologne bottle", "mens blue glass aquatic fragrance", "mens dark brown woody perfume", "mens silver metallic cologne", "mens clear minimal glass cologne", "mens dark green fresh fragrance", "mens gold luxury perfume", "mens grey square cologne bottle", "mens red spicy fragrance", "mens black leather wrapped perfume",
          "mens tall cylindrical cologne", "mens amber glass woody fragrance", "mens navy blue sports cologne", "mens crystal facet luxury perfume", "mens frosted glass cologne", "mens black and gold premium perfume", "mens heavy square glass cologne", "mens vintage apothecary style cologne", "mens sleek black cylindrical fragrance", "mens blue ombre glass perfume"
        ],
        womens_perfume: [
          "womens pink diamond shaped perfume", "womens elegant gold floral fragrance", "womens classic clear glass perfume", "womens purple crystal perfume", "womens tall slim feminine fragrance", "womens rose gold luxury perfume", "womens vintage style perfume with atomizer", "womens sweet pink bow perfume", "womens red apple shaped perfume", "womens light blue fresh fragrance",
          "womens white opaque minimalist perfume", "womens black chic perfume", "womens gold sphere shaped perfume", "womens frosted pink glass fragrance", "womens elegant teardrop perfume", "womens floral painted glass perfume", "womens champagne luxury fragrance", "womens deep red rose shaped perfume", "womens crystal flower cap perfume", "womens pastel purple soft fragrance"
        ],
        kids_perfume: [
          "kids cute teddy bear shaped perfume", "kids pink princess fragrance", "kids blue star shaped cologne", "kids yellow sunshine perfume", "kids green apple shaped fragrance", "kids pastel bunny shaped perfume", "kids red strawberry perfume", "kids small plastic safe fragrance", "kids purple butterfly perfume", "kids colorful rainbow fragrance",
          "kids cute cat shaped perfume", "kids blue dolphin cologne", "kids pink flower shaped fragrance", "kids tiny clear glass sweet perfume", "kids orange citrus fragrance", "kids little car shaped cologne", "kids sweet yellow daisy perfume", "kids pastel green safe fragrance", "kids small round pink perfume", "kids cute dog shaped cologne"
        ]
      };
      const types = typesList[subCategory] || typesList.mens_perfume;
      subject = types[i % types.length];
    } else if (category === 'bags') {
      const typesList = {
        mens_bags: [
          "mens brown leather classic briefcase", "mens black modern leather backpack", "mens navy blue canvas messenger bag", "mens tan leather travel duffel bag", "mens black sleek laptop bag", "mens olive green canvas rucksack", "mens brown vintage leather cross-body bag", "mens black nylon sports gym bag", "mens grey modern sling bag", "mens dark brown leather weekender",
          "mens black minimalist briefcase", "mens tan suede messenger bag", "mens navy blue leather backpack", "mens green waxed canvas duffel bag", "mens grey tech laptop backpack", "mens brown leather portfolio bag", "mens black structured tote", "mens olive drab military style backpack", "mens dark grey canvas courier bag", "mens black leather waist bag"
        ],
        womens_bags: [
          "womens black leather luxury tote bag", "womens red quilted crossbody bag", "womens beige structured handbag", "womens pink elegant evening clutch", "womens brown leather hobo bag", "womens white designer shoulder bag", "womens emerald green suede purse", "womens navy blue satchel bag", "womens gold metallic evening clutch", "womens tan leather bucket bag",
          "womens black miniature crossbody bag", "womens floral print summer tote", "womens yellow mustard leather handbag", "womens grey slouchy suede bag", "womens burgundy structured top handle bag", "womens pastel pink envelope clutch", "womens white quilted shoulder bag", "womens brown woven leather tote", "womens silver rhinestone evening bag", "womens black nylon pragmatic tote"
        ],
        kids_bags: [
          "kids pink unicorn backpack", "kids blue dinosaur backpack", "kids yellow school bus shaped bag", "kids red ladybug mini backpack", "kids colorful paw print school bag", "kids green turtle shaped bag", "kids purple butterfly backpack", "kids orange tiger face bag", "kids blue space rocket backpack", "kids pink glittery mini backpack",
          "kids yellow minion style backpack", "kids red fire truck shaped bag", "kids green frog toddler bag", "kids blue shark backpack", "kids pink floral school bag", "kids grey elephant shaped backpack", "kids brown bear fuzzy bag", "kids rainbow colors backpack", "kids blue and yellow star backpack", "kids red superhero theme school bag"
        ]
      };
      const types = typesList[subCategory] || typesList.mens_bags;
      subject = types[i % types.length];
    }

    const isFashion = category === 'fashion';
    const phototype = isFashion 
      ? "Realistic fashion photography, professional model or mannequin, modern editorial style" 
      : "Close-up single product photography, isolated on clean neutral background, no humans";
      
    const prompt = `${phototype}. The subject is: ${subject}. Ultra realistic, professional studio lighting, 8k resolution UHD, premium e-commerce look.`;
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Distinct seed for uniqueness
    const seed = i * 2999 + Math.floor(Math.random() * 100000);
    
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=500&height=700&nologo=true&seed=${seed}`;
}

const mapCategory = {
  mens_shoes: 'footwear', womens_shoes: 'footwear', kids_shoes: 'footwear',
  mens_fashion: 'fashion', womens_fashion: 'fashion', kids_fashion: 'fashion',
  mens_watches: 'jewelry', womens_jewelry: 'jewelry', kids_accessories: 'jewelry',
  mens_perfume: 'perfume', womens_perfume: 'perfume', kids_perfume: 'perfume',
  mens_bags: 'bags', womens_bags: 'bags', kids_bags: 'bags'
};

const insertDesign = db.prepare("INSERT INTO designs (category_id, title, image_url, sort_order) VALUES (?, ?, ?, ?)");

Object.entries(mapCategory).forEach(([subCategory, parentCategory]) => {
  // Clear old placeholder logic if any for this subCategory? Let's just insert 20
  // First, check how many exist to avoid duplicates if run multiple times
  const countObj = db.prepare("SELECT COUNT(*) as count FROM designs WHERE category_id = ? AND image_url LIKE \'%pollinations.ai%\'").get(subCategory) as {count: number};
  if (countObj.count < 20) {
    const toInsert = 20 - countObj.count;
    for (let i = 0; i < toInsert; i++) {
        const index = countObj.count + i;
        const url = generatePrompt(parentCategory, subCategory, index);
        const title = `${subCategory.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} ${index + 1}`;
        insertDesign.run(subCategory, title, url, index + 1);
    }
    console.log(`Inserted ${toInsert} designs for ${subCategory}`);
  }
});
