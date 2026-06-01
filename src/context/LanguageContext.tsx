import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    fashion: 'Fashion',
    footwear: 'Footwear',
    perfume: 'Perfume',
    jewelry: 'Jewelry & Accessories',
    bags: 'Bags',
    men: 'MEN',
    women: 'WOMEN',
    kids: 'KIDS',
    tagline: 'Where Creativity Meets Luxury',
    subtitle: 'MB STUDIO — Premium Design Collections & Creative Concepts',
    loadMore: 'Load More',
    featuredCollections: 'Featured Collections',
    trendingConcepts: 'Trending Concepts',
    trendingDesc: 'Discover the latest avant-garde designs that redefine luxury. From futuristic footwear explicitly tailored to modern urban life, to school backpacks that merge high fashion with unparalleled utility.',
    newDesignCollections: 'New Design Collections',
    creativeInspiration: 'Creative Inspiration Gallery',
    visionMission: 'Vision & Mission',
    visionDesc: '"MB STUDIO transcends traditional boundaries to forge an intersection where meticulous craftsmanship meets visionary innovation. We do not just design; we curate an experience that epitomizes profound luxury and elegance."',
    creativeProcess: 'Our Creative Process',
    designPhilosophy: 'Design Philosophy',
    designQuote: '"Design is not merely what it looks like and feels like. Design is how it commands the room."',
    designDesc: 'Every curve, every texture, and every hue selected within our studio undergoes rigorous creative scrutiny. Whether conceptualizing a futuristic school backpack or a diamond necklace, we demand perfection in presentation.',
    brandStory: 'Brand Story',
    brandStory1: 'Founded on the principles of unapologetic luxury and avant-garde artistry, MB STUDIO has emerged as a beacon of creative excellence. We are not bound by the conventions of season or trend; rather, we define them.',
    brandStory2: 'Our journey began with a singular vision: to curate spaces and concepts where premium design is the universal language. Today, our portfolios span high fashion, exquisite jewelry, visionary footwear, and more, each a testament to timeless elegance.',
    visionText: 'To be the global apex of creative design, where every concept born in MB STUDIO challenges the boundaries of what is possible in luxury aesthetics.',
    missionText: 'To continuously conceptualize, iterate, and craft collections that inspire our peers and mesmerize our audience, delivering an uncompromising standard of visual excellence.',
    ourVision: 'Our Vision:',
    ourMission: 'Our Mission:',
    contactUs: 'Contact MB STUDIO',
    send: 'Send Message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    businessHours: 'Business Hours',
    explore: 'Explore Collection',
    collection: 'Collection',
    studioDetails: 'Studio Details',
    location: 'Location',
    phone: 'Phone & WhatsApp',
    socialConnect: 'Social Connect',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'MB STUDIO. All rights reserved.',
    mapPlaceholder: 'Interactive Map Placeholder',
    mondayFriday: 'Monday - Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    closed: 'Closed',
    mens_shoes: "Men's Shoes",
    womens_shoes: "Women's Shoes",
    kids_shoes: "Kids' Shoes",
    mens_fashion: "Men's Fashion",
    womens_fashion: "Women's Fashion",
    kids_fashion: "Kids' Fashion",
    mens_bags: "Men's Bags",
    womens_bags: "Women's Bags",
    kids_bags: "Kids' Bags",
    school_backpacks: "School Backpacks",
    mens_perfume: "Men's Perfumes",
    womens_perfume: "Women's Perfumes",
    kids_perfume: "Kids' Perfumes",
    womens_jewelry: "Women's Jewelry",
    mens_watches: "Men's Watches",
    kids_accessories: "Kids' Accessories",
    videos: "Videos",
    all_videos: "All Videos",
    adminLogin: "Admin Login",
    adminDashboard: "Admin Dashboard",
    password: "Password",
    login: "Login",
    logout: "Logout",
    manageCategories: "Manage Categories",
    manageDesigns: "Manage Designs",
    uploadDesign: "Upload New Design",
    title: "Title",
    image: "Image",
    visibility: "Visibility",
    hidden: "Hidden",
    visible: "Visible",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    addCategory: "Add Category",
    categoryEn: "Category Name (EN)",
    categoryAr: "Category Name (AR)",
    selectCategory: "Select Category",
    order: "Order",
    backToSite: "Back to Site"
  },
  ar: {
    home: 'الرئيسية',
    about: 'عن الأستوديو',
    contact: 'تواصل معنا',
    fashion: 'أزياء',
    footwear: 'أحذية',
    perfume: 'عطور',
    jewelry: 'مجوهرات وإكسسوارات',
    bags: 'حقائب',
    men: 'رجالي',
    women: 'نسائي',
    kids: 'أطفال',
    tagline: 'حيث يلتقي الإبداع بالفخامة',
    subtitle: 'إم بي ستوديو — مجموعات تصميم فاخرة ومفاهيم إبداعية',
    loadMore: 'عرض المزيد',
    featuredCollections: 'مجموعات مميزة',
    trendingConcepts: 'مفاهيم رائجة',
    trendingDesc: 'اكتشف أحدث التصاميم الطليعية التي تعيد تعريف الفخامة. من الأحذية المستقبلية المصممة خصيصًا للحياة الحضرية الحديثة، إلى الحقائب المدرسية التي تدمج الموضة الراقية مع المنفعة التي لا مثيل لها.',
    newDesignCollections: 'مجموعات تصميم جديدة',
    creativeInspiration: 'معرض الإلهام الإبداعي',
    visionMission: 'الرؤية والمهمة',
    visionDesc: '"تتجاوز إم بي ستوديو الحدود التقليدية لتكوين تقاطع حيث تلتقي الحرفية الدقيقة بالابتكار الحالم. نحن لا نصمم فقط؛ بل نرعى تجربة تجسد الفخامة العميقة والأناقة."',
    creativeProcess: 'عمليتنا الإبداعية',
    designPhilosophy: 'فلسفة التصميم',
    designQuote: '"التصميم ليس مجرد كيف يبدو أو كيف تشعر به. التصميم هو كيف يفرض حضوره في المكان."',
    designDesc: 'كل منحنى، كل ملمس، وكل لون يتم اختياره داخل الاستوديو الخاص بنا يخضع لتدقيق إبداعي صارم. سواء كنا نصمم حقيبة مدرسية مستقبلية أو عقدًا من الألماس، فنحن نطالب بالكمال في التقديم.',
    brandStory: 'قصة العلامة التجارية',
    brandStory1: 'تأسست إم بي ستوديو على مبادئ الفخامة غير الاعتذارية والفن الطليعي، وبرزت كمنارة للتميز الإبداعي. نحن لسنا مقيدين بأعراف المواسم أو الاتجاهات؛ بل نحن من نحددها.',
    brandStory2: 'بدأت رحلتنا برؤية فريدة: وهي تنظيم المساحات والمفاهيم حيث يكون التصميم المتميز هو اللغة العالمية. اليوم، تمتد محافظنا لتشمل الأزياء الراقية، المجوهرات الرائعة، الأحذية ذات الرؤية المستقبلية، وأكثر من ذلك، كل منها يمثل شهادة على الأناقة الخالدة.',
    visionText: 'أن نكون القمة العالمية للتصميم الإبداعي، حيث يتحدى كل مفهوم وُلد في إم بي ستوديو حدود ما هو ممكن في الجماليات الفاخرة.',
    missionText: 'تصور وتكرار وصياغة مجموعات باستمرار تلهم أقراننا وتسحر جمهورنا، مع تقديم معيار لا يقبل المساومة من التميز البصري.',
    ourVision: 'رؤيتنا:',
    ourMission: 'مهمتنا:',
    contactUs: 'تواصل مع إم بي ستوديو',
    send: 'إرسال الرسالة',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    businessHours: 'ساعات العمل',
    explore: 'استكشف المجموعة',
    collection: 'مجموعة',
    studioDetails: 'تفاصيل الاستوديو',
    location: 'الموقع',
    phone: 'الهاتف وواتساب',
    socialConnect: 'التواصل الاجتماعي',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    allRightsReserved: 'إم بي ستوديو. جميع الحقوق محفوظة.',
    mapPlaceholder: 'عنصر واجهة خريطة تفاعلية',
    mondayFriday: 'الاثنين - الجمعة',
    saturday: 'السبت',
    sunday: 'الأحد',
    closed: 'مغلق',
    mens_shoes: "أحذية رجالية",
    womens_shoes: "أحذية نسائية",
    kids_shoes: "أحذية أطفال",
    mens_fashion: "أزياء رجالية",
    womens_fashion: "أزياء نسائية",
    kids_fashion: "أزياء أطفال",
    mens_bags: "حقائب رجالية",
    womens_bags: "حقائب نسائية",
    kids_bags: "حقائب أطفال",
    school_backpacks: "حقائب مدرسية",
    mens_perfume: "عطور رجالية",
    womens_perfume: "عطور نسائية",
    kids_perfume: "عطور أطفال",
    womens_jewelry: "مجوهرات نسائية",
    mens_watches: "ساعات رجالية",
    kids_accessories: "إكسسوارات أطفال",
    videos: "فيديوهات",
    all_videos: "كل الفيديوهات",
    adminLogin: "تسجيل الدخول للإدارة",
    adminDashboard: "لوحة تحكم الإدارة",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    manageCategories: "إدارة الأقسام",
    manageDesigns: "إدارة الصور والتصاميم",
    uploadDesign: "رفع صورة جديدة",
    title: "العنوان",
    image: "الصورة",
    visibility: "حالة الظهور",
    hidden: "مخفي",
    visible: "ظاهر",
    save: "حفظ التعديلات",
    delete: "حذف",
    edit: "تعديل",
    addCategory: "إضافة قسم جديد",
    categoryEn: "اسم القسم (إنجليزي)",
    categoryAr: "اسم القسم (عربي)",
    selectCategory: "اختر القسم",
    order: "الترتيب",
    backToSite: "العودة للموقع"
  }
};

type TransKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: TransKey) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ar');

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: TransKey) => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
};
