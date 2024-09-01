'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import Image from 'next/image';
import { Trash2Icon } from 'lucide-react';
import MultiText from './Multitext';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"

interface AddProductFormProps{
  createProduct: (data:FormData) => Promise<any> ;

}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(5500).trim(),
  images: z.array(z.instanceof(File)).optional(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  category: z.string(),
});

const AddProductForm = ({createProduct}:AddProductFormProps) => {
  const { toast } = useToast()
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      colors: [],
      sizes: [],
      price: 0,
      stock: 0,
      category: "",
    },
  });

  const handleImagesChange = (files: FileList | null) => {
    if (files) {
      const filesArray = Array.from(files);
      const previewUrls = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
      form.setValue('images', [...form.getValues('images'), ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    form.setValue('images', form.getValues('images').filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {

  
    
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      name: values.name,
      description: values.description,

    }));

    values.images?.forEach((image, index) => {
      formData.append(`files.images`, image);
    });

    try {
    const result = await createProduct(formData);
      toast({
          title: "Product Created",
          description: "Add more product",
        })

  } catch (error) {
    toast({
          variant: "destructive",
          title: "Failed to create product:",
          description: "Retry",
        })
  }

  }

  return (
    <div className='flex flex-col p-6 gap-5 '>
      <div>
        <h2 className="font-bold text-xl">Fill the product details to upload an item</h2>
      </div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='lg:flex flex-row w-full lg:space-x-3 gap-3'>
            <FormField
            control={form.control}
            name="price"
            
            render={({ field }) => (
              <FormItem  className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                 <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem  className="flex-1">
                <FormLabel>No. of Stock</FormLabel>
                <FormControl>
                 <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem  className="flex-1">
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="XL"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem  className="flex-1">
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>
          
            <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="children">Children</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Controller
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImagesChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    width={24}
                    height={24}
                    src={preview}
                    alt={`Image preview ${index + 1}`}
                    className="w-32 h-32 object-cover"
                  />
                  <Button
                    variant="destructive"
                    className="absolute top-1 right-1 text-white p-1 bg-red-500"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2Icon/>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className='flex justify-center items-center space-x-3'>
            <Button type="submit" className='bg-black text-white p-2 lg:p-4 lg:text-xl'>Submit</Button>
           <Link href="/admin/products"> <Button className='bg-red-500 lg:p-4  text-white lg:text-xl p-2'>Discard</Button></Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
