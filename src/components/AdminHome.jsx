import React from "react";
import { Card } from "@/components/ui/card";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";
import product from "/assets/product.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateProductModal from "./UpdateProductModal";

const AdminHome = () => {
  const navigate = useNavigate();
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

  if (!localStorage.getItem("webshopAuthtoken")) {
    navigate("/");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (productInfo.name.length < 3) {
      alert("name Should Be More than 2 Charecters");
    } else if (productInfo.desc.length < 5) {
      alert("Description Should Be 5 Charecters or More oi !!");
    } else if (productInfo.weight == 0) {
      alert("Weight can't be Empty");
    } else if (productInfo.price == 0) {
      alert("price can't be Empty");
    } else if (productInfo.avl_peices == 0) {
      alert("Quantity can't be Empty");
    } else {
      await addProduct(productInfo);
      window.location.reload(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-center text-4xl font-bold ">ADMIN CONTROL PANEL</h1>
      {/* <Button className="mt-15 text-2xl p-8 rounded-2xl">
        + Add New Product
      </Button> */}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-15 text-2xl p-8 rounded-2xl">
            + Add New Product
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-4 text-base">
              Add Product
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`name`}>Name</Label>
                <Input
                  id={`name`}
                  name="name"
                  placeholder="Enter Product Name"
                  value={productInfo.name}
                  type="text"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`desc`}>Description</Label>
              <div className="relative">
                <Input
                  id={`desc`}
                  name="desc"
                  className="peer pe-9"
                  placeholder="Enter Product Description"
                  value={productInfo.desc}
                  onChange={handleOnChange}
                  type="text"
                  required
                />
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor={`weight`}>Weight (in grams)</Label>
              <Input
                id={`weight`}
                name="weight"
                className="peer pe-9"
                type="number"
                min="0"
                placeholder="Enter Product Weight"
                value={productInfo.weight}
                onChange={handleOnChange}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`price`}>Price (€ in euros )</Label>
              <Input
                id={`price`}
                name="price"
                placeholder="Enter Product Price"
                value={productInfo.price}
                onChange={handleOnChange}
                type="number"
                min="0"
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`avl_peices`}>Quantity </Label>
              <Input
                id={`avl_peices`}
                name="avl_peices"
                placeholder="Enter Product Quantity"
                value={productInfo.avl_peices}
                onChange={handleOnChange}
                type="number"
                min="0"
              />
            </div>
          </div>
          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleClick} type="button">
                Add Product
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="m-4 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {
        fetchedAllProducts.map((product) => {

          return (
            <Card key={product._id} className="  ">
              <div className="flex gap-4 items-center py-2 px-6 ">
                <div className="m-auto">
                  <img
                    className="  h-[80px] w-[120px]"
                    src="/assets/product.png"
                    alt=""
                  />
                </div>
                <div className="">
                  <h2 className="font-bold">{product.name}</h2>
                  <h4 className="text-sm">
                    <sup>{product.weight} grams</sup>
                  </h4>
                  <h3 className="text-md">{product.desc}</h3>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">€ {product.price}</h4>
                  </div>
                  <h4 className="">
                    <sup className="text-green-700 font-semibold">
                      {product.avl_peices} peices left !
                    </sup>
                  </h4>
                </div>
                <div className="flex flex-col gap-3">
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button>UPDATE</Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                      <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="border-b px-6 py-4 text-base">
                          Update Product
                        </DialogTitle>
                      </DialogHeader>
                      <div className="p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor={`name`}>Name</Label>
                            <Input
                              id={`name`}
                              name="name"
                              placeholder="Enter Product Name"
                              value={product.name}
                              type="text"
                              onChange={(e) => {
                                product.name = e.target.value;
                              }}
                            />
                          </div>
                        </div>
                        <div className="*:not-first:mt-2">
                          <Label htmlFor={`desc`}>Description</Label>
                          <div className="relative">
                            <Input
                              id={`desc`}
                              name="desc"
                              className="peer pe-9"
                              placeholder="Enter Product Description"
                              value={product.desc}
                              onChange={handleOnChange}
                              type="text"
                              required
                            />
                          </div>
                        </div>

                        <div className="*:not-first:mt-2">
                          <Label htmlFor={`weight`}>Weight (in grams)</Label>
                          <Input
                            id={`weight`}
                            name="weight"
                            className="peer pe-9"
                            type="number"
                            min="0"
                            placeholder="Enter Product Weight"
                            value={product.weight}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className="*:not-first:mt-2">
                          <Label htmlFor={`price`}>Price (€ in euros )</Label>
                          <Input
                            id={`price`}
                            name="price"
                            placeholder="Enter Product Price"
                            value={product.price}
                            onChange={handleOnChange}
                            type="number"
                            min="0"
                          />
                        </div>
                        <div className="*:not-first:mt-2">
                          <Label htmlFor={`avl_peices`}>Quantity </Label>
                          <Input
                            id={`avl_peices`}
                            name="avl_peices"
                            placeholder="Enter Product Quantity"
                            value={product.avl_peices}
                            onChange={handleOnChange}
                            type="number"
                            min="0"
                          />
                        </div>
                      </div>
                      <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={""} type="button">
                            Update Product
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog> */}
                  <UpdateProductModal product={product}/>
                  <Button
                    onClick={async () => {
                      const confirm = window.confirm(
                        `Are you sure, you want to delete ${product.name}`
                      );
                      if (confirm) {
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
