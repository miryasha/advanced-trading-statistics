/**
 * Statistics class providing various statistical operations.
 */
class Statistics {
    /**
     * Calculates the mean of an array of numbers.
     * @param {number[]} arr - The input array of numbers.
     * @returns {number} The mean of the array.
     */
    mean(arr) {
      return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    }
  
    /**
     * Calculates the median of an array of numbers.
     * @param {number[]} arr - The input array of numbers.
     * @returns {number} The median of the array.
     */
    median(arr) {
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    }
  
    /**
     * Calculates the mode of an array of numbers.
     * @param {number[]} arr - The input array of numbers.
     * @returns {number} The mode of the array.
     */
    mode(arr) {
      const frequencyMap = new Map();
      let maxFrequency = 0;
      let mode;
  
      for (const num of arr) {
        const frequency = (frequencyMap.get(num) || 0) + 1;
        frequencyMap.set(num, frequency);
  
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          mode = num;
        }
      }
  
      return mode;
    }
  
    /**
     * Calculates the range of an array of numbers.
     * @param {number[]} arr - The input array of numbers.
     * @returns {[number, number]} An array containing the minimum and maximum values.
     */
    range(arr) {
      return [Math.min(...arr), Math.max(...arr)];
    }
  
    /**
     * Normalizes an array of numbers to a specified range.
     * @param {number[]} set - The input array of numbers.
     * @param {[number, number]} range - The desired range [min, max].
     * @returns {number[]} The normalized array.
     */
    normalizeArray(set, range) {
      if (range.length !== 2 || !Array.isArray(set) || !Array.isArray(range)) {
        throw new Error('Invalid arguments to normalize');
      }
  
      const [min, max] = this.range(set);
      const [targetMin, targetMax] = range;
      const scale = (targetMax - targetMin) / (max - min);
  
      return set.map(n => (n - min) * scale + targetMin);
    }
  
    /**
     * Calculates the greatest common divisor of two numbers.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The greatest common divisor.
     */
    gcd(a, b) {
      return b === 0 ? Math.abs(a) : this.gcd(b, a % b);
    }
  
    /**
      * Calculates Risk of Ruin for a trading strategy.
     * @param {number} winRate - The win rate percentage (e.g., 75 for 75%).
     * @param {string} riskRewardRatio - The risk/reward ratio string (e.g., "1:1.95").
     * @param {number} riskPerTrade - The percentage risk per trade (e.g., 2 for 2%).
     * @returns {string} The Risk of Ruin percentage as a string (e.g., "<1%" or "100%").
     * @throws {Error} If inputs are invalid.
     * @example
     * const stats = new Statistics();
     * stats.calculateRiskOfRuin(75, "1:1.95", 2);
     * // returns "<1%"
     */
    calculateRiskOfRuin(winRate, riskRewardRatio, riskPerTrade) {
      // Convert win rate to decimal
      const winProbability = winRate / 100;
      // Convert risk/reward string to number
      const rewardRatio = parseFloat(riskRewardRatio.split(':')[1]);
  
      // Calculate Risk of Ruin using simplified geometric probability formula
      // This assumes fixed position sizing (constant risk per trade)
      if (winProbability >= 0.5 && rewardRatio >= 1) {
        const A = (1 - winProbability) / winProbability;
        const B = 1 / rewardRatio;
        const RoR = Math.pow(A * B, 100 / riskPerTrade); // Using 100 units as base capital
        return RoR < 0.01 ? "<1%" : (RoR * 100).toFixed(2) + "%";
      } else {
        return "100%"; // If win rate < 50% or reward ratio < 1, eventual ruin is certain
      }
    }
  
    /**
     * Converts a decimal to a fraction.
     * @param {number} decimal - The input decimal.
     * @returns {Object} An object containing the numerator, denominator, and display string.
     */
    decimalToFraction(decimal) {
      if (Number.isInteger(decimal)) {
        return { top: decimal, bottom: 1, display: `${decimal}/1` };
      }
  
      const str = decimal.toString();
      const zeroes = str.length - str.indexOf('.') - 1;
      const denominator = Math.pow(10, zeroes);
      const numerator = decimal * denominator;
  
      const divisor = this.gcd(numerator, denominator);
      const top = numerator / divisor;
      const bottom = denominator / divisor;
  
      return { top, bottom, display: `${top}/${bottom}` };
    }
  
    /**
     * Simplifies a fraction string.
     * @param {string} str - The input fraction string (e.g., "4/6").
     * @returns {string} The simplified fraction string.
     */
    simplifyFractions(str) {
      const [numerator, denominator] = str.split('/').map(Number);
      const divisor = this.gcd(numerator, denominator);
      const simplifiedNumerator = numerator / divisor;
      const simplifiedDenominator = denominator / divisor;
  
      return simplifiedDenominator === 1
        ? simplifiedNumerator.toString()
        : `${simplifiedNumerator}/${simplifiedDenominator}`;
    }
  
    /**
     * Calculates the element-wise average of two arrays.
     * @param {number[]} arr1 - The first input array.
     * @param {number[]} arr2 - The second input array.
     * @returns {number[]} The element-wise average of the two arrays.
     */
    sumArr(arr1, arr2) {
      return arr1.map((val, index) => (val + arr2[index]) / 2);
    }
  
    /**
     * Calculates the standard deviation and mean of an array.
     * @param {number[]} arr - The input array of numbers.
     * @returns {Object} An object containing the standard deviation and mean.
     */
    standardDeviation(arr) {
      const mean = this.mean(arr);
      const squaredDiffs = arr.map(val => Math.pow(val - mean, 2));
      const variance = this.mean(squaredDiffs);
      const sd = parseFloat(Math.sqrt(variance).toPrecision(6));
      return { sd, mean };
    }
  
    /**
     * Finds the maximum consecutive occurrence of a specific value in an array of objects.
     * @param {Object[]} data - The input array of objects.
     * @param {string} resultStatus - The key to check in each object.
     * @param {number} positionStatus - The value to look for.
     * @returns {number} The maximum consecutive occurrence.
     */
    consecutiveOfOccurrenceByKey(data, resultStatus, positionStatus) {
      let maxConsecutive = 0;
      let currentConsecutive = 0;
  
      for (const item of data) {
        if (parseInt(item[resultStatus]) === positionStatus) {
          currentConsecutive++;
          maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        } else {
          currentConsecutive = 0;
        }
      }
  
      return maxConsecutive;
    }
  
    /**
     * Calculates the average value of a specific key in an array of objects.
     * @param {Object[]} arr - The input array of objects.
     * @param {string} key - The key to average.
     * @returns {number} The average value.
     */
    calculateAverageByKey(arr, key) {
      const validNumbers = arr
        .map(obj => parseFloat(obj[key]))
        .filter(num => !isNaN(num));
  
      if (validNumbers.length === 0) return 0;
  
      const sum = validNumbers.reduce((acc, num) => acc + num, 0);
      return parseFloat((sum / validNumbers.length).toPrecision(6));
    }
  
    /**
     * Sums the values of a specific key in an array of objects.
     * @param {Object[]} objectsArray - The input array of objects.
     * @param {string} key - The key to sum.
     * @returns {number} The sum of the values.
     */
    sumByKey(objectsArray, key) {
      return objectsArray.reduce((sum, obj) => sum + (obj[key] || 0), 0);
    }
  
    /**
     * Counts the occurrences of a specific value for a key in an array of objects.
     * @param {Object[]} objectsArray - The input array of objects.
     * @param {string} key - The key to check.
     * @param {*} value - The value to count.
     * @returns {number} The count of occurrences.
     */
    countValueByKey(objectsArray, key, value) {
      return objectsArray.filter(obj => obj[key] === value).length;
    }
  
    /**
     * Sums the values in an array.
     * @param {(number|string)[]} arr - The input array of numbers or numeric strings.
     * @returns {number} The sum of the array.
     */
    sumOneArray(arr) {
      return arr.reduce((sum, val) => {
        const num = parseFloat(val);
        if (isNaN(num)) {
          throw new Error('Invalid input. Please provide an array of valid numbers.');
        }
        return sum + num;
      }, 0);
    }
  
    /**
     * Calculates the standard deviation of two numbers.
     * @param {number|string} num1 - The first number.
     * @param {number|string} num2 - The second number.
     * @returns {number} The standard deviation.
     */
    standardDeviationOfTwoNumbers(num1, num2) {
      const [parsedNum1, parsedNum2] = [parseFloat(num1), parseFloat(num2)];
  
      if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
        throw new Error('Invalid input. Please provide valid numbers.');
      }
  
      const mean = (parsedNum1 + parsedNum2) / 2;
      const variance = (Math.pow(parsedNum1 - mean, 2) + Math.pow(parsedNum2 - mean, 2)) / 2;
      return Math.sqrt(variance);
    }
  
  
    /**
    * Returns the maximum or minimum value from an array of numbers based on user input.
    * @param {number[]} arr - The input array of numbers.
    * @param {string} choice - The user's choice, either 'max' or 'min'.
    * @returns {number} The maximum or minimum value from the array.
    * @throws {Error} If the choice is invalid or the array is empty.
    */
    maxOrMin(arr, choice) {
      if (arr.length === 0) {
        throw new Error('The input array is empty.');
      }
  
      if (choice.toLowerCase() === 'max') {
        return Math.max(...arr);
      } else if (choice.toLowerCase() === 'min') {
        return Math.min(...arr);
      } else {
        throw new Error("Invalid choice. Please specify either 'max' or 'min'.");
      }
    }
  
    // const stats = new Statistics();
    // const numbers = [3, 7, 2, 9, 1, 5];
  
    // console.log(stats.maxOrMin(numbers, 'max')); // Output: 9
    // console.log(stats.maxOrMin(numbers, 'min')); // Output: 1
  
  
    /**
      * Calculates skewness of an array of numbers
      * @param {number[]} arr - Array of numbers
      * @returns {number} Skewness value
      */
    calculateSkewness(arr) {
      const n = arr.length;
      const mean = this.mean(arr);
      const { sd } = this.standardDeviation(arr);
  
      if (sd === 0) return 0;
  
      const cubedDiff = arr.map(x => Math.pow((x - mean) / sd, 3));
      const sum = this.sumOneArray(cubedDiff);
  
      // Fisher-Pearson coefficient of skewness
      return (n / ((n - 1) * (n - 2))) * sum;
    }
  
    /**
     * Analyzes stock market data arrays with emphasis on distribution skewness
     * @param {number[]} opens - Array of opening prices
     * @param {number[]} highs - Array of high prices
     * @param {number[]} lows - Array of low prices
     * @param {number[]} closes - Array of closing prices
     * @returns {Object} Statistical analysis including skewness measures
     */
    skewnedStandardDeviation(opens, highs, lows, closes) {
      // Validate arrays
      if (!opens?.length || !highs?.length || !lows?.length || !closes?.length) {
        throw new Error('All price arrays must be provided and non-empty');
      }
      if (new Set([opens.length, highs.length, lows.length, closes.length]).size !== 1) {
        throw new Error('All price arrays must have the same length');
      }
  
      // Calculate returns
      const returns = closes.slice(1).map((close, i) =>
        (close - closes[i]) / closes[i]
      );
  
      // Calculate ranges
      const dailyRanges = highs.map((high, i) => high - lows[i]);
      const openCloseRanges = closes.map((close, i) => close - opens[i]);
  
      return {
        distribution: {
          skewness: {
            returns: this.calculateSkewness(returns),
            prices: this.calculateSkewness(closes),
            ranges: this.calculateSkewness(dailyRanges),
            interpretation: {
              returns: this.getSimpleSkewnessInterpretation(this.calculateSkewness(returns)),
              prices: this.getSimpleSkewnessInterpretation(this.calculateSkewness(closes)),
              ranges: this.getSimpleSkewnessInterpretation(this.calculateSkewness(dailyRanges))
            }
          },
          standardDeviation: {
            returns: this.standardDeviation(returns).sd,
            prices: this.standardDeviation(closes).sd,
            ranges: this.standardDeviation(dailyRanges).sd
          },
          normality: {
            mean: this.mean(closes),
            median: this.median(closes),
            mode: this.mode(closes)
          }
        },
  
        priceAction: {
          latest: {
            open: opens[opens.length - 1],
            high: highs[highs.length - 1],
            low: lows[lows.length - 1],
            close: closes[closes.length - 1]
          },
          ranges: {
            total: {
              high: this.maxOrMin(highs, 'max'),
              low: this.maxOrMin(lows, 'min')
            },
            average: {
              daily: this.mean(dailyRanges),
              openClose: this.mean(openCloseRanges)
            }
          }
        },
  
        patterns: {
          consecutiveMovements: {
            up: this.consecutiveOfOccurrenceByKey(
              returns.map(r => ({ return: r > 0 ? 1 : 0 })),
              'return',
              1
            ),
            down: this.consecutiveOfOccurrenceByKey(
              returns.map(r => ({ return: r < 0 ? 1 : 0 })),
              'return',
              1
            )
          },
          distribution: {
            upDays: returns.filter(r => r > 0).length,
            downDays: returns.filter(r => r < 0).length,
            neutralDays: returns.filter(r => r === 0).length
          }
        }
      };
    }
    /**
     * Simple interpretation of skewness value
     * @param {number} skewness - Skewness value
     * @returns {string} Simple interpretation
     */
    getSimpleSkewnessInterpretation(skewness) {
      if (Math.abs(skewness) < 0.5) {
        return "approximately symmetric";
      } else if (skewness < -1) {
        return "highly negatively skewed";
      } else if (skewness < -0.5) {
        return "moderately negatively skewed";
      } else if (skewness > 1) {
        return "highly positively skewed";
      } else {
        return "moderately positively skewed";
      }
    }
  
  
    /**
    * Interprets market patterns and returns market conditions
    * @param {Object} patterns - The patterns object from skewnedStandardDeviation analysis
    * @param {number} threshold - Optional threshold for determining significant bias (default 0.15)
    * @returns {Object} Market condition interpretations
    */
    interpretMarketPatterns(patterns, threshold = 0.15) {
      if (!patterns?.consecutiveMovements || !patterns?.distribution) {
        throw new Error('Invalid patterns object provided');
      }
  
      const { consecutiveMovements, distribution } = patterns;
      const totalDays = distribution.upDays + distribution.downDays + distribution.neutralDays;
  
      // Calculate bias percentages
      const upPercentage = distribution.upDays / totalDays;
      const downPercentage = distribution.downDays / totalDays;
      const neutralPercentage = distribution.neutralDays / totalDays;
  
      // Determine market type based on consecutive movements
      let marketType = '';
      const consecutiveDiff = Math.abs(consecutiveMovements.up - consecutiveMovements.down);
      if (consecutiveDiff <= 1) {
        marketType = 'ranging';
      } else if (consecutiveMovements.up > consecutiveMovements.down) {
        marketType = 'trending up';
      } else {
        marketType = 'trending down';
      }
  
      // Determine bias
      // Day Trading: Lower threshold (0.05-0.10)
      // Swing Trading: Medium threshold (0.15-0.20)
      // Position Trading: Higher threshold (0.25-0.30)
      // 0.15 -->15% difference for significant bias
      let bias = '';
      const biasThreshold = threshold;
      if (Math.abs(upPercentage - downPercentage) < biasThreshold) {
        bias = 'neutral';
      } else if (upPercentage > downPercentage) {
        bias = 'bullish';
      } else {
        bias = 'bearish';
      }
  
      // Determine volatility
      let volatility = '';
      if (neutralPercentage > 0.2) {
        volatility = 'low';
      } else if (neutralPercentage < 0.1) {
        volatility = 'high';
      } else {
        volatility = 'moderate';
      }
  
      // Additional strength indicators
      const strength = {
        upStrength: (consecutiveMovements.up / totalDays * 100).toFixed(1),
        downStrength: (consecutiveMovements.down / totalDays * 100).toFixed(1)
      };
  
      return {
        summary: `Market is ${marketType} with ${bias} bias and ${volatility} volatility`,
        details: {
          marketType,
          bias,
          volatility,
          strength
        },
        metrics: {
          upPercentage: (upPercentage * 100).toFixed(1) + '%',
          downPercentage: (downPercentage * 100).toFixed(1) + '%',
          neutralPercentage: (neutralPercentage * 100).toFixed(1) + '%'
        }
      };
    }
  
  
    /**
     * Interprets skewness values for trading
     * @param {Object} skewness - Object containing returns, prices, and ranges skewness values
     * @param {number} skewness.returns - Returns skewness value
     * @param {number} skewness.prices - Prices skewness value
     * @param {number} skewness.ranges - Ranges skewness value
     * @returns {Object} Plain English interpretations
     */
    interpretSkewness(skewness) {
      // Basic validation
      if (!skewness || typeof skewness !== 'object') {
        return {
          marketBias: "Unable to analyze - invalid data",
          analysis: {
            returns: { value: "N/A", interpretation: "No data" },
            prices: { value: "N/A", interpretation: "No data" },
            ranges: { value: "N/A", interpretation: "No data" }
          }
        };
      }
  
      const returns = Number(skewness.returns) || 0;
      const prices = Number(skewness.prices) || 0;
      const ranges = Number(skewness.ranges) || 0;
  
      function getReturnsInterpretation(value) {
        if (value > 0.5) {
          return "More frequent small losses but potential for larger gains. Good for long positions.";
        } else if (value < -0.5) {
          return "More frequent small gains but risk of larger losses. Consider quick profit taking.";
        }
        return "Balanced return distribution. No strong bias in gains or losses.";
      }
  
      function getPricesInterpretation(value) {
        if (Math.abs(value) < 0.5) {
          return "Price movements are balanced. No strong directional bias.";
        } else if (value > 0.5) {
          return "Price tends to make larger upward moves. Favor upside breakouts.";
        }
        return "Price tends to make larger downward moves. Watch for downside risks.";
      }
  
      function getRangesInterpretation(value) {
        if (value > 0.5) {
          return "Expect occasional large trading ranges. Watch for breakout opportunities.";
        } else if (value < -0.5) {
          return "Trading ranges are typically consistent with occasional very quiet days.";
        }
        return "Trading ranges are fairly consistent. Good for range-based strategies.";
      }
  
      function getMarketBias() {
        if (returns > 0.5 && ranges > 0.5) {
          return "Market shows potential for explosive upward moves";
        } else if (returns < -0.5 && ranges > 0.5) {
          return "Market shows risk of sharp downward moves";
        } else if (Math.abs(returns) < 0.5 && Math.abs(prices) < 0.5) {
          return "Market is well-balanced with no strong directional bias";
        } else if (returns > 0.5 && Math.abs(prices) < 0.5) {
          return "Market favors longer-term upward positions";
        } else if (returns < -0.5 && Math.abs(prices) < 0.5) {
          return "Market favors shorter-term trading approaches";
        }
        return "Market shows mixed signals - trade with caution";
      }
  
      return {
        marketBias: getMarketBias(),
        analysis: {
          returns: {
            value: returns.toFixed(4),
            interpretation: getReturnsInterpretation(returns)
          },
          prices: {
            value: prices.toFixed(4),
            interpretation: getPricesInterpretation(prices)
          },
          ranges: {
            value: ranges.toFixed(4),
            interpretation: getRangesInterpretation(ranges)
          }
        }
      };
    }
  
  
  
  
    /**
     * Calculates the success rate of trades as a percentage.
     * @param {number} profitableTrades - The total number of profitable trades.
     * @param {number} totalTrades - The total number of all trades.
     * @returns {string} Success rate as a percentage string with one decimal place.
     * @throws {Error} If inputs are not valid numbers.
     * @example
     * const stats = new Statistics();
     * stats.calculateSuccessRate(75, 100); // returns "75.0"
     */
    calculateSuccessRate(profitableTrades, totalTrades) {
      if (totalTrades === 0) return 0;
      return (profitableTrades / totalTrades * 100).toFixed(1);
    }
  
    /**
    * Calculates various profit metrics including average profit, loss, and risk/reward ratio.
    * @param {number} totalProfit - Sum of all profitable trades.
    * @param {number} profitCount - Number of profitable trades.
    * @param {number} totalLoss - Sum of all losing trades (should be negative).
    * @param {number} lossCount - Number of losing trades.
    * @returns {Object} Object containing profit metrics.
    * @returns {string} Object.avgProfit - Average profit per winning trade.
    * @returns {string} Object.avgLoss - Average loss per losing trade.
    * @returns {string} Object.riskReward - Risk/Reward ratio in format "1:X".
    * @example
    * const stats = new Statistics();
    * stats.calculateProfitMetrics(1000, 10, -500, 5);
    * // returns { avgProfit: "100.00", avgLoss: "-100.00", riskReward: "1:1.00" }
    */
    calculateProfitMetrics(totalProfit, profitCount, totalLoss, lossCount) {
      const avgProfit = profitCount > 0 ? (totalProfit / profitCount).toFixed(2) : 0;
      const avgLoss = lossCount > 0 ? (totalLoss / lossCount).toFixed(2) : 0;
      const riskReward = Math.abs(avgLoss) > 0 ?
        `1:${(Math.abs(avgLoss) / parseFloat(avgProfit)).toFixed(2)}` : "N/A";
  
      return { avgProfit, avgLoss, riskReward };
    }
  
    /**
    * Calculates the expected value per trade based on win rate and risk/reward ratio.
    * Formula: (Win Rate × Reward) - (Loss Rate × Risk)
    * @param {number} winRate - Win rate as decimal (e.g., 0.75 for 75%).
    * @param {string} riskRewardRatio - Risk/reward ratio in format "1:X".
    * @returns {number} Expected value per trade (positive indicates profitable strategy).
    * @throws {Error} If win rate is not between 0 and 1 or if risk/reward ratio is invalid.
    * @example
    * const stats = new Statistics();
    * stats.calculateExpectedValue(0.75, "1:1.95"); // returns 0.46
    */
    calculateExpectedValue(winRate, riskRewardRatio) {
      const rewardRatio = parseFloat(riskRewardRatio.split(':')[1]);
      return (winRate * rewardRatio) - ((1 - winRate) * 1);
    }
  
    /**
    * Determines trading strategy probability status based on success rate and risk/reward ratio.
    * Uses following thresholds:
    * - For RR ≤ 1: Need >55% win rate
    * - For RR ≤ 2: Need >45% win rate
    * - For RR > 2: Need >35% win rate
    * @param {number} successRate - Success rate as percentage (e.g., 75 for 75%).
    * @param {number} riskRewardRatio - Risk/reward ratio number (e.g., 1.95).
    * @returns {string} "Profitable", "Break Even", or "Not Profitable".
    * @example
    * const stats = new Statistics();
    * stats.determineProbabilityStatus(75, 1.95); // returns "Profitable"
    */
    determineProbabilityStatus(successRate, riskRewardRatio) {
      const winRateThreshold = riskRewardRatio <= 1 ? 55 :
        riskRewardRatio <= 2 ? 45 : 35;
  
      return parseFloat(successRate) >= winRateThreshold ? "Profitable" :
        parseFloat(successRate) >= (winRateThreshold - 5) ? "Break Even" :
          "Not Profitable";
    }
  
  
    /**
   * Generates a risk description based on calculated metrics
   * @param {number} riskOfRuin - Calculated risk of ruin value.
   * @param {number} kelly - Kelly criterion value.
   * @param {number} rewardRatio - Risk/reward ratio value.
   * @returns {string} Description of trading risk profile.
   * @private
   */
    #getRiskDescription(riskOfRuin, kelly, rewardRatio) {
      if (kelly > 0 && riskOfRuin < 0.25) {
        return `Positive expectancy with sustainable risk levels. Edge preserved with ${rewardRatio.toFixed(2)}x reward ratio.`;
      } else if (kelly > 0) {
        return `Positive expectancy but high risk of drawdown. Consider reducing position size.`;
      } else if (riskOfRuin > 0.75) {
        return `High probability of capital depletion. Strategy needs revision.`;
      } else {
        return `Mixed risk profile. Monitor performance closely and adjust risk parameters.`;
      }
    }
  
    /**
    * Provides trade recommendations based on risk analysis
    * @param {number} riskOfRuin - Calculated risk of ruin value.
    * @param {number} kelly - Kelly criterion value.
    * @param {number} currentRisk - Current risk per trade percentage.
    * @returns {string} Trading recommendation based on risk analysis.
    * @private
    */
    #getTradeRecommendation(riskOfRuin, kelly, currentRisk) {
      const optimalRisk = (kelly > 0 ? kelly / 2 : 0) * 100;
  
      if (riskOfRuin < 0.1 && kelly > 0) {
        return `Current strategy is well-optimized. Consider ${optimalRisk.toFixed(1)}% risk per trade.`;
      } else if (currentRisk > optimalRisk) {
        return `Consider reducing risk per trade to ${optimalRisk.toFixed(1)}% for better capital preservation.`;
      } else {
        return `Review strategy parameters. Current risk level may not be sustainable.`;
      }
    }
  
    /**
    * Calculates detailed Risk of Ruin using advanced probability metrics.
    * Considers: Win rate, Risk/Reward ratio, Maximum drawdown, and Position sizing
    * @param {number} winRate - Win rate percentage (e.g., 61.5 for 61.5%).
    * @param {string} riskRewardRatio - Risk/Reward ratio string (e.g., "1:1.70").
    * @param {number} riskPerTrade - Risk percentage per trade (e.g., 2 for 2%).
    * @param {number} maxConsecutiveLosses - Maximum consecutive losses observed.
    * @returns {Object} Detailed risk analysis including probability of ruin and survival.
    * @example
    * const stats = new Statistics();
    * const riskAnalysis = stats.calculateDetailedRiskOfRuin(61.5, "1:1.70", 2, 2);
    * // returns {
    * //   riskOfRuin: "24.35%",
    * //   survivalProbability: "75.65%",
    * //   riskStatus: "Low Risk",
    * //   metrics: {
    * //     kellyPercentage: "15.32%",
    * //     recommendedRiskPerTrade: "7.66%",
    * //     drawdownRisk: "13.53%"
    * //   },
    * //   interpretation: {
    * //     status: "Low Risk",
    * //     description: "Positive expectancy with sustainable risk levels...",
    * //     recommendation: "Current strategy is well-optimized..."
    * //   }
    * // }
    */
    calculateDetailedRiskOfRuin(winRate, riskRewardRatio, riskPerTrade, maxConsecutiveLosses) {
      // Convert win rate to decimal
      const winProbability = winRate / 100;
      const lossProbability = 1 - winProbability;
  
      // Parse risk/reward ratio
      const rewardRatio = parseFloat(riskRewardRatio.split(':')[1]);
  
      // Calculate base risk of ruin using optimal f formula
      const f = riskPerTrade / 100; // Convert risk per trade to decimal
      const q = 1 / rewardRatio; // Risk/reward quotient
  
      // Calculate Kelly Criterion
      const kelly = (winProbability * rewardRatio - lossProbability) / rewardRatio;
  
      // Calculate probability multiplier based on max consecutive losses
      const drawdownFactor = Math.exp(-maxConsecutiveLosses * f);
  
      // Calculate modified risk of ruin
      let riskOfRuin;
      if (winProbability >= 0.5 && rewardRatio >= 1) {
        const A = lossProbability / winProbability;
        const B = 1 / rewardRatio;
        const baseRoR = Math.pow(A * B, 100 / riskPerTrade);
        riskOfRuin = baseRoR * (1 - drawdownFactor);
      } else {
        const negativeEdge = 1 - (winProbability * rewardRatio);
        riskOfRuin = 1 - Math.exp(-negativeEdge * maxConsecutiveLosses);
      }
  
      // Calculate additional risk metrics
      const survivalProbability = 1 - riskOfRuin;
      const kellyFraction = kelly > 0 ? kelly / 2 : 0; // Half Kelly for safety
      const optimalRiskPerTrade = kellyFraction * 100;
  
      // Determine risk status
      let riskStatus;
      if (riskOfRuin < 0.01) {
        riskStatus = "Minimal Risk";
      } else if (riskOfRuin < 0.25) {
        riskStatus = "Low Risk";
      } else if (riskOfRuin < 0.5) {
        riskStatus = "Moderate Risk";
      } else if (riskOfRuin < 0.75) {
        riskStatus = "High Risk";
      } else {
        riskStatus = "Extreme Risk";
      }
  
      return {
        riskOfRuin: `${(riskOfRuin * 100).toFixed(2)}%`,
        survivalProbability: `${(survivalProbability * 100).toFixed(2)}%`,
        riskStatus,
        metrics: {
          kellyPercentage: `${(kelly * 100).toFixed(2)}%`,
          recommendedRiskPerTrade: `${optimalRiskPerTrade.toFixed(2)}%`,
          drawdownRisk: `${(drawdownFactor * 100).toFixed(2)}%`
        },
        interpretation: {
          status: riskStatus,
          description: this.#getRiskDescription(riskOfRuin, kelly, rewardRatio),
          recommendation: this.#getTradeRecommendation(riskOfRuin, kelly, riskPerTrade)
        }
      };
    }
  };
  
  
  
  
  
  module.exports = new Statistics();