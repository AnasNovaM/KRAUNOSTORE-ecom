export type Pillar = 'Work' | 'Recover' | 'Rest';
export type StockStatus = 'in' | 'low' | 'sold';

export interface Product {
  id: string;
  name: string;
  pillar: Pillar;
  price: number;
  was: number | null;
  tag: string | null;
  blurb: string;
  detail: string;
  stock: StockStatus;
  specs: string[];
  bg: string;
  shape: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'lp-04', name: 'Lumbar pillow', pillar: 'Work', price: 89, was: null, tag: 'New',
    blurb: 'Holds the curve of your lower back where the chair forgot to.',
    detail: 'Memory foam, breathable cover, the only one we tested that didn’t flatten by month three.',
    stock: 'in', specs: ['Memory foam', 'Breathable mesh cover', '14 × 10 × 4 in', '1.4 lb'],
    bg: '#EBE5D9', shape: 'lumbar',
  },
  {
    id: 'sc-02', name: 'Seat cushion', pillar: 'Work', price: 119, was: 139, tag: '−20%',
    blurb: 'Distributes pressure so your tailbone stops keeping score.',
    detail: 'Coccyx cutout. Gel-infused memory foam. Non-slip base.',
    stock: 'in', specs: ['Gel + memory foam', 'Coccyx cutout', '18 × 14 × 3 in', '2.1 lb'],
    bg: '#DED7C8', shape: 'cushion',
  },
  {
    id: 'vm-01', name: 'Vertical mouse', pillar: 'Work', price: 69, was: null, tag: null,
    blurb: 'Your forearm prefers a handshake to a press-down.',
    detail: '57° angle. Programmable. Two-week battery on a single charge.',
    stock: 'low', specs: ['Wireless 2.4 GHz + BT', '57° ergonomic angle', '4000 DPI', '14-day battery'],
    bg: '#EBE5D9', shape: 'mouse',
  },
  {
    id: 'la-03', name: 'Monitor arm', pillar: 'Work', price: 189, was: null, tag: null,
    blurb: 'Lifts the screen to your eyes. Not your eyes to the screen.',
    detail: 'Gas spring. 17–32 in monitors. Reclaims the desk.',
    stock: 'in', specs: ['Gas spring', '17–32 in displays', 'Up to 19 lb', 'Cable channel'],
    bg: '#DED7C8', shape: 'arm',
  },
  {
    id: 'bl-05', name: 'Blue light glasses', pillar: 'Work', price: 49, was: null, tag: null,
    blurb: 'Less screen, more sleep. Not magic. Just measured filtration.',
    detail: 'Acetate frame. 40% filtration in the 380–440 nm range.',
    stock: 'in', specs: ['Acetate frame', '40% filtration', '380–440 nm', 'Hard case'],
    bg: '#EBE5D9', shape: 'glasses',
  },
  {
    id: 'mg-07', name: 'Massage gun', pillar: 'Recover', price: 219, was: null, tag: null,
    blurb: 'Six speeds. Four heads. The one we kept after testing nineteen.',
    detail: '60 lb peak force. Brushless motor. Quiet at every setting.',
    stock: 'in', specs: ['6 speeds', '4 attachments', '60 lb force', '6 hr battery'],
    bg: '#C8D0BF', shape: 'gun',
  },
  {
    id: 'am-08', name: 'Acupressure mat', pillar: 'Recover', price: 59, was: null, tag: null,
    blurb: 'Twenty minutes a day, your back will know the difference.',
    detail: '6,200 spikes. Linen surface. Coconut-fiber fill.',
    stock: 'in', specs: ['6,200 spikes', 'Linen + coconut fill', '29 × 17 in', 'Carry strap'],
    bg: '#C8D0BF', shape: 'mat',
  },
  {
    id: 'hp-09', name: 'Heating pad', pillar: 'Recover', price: 79, was: null, tag: 'New',
    blurb: 'Weighted. Microplush. The one that actually stays on a shoulder.',
    detail: '6 heat levels. Auto-off at 90 min. Machine washable.',
    stock: 'in', specs: ['6 heat levels', '20 × 24 in', 'Auto-off 90 min', 'Washable'],
    bg: '#C8D0BF', shape: 'pad',
  },
  {
    id: 'sm-11', name: 'Sleep mask', pillar: 'Rest', price: 34, was: null, tag: null,
    blurb: 'Contoured cups. No pressure on the lashes. Zero light leak.',
    detail: 'Memory foam contour. Mulberry silk. Adjustable strap.',
    stock: 'in', specs: ['Mulberry silk', 'Memory foam contour', 'Adjustable', '1.4 oz'],
    bg: '#B8B5AB', shape: 'mask',
  },
  {
    id: 'wn-12', name: 'White noise machine', pillar: 'Rest', price: 89, was: null, tag: null,
    blurb: 'Twenty-six sounds. None of them ocean cliché.',
    detail: 'Continuous, loop-free audio. Timer. Sleep light.',
    stock: 'low', specs: ['26 sounds', 'Continuous audio', 'Sleep timer', 'Warm sleep light'],
    bg: '#B8B5AB', shape: 'speaker',
  },
  {
    id: 'wb-13', name: 'Weighted blanket', pillar: 'Rest', price: 159, was: null, tag: null,
    blurb: 'Glass beads, evenly distributed. The 15-lb version is the one.',
    detail: 'Cotton shell. 15 lb. Removable bamboo cover.',
    stock: 'in', specs: ['Glass beads', '15 lb / 48 × 72 in', 'Cotton shell', 'Bamboo cover'],
    bg: '#B8B5AB', shape: 'blanket',
  },
  {
    id: 'ad-15', name: 'Aromatherapy diffuser', pillar: 'Rest', price: 64, was: null, tag: null,
    blurb: 'Ceramic. Quiet. Three hours of fine mist, then it stops.',
    detail: 'Ceramic body. Ultrasonic. Auto-off when dry.',
    stock: 'sold', specs: ['Ceramic body', '300 mL', '3 hr runtime', 'Auto-off'],
    bg: '#B8B5AB', shape: 'diffuser',
  },
];
