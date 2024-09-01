import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const ProductTable = () => {
  return (
    <section className='w-full bg-[#fdfdfd]'>
        <div className='flex justify-between py-3 px-5 items-center'>
            <h2 className='font-bold text-xl'>Product List</h2>
            <div className='flex items-center gap-2'>
                <p>Sort by:</p>
                <Select>
                    <SelectTrigger className="w-28">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Men</SelectItem>
                        <SelectItem value="dark">Women</SelectItem>
                        <SelectItem value="system">Children</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className=' mx-5'>
            <Table className="">
                <TableHeader className=" bg-[#d9d9d9]">
                    <TableRow>
                    <TableHead >Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="">No of Stock</TableHead>
                    <TableHead className="">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="">Sussy</TableCell>
                    <TableCell>$4,500</TableCell>
                    <TableCell>Apr 12, 2023  </TableCell>
                    <TableCell className="">56</TableCell>
                    <TableCell className="">Edit</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="">Sussy</TableCell>
                    <TableCell>$4,500</TableCell>
                    <TableCell>Apr 12, 2023  </TableCell>
                    <TableCell className="">56</TableCell>
                    <TableCell className="">Edit</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell className="">Sussy</TableCell>
                    <TableCell>$4,500</TableCell>
                    <TableCell>Apr 12, 2023  </TableCell>
                    <TableCell className="">56</TableCell>
                    <TableCell className="">Edit</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </section>
  )
}

export default ProductTable