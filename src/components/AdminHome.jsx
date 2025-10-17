import React from "react";
import { Card } from "@/components/ui/card";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateProductModal from "./UpdateProductModal";

const AdminHome = () => {
  const navigate = useNavigate(); // useNavigate ist schon da, perfekt!
  const context = useContext(allContext);
  const { fetchAllProducts, fetchedAllProducts, addProduct, deleteProduct } =
    context;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [productInfo, setProductInfo] = useState({
    name: "",
    desc: "",
    weight: 0,
    price: 0,
    avl_peices: 0,
  });

  const handleOnChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // Hinweis: window.alert() ist oft keine gute User Experience.
    // Ein Dialog-Fenster wäre hier schöner.
    if (productInfo.name.length < 3) {
      alert("Name Should Be More than 2 Characters");
    } else if (productInfo.desc.length < 5) {
      alert("Description Should Be 5 Characters or More!!");
    } else if (productInfo.weight == 0) {
      alert("Weight can't be Empty");
    } else if (productInfo.price == 0) {
      alert("Price can't be Empty");
    } else if (productInfo.avl_peices == 0) {
      alert("Quantity can't be Empty");
    } else {
      await addProduct(productInfo);
      window.location.reload(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      <h1 className="text-center text-4xl font-bold mb-8">ADMIN CONTROL PANEL</h1>

      {/* 1. Ein Container für die Haupt-Aktionsbuttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {/* Button zum Hinzufügen von Produkten (wie bisher) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-lg p-6 rounded-xl">
              + Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg">
            <DialogHeader className="contents">
              <DialogTitle className="border-b px-6 py-4 text-base">
                Add Product
              </DialogTitle>
            </DialogHeader>
            <div className="p-8 flex flex-col gap-4">
              {/* --- Formular-Felder hier --- */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter Product Name" value={productInfo.name} type="text" onChange={handleOnChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" name="desc" placeholder="Enter Product Description" value={productInfo.desc} onChange={handleOnChange} type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (in grams)</Label>
                <Input id="weight" name="weight" type="number" min="0" placeholder="Enter Product Weight" value={productInfo.weight} onChange={handleOnChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (€)</Label>
                <Input id="price" name="price" placeholder="Enter Product Price" value={productInfo.price} onChange={handleOnChange} type="number" min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avl_peices">Quantity</Label>
                <Input id="avl_peices" name="avl_peices" placeholder="Enter Product Quantity" value={productInfo.avl_peices} onChange={handleOnChange} type="number" min="0" />
              </div>
            </div>
            <DialogFooter className="border-t px-6 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleClick} type="button">Add Product</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 2. Der neue Button für die Error Logs */}
        <Button
          variant="outline"
          className="text-lg p-6 rounded-xl"
          onClick={() => navigate('/admin/logs')}
        >
          Show Error Logs
        </Button>
      </div>

      {/* HIER IST DIE ÄNDERUNG: lg:grid-cols-3 wurde entfernt */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fetchedAllProducts.map((product) => {
          return (
            <Card key={product._id}>
              <div className="flex flex-col p-4">
                <img
                  className="h-40 w-full object-contain mb-4"
                  src="/assets/product.png" // Stelle sicher, dass dieses Bild im public-Ordner liegt
                  alt={product.name}
                />
                <div className="flex-grow">
                  <h2 className="font-bold text-xl">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.weight} grams</p>
                  <p className="text-md my-2">{product.desc}</p>
                  <p className="font-bold text-lg">€ {product.price}</p>
                  <p className="text-green-700 font-semibold">{product.avl_peices} pieces left!</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <UpdateProductModal product={product} />
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      // Besser als window.confirm wäre auch hier ein Dialog
                      const confirmed = window.confirm(
                        `Are you sure you want to delete ${product.name}?`
                      );
                      if (confirmed) {
                        await deleteProduct(product._id);
                        window.location.reload(false);
                      }
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminHome;

