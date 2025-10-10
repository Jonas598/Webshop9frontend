import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProductCard() {
  return (
    <Card className="w-full max-w-sm ">
        <div className="m-auto">
        <img className="h-[150px] w-[250px]" src="src/assets/product.png" alt="" />
        </div>
        <div className="m-5">
        <h2 className="font-bold">Sunflower Seeds</h2>
        <h4 className="text-sm"><sup>250 grams</sup></h4>
        <h3 className="text-md">A dried Sunflower seeds</h3>
        <h4 className="font-bold">€ 2.99</h4>
        </div>
    </Card> 
  )
}
