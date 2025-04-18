import { CartItem } from "@/types/product.types";

export const newBrands: CartItem[] = [
    {
      id: 1,
      name: "Cetirizine 10mg",
      manufacturer: "Sun Pharma",
      pricePerUnit: 90,
      image: "/hero/cetirizine.png",
      stock: "In Stock",
      expiryDate: "12/2025",
      isNew : true,
      perecentage : 50,
      category: "Antihistamine",
      offers: {
        type: "discount",
        description: "18% off on all antihistamines"
      }
    },
    {
      id: 2,
      name: "Metformin 500mg",
      manufacturer: "Cipla",
      pricePerUnit: 150,
      isNew : true,
      perecentage : 50,
      image: "/hero/metformin.png",
      stock: "In Stock",
      expiryDate: "05/2026",
      category: "Diabetes Medication",
      offers: {
        type: "discount",
        description: "12% off on diabetes care"
      }
    },
    {
      id: 3,
      name: "Atorvastatin 20mg",
      image: "/hero/atorvastatin.png",
      manufacturer: "Dr. Reddy's",
      pricePerUnit: 200,
      isNew : true,
      perecentage : 50,
      stock: "Limited Stock",
      expiryDate: "08/2025",
      category: "Cholesterol Medication",
      offers: {
        type: "combo",
        description: "Buy 2 get 1 free"
      }
    },
    {
      id: 4,
      name: "Salbutamol Inhaler",
      image: "/hero/salbutamol.png",
      manufacturer: "GSK",
      pricePerUnit: 300,
      isNew : true,
      stock: "In Stock",
      perecentage : 50,
      expiryDate: "03/2026",
      category: "Asthma Medication",
      offers: {
        type: "discount",
        description: "30% off on respiratory products"
      }
    },
    {
      id: 5,
      name: "Shelcal 500 mg - Calcium Supplement",
      image: "/hero/shelcal.png",
      manufacturer: "Elder Pharmaceuticals",
      pricePerUnit: 135,
      isNew : true,
      stock: "In Stock",
      expiryDate: "11/2025",
      perecentage : 50,
      category: "Vitamins & Supplements",
      offers: {
        type: "discount",
        description: "6% off on supplements"
      }
    },
    {
      id: 6,
      name: "Karela Jamun Juice - Blood Sugar Support",
      image: "/hero/oil.png",
      manufacturer: "Dabur",
      pricePerUnit: 135,
      isNew : true,
      stock: "In Stock",
      expiryDate: "09/2025",
      perecentage : 50,
      category: "Ayurvedic & Herbal",
      offers: {
        type: "discount",
        description: "6% off on ayurvedic products"
      }
    },
    {
      id: 7,
      name: "Abzorb Dusting Powder - Antifungal Skin Care",
      image: "/hero/skincare-powder.png",
      manufacturer: "Himalaya",
      pricePerUnit: 135,
      stock: "In Stock",
      isNew : true,
      expiryDate: "07/2026",
      category: "Skin Care",
      perecentage : 50,
      offers: {
        type: "discount",
        description: "6% off on skincare"
      }
    }
  ];


 export  const Orders = [
    {
      id: '#ORD-7829',
      retailer: 'MediCare Pharmacy',
      avatarFallback: 'MC',
      date: 'Today, 10:30 AM',
      amount: '₹8,450',
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    {
      id: '#ORD-7828',
      retailer: 'HealthPlus Medical',
      avatarFallback: 'HP',
      date: 'Today, 9:15 AM',
      amount: '₹12,200',
      status: 'Processing',
      statusClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    {
      id: '#ORD-7827',
      retailer: 'Wellness Corner',
      avatarFallback: 'WC',
      date: 'Yesterday, 4:45 PM',
      amount: '₹5,780',
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    {
      id: '#ORD-7826',
      retailer: 'LifeMed Stores',
      avatarFallback: 'LM',
      date: 'Yesterday, 2:30 PM',
      amount: '₹9,350',
      status: 'Pending',
      statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    },
    {
      id: '#ORD-7825',
      retailer: 'City Pharmacy',
      avatarFallback: 'CP',
      date: 'Yesterday, 11:20 AM',
      amount: '₹6,720',
      status: 'Delivered',
      statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
  ];
  