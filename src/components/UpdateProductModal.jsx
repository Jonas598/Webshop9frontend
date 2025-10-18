import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";

import allContext from "../contexts/allContext";
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

const UpdateProductModal = (props) => {
  const context = useContext(allContext);
  const { updateProduct } = context;
  const { product } = props;
  const [tempProductInfo, setTempProductInfo] = useState({
    id: product._id,
    name: product.name,
    desc: product.desc,
    // weight: product.weight,
    price: product.price,
    avl_peices: product.avl_peices,
    productId:product.productId
  });

  const handleOnChange = (e) => {
    setTempProductInfo({
      ...tempProductInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Dialog>
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
                value={tempProductInfo.name}
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
                value={tempProductInfo.desc}
                onChange={handleOnChange}
                type="text"
                required
              />
            </div>
          </div>

          <div className="*:not-first:mt-2">
            <Label htmlFor={`productId`}>productId</Label>
            <Input
              id={`productId`}
              name="productId"
              className="peer pe-9"
              type="text"
              placeholder="Enter ProductId"
              value={tempProductInfo.productId}
              onChange={handleOnChange}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`price`}>Price (€ in euros )</Label>
            <Input
              id={`price`}
              name="price"
              placeholder="Enter Product Price"
              value={tempProductInfo.price}
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
              value={tempProductInfo.avl_peices}
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
            <Button
              onClick={() => {
                updateProduct(tempProductInfo);
                window.location.reload(false);
              }}
              type="button"
            >
              Update Product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
