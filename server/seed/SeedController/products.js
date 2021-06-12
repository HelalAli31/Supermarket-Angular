const productModel = require("../../models/productSchema");

async function insertProductsToDB() {
  try {
    const resultFind = await productModel.find();

    if (resultFind.length) return;
    const result = await productModel.insertMany(getProductsData());
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    // process.exit(0);
  }
}

function getProductsData() {
  return [
    {
      title: "eggs",
      type: "milk&dairy",
      description: "Raw organic  eggs in a basket",
      filename: "02.jpg",
      price: 12.1,
      category: "6091d3f715858c0954951891",
    },
    {
      title: "sweet fresh stawberry",
      type: "fruit",
      description: "Sweet fresh stawberry on the wooden table",
      filename: "1.jpg",
      price: 5.9,
      category: "6091d3f715858c0954951892",
    },
    {
      title: "banana",
      type: "fruit",
      description: "banana ",
      filename: "2.jpg",
      price: 7.95,
      category: "6091d3f715858c0954951892",
    },
    {
      title: "green smoothie",
      type: "dairy",
      description: "sweet green apple",
      filename: "3.jpg",
      price: 7.5,
      category: "6091d3f715858c0954951892",
    },
    {
      title: "tnuva milk",
      type: "milk&dairy",
      description: "1.5 l tnuva",
      filename: "4.jpg",
      price: 9.9,
      category: "6091d3f715858c0954951891",
    },
    {
      title: "Catit oil",
      type: "oil",
      description: "classic catit oil",
      filename: "5.jpg",
      price: 31,
      category: "60b760d11d171f1730fc5504",
    },
    {
      title: "Ausem pesto",
      type: "pesto",
      description: "Italian traditional pesto, chesse and oil",
      filename: "6.jpg",
      price: 18.19,
      category: "60b75e751d171f1730fc5502",
    },
    {
      title: "chocolate milka",
      type: "chocolate",
      description: "chocolate milka 250 gr",
      filename: "7.jpg",
      price: 8.9,
      category: "60b760a41d171f1730fc5503",
    },
    {
      title: "peach",
      type: "fruit",
      description: "Sweet peach",
      filename: "8.jpg",
      price: 9.5,
      category: "6091d3f715858c0954951892",
    },
    {
      title: "Muler delicacy",
      type: "milk&dairy",
      description: "150 gr 3%",
      filename: "9.jpg",
      price: 7.8,
      category: "6091d3f715858c0954951891",
    },
    {
      title: "berman bread",
      type: "bakery",
      description: "berman bread 39 calories",
      filename: "10.jpg",
      price: 15.8,
      category: "6091d3f715858c0954951893",
    },
    {
      title: "angel bread",
      type: "bakery",
      description: "720gr ",
      filename: "11.jpg",
      price: 14.7,
      category: "6091d3f715858c0954951893",
    },
    {
      title: "yarden wine",
      type: "wine",
      description: "sweet wine 750ml",
      filename: "12.jpg",
      price: 24.9,
      category: "60b7611a1d171f1730fc5505",
    },
    {
      title: "fernet wine",
      type: "wine",
      description: "1l",
      filename: "13.jpg",
      price: 13.9,
      category: "60b7611a1d171f1730fc5505",
    },
    {
      title: "galil",
      type: "wine",
      description: "1l",
      filename: "14.jpg",
      price: 28.79,
      category: "60b7611a1d171f1730fc5505",
    },
    {
      title: "augy cornflakes",
      type: "snacks",
      description: "750gr",
      filename: "15.jpg",
      price: 20.31,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "lion cornflakes",
      type: "snacks",
      description: "750gr",
      filename: "16.jpg",
      price: 14.18,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "crunch",
      type: "snacks",
      description: "200gr",
      filename: "17.jpg",
      price: 9.9,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "chetos",
      type: "snacks",
      description: "20x10",
      filename: "18.jpg",
      price: 12.8,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "farfela barilla pesto",
      type: "pesto",
      description: "500gr",
      filename: "19.jpg",
      price: 7.5,
      category: "60b75e751d171f1730fc5502",
    },
    {
      title: "8 ausem pesto",
      type: "pesto",
      description: "500gr",
      filename: "20.jpg",
      price: 4.9,
      category: "60b75e751d171f1730fc5502",
    },
    {
      title: "twix mini ",
      type: "snacks",
      description: "403gr",
      filename: "21.jpg",
      price: 20,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "snickers",
      type: "snacks",
      description: "403gr",
      filename: "22.jpg",
      price: 13,
      category: "6091d3f715858c0954951894",
    },
    {
      title: "borges oil",
      type: "oil",
      description: "1l",
      filename: "23.jpg",
      price: 17.9,
      category: "60b760d11d171f1730fc5504",
    },
    {
      title: "chocolate click",
      type: "chocolate",
      description: "100gr",
      filename: "24.jpg",
      price: 4.9,
      category: "60b760a41d171f1730fc5503",
    },
    {
      title: "versace perfume",
      type: "perfume",
      description: "90ml",
      filename: "25.jpg",
      price: 120.9,
      category: "60b7632e1c8b4c08d04b2675",
    },
    {
      title: "pnina rosenblum",
      type: "perfume",
      description: "1kg",
      filename: "26.jpg",
      price: 26.9,
      category: "60b7632e1c8b4c08d04b2675",
    },
    {
      title: "barace tehina",
      type: "yeast",
      description: "500gr",
      filename: "27.jpg",
      price: 13.9,
      category: "60b77cf5c1fadf31a05e09ab",
    },
    {
      title: "yurshalme tehina",
      type: "yeasts",
      description: "500gr",
      filename: "28.jpg",
      price: 18.5,
      category: "60b77cf5c1fadf31a05e09ab",
    },
    {
      title: "tabuzena orange",
      type: "drinks",
      description: "1l ",
      filename: "29.jpg",
      price: 9.9,
      category: "60ba996d2bae2841a4c85873",
    },
    {
      title: "cleaning necol",
      type: "cleaning",
      description: "50 peaces",
      filename: "30.jpg",
      price: 9.9,
      category: "60ba9b8f998f0444c8bb621b",
    },
    {
      title: "detol cleaning",
      type: "cleaning",
      description: "50 peaces",
      filename: "31.jpg",
      price: 9.9,
      category: "60ba9b8f998f0444c8bb621b",
    },
  ];
}

module.exports = { insertProductsToDB };
