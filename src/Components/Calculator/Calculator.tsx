import React, {useState} from 'react';

export const Calculator = () => {
    const [m, setM] = useState<number>(0);
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [c, setC] = useState<number | string | string[]>('');

    const handleClear = () => {
        setM(0);
        setA(0);
        setB(0);
        setC('');
    };
    const handleAdd = () => {
        const result = (a + b) % m;
        setC(result);
    };
    const handleSubtract = () => {
        const result = ((a - b) % m + m) % m;
        setC(result);
    };
    const handleMultiply = () => {
        const result = (a * b) % m;
        setC(result);
    };
    const handlePower = () => {
        const result = (Math.pow(a, b) % m);
        setC(result);
    };
    const handleInverse = () => {
        const result = (-a % m + m) % m;
        setC(result);
    };
    const handleDivision = () => {
        const result = (a * b - 1) % m;
        setC(result);
    };
    const handleIsPrime = () => {
        setC(String(isPrimeTest(a)))
    };
    const handleGenerate = () => {
        const randomA = generateRandomNumber(a);
        const check = isPrimeTest(randomA);
        if (check) {
            setC(randomA);
        } else {
            handleGenerate();
        }
    };
    const handleFindGCD = () => {
        const result = findGCD(a, b)
        setC(result)
    };
    const handleCalculateEulerTotient = () => {
         calculateEulerTotient(a)
    };
    const handleCalculateInverse = () => {
        if (m <= 0 || a <= 0) {
            setC('Невірні вхідні параметри');
            return;
        }

        function modInverse(a: number, m: number): number {
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) {
                    return x;
                }
            }
            return -1;
        }

        const inverse = modInverse(a, m);

        if (inverse === -1) {
            setC('Оберненого елемента не існує');
        } else {
            setC(inverse);
        }
    };

    function candidateSearch() {
        setC("Обрахунок")
        let res = []
        for(let i = 1; i <= m; i++){
            for(let j = 1; j <= m; j++) {
                const result = (i * j) % m;
                if(result == 1){
                    res.push("x: " + i + " y: " + j + " | ")
                    j = 1
                    i++
                }
            }
        }
        setC(res)
    }

    function findGCD(num1: number, num2: number) {
        while (num2 !== 0) {
            const remainder = num1 % num2;
            num1 = num2;
            num2 = remainder;
        }
        return num1;
    }
    function isPrimeTest(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;

        if (num % 2 === 0 || num % 3 === 0) return false;

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
    function generateRandomNumber(max: number): number {
        return Math.floor(Math.random() * max) + 1;
    }
    function createButton(onClick: () => void, text: string, className?: string) {
        if (!className) className = "bg-blue-500 text-white p-2 rounded-md"
        return (
            <button
                onClick={onClick}
                className={className}>
                {text}
            </button>
        )
    }
    function calculateEulerTotient(n: number){
        if (n <= 0) {
            setC('Невірне вхідне число');
            return;
        }

        let result = n;

        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) {
                while (n % i === 0) {
                    n /= i;
                }
                result -= result / i; // Віднімаємо взаємно прості числа
            }
        }

        if (n > 1) {
            result -= result / n;
        }

        setC(result);
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
                    onChange={(e) => setM(+e.target.value)}
                    className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                    <label htmlFor="a">Single Value(a):</label>
                    <input
                        type="text"
                        id="a"
                        value={a}
                        onChange={(e) => setA(+e.target.value)}
                        className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="b">Double Value(b):</label>
                    <input
                        type="text"
                        id="b"
                        value={b}
                        onChange={(e) => setB(+e.target.value)}
                        className="border h-10 border-gray-300 p-2 rounded-md w-full"/>
                </div>
            </div>
            <div className="mb-4">
                <label>Result:</label>
                <div className="border h-10 border-gray-300 p-2 rounded-md w-full">{c}</div>
            </div>

            <div className="grid grid-cols-6 gap-2">
                {createButton(handleAdd, "Add (a+b mod m)")}
                {createButton(handleSubtract, "Subtract (a-b mod m)")}
                {createButton(handleMultiply, "Multiply (a*b mod m)")}
                {createButton(handlePower, "Power (a^b mod m)")}
                {createButton(handleInverse, "Inverse (-a mod m)")}
                {createButton(handleDivision, "Division (a/b mod m)")}
                {createButton(handleIsPrime, "Check simple number (a)")}
                {createButton(handleGenerate, "Generate prime number")}
                {createButton(handleFindGCD, "Find GCD (a, b)")}
                {createButton(handleCalculateEulerTotient, "Calculate Euler Totient")}
                {createButton(handleCalculateInverse, "Calculate Inverse (*)")}
                {createButton(candidateSearch, "CandidateSearch")}
                {createButton(handleClear, "Clear", "bg-red-500 text-white p-2 rounded-md")}
            </div>
        </div>
    );
};