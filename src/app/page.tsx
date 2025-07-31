'use client'
import { useState } from 'react'

export default function Home() {
  const [arrayInput, setArrayInput] = useState<string>('')
  const [targetSum, setTargetSum] = useState<string>('')
  const [matchedArray, setMatchedArray] = useState<number[]>([])

  const handleFind = () => {
    try {
      const array = arrayInput
        ?.split(',')
        .filter((item) => item)
        .map((item) => Number(item))

      const isValidTotal =
        array.reduce((cur, prev) => {
          return cur + prev
        }, 0) === Number(targetSum)
      if (!isValidTotal)
        alert(
          'Invalid Target Sum, Your target sum should be max of total sum of array element.'
        )

      const arrayTotalLength = array.length

      for (let i = 0; i < arrayTotalLength; i++) {
        for (let j = i; j < arrayTotalLength; j++) {
          let singleSubArr = []
          for (let k = i; k <= j; k++) {
            singleSubArr.push(array[k])
          }
          const total = singleSubArr.reduce((cur, prev) => {
            return cur + prev
          }, 0)
          if (total === Number(targetSum)) {
            setMatchedArray(singleSubArr)
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex gap-4 flex-col'>
        <div className='flex gap-2'>
          <input
            className='min-w-[100px] py-[0.6rem] px-[1.2rem] rounded-[8px] border-purple-500 bg-[#1a1a1a] hover:border-[#646cff]'
            placeholder='Add comma separated numbers'
            onKeyDown={(e) => {
              if (
                (e.keyCode >= 49 && e.keyCode <= 57) ||
                (e.keyCode >= 37 && e.keyCode <= 40) ||
                e.keyCode === 188 ||
                e.keyCode === 8 ||
                e.keyCode === 46
              ) {
              } else {
                e.preventDefault()
              }
            }}
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
          />
          <input
            className='w-[30%] py-[0.6rem] px-[1.2rem] rounded-[8px] border-purple-500 bg-[#1a1a1a] hover:border-[#646cff]'
            type='number'
            min={0}
            value={targetSum}
            onChange={(e) => setTargetSum(e.target.value)}
          />
          <button
            onClick={handleFind}
            className='bg-[#007bff] py-[0.6rem] px-[1.2rem] rounded-[8px] rounded-[4px] cursor-pointer disabled:bg-[#ccc]'
            disabled={
              !arrayInput ||
              !arrayInput?.length ||
              !targetSum ||
              !targetSum.length
            }
          >
            Find
          </button>
        </div>
        <div className='flex items-center justify-center gap-4'>
          {arrayInput &&
            arrayInput.length &&
            arrayInput
              ?.split(',')
              .filter((item) => item)
              .map((item, i) => {
                const isMatched = matchedArray.find(
                  (counted) => counted === Number(item)
                )
                return (
                  <div
                    className={`w-[50px] h-[50px] rounded-[5px] flex items-center justify-center text-black ${
                      isMatched ? 'bg-[orange] text-white' : 'bg-[#f0f0f0]'
                    }`}
                    key={`${item}-${i}`}
                  >
                    {item}
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}
