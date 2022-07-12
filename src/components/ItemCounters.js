import '../styles/ItemCounters.css';
import { gql, useMutation } from '@apollo/client';
import {SUBMIT_RECORD} from './Queries.js';
const ItemCounters = ({ containerCount, setContainerCount, bagCount, setBagCount, strawCount, setStrawCount }) => {

  const handleIncrement = (currentCount, setCount) => {
    setCount(currentCount += 1)
  }

  const handleDecrement = (currentCount, setCount) => {
    if (currentCount >= 1) {
      setCount(currentCount -= 1)
    }
  }

  const [createDailyRecord, { error }] = useMutation(SUBMIT_RECORD)

  const submitRecord = () => {
    createDailyRecord({
      variables: {
        date: "2022-07-12",
        userId: 8,
        bagCount: 3,
        containerCount: 3,
        strawCount: 2,
        showerTime: 500
      }
    })

    if (error) {
      console.log(error);
    }

    console.log("did this work?")
  }

  return (
    <section className='item-counter-container'>
      <div className='item-counter'>
        <p className='item-name'>Single Use Containers</p>
        <div className='item-increment'>
          <button className='item-increment-btn' onClick={() => handleDecrement(containerCount, setContainerCount)}>-</button>
          <p className='item-number'>{containerCount}</p>
          <button className='item-increment-btn' onClick={() => handleIncrement(containerCount, setContainerCount)}>+</button>
        </div>
      </div>
      <div className='item-counter'>
        <p className='item-name'>Plastic Straws</p>
        <div className='item-increment'>
        <button className='item-increment-btn' onClick={() => handleDecrement(strawCount, setStrawCount)}>-</button>
          <p className='item-number'>{strawCount}</p>
          <button className='item-increment-btn' onClick={() => handleIncrement(strawCount, setStrawCount)}>+</button>
        </div>
      </div>
      <div className='item-counter'>
        <p className='item-name'>Plastic Shopping Bags</p>
        <div className='item-increment'>
          <button className='item-increment-btn' onClick={() => handleDecrement(bagCount, setBagCount)}>-</button>
          <p className='item-number'>{bagCount}</p>
          <button className='item-increment-btn' onClick={() => handleIncrement(bagCount, setBagCount)}>+</button>
        </div>
      </div>
      <div className='item-counter'>
        <button className='submit-button' onClick={submitRecord}>Submit Daily Record!</button>
      </div>
    </section>
  )
}

export default ItemCounters;
