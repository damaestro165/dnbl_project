import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icon from './DynamicIcon'


const StatsCard = () => {
  return (
        <Card className="pt-3 h-fit rounded-xl w-full mr-4 ">
            <CardContent className="flex justify-between pt-2 ">
                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-gray-500'>REVENUES</p>
                    <p className='font-bold text-xl xl:text-2xl mt-5'>$ 3,503.26</p>
                    <p className='text-sm text-gray-500'><span>+6.50%</span>since last month</p>
                </div>
                <div className='xl:p-2 bg-green-400 rounded-md h-fit'>
                    <Icon name='CircleDollarSign' color="white" />
                </div>
            </CardContent>
            
    </Card>

  )
}

export default StatsCard