
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");

const productsPath = path.join(__dirname, "..", "data", "products.json");
console.log(productsPath);

const PORT = 3000;
const app = express();

//=================== middleware ===================//
app.use(cors());
app.use(express.json());

//=================== helper functions ===================//
function resFormat({ res, statusCode = 200, message = "Success", data = {} }) {
  return res.status(statusCode).json({ message, data });
}
function errFormat({ res, statusCode = 500, message = "Error", err = {} }) {
  return res.status(statusCode).json({ message, err });
}
async function readProducts() {
  try {
    const data = await fs.promises.readFile(productsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}
async function writeProducts(products) {
  try {
    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
  } catch (err) {
    throw err;
  }
}

//=================== routes ===================//
app.get("/a", (req, res) => {
  res.send("Hello World");
});

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await readProducts();
    resFormat({ res, data: products });
  } catch (err) {
    errFormat({ res, message: "Failed to read products", err: err.message });
  }
});

// GET single product by id
app.get("/products/:id", async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find((p) => p.id === Number(req.params.id));

    if (!product) {
      return errFormat({ res, statusCode: 404, message: "Product not found" });
    }

    resFormat({ res, data: product });
  } catch (err) {
    errFormat({ res, message: "Failed to read product", err: err.message });
  }
});

// POST create new product
app.post("/products", async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;

    if (!name || price === undefined || stock === undefined) {
      return errFormat({
        res,
        statusCode: 400,
        message: "name, price and stock are required",
      });
    }

    const products = await readProducts();

    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name,
      price,
      stock,
      description: description || "",
    };

    products.push(newProduct);
    await writeProducts(products);

    resFormat({ res, statusCode: 201, message: "Product created", data: newProduct });
  } catch (err) {
    errFormat({ res, message: "Failed to create product", err: err.message });
  }
});

// PUT update product
app.put("/products/:id", async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));

    if (index === -1) {
      return errFormat({ res, statusCode: 404, message: "Product not found" });
    }

    products[index] = { ...products[index], ...req.body, id: products[index].id };
    await writeProducts(products);

    resFormat({ res, message: "Product updated", data: products[index] });
  } catch (err) {
    errFormat({ res, message: "Failed to update product", err: err.message });
  }
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));

    if (index === -1) {
      return errFormat({ res, statusCode: 404, message: "Product not found" });
    }

    const deleted = products.splice(index, 1);
    await writeProducts(products);

    resFormat({ res, message: "Product deleted", data: deleted[0] });
  } catch (err) {
    errFormat({ res, message: "Failed to delete product", err: err.message });
  }
});

//=================== Not Found  ===================//
app.all("{/*dummy}", (req, res) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Server is running At http://localhost:${PORT}`);
});




