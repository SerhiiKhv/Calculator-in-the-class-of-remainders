import React, { useState } from 'react';

export const Calculator = () => {
    const [m, setM] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');

    const handleClear = () => {
        setM('');
        setA('');
        setB('');
        setC('');
    };

    const handleAdd = () => {
        const result = (parseFloat(a) + parseFloat(b)) % parseFloat(m);
        setC(String(result));
    };
    const handleSubtract = () => {
        const result = ((parseFloat(a) - parseFloat(b)) % parseFloat(m) + parseFloat(m)) % parseFloat(m);
        setC(String(result));
    };
    const handleMultiply = () => {
        const result = (parseFloat(a) * parseFloat(b)) % parseFloat(m);
        setC(String(result));
    };
    const handlePower = () => {
        const result = Math.pow(parseFloat(a), parseFloat(b)) % parseFloat(m);
        setC(String(result));
    };
    const handleInverse = () => {
        const result = (-parseFloat(a) % parseFloat(m) + parseFloat(m)) % parseFloat(m);
        setC(String(result));
    };
    const handleDivision = () => {
        const result = (parseFloat(a) * parseFloat(b) - 1) % parseFloat(m);
        setC(String(result));
    };
    const isPrime = () => {
        if (+a <= 1){ setC("false"); return}
        if (+a <= 3){ setC("true"); return}
        if (+a % 2 === 0 || +a % 3 === 0){ setC("false"); return}

        for (let i = 5; i * i <= +a; i += 6) {
            if (+a % i === 0 || +a % (i + 2) === 0) {
                setC("false"); return
            }
        }
        setC("true"); return
    }

    function createButton(onClick: () => void, text: string, className?: string){
        if(!className) className ="bg-blue-500 text-white p-2 rounded-md ml-2"
        return(
            <button
                onClick={onClick}
                className={className}>
                {text}
            </button>
        )
    }

    return (
        <div className="container mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">Calculator</h1>

            <div className="mb-4">
                <label htmlFor="m">Module of Classes:</label>
                <input
                    type="text"
                    id="m"
                    value={m}
                    onChange={(e) => setM(e.target.value)}
                    className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                    <label htmlFor="a">Single Value(a):</label>
                    <input
                        type="text"
                        id="a"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="b">Double Value(b):</label>
                    <input
                        type="text"
                        id="b"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
                </div>
            </div>


            <div className="mb-4">
                <label>Result:</label>
                <div className="border h-10 border-gray-300 p-2 rounded-md w-full">{c}</div>
            </div>

            {createButton(handleAdd, "Add (a+b mod m)")}
            {createButton(handleSubtract, "Subtract (a-b mod m)")}
            {createButton(handleMultiply, "Multiply (a*b mod m)")}
            {createButton(handlePower, "Power (a^b mod m)")}
            {createButton(handleInverse, "Inverse (-a mod m) "+"")}
            {createButton(handleDivision, "Division (a/b mod m)")}
            {createButton(isPrime, "Check simple number (a)")}

            <button
                onClick={handleClear}
                className="bg-red-500 text-white p-2 rounded-md ml-2">
                Clear
            </button>
        </div>
    );
};