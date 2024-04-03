import React from 'react'

const obj = [
    {
        type: 'Income',
        color: 'rgb(255, 205, 86)',
        percent: 45
    },
    {
        type: 'Expense',
        color: 'rgb(54, 162, 235)',
        percent: 55
    },
];

export default function Labels() {
  return (
    <>
      {obj.map((value, index) => <LabelComponent key={index} data={value}></LabelComponent>)}
    </>
  )
}

function LabelComponent({ data }) {
    if (!data) return <></>;
    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{ backgroundColor: data.color ??'#facc15' }}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{data.percent ?? 0}%</h3>
        </div>
    )
}