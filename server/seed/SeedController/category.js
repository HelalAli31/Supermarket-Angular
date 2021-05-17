const categoryModel = require("../../models/categorySchema");

async function insertCategoryToDB() {
  try {
    const resultFind = await categoryModel.find();
    if (resultFind.length) return;
    const result = await categoryModel.insertMany(getCategorysData());
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    process.exit(0);
  }
}

function getCategorysData() {
  return [
    {
      name: "milks$dairy",
    },
    {
      name: "meats",
    },
    {
      name: "brids",
    },
    {
      name: "snacks",
    },
  ];
}

module.exports = { insertCategoryToDB };
