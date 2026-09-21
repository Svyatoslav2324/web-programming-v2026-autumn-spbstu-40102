export function calculateExpression(expr) {
  const tokens = expr.match(/\d+\.?\d*|[+\-*/]/g);
  if (!tokens) {
    throw new Error('invalid expression');
  }

  const firstStage = [parseFloat(tokens[0])];
  for (let i = 1; i < tokens.length - 1; i += 2) {
    const op = tokens[i];
    const num = parseFloat(tokens[i + 1]);
    if (op === '/' || op === '*') {
      const last = parseFloat(firstStage.pop());
      const result = op === '/' ? last / num : last * num;
      firstStage.push(result);
    } else {
      firstStage.push(op);
      firstStage.push(num);
    }
  }

  let result = firstStage[0];
  for (let i = 1; i < firstStage.length - 1; i += 2) {
    const op = firstStage[i];
    const num = firstStage[i + 1];
    result = op === '+' ? result + num : result - num;
  }

  return result;
}
