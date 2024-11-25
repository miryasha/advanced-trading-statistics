const Statistics = require('../src/index');

describe('Statistics', () => {
    // Basic Statistical Methods
    describe('Basic Statistics', () => {
        test('mean calculation', () => {
            expect(Statistics.mean([1, 2, 3, 4, 5])).toBe(3);
            expect(Statistics.mean([])).toBe(NaN);
        });

        test('median calculation', () => {
            expect(Statistics.median([1, 2, 3, 4, 5])).toBe(3);
            expect(Statistics.median([1, 2, 3, 4])).toBe(2.5);
            expect(Statistics.median([5, 2, 1, 4, 3])).toBe(3);
        });

        test('mode calculation', () => {
            expect(Statistics.mode([1, 2, 2, 3])).toBe(2);
            expect(Statistics.mode([1, 1, 2, 2, 3])).toBe(1);
        });

        test('range calculation', () => {
            expect(Statistics.range([1, 2, 3, 4, 5])).toEqual([1, 5]);
            expect(Statistics.range([5, 2, 1, 4, 3])).toEqual([1, 5]);
        });
    });

    // Array Operations
    describe('Array Operations', () => {
        test('normalizeArray', () => {
            expect(Statistics.normalizeArray([1, 2, 3], [0, 1])).toEqual([0, 0.5, 1]);
            expect(() => Statistics.normalizeArray([1, 2], 'invalid')).toThrow();
        });

        test('sumArr', () => {
            expect(Statistics.sumArr([1, 2], [3, 4])).toEqual([2, 3]);
        });

        test('sumOneArray', () => {
            expect(Statistics.sumOneArray([1, 2, 3])).toBe(6);
            expect(() => Statistics.sumOneArray(['a', 'b'])).toThrow();
        });
    });

    // Trading Statistics
    describe('Trading Statistics', () => {
        test('calculateRiskOfRuin', () => {
            expect(Statistics.calculateRiskOfRuin(75, "1:1.95", 2)).toBe("<1%");
            expect(Statistics.calculateRiskOfRuin(45, "1:1.95", 2)).toBe("100%");
        });

        test('calculateSuccessRate', () => {
            expect(Statistics.calculateSuccessRate(75, 100)).toBe("75.0");
            expect(Statistics.calculateSuccessRate(0, 0)).toBe("0");
        });

        test('calculateProfitMetrics', () => {
            const result = Statistics.calculateProfitMetrics(1000, 10, -500, 5);
            expect(result).toEqual({
                avgProfit: "100.00",
                avgLoss: "-100.00",
                riskReward: "1:1.00"
            });
        });

        test('calculateExpectedValue', () => {
            expect(Statistics.calculateExpectedValue(0.75, "1:1.95")).toBeCloseTo(0.4625);
        });
    });

    // Advanced Analysis
    describe('Advanced Analysis', () => {
        test('calculateDetailedRiskOfRuin', () => {
            const result = Statistics.calculateDetailedRiskOfRuin(61.5, "1:1.70", 2, 2);
            expect(result).toHaveProperty('riskOfRuin');
            expect(result).toHaveProperty('survivalProbability');
            expect(result).toHaveProperty('riskStatus');
        });

        test('skewnedStandardDeviation', () => {
            const opens = [10, 11, 12];
            const highs = [11, 12, 13];
            const lows = [9, 10, 11];
            const closes = [11, 12, 13];

            const result = Statistics.skewnedStandardDeviation(opens, highs, lows, closes);
            expect(result).toHaveProperty('distribution');
            expect(result).toHaveProperty('priceAction');
            expect(result).toHaveProperty('patterns');
        });

        test('interpretMarketPatterns', () => {
            const patterns = {
                consecutiveMovements: { up: 3, down: 2 },
                distribution: { upDays: 10, downDays: 8, neutralDays: 2 }
            };

            const result = Statistics.interpretMarketPatterns(patterns);
            expect(result).toHaveProperty('summary');
            expect(result).toHaveProperty('details');
            expect(result).toHaveProperty('metrics');
        });
    });

    // Utility Functions
    describe('Utility Functions', () => {
        test('gcd calculation', () => {
            expect(Statistics.gcd(48, 18)).toBe(6);
            expect(Statistics.gcd(0, 5)).toBe(5);
        });

        test('decimalToFraction', () => {
            expect(Statistics.decimalToFraction(0.5)).toEqual({
                top: 1,
                bottom: 2,
                display: '1/2'
            });
        });

        test('simplifyFractions', () => {
            expect(Statistics.simplifyFractions('4/6')).toBe('2/3');
            expect(Statistics.simplifyFractions('4/4')).toBe('1');
        });

        test('standardDeviation', () => {
            const result = Statistics.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);
            expect(result).toHaveProperty('sd');
            expect(result).toHaveProperty('mean');
        });

        test('maxOrMin', () => {
            expect(Statistics.maxOrMin([1, 2, 3], 'max')).toBe(3);
            expect(Statistics.maxOrMin([1, 2, 3], 'min')).toBe(1);
            expect(() => Statistics.maxOrMin([], 'max')).toThrow();
            expect(() => Statistics.maxOrMin([1, 2], 'invalid')).toThrow();
        });
    });

    // Error Handling
    describe('Error Handling', () => {
        test('should throw on invalid inputs', () => {
            expect(() => Statistics.normalizeArray(null, [0, 1])).toThrow();
            expect(() => Statistics.sumOneArray(['invalid'])).toThrow();
            expect(() => Statistics.standardDeviationOfTwoNumbers('abc', 'def')).toThrow();
            expect(() => Statistics.maxOrMin([], 'max')).toThrow();
        });
    });
});


// Add these test cases to the existing test file

describe('Additional Tests', () => {
    test('calculateAverageByKey', () => {
        const data = [
            { value: '1' },
            { value: '2' },
            { value: '3' }
        ];
        expect(Statistics.calculateAverageByKey(data, 'value')).toBe(2);
        expect(Statistics.calculateAverageByKey([], 'value')).toBe(0);
    });

    test('sumByKey', () => {
        const data = [
            { amount: 10 },
            { amount: 20 },
            { amount: 30 }
        ];
        expect(Statistics.sumByKey(data, 'amount')).toBe(60);
    });

    test('countValueByKey', () => {
        const data = [
            { status: 'active' },
            { status: 'inactive' },
            { status: 'active' }
        ];
        expect(Statistics.countValueByKey(data, 'status', 'active')).toBe(2);
    });

    test('standardDeviationOfTwoNumbers', () => {
        expect(Statistics.standardDeviationOfTwoNumbers(2, 4)).toBeCloseTo(1);
        expect(() => Statistics.standardDeviationOfTwoNumbers('abc', '123')).toThrow();
    });

    test('calculateSkewness', () => {
        const data = [2, 3, 3, 4, 5, 5, 5, 6, 8];
        expect(Statistics.calculateSkewness(data)).toBeDefined();
    });

    test('interpretSkewness', () => {
        const skewness = {
            returns: 0.6,
            prices: 0.3,
            ranges: -0.2
        };
        const result = Statistics.interpretSkewness(skewness);
        expect(result).toHaveProperty('marketBias');
        expect(result).toHaveProperty('analysis');
    });

    test('consecutiveOfOccurrenceByKey', () => {
        const data = [
            { status: 1 },
            { status: 1 },
            { status: 0 },
            { status: 1 }
        ];
        expect(Statistics.consecutiveOfOccurrenceByKey(data, 'status', 1)).toBe(2);
    });

    test('determineProbabilityStatus', () => {
        expect(Statistics.determineProbabilityStatus(75, 1.95)).toBe("Profitable");
        expect(Statistics.determineProbabilityStatus(40, 1.5)).toBe("Not Profitable");
    });
});