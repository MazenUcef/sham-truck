export const Images = {
  logo: require("@/assets/images/global/trucklogo.png"),
  car1: require("@/assets/images/Auth/car1.png"),
  car2: require("@/assets/images/Auth/car2.png"),
  car3: require("@/assets/images/Auth/car3.png"),
  car4: require("@/assets/images/Auth/car4.png"),
  emptyImg: require("@/assets/images/driver/emptyimg.png"),
  userImg: require("@/assets/images/driver/userImg.png"),
  man: require("@/assets/images/user/man.png"),
  emtyOffers: require("@/assets/images/user/rafiki.png"),
  check: require("@/assets/images/user/ckeck.png"),
};


export const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month) => ({
  value: month,
  label: month,
}));
export const years = Array.from({ length: 100 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
).map((year) => ({
  value: year,
  label: year,
}));


export const vehicleMockData = [
  {
    id: 1,
    type: 'سيارة صغيرة',
    category: 'عادية',
    description: 'سيارة صغيرة الحجم مناسبة للشحنات الخفيفة',
    image: Images.car1,
    capacity: 'حتى 500 كجم',
    dimensions: '3.5م × 1.5م × 1.5م'
  },
  {
    id: 2,
    type: 'سيارة كبيرة',
    category: 'عادية',
    description: 'سيارة كبيرة الحجم مناسبة للشحنات المتوسطة',
    image: Images.car2,
    capacity: 'حتى 1000 كجم',
    dimensions: '4.5م × 1.8م × 1.8م'
  },
  {
    id: 3,
    type: 'دراجة نارية',
    category: 'عادية',
    description: 'مناسبة للطرقات الضيقة والشحنات الصغيرة السريعة',
    image: Images.car3,
    capacity: 'حتى 50 كجم',
    dimensions: '2م × 0.8م × 0.8م'
  },
  {
    id: 4,
    type: 'شاحنة صغيرة',
    category: 'مغلقة',
    description: 'شاحنة مغلقة صغيرة الحجم لحماية البضائع',
    image: Images.car4,
    capacity: 'حتى 1500 كجم',
    dimensions: '5م × 2م × 2م'
  },
  {
    id: 5,
    type: 'شاحنة كبيرة',
    category: 'مغلقة',
    description: 'شاحنة مغلقة كبيرة الحجم للشحنات الكبيرة',
    image: Images.car1,
    capacity: 'حتى 3000 كجم',
    dimensions: '7م × 2.5م × 2.5م'
  },
  {
    id: 6,
    type: 'فان',
    category: 'مغلقة',
    description: 'مركبة متوسطة الحجم مناسبة للبضائع المتوسطة',
    image: Images.car2,
    capacity: 'حتى 2000 كجم',
    dimensions: '4.5م × 2م × 2م'
  },
  {
    id: 7,
    type: 'شاحنة تبريد صغيرة',
    category: 'مبردة',
    description: 'شاحنة تبريد صغيرة للمواد الغذائية',
    image: Images.car3,
    capacity: 'حتى 1000 كجم',
    dimensions: '4م × 2م × 2م',
    temperatureRange: '0°C إلى 4°C'
  },
  {
    id: 8,
    type: 'شاحنة تبريد كبيرة',
    category: 'مبردة',
    description: 'شاحنة تبريد كبيرة للمواد الغذائية بكميات كبيرة',
    image: Images.car4,
    capacity: 'حتى 2500 كجم',
    dimensions: '6م × 2.5م × 2.5م',
    temperatureRange: '-18°C إلى 4°C'
  }
];




// Syrian cities dataset
export const SYRIAN_CITIES = [
  "حلب",
  "دمشق",
  "حمص",
  "حماة",
  "اللاذقية",
  "دير الزور",
  "الرقة",
  "إدلب",
  "طرطوس",
  "الحسكة",
  "القامشلي",
  "درعا",
  "السويداء",
  "ريف دمشق",
];



export const mockOrders = [
  {
    id: 1,
    from: "13 ش الكورنيش، حلب، سوريا",
    to: "7 ش التربوي، دمشق، سوريا",
    weight: "1.5 طن",
    dateTime: "17:00 - 25/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  },
  {
    id: 2,
    from: "شارع الجمهورية، حمص، سوريا",
    to: "شارع الثورة، اللاذقية، سوريا",
    weight: "2.0 طن",
    dateTime: "14:00 - 26/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  },
  {
    id: 3,
    from: "شارع بغداد، دمشق، سوريا",
    to: "شارع النيل، دير الزور، سوريا",
    weight: "1.8 طن",
    dateTime: "15:30 - 27/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  },
  {
    id: 4,
    from: "شارع الوحدة، طرطوس، سوريا",
    to: "شارع الشام، حماة، سوريا",
    weight: "2.5 طن",
    dateTime: "10:00 - 28/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  },
  {
    id: 5,
    from: "شارع الرئيسي، إدلب، سوريا",
    to: "شارع الكورنيش، الحسكة، سوريا",
    weight: "1.2 طن",
    dateTime: "12:00 - 29/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  },
];



export const mockOffers = [
  {
    id: 1,
    from: "13 ش الكورنيش، حلب، سوريا",
    to: "7 ش التربوي، دمشق، سوريا",
    weight: "1.5 طن",
    dateTime: "17:00 - 25/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية",
    status:"pending"
  },
  {
    id: 2,
    from: "شارع الجمهورية، حمص، سوريا",
    to: "شارع الثورة، اللاذقية، سوريا",
    weight: "2.0 طن",
    dateTime: "14:00 - 26/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية",
    status:"confirmed"
  },
  {
    id: 3,
    from: "شارع بغداد، دمشق، سوريا",
    to: "شارع النيل، دير الزور، سوريا",
    weight: "1.8 طن",
    dateTime: "15:30 - 27/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية",
    status:"expired"
  },
  {
    id: 4,
    from: "شارع الوحدة، طرطوس، سوريا",
    to: "شارع الشام، حماة، سوريا",
    weight: "2.5 طن",
    dateTime: "10:00 - 28/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية",
    status:"expired"
  },
  {
    id: 5,
    from: "شارع الرئيسي، إدلب، سوريا",
    to: "شارع الكورنيش، الحسكة، سوريا",
    weight: "1.2 طن",
    dateTime: "12:00 - 29/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية",
    status:"expired"
  },
];