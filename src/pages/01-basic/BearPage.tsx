import { ChangeEvent, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />
      </div>
    </>
  );
};

const BlackBears = () => {
  const blackBears = useBearStore(state => state.blackBears);
  const increaseBlackBears = useBearStore(state => state.increaseBlackBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={ () => increaseBlackBears(+1) }> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{ blackBears }</span>
        <button onClick={ () => increaseBlackBears(-1) }>-1</button>
      </div>
    </WhiteCard>
  )
}

const PolarBears = () => {
  const polarBears = useBearStore(state => state.polarBears);
  const increasePolarBears = useBearStore(state => state.increasePolarBears);
  return (
  <WhiteCard centered>
    <h2>Osos Polares</h2>
    <div className="flex flex-col md:flex-row">
      <button onClick={ () => increasePolarBears(+1) }> +1</button>
      <span className="text-3xl mx-2 lg:mx-10"> { polarBears } </span>
      <button onClick={ () => increasePolarBears(+1) }>-1</button>
    </div>
  </WhiteCard>
  )
}

const PandaBears = () => {
  const pandaBears = useBearStore(state => state.pandaBears);
  const increasePandaBears = useBearStore(state => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={ () => increasePandaBears(+1) }>+1</button>
        <span className="text-3xl mx-2 lg:mx-10"> { pandaBears } </span>
        <button onClick={ () => increasePandaBears(-1) }>-1</button>
      </div>
    </WhiteCard>
  )
}

const BearsDisplay = () => {
  const bears = useBearStore(useShallow(state => state.bears));
  const doNothing = useBearStore(state => state.doNothing);
  const addBear = useBearStore(state => state.addBear);
  const removeBear = useBearStore(state => state.removeBear);
  const clearBears = useBearStore(state => state.clearBears);
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <WhiteCard>
      <div className="flex flex-col md:flex-row p-2 gap-2">
        <h2 className='text-xxl text-center p-2 uppercase text-indigo-800'>Osos</h2>
        <button onClick={doNothing}>do nothing</button>
        <button onClick={() => {
          addBear();
          toast.success(`Añadido el oso ${bears.length +1 } con éxito`);
        }}>add bear</button>
        <button onClick={() => {
          clearBears();
          toast.success('Todos los osos eliminados con éxito');
        }}>Clear bear</button>
        <button onClick={() => {
          const lastBear = bears[bears.length - 1];
          if (lastBear) {
            removeBear(lastBear.id);
            toast.success(`Eliminado el oso: ${lastBear.name}`);
          }
        }}>delete the last bear</button>
        <div className="max-h-50 overflow-y-auto">
          <pre className="text-xl text-blue-800 m-5 lg:m-10 bg-indigo-100 p-2 rounded-xl">
            {JSON.stringify(bears, null, 2)}
          </pre>
        </div>
        <div className="flex flex-col md:flex-row">
          <select
            className='text-l text-white uppercase font-bold hover:bg-indigo-500 rounded-full bg-indigo-700 p-2 justify-center text-center'
            ref={selectRef}
            defaultValue={0}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const value = Number(e.target.value);
              const bearToRemove = bears.find(bear => bear.id === value);
              if (bearToRemove) {
                removeBear(value);
                toast.success(`Eliminado el oso: ${bearToRemove.name}`);
              }
              if (selectRef.current) {
                selectRef.current.value = '0'; // Restablecer a "None"
              }
            }}
          >
            <option value={0}>Seleccionar oso a eliminar</option>
            {bears.map(bear => (
              <option key={bear.id} value={bear.id}>{bear.name}</option>
            ))}
          </select>
        </div>
        <ToastContainer />
      </div>
    </WhiteCard>
  )
}
